/**
 * Automatic adaptation utilities
 * Detects viewport and applies appropriate sizing
 */

import {
  calculateViewportFontSize,
  getContainerPadding,
  getOptimalContentWidth,
  interpolateResponsiveValue,
} from '../core/responsive';
import { breakpointsPx } from '../tokens/dimensions';
import type { BreakpointKey } from '../core/types';

/**
 * Auto-adaptation configuration
 */
export interface AutoAdaptConfig {
  /**
   * Enable automatic font size adaptation
   */
  adaptFontSize?: boolean;

  /**
   * Enable automatic spacing adaptation
   */
  adaptSpacing?: boolean;

  /**
   * Enable automatic content width adaptation
   */
  adaptContentWidth?: boolean;

  /**
   * CSS selector for elements to adapt
   */
  rootSelector?: string;

  /**
   * Debounce delay for resize events (ms)
   */
  debounceDelay?: number;
}

/**
 * Viewport information
 */
export interface ViewportInfo {
  width: number;
  height: number;
  breakpoint: BreakpointKey;
  orientation: 'portrait' | 'landscape';
  devicePixelRatio: number;
}

/**
 * Get current viewport information
 *
 * @returns Viewport information object
 */
export function getViewportInfo(): ViewportInfo {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      breakpoint: 'md',
      orientation: 'landscape',
      devicePixelRatio: 1,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Determine breakpoint
  let breakpoint: BreakpointKey = 'xs';
  if (width >= breakpointsPx.xl) breakpoint = 'xl';
  else if (width >= breakpointsPx.lg) breakpoint = 'lg';
  else if (width >= breakpointsPx.md) breakpoint = 'md';
  else if (width >= breakpointsPx.sm) breakpoint = 'sm';

  return {
    width,
    height,
    breakpoint,
    orientation: width > height ? 'landscape' : 'portrait',
    devicePixelRatio: window.devicePixelRatio || 1,
  };
}

/**
 * Applies automatic sizing adaptations based on viewport
 *
 * @param config - Configuration options
 */
export function applyAutoAdaptation(config: AutoAdaptConfig = {}): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const {
    adaptFontSize = true,
    adaptSpacing = true,
    adaptContentWidth = false,
    rootSelector = ':root',
    debounceDelay = 150,
  } = config;

  const root = document.querySelector(rootSelector);
  if (!root) return;

  const adapt = () => {
    const viewport = getViewportInfo();

    // Adapt font size
    if (adaptFontSize) {
      const fontSize = calculateViewportFontSize(viewport.width);
      if (root instanceof HTMLElement) {
        root.style.fontSize = `${fontSize}px`;
      }
    }

    // Adapt container padding
    if (adaptSpacing) {
      const padding = getContainerPadding(viewport.width);
      document.documentElement.style.setProperty(
        '--fibo-container-padding',
        `${padding}rem`
      );
    }

    // Adapt content width
    if (adaptContentWidth) {
      const maxWidth = getOptimalContentWidth(viewport.width);
      document.documentElement.style.setProperty(
        '--fibo-content-max-width',
        `${maxWidth}rem`
      );
    }

    // Store current breakpoint as data attribute
    document.documentElement.setAttribute(
      'data-fibo-breakpoint',
      viewport.breakpoint
    );
  };

  // Apply immediately
  adapt();

  // Debounce resize events
  let resizeTimer: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(adapt, debounceDelay);
  });

  // Handle orientation change
  window.addEventListener('orientationchange', adapt);
}

/**
 * Create a responsive value hook for frameworks
 * Returns current value based on viewport
 *
 * @param values - Map of breakpoint to value
 * @param defaultValue - Default fallback value
 * @returns Function that returns current value
 */
export function useResponsiveValue<T>(
  values: Partial<Record<BreakpointKey, T>>,
  defaultValue: T
): () => T {
  return () => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const viewport = getViewportInfo();
    return values[viewport.breakpoint] ?? defaultValue;
  };
}

