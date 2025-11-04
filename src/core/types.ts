/**
 * Type definitions for the fibo-blocks design system
 */

import { FIBONACCI } from './constants';

/**
 * Valid Fibonacci number indices for spacing scale
 */
export type FibonacciIndex = 0 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89;

/**
 * Font size scale keys
 */
export type FontSizeKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

/**
 * Line height scale keys
 */
export type LineHeightKey = 'none' | 'tight' | 'normal' | 'relaxed' | 'loose';

/**
 * Letter spacing scale keys
 */
export type LetterSpacingKey = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

/**
 * Border width scale keys
 */
export type BorderWidthKey = 0 | 1 | 2 | 3 | 5 | 8;

/**
 * Border radius scale keys
 */
export type BorderRadiusKey = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * Shadow scale keys
 */
export type ShadowKey = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Breakpoint keys
 */
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Container width keys
 */
export type ContainerKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Z-index layer keys
 */
export type ZIndexKey = 'hide' | 'base' | 'dropdown' | 'sticky' | 'fixed' | 'overlay' | 'modal' | 'popover' | 'tooltip';

/**
 * Unit type for CSS values
 */
export type CSSUnit = 'px' | 'rem' | 'em' | '%';

/**
 * Configuration options for the design system
 */
export interface FiboConfig {
  /**
   * Base unit in pixels (typically 16)
   */
  baseUnit: number;

  /**
   * The golden ratio value (typically 1.618...)
   */
  phi: number;

  /**
   * Multiplier for spacing calculations (typically 0.25)
   */
  spacingMultiplier: number;

  /**
   * Precision for decimal places (typically 3)
   */
  precision: number;

  /**
   * Custom scale overrides
   */
  customScales?: {
    spacing?: Partial<Record<FibonacciIndex, string>>;
    fontSize?: Partial<Record<FontSizeKey, string>>;
    lineHeight?: Partial<Record<LineHeightKey, string>>;
  };
}

/**
 * Scale generation result
 */
export interface ScaleResult {
  /**
   * The calculated value
   */
  value: number;

  /**
   * Value as CSS string with unit
   */
  css: string;

  /**
   * Value in pixels (for reference)
   */
  pixels: number;
}

/**
 * Token value with metadata
 */
export interface Token<T = string> {
  /**
   * The token value
   */
  value: T;

  /**
   * Human-readable description
   */
  description?: string;

  /**
   * The mathematical source (e.g., "φ²" or "Fib(8)")
   */
  source?: string;
}

/**
 * Design token collection
 */
export interface TokenCollection<K extends string = string> {
  [key: string]: Token | string;
}
