/**
 * Main export for all design tokens
 */

// Spacing
export {
  spacing,
  spacingPx,
  spacingPresets,
  negativeSpacing,
  type SpacingKey,
} from './spacing';

// Typography
export {
  fontSize,
  fontSizePx,
  lineHeight,
  letterSpacing,
  fontWeight,
  typographyPresets,
  responsiveScale,
  maxLineLength,
  type FontSizeKeys,
  type LineHeightKeys,
  type LetterSpacingKeys,
} from './typography';

// Borders
export {
  borderWidth,
  borderRadius,
  borderStyle,
  borderPresets,
} from './borders';

// Dimensions
export {
  container,
  breakpoints,
  breakpointsPx,
  goldenDivision,
  aspectRatio,
  fixedSize,
  iconSize,
  avatarSize,
  layoutPresets,
} from './dimensions';

// Shadows
export {
  boxShadow,
  boxShadowInner,
  shadowPresets,
  dropShadow,
  zIndex,
  elevation,
  textShadow,
} from './shadows';

/**
 * All tokens combined for easy access
 */
export const tokens = {
  spacing,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight,
  borderWidth,
  borderRadius,
  container,
  breakpoints,
  boxShadow,
  zIndex,
} as const;

/**
 * Token categories for programmatic access
 */
export const tokenCategories = {
  spacing: 'spacing',
  typography: 'typography',
  borders: 'borders',
  dimensions: 'dimensions',
  shadows: 'shadows',
} as const;
