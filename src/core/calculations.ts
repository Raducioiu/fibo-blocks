/**
 * Mathematical calculation functions for the fibo-blocks design system
 */

import { PHI, BASE_UNIT, SPACING_MULTIPLIER, FIBONACCI } from './constants';
import type { CSSUnit, ScaleResult } from './types';

/**
 * Calculates the nth Fibonacci number using iteration
 * More efficient than recursion for larger values
 *
 * @param n - The index in the Fibonacci sequence
 * @returns The Fibonacci number at index n
 *
 * @example
 * fibonacci(0) // 0
 * fibonacci(5) // 5
 * fibonacci(10) // 55
 */
export function fibonacci(n: number): number {
  if (n < FIBONACCI.length) {
    return FIBONACCI[n];
  }

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

/**
 * Calculates a power of the golden ratio (φ)
 *
 * @param power - The exponent to raise φ to
 * @returns φ raised to the given power
 *
 * @example
 * goldenRatioPower(0) // 1
 * goldenRatioPower(1) // 1.618...
 * goldenRatioPower(2) // 2.618...
 * goldenRatioPower(-1) // 0.618...
 */
export function goldenRatioPower(power: number): number {
  return Math.pow(PHI, power);
}

/**
 * Rounds a number to a specified number of decimal places
 *
 * @param value - The number to round
 * @param precision - Number of decimal places (default: 3)
 * @returns The rounded number
 *
 * @example
 * round(1.618033988, 3) // 1.618
 * round(2.618033988, 2) // 2.62
 */
export function round(value: number, precision: number = 3): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Converts pixels to rem units
 *
 * @param pixels - The pixel value to convert
 * @param baseUnit - The base font size in pixels (default: 16)
 * @returns The value in rem
 *
 * @example
 * pxToRem(16) // 1
 * pxToRem(32) // 2
 * pxToRem(24, 16) // 1.5
 */
export function pxToRem(pixels: number, baseUnit: number = BASE_UNIT): number {
  return pixels / baseUnit;
}

/**
 * Converts rem to pixels
 *
 * @param rem - The rem value to convert
 * @param baseUnit - The base font size in pixels (default: 16)
 * @returns The value in pixels
 *
 * @example
 * remToPx(1) // 16
 * remToPx(2) // 32
 * remToPx(1.5) // 24
 */
export function remToPx(rem: number, baseUnit: number = BASE_UNIT): number {
  return rem * baseUnit;
}

/**
 * Formats a number as a CSS value with the specified unit
 *
 * @param value - The numeric value
 * @param unit - The CSS unit to append
 * @param precision - Number of decimal places (default: 3)
 * @returns The formatted CSS string
 *
 * @example
 * formatCSSValue(1.618, 'rem') // '1.618rem'
 * formatCSSValue(16, 'px') // '16px'
 * formatCSSValue(0, 'rem') // '0'
 */
export function formatCSSValue(
  value: number,
  unit: CSSUnit,
  precision: number = 3
): string {
  if (value === 0) {
    return '0';
  }

  const rounded = round(value, precision);
  return `${rounded}${unit}`;
}

/**
 * Generates a spacing value based on a Fibonacci number
 *
 * @param fibIndex - The Fibonacci number to use
 * @param multiplier - The multiplier to apply (default: SPACING_MULTIPLIER)
 * @param baseUnit - The base unit in pixels (default: BASE_UNIT)
 * @returns Scale result with value, CSS string, and pixel equivalent
 *
 * @example
 * generateSpacingValue(8) // { value: 2, css: '2rem', pixels: 32 }
 * generateSpacingValue(13) // { value: 3.25, css: '3.25rem', pixels: 52 }
 */
export function generateSpacingValue(
  fibIndex: number,
  multiplier: number = SPACING_MULTIPLIER,
  baseUnit: number = BASE_UNIT
): ScaleResult {
  const pixels = fibIndex * (multiplier * baseUnit);
  const value = pxToRem(pixels, baseUnit);
  const css = formatCSSValue(value, 'rem');

  return { value, css, pixels };
}

/**
 * Generates a font size based on a power of the golden ratio
 *
 * @param power - The power of φ to use
 * @param baseUnit - The base font size in pixels (default: BASE_UNIT)
 * @returns Scale result with value, CSS string, and pixel equivalent
 *
 * @example
 * generateFontSize(0) // { value: 1, css: '1rem', pixels: 16 }
 * generateFontSize(1) // { value: 1.618, css: '1.618rem', pixels: ~26 }
 * generateFontSize(-1) // { value: 0.618, css: '0.618rem', pixels: ~10 }
 */
export function generateFontSize(
  power: number,
  baseUnit: number = BASE_UNIT
): ScaleResult {
  const value = goldenRatioPower(power);
  const css = formatCSSValue(value, 'rem');
  const pixels = remToPx(value, baseUnit);

  return { value, css, pixels };
}

/**
 * Generates a line height based on the golden ratio
 *
 * @param ratio - The ratio to use (typically based on φ)
 * @returns The line height value (unitless)
 *
 * @example
 * generateLineHeight(PHI) // 1.618
 * generateLineHeight(PHI / Math.sqrt(PHI)) // ~1.272
 */
export function generateLineHeight(ratio: number): number {
  return round(ratio, 3);
}

/**
 * Calculates the golden ratio division of a value
 *
 * @param total - The total value to divide
 * @param major - Whether to return the major (true) or minor (false) portion
 * @returns The divided value
 *
 * @example
 * divideByGoldenRatio(100, true) // 61.803 (major)
 * divideByGoldenRatio(100, false) // 38.197 (minor)
 */
export function divideByGoldenRatio(total: number, major: boolean = true): number {
  if (major) {
    return total / PHI;
  }
  return total - (total / PHI);
}

/**
 * Generates a modular scale based on a ratio
 *
 * @param steps - Number of steps to generate (both positive and negative)
 * @param ratio - The ratio to use (default: PHI)
 * @param base - The base value (default: 1)
 * @returns Array of scale values
 *
 * @example
 * generateModularScale(3, PHI, 1)
 * // [0.236, 0.382, 0.618, 1, 1.618, 2.618, 4.236]
 */
export function generateModularScale(
  steps: number,
  ratio: number = PHI,
  base: number = 1
): number[] {
  const scale: number[] = [];

  // Generate negative powers
  for (let i = -steps; i < 0; i++) {
    scale.push(round(base * Math.pow(ratio, i)));
  }

  // Add base
  scale.push(base);

  // Generate positive powers
  for (let i = 1; i <= steps; i++) {
    scale.push(round(base * Math.pow(ratio, i)));
  }

  return scale;
}

/**
 * Finds the nearest value in the Fibonacci sequence
 *
 * @param target - The target value to match
 * @returns The nearest Fibonacci number
 *
 * @example
 * nearestFibonacci(10) // 8
 * nearestFibonacci(20) // 21
 * nearestFibonacci(50) // 55
 */
export function nearestFibonacci(target: number): number {
  let closest = FIBONACCI[0];
  let minDiff = Math.abs(target - closest);

  for (const fib of FIBONACCI) {
    const diff = Math.abs(target - fib);
    if (diff < minDiff) {
      minDiff = diff;
      closest = fib;
    }
  }

  return closest;
}

/**
 * Calculates whether a number approximates the golden ratio
 *
 * @param numerator - The larger number
 * @param denominator - The smaller number
 * @param tolerance - Acceptable difference (default: 0.01)
 * @returns True if the ratio approximates φ
 *
 * @example
 * isGoldenRatio(21, 13) // true (21/13 ≈ 1.615)
 * isGoldenRatio(8, 5) // true (8/5 = 1.6)
 * isGoldenRatio(10, 5) // false (10/5 = 2)
 */
export function isGoldenRatio(
  numerator: number,
  denominator: number,
  tolerance: number = 0.01
): boolean {
  const ratio = numerator / denominator;
  return Math.abs(ratio - PHI) < tolerance;
}
