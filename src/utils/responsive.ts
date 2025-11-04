/**
 * Utility functions for responsive design
 */

import { breakpoints, breakpointsPx, type BreakpointKey } from '../tokens/dimensions';

/**
 * Get a breakpoint value
 *
 * @param key - Breakpoint key
 * @returns Breakpoint value in rem
 */
export function getBreakpoint(key: BreakpointKey): string {
  return breakpoints[key];
}

/**
 * Get a breakpoint value in pixels
 *
 * @param key - Breakpoint key
 * @returns Breakpoint value in pixels
 */
export function getBreakpointPx(key: BreakpointKey): number {
  return breakpointsPx[key];
}

/**
 * Generate a media query string
 *
 * @param key - Breakpoint key
 * @param type - Media query type ('min' or 'max')
 * @returns Media query string
 *
 * @example
 * mediaQuery('md', 'min') // '@media (min-width: 55rem)'
 * mediaQuery('lg', 'max') // '@media (max-width: 89rem)'
 */
export function mediaQuery(
  key: BreakpointKey,
  type: 'min' | 'max' = 'min'
): string {
  const width = type === 'min' ? 'min-width' : 'max-width';
  return `@media (${width}: ${breakpoints[key]})`;
}

/**
 * Generate a media query for a range of breakpoints
 *
 * @param min - Minimum breakpoint key
 * @param max - Maximum breakpoint key
 * @returns Media query string
 *
 * @example
 * mediaQueryBetween('sm', 'lg')
 * // '@media (min-width: 34rem) and (max-width: 89rem)'
 */
export function mediaQueryBetween(
  min: BreakpointKey,
  max: BreakpointKey
): string {
  return `@media (min-width: ${breakpoints[min]}) and (max-width: ${breakpoints[max]})`;
}

/**
 * Check if the current viewport matches a breakpoint (client-side only)
 *
 * @param key - Breakpoint key
 * @param type - Media query type
 * @returns True if the media query matches
 *
 * @example
 * matchesBreakpoint('md', 'min') // true if viewport >= 880px
 */
export function matchesBreakpoint(
  key: BreakpointKey,
  type: 'min' | 'max' = 'min'
): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const query = mediaQuery(key, type).replace('@media ', '');
  return window.matchMedia(query).matches;
}

/**
 * Get the current active breakpoint (client-side only)
 *
 * @returns The active breakpoint key or null
 *
 * @example
 * getCurrentBreakpoint() // 'md' if viewport is 880px
 */
export function getCurrentBreakpoint(): BreakpointKey | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const width = window.innerWidth;
  const breakpointEntries = Object.entries(breakpointsPx) as [BreakpointKey, number][];

  // Sort by pixel value (ascending)
  const sorted = breakpointEntries.sort((a, b) => a[1] - b[1]);

  // Find the largest breakpoint that the viewport exceeds
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (width >= sorted[i][1]) {
      return sorted[i][0];
    }
  }

  return null;
}

/**
 * Create a responsive value map
 * Useful for responsive design systems
 *
 * @param values - Partial map of breakpoint to value
 * @param defaultValue - Default value if no breakpoint matches
 * @returns Function that returns value for current breakpoint
 *
 * @example
 * const padding = responsiveValue({
 *   xs: '1rem',
 *   md: '2rem',
 *   lg: '3.25rem'
 * }, '0.5rem');
 *
 * padding() // Returns value based on current viewport
 */
export function responsiveValue<T>(
  values: Partial<Record<BreakpointKey, T>>,
  defaultValue: T
): () => T {
  return () => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const current = getCurrentBreakpoint();
    if (!current) {
      return defaultValue;
    }

    return values[current] ?? defaultValue;
  };
}

/**
 * Generate CSS for responsive values
 * Useful for creating responsive stylesheets
 *
 * @param property - CSS property name
 * @param values - Map of breakpoint to value
 * @returns CSS string with media queries
 *
 * @example
 * responsiveCSS('padding', { xs: '1rem', md: '2rem' })
 * // Returns CSS with media queries for each breakpoint
 */
export function responsiveCSS(
  property: string,
  values: Partial<Record<BreakpointKey, string>>
): string {
  const entries = Object.entries(values) as [BreakpointKey, string][];

  return entries
    .map(([key, value]) => {
      const query = mediaQuery(key, 'min');
      return `${query} { ${property}: ${value}; }`;
    })
    .join('\n');
}
