/**
 * Core responsive design system
 * Handles automatic adaptation based on viewport size
 */

import { PHI, BASE_UNIT } from './constants';
import { breakpointsPx } from '../tokens/dimensions';
import type { BreakpointKey } from './types';

/**
 * Calculate fluid font size using CSS clamp()
 * Automatically scales between min and max based on viewport
 *
 * @param minSize - Minimum font size in rem
 * @param maxSize - Maximum font size in rem
 * @param minViewport - Minimum viewport width in px (default: 336)
 * @param maxViewport - Maximum viewport width in px (default: 1424)
 * @returns CSS clamp() string
 *
 * @example
 * fluidFontSize(1, 1.618, 336, 1424)
 * // 'clamp(1rem, 0.432rem + 2.98vw, 1.618rem)'
 */
export function fluidFontSize(
  minSize: number,
  maxSize: number,
  minViewport: number = breakpointsPx.xs,
  maxViewport: number = breakpointsPx.lg
): string {
  // Calculate slope: (maxSize - minSize) / (maxViewport - minViewport)
  const slope = (maxSize - minSize) / ((maxViewport - minViewport) / 100);

  // Calculate intersection: minSize - (slope * minViewport / 100)
  const intersection = minSize - (slope * minViewport / 100);

  return `clamp(${minSize}rem, ${intersection.toFixed(3)}rem + ${slope.toFixed(3)}vw, ${maxSize}rem)`;
}

/**
 * Calculate fluid spacing using CSS clamp()
 *
 * @param minSpace - Minimum spacing in rem
 * @param maxSpace - Maximum spacing in rem
 * @param minViewport - Minimum viewport width in px
 * @param maxViewport - Maximum viewport width in px
 * @returns CSS clamp() string
 */
export function fluidSpacing(
  minSpace: number,
  maxSpace: number,
  minViewport: number = breakpointsPx.xs,
  maxViewport: number = breakpointsPx.lg
): string {
  return fluidFontSize(minSpace, maxSpace, minViewport, maxViewport);
}

/**
 * Generate responsive scale that adapts to viewport
 * Uses golden ratio to scale between breakpoints
 *
 * @param baseValue - Base value at medium viewport
 * @returns Object with values for each breakpoint
 *
 * @example
 * responsiveScale(1)
 * // { xs: 0.809, sm: 0.924, md: 1, lg: 1.146, xl: 1.313 }
 */
export function responsiveScale(baseValue: number): Record<BreakpointKey, number> {
  // Scale down for smaller screens, up for larger
  // Using golden ratio divisions for harmony
  return {
    xs: baseValue / PHI,           // ~0.618x
    sm: baseValue / Math.sqrt(PHI), // ~0.786x
    md: baseValue,                  // 1x
    lg: baseValue * Math.sqrt(PHI), // ~1.272x
    xl: baseValue * PHI / 1.2,      // ~1.348x
  };
}

/**
 * Calculate optimal font size for current viewport
 * Based on golden ratio relationships
 *
 * @param viewportWidth - Viewport width in pixels
 * @param baseFontSize - Base font size in pixels (default: 16)
 * @returns Optimal font size in pixels
 *
 * @example
 * calculateViewportFontSize(375) // ~14px (mobile)
 * calculateViewportFontSize(1440) // ~18px (desktop)
 */
export function calculateViewportFontSize(
  viewportWidth: number,
  baseFontSize: number = BASE_UNIT
): number {
  // Mobile: 320-544px
  if (viewportWidth < breakpointsPx.sm) {
    return baseFontSize * 0.875; // 14px
  }

  // Tablet: 544-880px
  if (viewportWidth < breakpointsPx.md) {
    return baseFontSize * 0.9375; // 15px
  }

  // Desktop: 880-1424px
  if (viewportWidth < breakpointsPx.lg) {
    return baseFontSize; // 16px
  }

  // Large desktop: 1424px+
  return baseFontSize * 1.125; // 18px
}

