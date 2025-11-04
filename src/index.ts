/**
 * fibo-blocks - A UX framework based on the golden ratio and Fibonacci sequence
 *
 * @module fibo-blocks
 *
 * This is the main entry point for the fibo-blocks design system.
 * Import tokens, utilities, and constants from this file.
 *
 * @example
 * ```typescript
 * import { spacing, fontSize, getSpacing, PHI } from 'fibo-blocks';
 *
 * // Use tokens directly
 * const padding = spacing[8]; // '2rem'
 *
 * // Use utility functions
 * const margin = getSpacing(13); // '3.25rem'
 *
 * // Use constants for calculations
 * const goldenWidth = 1000 / PHI; // ~618px
 * ```
 */

// Export all core functionality
export * from './core';

// Export all design tokens
export * from './tokens';

// Export all utility functions
export * from './utils';

/**
 * The golden ratio constant
 * φ ≈ 1.618033988749895
 */
export { PHI, PHI_INVERSE, PHI_SQUARED, FIBONACCI, BASE_UNIT } from './core/constants';

/**
 * Main configuration and initialization
 */
export { tokens } from './tokens';

/**
 * Version information
 */
export const VERSION = '0.1.0';

/**
 * Framework name
 */
export const FRAMEWORK_NAME = 'fibo-blocks';

/**
 * Quick reference object for common use cases
 */
export const fibo = {
  // Most commonly used spacing values
  spacing: {
    none: '0',
    xs: '0.25rem',      // 1
    sm: '0.5rem',       // 2
    md: '1.25rem',      // 5
    lg: '2rem',         // 8
    xl: '3.25rem',      // 13
  },

  // Most commonly used font sizes
  text: {
    xs: '0.618rem',
    sm: '0.809rem',
    base: '1rem',
    lg: '1.618rem',
    xl: '2.618rem',
  },

  // Common values
  phi: 1.618,
  golden: {
    major: '61.8%',
    minor: '38.2%',
  },
} as const;

/**
 * Type exports for convenience
 */
export type {
  FibonacciIndex,
  FontSizeKey,
  LineHeightKey,
  LetterSpacingKey,
  BorderWidthKey,
  BorderRadiusKey,
  ShadowKey,
  BreakpointKey,
  ContainerKey,
  ZIndexKey,
  CSSUnit,
  FiboConfig,
  ScaleResult,
  Token,
  TokenCollection,
} from './core/types';
