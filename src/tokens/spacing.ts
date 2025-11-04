/**
 * Spacing scale based on the Fibonacci sequence
 *
 * Each spacing value is derived from a Fibonacci number multiplied by 4px.
 * This creates a natural, harmonious progression that feels balanced.
 *
 * Usage:
 * - Use smaller values (0-5) for tight spacing within components
 * - Use medium values (8-21) for component padding and margins
 * - Use larger values (34-89) for layout spacing and sections
 */

import type { FibonacciIndex } from '../core/types';

/**
 * Spacing scale in rem units
 * Base: 16px, Multiplier: 0.25 (4px per unit)
 */
export const spacing: Record<FibonacciIndex, string> = {
  0: '0',          // 0px   - No spacing
  1: '0.25rem',    // 4px   - Minimal spacing (borders, tight gaps)
  2: '0.5rem',     // 8px   - Very tight spacing (icon gaps, compact UIs)
  3: '0.75rem',    // 12px  - Tight spacing (button padding, small gaps)
  5: '1.25rem',    // 20px  - Base spacing (standard padding)
  8: '2rem',       // 32px  - Comfortable spacing (card padding, section gaps)
  13: '3.25rem',   // 52px  - Generous spacing (between sections)
  21: '5.25rem',   // 84px  - Large spacing (major sections)
  34: '8.5rem',    // 136px - Very large spacing (page sections)
  55: '13.75rem',  // 220px - Huge spacing (hero sections)
  89: '22.25rem',  // 356px - Massive spacing (full page layouts)
} as const;

/**
 * Type-safe spacing keys
 */
export type SpacingKey = keyof typeof spacing;

/**
 * Spacing scale in pixels (for reference and calculations)
 */
export const spacingPx: Record<FibonacciIndex, number> = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  5: 20,
  8: 32,
  13: 52,
  21: 84,
  34: 136,
  55: 220,
  89: 356,
} as const;

/**
 * Common spacing compositions for typical use cases
 */
export const spacingPresets = {
  /**
   * Vertical rhythm for text content
   * Based on Fibonacci progression for natural reading flow
   */
  textFlow: {
    paragraph: spacing[5],      // 20px between paragraphs
    heading: spacing[8],        // 32px before headings
    section: spacing[13],       // 52px between sections
  },

  /**
   * Button padding presets
   */
  button: {
    sm: { y: spacing[2], x: spacing[3] },  // 8px 12px
    md: { y: spacing[3], x: spacing[5] },  // 12px 20px
    lg: { y: spacing[5], x: spacing[8] },  // 20px 32px
  },

  /**
   * Card spacing presets
   */
  card: {
    compact: spacing[3],   // 12px - Tight cards
    default: spacing[5],   // 20px - Standard cards
    spacious: spacing[8],  // 32px - Generous cards
  },

  /**
   * Container padding presets
   */
  container: {
    mobile: spacing[5],    // 20px
    tablet: spacing[8],    // 32px
    desktop: spacing[13],  // 52px
  },

  /**
   * Grid gap presets
   */
  grid: {
    tight: spacing[2],      // 8px
    normal: spacing[5],     // 20px
    loose: spacing[8],      // 32px
    spacious: spacing[13],  // 52px
  },
} as const;

/**
 * Negative spacing values for margin offsets
 * Useful for pulling elements closer or overlapping layouts
 */
export const negativeSpacing: Record<FibonacciIndex, string> = {
  0: '0',
  1: '-0.25rem',
  2: '-0.5rem',
  3: '-0.75rem',
  5: '-1.25rem',
  8: '-2rem',
  13: '-3.25rem',
  21: '-5.25rem',
  34: '-8.5rem',
  55: '-13.75rem',
  89: '-22.25rem',
} as const;
