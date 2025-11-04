/**
 * Utility functions for working with typography
 */

import {
  fontSize,
  fontSizePx,
  lineHeight,
  letterSpacing,
  fontWeight,
  type FontSizeKeys,
  type LineHeightKeys,
  type LetterSpacingKeys,
} from '../tokens/typography';

/**
 * Get a font size value
 *
 * @param key - Font size key
 * @returns Font size in rem
 */
export function getFontSize(key: FontSizeKeys): string {
  return fontSize[key];
}

/**
 * Get a font size in pixels
 *
 * @param key - Font size key
 * @returns Font size in pixels
 */
export function getFontSizePx(key: FontSizeKeys): number {
  return fontSizePx[key];
}

/**
 * Get a line height value
 *
 * @param key - Line height key
 * @returns Line height (unitless)
 */
export function getLineHeight(key: LineHeightKeys): string {
  return lineHeight[key];
}

/**
 * Get a letter spacing value
 *
 * @param key - Letter spacing key
 * @returns Letter spacing in em
 */
export function getLetterSpacing(key: LetterSpacingKeys): string {
  return letterSpacing[key];
}

/**
 * Create a complete typography style object
 *
 * @param size - Font size key
 * @param height - Line height key (optional)
 * @param spacing - Letter spacing key (optional)
 * @param weight - Font weight (optional)
 * @returns Style object
 *
 * @example
 * typographyStyle('lg', 'tight', 'normal', '600')
 * // { fontSize: '1.618rem', lineHeight: '1.272', letterSpacing: '0', fontWeight: '600' }
 */
export function typographyStyle(
  size: FontSizeKeys,
  height?: LineHeightKeys,
  spacing?: LetterSpacingKeys,
  weight?: keyof typeof fontWeight
): Record<string, string> {
  const style: Record<string, string> = {
    fontSize: fontSize[size],
  };

  if (height) {
    style.lineHeight = lineHeight[height];
  }

  if (spacing) {
    style.letterSpacing = letterSpacing[spacing];
  }

  if (weight) {
    style.fontWeight = fontWeight[weight];
  }

  return style;
}

/**
 * Get CSS custom property for font size
 *
 * @param key - Font size key
 * @returns CSS var() function string
 */
export function getFontSizeVar(key: FontSizeKeys): string {
  return `var(--fibo-font-size-${key})`;
}

/**
 * Calculate ideal line height for a given font size
 * Uses golden ratio as the base
 *
 * @param fontSizeRem - Font size in rem
 * @returns Calculated line height
 */
export function calculateLineHeight(fontSizeRem: number): number {
  // For smaller text, use slightly larger line height
  if (fontSizeRem < 1) {
    return 1.618 * 1.2; // ~1.94
  }
  // For larger text, use tighter line height
  if (fontSizeRem > 2) {
    return 1.272;
  }
  // For body text, use golden ratio
  return 1.618;
}

/**
 * Get optimal line length in characters for a given font size
 *
 * @param fontSizeKey - Font size key
 * @returns Recommended max characters per line
 */
export function getOptimalLineLength(fontSizeKey: FontSizeKeys): number {
  const size = fontSizePx[fontSizeKey];

  // Smaller text can fit more characters comfortably
  if (size < 14) return 80;
  // Body text ideal
  if (size <= 18) return 66;
  // Larger text needs fewer characters
  if (size <= 24) return 55;
  // Display text
  return 34; // Fibonacci number
}
