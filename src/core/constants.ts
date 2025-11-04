/**
 * Core mathematical constants for the fibo-blocks design system
 */

/**
 * The golden ratio (φ, phi)
 * φ = (1 + √5) / 2 ≈ 1.618033988749895
 *
 * This is the ratio between consecutive Fibonacci numbers as they approach infinity.
 * It appears throughout nature, art, and architecture.
 */
export const PHI = 1.618033988749895;

/**
 * The reciprocal of the golden ratio (1/φ)
 * 1/φ ≈ 0.618033988749895
 *
 * This is also equal to φ - 1, creating a unique mathematical property.
 * Used for the "minor" portion in golden ratio divisions.
 */
export const PHI_INVERSE = 1 / PHI;

/**
 * The square of the golden ratio (φ²)
 * φ² = φ + 1 ≈ 2.618033988749895
 *
 * Another unique property: φ² = φ + 1
 */
export const PHI_SQUARED = PHI * PHI;

/**
 * Pre-calculated Fibonacci sequence up to a reasonable limit
 * F(n) = F(n-1) + F(n-2), where F(0) = 0, F(1) = 1
 */
export const FIBONACCI = [
  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
] as const;

/**
 * Base unit for the design system in pixels
 * This is the standard browser default font size
 */
export const BASE_UNIT = 16;

/**
 * Multiplier for spacing calculations
 * Used to convert Fibonacci numbers to practical pixel values
 */
export const SPACING_MULTIPLIER = 0.25;

/**
 * Powers of φ for typography scale generation
 * Each power represents a step in the type scale
 */
export const PHI_POWERS = {
  '-3': Math.pow(PHI, -3), // ~0.236
  '-2': Math.pow(PHI, -2), // ~0.382
  '-1': Math.pow(PHI, -1), // ~0.618
  '0': Math.pow(PHI, 0),   // 1.000
  '1': Math.pow(PHI, 1),   // ~1.618
  '2': Math.pow(PHI, 2),   // ~2.618
  '3': Math.pow(PHI, 3),   // ~4.236
  '4': Math.pow(PHI, 4),   // ~6.854
  '5': Math.pow(PHI, 5),   // ~11.090
  '6': Math.pow(PHI, 6),   // ~17.944
} as const;

/**
 * Golden ratio as a percentage for layout divisions
 */
export const GOLDEN_RATIO_PERCENT = {
  major: 61.8,  // φ / (1 + φ) ≈ 61.8%
  minor: 38.2,  // 1 / (1 + φ) ≈ 38.2%
} as const;
