/**
 * Border system based on Fibonacci numbers and golden ratio
 */

import type { BorderWidthKey, BorderRadiusKey } from '../core/types';

/**
 * Border width scale using Fibonacci numbers
 * Direct pixel values for precision
 */
export const borderWidth: Record<BorderWidthKey, string> = {
  0: '0',      // No border
  1: '1px',    // Hairline (Fib: 1)
  2: '2px',    // Thin (Fib: 2)
  3: '3px',    // Medium (Fib: 3)
  5: '5px',    // Thick (Fib: 5)
  8: '8px',    // Extra thick (Fib: 8)
} as const;

/**
 * Border radius scale using golden ratio progression
 */
export const borderRadius: Record<BorderRadiusKey, string> = {
  none: '0',           // Sharp corners
  sm: '0.125rem',      // 2px - Subtle rounding
  base: '0.25rem',     // 4px - Base rounding
  md: '0.5rem',        // 8px - Medium rounding
  lg: '0.809rem',      // ~13px - Large rounding (base / φ)
  xl: '1.309rem',      // ~21px - Extra large (Fib: 21)
  '2xl': '2.118rem',   // ~34px - Very large (Fib: 34)
  full: '9999px',      // Fully rounded (pills, circles)
} as const;

/**
 * Border style presets
 */
export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  none: 'none',
} as const;

/**
 * Common border combinations
 */
export const borderPresets = {
  /**
   * Dividers and separators
   */
  divider: {
    width: borderWidth[1],
    style: borderStyle.solid,
  },

  /**
   * Card borders
   */
  card: {
    width: borderWidth[1],
    radius: borderRadius.lg,
  },

  /**
   * Button borders
   */
  button: {
    sm: {
      width: borderWidth[1],
      radius: borderRadius.base,
    },
    md: {
      width: borderWidth[2],
      radius: borderRadius.md,
    },
    lg: {
      width: borderWidth[2],
      radius: borderRadius.lg,
    },
  },

  /**
   * Input borders
   */
  input: {
    width: borderWidth[1],
    radius: borderRadius.md,
  },

  /**
   * Focus rings
   */
  focus: {
    width: borderWidth[2],
    offset: '2px',
  },
} as const;
