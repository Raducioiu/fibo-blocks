/**
 * Dimension scales for widths, heights, and containers
 * Based on Fibonacci sequence and golden ratio
 */

import type { ContainerKey, BreakpointKey } from '../core/types';

/**
 * Container max-widths using Fibonacci numbers
 * These define the maximum width of content containers at different sizes
 */
export const container: Record<ContainerKey, string> = {
  xs: '21rem',      // 336px  (Fib: 21 × 16)
  sm: '34rem',      // 544px  (Fib: 34 × 16)
  md: '55rem',      // 880px  (Fib: 55 × 16)
  lg: '89rem',      // 1424px (Fib: 89 × 16)
  xl: '144rem',     // 2304px (Fib: 144 × 16)
} as const;

/**
 * Breakpoints for responsive design
 * Aligned with container sizes for consistency
 */
export const breakpoints: Record<BreakpointKey, string> = {
  xs: '21rem',      // 336px  - Mobile landscape
  sm: '34rem',      // 544px  - Tablet portrait
  md: '55rem',      // 880px  - Tablet landscape
  lg: '89rem',      // 1424px - Desktop
  xl: '144rem',     // 2304px - Large desktop
} as const;

/**
 * Breakpoints in pixels for JavaScript usage
 */
export const breakpointsPx: Record<BreakpointKey, number> = {
  xs: 336,
  sm: 544,
  md: 880,
  lg: 1424,
  xl: 2304,
} as const;

/**
 * Golden ratio divisions for layout
 * Useful for sidebars, asymmetric grids, etc.
 */
export const goldenDivision = {
  /**
   * Major portion (larger section)
   * ~61.8% of the total
   */
  major: '61.8%',
  majorFr: '1.618fr',    // For CSS Grid
  majorRatio: 0.618,     // For calculations

  /**
   * Minor portion (smaller section)
   * ~38.2% of the total
   */
  minor: '38.2%',
  minorFr: '1fr',        // For CSS Grid
  minorRatio: 0.382,     // For calculations
} as const;

/**
 * Aspect ratios based on golden ratio
 */
export const aspectRatio = {
  /**
   * Golden ratio (landscape)
   * 1.618:1 - Classic golden rectangle
   */
  golden: '1.618 / 1',
  goldenDecimal: 1.618,

  /**
   * Inverse golden ratio (portrait)
   * 1:1.618
   */
  goldenPortrait: '1 / 1.618',
  goldenPortraitDecimal: 0.618,

  /**
   * Standard ratios for reference
   */
  square: '1 / 1',
  video: '16 / 9',
  wide: '21 / 9',     // Fibonacci ratio
  portrait: '3 / 5',  // Fibonacci ratio
} as const;

/**
 * Fixed dimension scales using Fibonacci
 * For components that need specific sizes
 */
export const fixedSize = {
  0: '0',
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  5: '1.25rem',     // 20px
  8: '2rem',        // 32px
  13: '3.25rem',    // 52px
  21: '5.25rem',    // 84px
  34: '8.5rem',     // 136px
  55: '13.75rem',   // 220px
  89: '22.25rem',   // 356px
  144: '36rem',     // 576px
  233: '58.25rem',  // 932px
} as const;

/**
 * Icon sizes using Fibonacci progression
 */
export const iconSize = {
  xs: '0.75rem',    // 12px - Small inline icons
  sm: '1rem',       // 16px - Default inline
  base: '1.313rem', // 21px - Fibonacci base (Fib: 21)
  lg: '2.125rem',   // 34px - Large icons (Fib: 34)
  xl: '3.438rem',   // 55px - Extra large (Fib: 55)
  '2xl': '5.563rem',// 89px - Huge icons (Fib: 89)
} as const;

/**
 * Avatar/Profile picture sizes
 */
export const avatarSize = {
  xs: '1.313rem',   // 21px (Fib: 21)
  sm: '2.125rem',   // 34px (Fib: 34)
  base: '3.438rem', // 55px (Fib: 55)
  lg: '5.563rem',   // 89px (Fib: 89)
  xl: '9rem',       // 144px (Fib: 144)
} as const;

/**
 * Common layout presets
 */
export const layoutPresets = {
  /**
   * Sidebar layouts using golden ratio
   */
  sidebar: {
    /**
     * Sidebar on left/right, content takes major portion
     */
    contentFocused: {
      sidebar: goldenDivision.minor,
      content: goldenDivision.major,
    },
    /**
     * Balanced sidebar (closer to 1:1 but harmonious)
     */
    balanced: {
      sidebar: '38.2%',
      content: '61.8%',
    },
  },

  /**
   * Grid column counts based on Fibonacci
   */
  gridColumns: {
    fibonacci: [1, 2, 3, 5, 8, 13],
    recommended: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      wide: 5,    // Fibonacci
    },
  },

  /**
   * Maximum content widths for readability
   */
  prose: {
    narrow: '34rem',  // 544px - Focused reading
    base: '55rem',    // 880px - Standard articles
    wide: '89rem',    // 1424px - Wide content
  },
} as const;
