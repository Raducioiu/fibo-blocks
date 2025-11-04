/**
 * Shadow (elevation) system based on Fibonacci numbers
 *
 * Shadows create depth and hierarchy in UI. Each level uses
 * Fibonacci numbers for offset and blur values, creating
 * a natural progression of elevation.
 */

import type { ShadowKey, ZIndexKey } from '../core/types';

/**
 * Box shadow scale using Fibonacci for offset and blur
 * Format: offsetY offsetX blur spread color
 */
export const boxShadow: Record<ShadowKey, string> = {
  none: 'none',

  // Subtle elevation - slight hover states
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',  // Fib: 1, 2

  // Base elevation - cards, buttons
  base: '0 2px 3px 0 rgba(0, 0, 0, 0.08)', // Fib: 2, 3

  // Medium elevation - dropdowns, popovers
  md: '0 3px 5px 0 rgba(0, 0, 0, 0.1)',   // Fib: 3, 5

  // Large elevation - modals, dialogs
  lg: '0 5px 8px 0 rgba(0, 0, 0, 0.12)',  // Fib: 5, 8

  // Extra large elevation - drawers, sheets
  xl: '0 8px 13px 0 rgba(0, 0, 0, 0.15)', // Fib: 8, 13

  // Huge elevation - overlays
  '2xl': '0 13px 21px 0 rgba(0, 0, 0, 0.18)', // Fib: 13, 21
} as const;

/**
 * Inner shadows for inset effects
 */
export const boxShadowInner: Record<ShadowKey, string> = {
  none: 'none',
  sm: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: 'inset 0 2px 3px 0 rgba(0, 0, 0, 0.08)',
  md: 'inset 0 3px 5px 0 rgba(0, 0, 0, 0.1)',
  lg: 'inset 0 5px 8px 0 rgba(0, 0, 0, 0.12)',
  xl: 'inset 0 8px 13px 0 rgba(0, 0, 0, 0.15)',
  '2xl': 'inset 0 13px 21px 0 rgba(0, 0, 0, 0.18)',
} as const;

/**
 * Colored shadows for brand/accent effects
 */
export const shadowPresets = {
  /**
   * Focus ring shadow (accessibility)
   */
  focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',  // Fib: 3

  /**
   * Error state shadow
   */
  error: '0 0 0 3px rgba(245, 101, 101, 0.5)',

  /**
   * Success state shadow
   */
  success: '0 0 0 3px rgba(72, 187, 120, 0.5)',

  /**
   * Warning state shadow
   */
  warning: '0 0 0 3px rgba(237, 137, 54, 0.5)',

  /**
   * Glow effect using golden ratio opacity
   */
  glow: {
    sm: '0 0 8px rgba(66, 153, 225, 0.382)',   // Minor golden ratio
    md: '0 0 13px rgba(66, 153, 225, 0.618)',  // Major golden ratio
    lg: '0 0 21px rgba(66, 153, 225, 0.382)',  // Fib: 21
  },
} as const;

/**
 * Drop shadow for SVG/images
 * Lighter values for better visual weight
 */
export const dropShadow: Record<ShadowKey, string> = {
  none: 'none',
  sm: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))',
  base: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
  md: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1))',
  lg: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.15))',
  xl: 'drop-shadow(0 5px 8px rgba(0, 0, 0, 0.2))',
  '2xl': 'drop-shadow(0 8px 13px rgba(0, 0, 0, 0.25))',
} as const;

/**
 * Z-index layers using Fibonacci progression
 * Higher numbers for elements that should appear "above" others
 */
export const zIndex: Record<ZIndexKey, number> = {
  hide: -1,        // Hidden behind everything
  base: 0,         // Default layer
  dropdown: 1000,  // Dropdown menus
  sticky: 1100,    // Sticky headers/footers
  fixed: 1200,     // Fixed positioning
  overlay: 1300,   // Backdrop overlays
  modal: 2100,     // Modal dialogs (Fib gap: +800)
  popover: 3400,   // Popovers, tooltips (Fib gap: +1300)
  tooltip: 5500,   // Tooltips (highest, Fib gap: +2100)
} as const;

/**
 * Elevation presets combining shadow and z-index
 */
export const elevation = {
  /**
   * Flat - no elevation
   */
  flat: {
    shadow: boxShadow.none,
    zIndex: zIndex.base,
  },

  /**
   * Raised - slight elevation (buttons, cards)
   */
  raised: {
    shadow: boxShadow.sm,
    zIndex: zIndex.base,
  },

  /**
   * Floating - medium elevation (dropdowns)
   */
  floating: {
    shadow: boxShadow.md,
    zIndex: zIndex.dropdown,
  },

  /**
   * Overlay - high elevation (modals)
   */
  overlay: {
    shadow: boxShadow.xl,
    zIndex: zIndex.modal,
  },

  /**
   * Tooltip - highest elevation
   */
  tooltip: {
    shadow: boxShadow.base,
    zIndex: zIndex.tooltip,
  },
} as const;

/**
 * Text shadows for display typography
 */
export const textShadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
  base: '0 2px 3px rgba(0, 0, 0, 0.15)',
  lg: '0 3px 5px rgba(0, 0, 0, 0.2)',
} as const;