/**
 * Watch for viewport changes and execute callback
 *
 * @param callback - Function to call on viewport change
 * @param debounce - Debounce delay in ms (default: 150)
 * @returns Cleanup function
 */
export function watchViewport(
  callback: (info: ViewportInfo) => void,
  debounce: number = 150
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let lastBreakpoint: BreakpointKey | null = null;
  let timer: number;

  const check = () => {
    const info = getViewportInfo();
    if (info.breakpoint !== lastBreakpoint) {
      lastBreakpoint = info.breakpoint;
      callback(info);
    }
  };

  const debouncedCheck = () => {
    clearTimeout(timer);
    timer = window.setTimeout(check, debounce);
  };

  // Initial check
  check();

  // Watch for changes
  window.addEventListener('resize', debouncedCheck);
  window.addEventListener('orientationchange', check);

  // Return cleanup function
  return () => {
    clearTimeout(timer);
    window.removeEventListener('resize', debouncedCheck);
    window.removeEventListener('orientationchange', check);
  };
}

/**
 * Get responsive spacing value for current viewport
 *
 * @param mobileValue - Value for mobile (xs)
 * @param desktopValue - Value for desktop (lg)
 * @returns Current spacing value
 */
export function getResponsiveSpacing(
  mobileValue: number,
  desktopValue: number
): number {
  if (typeof window === 'undefined') {
    return mobileValue;
  }

  const viewport = getViewportInfo();
  return interpolateResponsiveValue(
    { xs: mobileValue, lg: desktopValue },
    viewport.width
  );
}

/**
 * Get responsive font size for current viewport
 *
 * @param mobileFontSize - Font size for mobile in rem
 * @param desktopFontSize - Font size for desktop in rem
 * @returns Current font size in rem
 */
export function getResponsiveFontSize(
  mobileFontSize: number,
  desktopFontSize: number
): number {
  if (typeof window === 'undefined') {
    return mobileFontSize;
  }

  const viewport = getViewportInfo();
  return interpolateResponsiveValue(
    { xs: mobileFontSize, lg: desktopFontSize },
    viewport.width
  );
}

/**
 * Check if viewport matches a specific breakpoint
 *
 * @param breakpoint - Breakpoint to check
 * @param direction - 'up' (>=), 'down' (<=), or 'only' (exact)
 * @returns True if viewport matches
 */
export function matchesViewport(
  breakpoint: BreakpointKey,
  direction: 'up' | 'down' | 'only' = 'up'
): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const viewport = getViewportInfo();
  const targetWidth = breakpointsPx[breakpoint];
  const currentWidth = viewport.width;

  switch (direction) {
    case 'up':
      return currentWidth >= targetWidth;
    case 'down':
      return currentWidth <= targetWidth;
    case 'only':
      return viewport.breakpoint === breakpoint;
    default:
      return false;
  }
}

/**
 * Apply CSS class based on current breakpoint
 *
 * @param element - Element to apply class to
 * @param classMap - Map of breakpoint to class name
 */
export function applyBreakpointClass(
  element: HTMLElement,
  classMap: Partial<Record<BreakpointKey, string>>
): void {
  const viewport = getViewportInfo();
  const className = classMap[viewport.breakpoint];

  if (className) {
    // Remove all other breakpoint classes
    Object.values(classMap).forEach(cls => {
      if (cls && cls !== className) {
        element.classList.remove(cls);
      }
    });

    // Add current breakpoint class
    element.classList.add(className);
  }
}

/**
 * Initialize automatic responsive system
 * Call this once when your app loads
 *
 * @param config - Configuration options
 * @returns Cleanup function
 */
export function initResponsiveSystem(config: AutoAdaptConfig = {}): () => void {
  applyAutoAdaptation(config);

  // Watch for breakpoint changes and log (optional)
  const cleanup = watchViewport((info) => {
    if (config.adaptFontSize || config.adaptSpacing || config.adaptContentWidth) {
      // Re-apply adaptations on breakpoint change
      applyAutoAdaptation(config);
    }
  });

  return cleanup;
}
