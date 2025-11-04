/**
 * Utility functions for working with spacing
 */

import { spacing, spacingPx, type SpacingKey } from '../tokens/spacing';

/**
 * Get a spacing value by key
 *
 * @param key - The spacing scale key
 * @returns The spacing value in rem
 *
 * @example
 * getSpacing(8) // '2rem'
 * getSpacing(13) // '3.25rem'
 */
export function getSpacing(key: SpacingKey): string {
  return spacing[key];
}

/**
 * Get a spacing value in pixels
 *
 * @param key - The spacing scale key
 * @returns The spacing value in pixels
 *
 * @example
 * getSpacingPx(8) // 32
 * getSpacingPx(13) // 52
 */
export function getSpacingPx(key: SpacingKey): number {
  return spacingPx[key];
}

/**
 * Compose multiple spacing values
 * Useful for shorthand properties like margin/padding
 *
 * @param keys - Array of spacing keys (1-4 values)
 * @returns CSS-compatible spacing string
 *
 * @example
 * composeSpacing([8, 5]) // '2rem 1.25rem'
 * composeSpacing([3, 5, 8, 5]) // '0.75rem 1.25rem 2rem 1.25rem'
 */
export function composeSpacing(...keys: SpacingKey[]): string {
  return keys.map(key => spacing[key]).join(' ');
}

/**
 * Get CSS custom property for spacing
 *
 * @param key - The spacing scale key
 * @returns CSS var() function string
 *
 * @example
 * getSpacingVar(8) // 'var(--fibo-spacing-8)'
 */
export function getSpacingVar(key: SpacingKey): string {
  return `var(--fibo-spacing-${key})`;
}

/**
 * Create an inline style object with spacing
 *
 * @param property - CSS property name
 * @param key - The spacing scale key
 * @returns Style object
 *
 * @example
 * spacingStyle('margin', 8) // { margin: '2rem' }
 * spacingStyle('paddingTop', 5) // { paddingTop: '1.25rem' }
 */
export function spacingStyle(
  property: string,
  key: SpacingKey
): Record<string, string> {
  return { [property]: spacing[key] };
}

/**
 * Create spacing styles for all directions
 *
 * @param property - Base property name ('margin' or 'padding')
 * @param values - Spacing keys (1-4 values, like CSS shorthand)
 * @returns Style object
 *
 * @example
 * spacingBox('padding', [8]) // { padding: '2rem' }
 * spacingBox('margin', [8, 5]) // { marginTop: '2rem', marginRight: '1.25rem', ... }
 */
export function spacingBox(
  property: 'margin' | 'padding',
  values: SpacingKey[]
): Record<string, string> {
  const [top, right = top, bottom = top, left = right] = values;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const prop = capitalize(property);

  return {
    [`${property}Top`]: spacing[top],
    [`${property}Right`]: spacing[right],
    [`${property}Bottom`]: spacing[bottom],
    [`${property}Left`]: spacing[left],
  };
}