/**
 * Get container padding based on viewport
 * Automatically adjusts for different screen sizes
 *
 * @param viewportWidth - Viewport width in pixels
 * @returns Padding in rem
 */
export function getContainerPadding(viewportWidth: number): number {
  // Fibonacci progression: 5, 8, 13 (in spacing scale)
  if (viewportWidth < breakpointsPx.sm) {
    return 1.25; // spacing-5 (20px)
  }
  if (viewportWidth < breakpointsPx.lg) {
    return 2; // spacing-8 (32px)
  }
  return 3.25; // spacing-13 (52px)
}

/**
 * Calculate responsive value with interpolation
 * Smoothly transitions between breakpoint values
 *
 * @param values - Map of breakpoint to value
 * @param currentWidth - Current viewport width in pixels
 * @returns Interpolated value
 *
 * @example
 * interpolateResponsiveValue({ xs: 16, lg: 24 }, 700)
 * // ~19.5 (interpolated between xs and lg)
 */
export function interpolateResponsiveValue(
  values: Partial<Record<BreakpointKey, number>>,
  currentWidth: number
): number {
  const breakpoints = Object.entries(breakpointsPx).sort((a, b) => a[1] - b[1]);

  // Find the two breakpoints we're between
  let lowerBreakpoint: [string, number] | null = null;
  let upperBreakpoint: [string, number] | null = null;

  for (let i = 0; i < breakpoints.length; i++) {
    const bp = breakpoints[i];
    if (bp[1] <= currentWidth) {
      lowerBreakpoint = bp;
    } else {
      upperBreakpoint = bp;
      break;
    }
  }

  // If we have values for both breakpoints, interpolate
  if (lowerBreakpoint && upperBreakpoint) {
    const lowerKey = lowerBreakpoint[0] as BreakpointKey;
    const upperKey = upperBreakpoint[0] as BreakpointKey;
    const lowerValue = values[lowerKey];
    const upperValue = values[upperKey];

    if (lowerValue !== undefined && upperValue !== undefined) {
      const lowerWidth = lowerBreakpoint[1];
      const upperWidth = upperBreakpoint[1];
      const progress = (currentWidth - lowerWidth) / (upperWidth - lowerWidth);

      return lowerValue + (upperValue - lowerValue) * progress;
    }
  }

  // Fallback: find closest breakpoint value
  let closestKey: BreakpointKey | null = null;
  let closestDiff = Infinity;

  for (const [key, width] of breakpoints) {
    const diff = Math.abs(width - currentWidth);
    if (diff < closestDiff && values[key as BreakpointKey] !== undefined) {
      closestDiff = diff;
      closestKey = key as BreakpointKey;
    }
  }

  return closestKey ? values[closestKey]! : 0;
}

/**
 * Generate CSS for fluid typography
 * Creates font-size that smoothly scales with viewport
 *
 * @param minFontSize - Minimum font size in rem
 * @param maxFontSize - Maximum font size in rem
 * @param property - CSS property name (default: 'font-size')
 * @returns CSS declaration
 */
export function generateFluidTypography(
  minFontSize: number,
  maxFontSize: number,
  property: string = 'font-size'
): string {
  const clampValue = fluidFontSize(minFontSize, maxFontSize);
  return `${property}: ${clampValue};`;
}

/**
 * Calculate ideal line width based on viewport
 * Maintains optimal reading experience
 *
 * @param viewportWidth - Viewport width in pixels
 * @returns Optimal max-width in rem (Fibonacci-based)
 */
export function getOptimalContentWidth(viewportWidth: number): number {
  // Mobile: smaller content width
  if (viewportWidth < breakpointsPx.sm) {
    return 21; // 336px (Fib: 21)
  }

  // Tablet: medium content width
  if (viewportWidth < breakpointsPx.md) {
    return 34; // 544px (Fib: 34)
  }

  // Desktop: optimal reading width
  if (viewportWidth < breakpointsPx.lg) {
    return 55; // 880px (Fib: 55)
  }

  // Large: max comfortable width
  return 89; // 1424px (Fib: 89)
}
