# Fibo-Blocks Sizing Framework - Implementation Plan

## Overview

This document outlines the comprehensive plan for implementing a sizing framework based on the golden ratio (φ ≈ 1.618) and Fibonacci sequence principles.

## 1. Mathematical Foundation

### Core Constants

```javascript
const PHI = 1.618033988749895; // Golden ratio
const FIBONACCI = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
```

### Base Unit System

We need to establish a base unit from which all sizes derive:

```javascript
const BASE_UNIT = 16; // pixels (standard browser default)
```

### Scale Generation Methods

1. **Fibonacci Scale**: Use Fibonacci numbers directly
2. **Golden Ratio Scale**: Multiply/divide by φ progressively
3. **Hybrid Scale**: Fibonacci for discrete values, φ for continuous scaling

---

## 2. Sizing Aspects to Handle

### 2.1 Spacing System (Priority: HIGH)

**Purpose**: Consistent spacing for layouts (margins, padding, gaps)

**Fibonacci-Based Spacing Scale**:
```javascript
// Using Fibonacci sequence
spacing = {
  0: '0',           // 0px
  1: '0.25rem',     // 4px  (1 * 4)
  2: '0.5rem',      // 8px  (2 * 4)
  3: '0.75rem',     // 12px (3 * 4)
  4: '1rem',        // 16px (base)
  5: '1.25rem',     // 20px (5 * 4)
  6: '2rem',        // 32px (8 * 4)
  7: '3.25rem',     // 52px (13 * 4)
  8: '5.25rem',     // 84px (21 * 4)
  9: '8.5rem',      // 136px (34 * 4)
}
```

**Implementation Needs**:
- Design tokens for each spacing value
- Utility classes (`.m-{scale}`, `.p-{scale}`, `.gap-{scale}`)
- CSS custom properties (`--spacing-{scale}`)
- JavaScript/TypeScript functions for dynamic calculation

---

### 2.2 Typography System (Priority: HIGH)

#### Font Sizes

**Golden Ratio Typography Scale**:
```javascript
// Base font size: 16px (1rem)
// Scale using φ
fontSize = {
  'xs':   '0.618rem',   // 9.888px  (base / φ²)
  'sm':   '0.809rem',   // 12.944px (base / φ)
  'base': '1rem',       // 16px
  'lg':   '1.618rem',   // 25.888px (base * φ)
  'xl':   '2.618rem',   // 41.888px (base * φ²)
  '2xl':  '4.236rem',   // 67.776px (base * φ³)
  '3xl':  '6.854rem',   // 109.664px (base * φ⁴)
  '4xl':  '11.089rem',  // 177.424px (base * φ⁵)
}
```

#### Line Heights

**Golden Ratio Line Heights**:
```javascript
// Line height should follow golden ratio proportions
lineHeight = {
  'none': '1',
  'tight': '1.236',    // φ / √φ ≈ 1.236
  'normal': '1.618',   // φ
  'relaxed': '2.058',  // φ + (1/φ) ≈ 2.058
  'loose': '2.618',    // φ²
}
```

#### Letter Spacing

**Subtle Fibonacci-Based Tracking**:
```javascript
letterSpacing = {
  'tighter': '-0.05em',
  'tight': '-0.025em',
  'normal': '0',
  'wide': '0.025em',
  'wider': '0.05em',
  'widest': '0.08em',  // Fibonacci-inspired (8)
}
```

**Implementation Needs**:
- Typography scale tokens
- Font size utilities (`.text-{size}`)
- Line height utilities (`.leading-{scale}`)
- Letter spacing utilities (`.tracking-{scale}`)
- Responsive typography with modular scale

---

### 2.3 Component Dimensions (Priority: MEDIUM)

#### Width/Height Scales

**Percentage-Based Golden Ratio Divisions**:
```javascript
// For layout divisions
dimensions = {
  // Golden ratio divisions
  'minor': '38.2%',    // 1 / φ ≈ 0.382
  'major': '61.8%',    // 1 / φ² ≈ 0.618
  'full': '100%',

  // Fibonacci-based fixed sizes
  'xs': '13rem',       // 208px
  'sm': '21rem',       // 336px
  'md': '34rem',       // 544px
  'lg': '55rem',       // 880px
  'xl': '89rem',       // 1424px
}
```

#### Container Widths

**Fibonacci-Based Container System**:
```javascript
container = {
  'xs': '21rem',      // 336px  (Fib: 21)
  'sm': '34rem',      // 544px  (Fib: 34)
  'md': '55rem',      // 880px  (Fib: 55)
  'lg': '89rem',      // 1424px (Fib: 89)
  'xl': '144rem',     // 2304px (Fib: 144)
}
```

**Implementation Needs**:
- Width/height utilities
- Max-width/height utilities
- Container component with golden ratio presets
- Aspect ratio utilities based on φ

---

### 2.4 Border System (Priority: MEDIUM)

#### Border Widths

**Fibonacci Border Scale**:
```javascript
borderWidth = {
  0: '0',
  1: '1px',     // Fib: 1
  2: '2px',     // Fib: 2
  3: '3px',     // Fib: 3
  5: '5px',     // Fib: 5
  8: '8px',     // Fib: 8
}
```

#### Border Radius

**Golden Ratio Curve Scale**:
```javascript
borderRadius = {
  'none': '0',
  'sm': '0.125rem',   // 2px
  'base': '0.25rem',  // 4px (base / φ⁴)
  'md': '0.5rem',     // 8px (base / φ²)
  'lg': '0.809rem',   // 12.944px (base / φ)
  'xl': '1.309rem',   // 20.944px (base * φ / 2)
  '2xl': '2.118rem',  // 33.888px (base * φ²)
  'full': '9999px',
}
```

**Implementation Needs**:
- Border width utilities
- Border radius utilities
- Combined border presets

---

### 2.5 Shadow System (Priority: LOW)

**Elevation Scale Using Fibonacci**:
```javascript
boxShadow = {
  'none': 'none',
  'sm': '0 1px 2px rgba(0,0,0,0.05)',      // Fib: 1, 2
  'base': '0 2px 3px rgba(0,0,0,0.08)',    // Fib: 2, 3
  'md': '0 3px 5px rgba(0,0,0,0.1)',       // Fib: 3, 5
  'lg': '0 5px 8px rgba(0,0,0,0.12)',      // Fib: 5, 8
  'xl': '0 8px 13px rgba(0,0,0,0.15)',     // Fib: 8, 13
  '2xl': '0 13px 21px rgba(0,0,0,0.18)',   // Fib: 13, 21
}
```

**Implementation Needs**:
- Shadow utilities
- Elevation presets

---

### 2.6 Icon Sizes (Priority: MEDIUM)

**Fibonacci Icon Scale**:
```javascript
iconSize = {
  'xs': '0.75rem',    // 12px (close to Fib: 13)
  'sm': '1rem',       // 16px (base)
  'base': '1.313rem', // 21px (Fib: 21)
  'lg': '2.125rem',   // 34px (Fib: 34)
  'xl': '3.438rem',   // 55px (Fib: 55)
}
```

**Implementation Needs**:
- Icon size utilities
- Icon component with size presets

---

### 2.7 Responsive Breakpoints (Priority: HIGH)

**Fibonacci-Based Breakpoints**:
```javascript
breakpoints = {
  'xs': '21rem',      // 336px  (Fib: 21 * 16)
  'sm': '34rem',      // 544px  (Fib: 34 * 16)
  'md': '55rem',      // 880px  (Fib: 55 * 16)
  'lg': '89rem',      // 1424px (Fib: 89 * 16)
  'xl': '144rem',     // 2304px (Fib: 144 * 16)
}
```

**Implementation Needs**:
- Media query system
- Responsive utility variants
- Container queries support

---

### 2.8 Z-Index Layers (Priority: LOW)

**Fibonacci Stacking Context**:
```javascript
zIndex = {
  'hide': -1,
  'base': 0,
  'dropdown': 1000,   // Base layer
  'sticky': 1100,     // +100
  'fixed': 1200,      // +100
  'overlay': 1300,    // +100
  'modal': 2100,      // +800 (Fib: 8)
  'popover': 3400,    // +1300 (Fib: 13)
  'tooltip': 5500,    // +2100 (Fib: 21)
}
```

**Implementation Needs**:
- Z-index utilities
- Stacking context documentation

---

## 3. Implementation Architecture

### 3.1 Core Structure

```
fibo-blocks/
├── src/
│   ├── core/
│   │   ├── constants.ts          # PHI, FIBONACCI constants
│   │   ├── calculations.ts       # Scale generation functions
│   │   └── types.ts              # TypeScript types
│   ├── tokens/
│   │   ├── spacing.ts            # Spacing scale
│   │   ├── typography.ts         # Font sizes, line heights
│   │   ├── borders.ts            # Border widths, radius
│   │   ├── shadows.ts            # Shadow scale
│   │   ├── dimensions.ts         # Width/height scales
│   │   └── index.ts              # Export all tokens
│   ├── styles/
│   │   ├── base.css              # CSS custom properties
│   │   ├── utilities.css         # Utility classes
│   │   └── index.css             # Main stylesheet
│   ├── utils/
│   │   ├── spacing.ts            # Spacing helpers
│   │   ├── typography.ts         # Typography helpers
│   │   └── responsive.ts         # Breakpoint helpers
│   └── index.ts                  # Main entry point
```

### 3.2 Design Tokens Layer

**Purpose**: Single source of truth for all design values

```typescript
// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  5: '1.25rem',
  8: '2rem',
  13: '3.25rem',
  21: '5.25rem',
  34: '8.5rem',
  55: '13.75rem',
  89: '22.25rem',
} as const;

export type SpacingKey = keyof typeof spacing;
```

### 3.3 CSS Custom Properties Layer

**Purpose**: CSS variables for runtime theming

```css
/* base.css */
:root {
  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-5: 1.25rem;
  --spacing-8: 2rem;
  --spacing-13: 3.25rem;
  --spacing-21: 5.25rem;

  /* Typography */
  --font-size-xs: 0.618rem;
  --font-size-sm: 0.809rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.618rem;
  --font-size-xl: 2.618rem;

  --line-height-tight: 1.236;
  --line-height-normal: 1.618;
  --line-height-relaxed: 2.058;
}
```

### 3.4 Utility Functions Layer

**Purpose**: JavaScript/TypeScript API for dynamic usage

```typescript
// utils/spacing.ts
import { spacing, SpacingKey } from '../tokens/spacing';

export function getSpacing(key: SpacingKey): string {
  return spacing[key];
}

export function getSpacingPx(key: SpacingKey): number {
  const value = spacing[key];
  return parseFloat(value) * 16; // Convert rem to px
}

// Compose multiple spacing values
export function composeSpacing(...keys: SpacingKey[]): string {
  return keys.map(key => spacing[key]).join(' ');
}
```

### 3.5 Utility Classes Layer

**Purpose**: CSS classes for direct HTML usage

```css
/* utilities.css */

/* Spacing utilities */
.m-0 { margin: var(--spacing-0); }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
/* ... */

.p-0 { padding: var(--spacing-0); }
.p-1 { padding: var(--spacing-1); }
/* ... */

/* Typography utilities */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
/* ... */

.leading-tight { line-height: var(--line-height-tight); }
.leading-normal { line-height: var(--line-height-normal); }
/* ... */
```

### 3.6 Configuration System

**Purpose**: Allow customization while maintaining golden ratio principles

```typescript
// config.ts
export interface FiboConfig {
  baseUnit: number;
  phi: number;
  spacingMultiplier: number;
  customScales?: {
    spacing?: Record<string, string>;
    fontSize?: Record<string, string>;
  };
}

export const defaultConfig: FiboConfig = {
  baseUnit: 16,
  phi: 1.618033988749895,
  spacingMultiplier: 0.25,
};
```

---

## 4. Implementation Phases

### Phase 1: Core Foundation (Week 1-2)
- [ ] Set up project structure
- [ ] Implement mathematical constants and calculations
- [ ] Create TypeScript types and interfaces
- [ ] Set up build system

### Phase 2: Spacing System (Week 2-3)
- [ ] Define spacing tokens
- [ ] Generate CSS custom properties
- [ ] Create utility classes
- [ ] Implement JavaScript helpers
- [ ] Write tests

### Phase 3: Typography System (Week 3-4)
- [ ] Define font size scale
- [ ] Define line height scale
- [ ] Define letter spacing scale
- [ ] Create typography utilities
- [ ] Implement responsive typography
- [ ] Write tests

### Phase 4: Component Dimensions (Week 4-5)
- [ ] Define dimension scales
- [ ] Define container widths
- [ ] Create width/height utilities
- [ ] Implement aspect ratio system
- [ ] Write tests

### Phase 5: Borders & Visual Details (Week 5-6)
- [ ] Define border width scale
- [ ] Define border radius scale
- [ ] Define shadow scale
- [ ] Create border utilities
- [ ] Create shadow utilities
- [ ] Write tests

### Phase 6: Responsive System (Week 6-7)
- [ ] Define breakpoints
- [ ] Implement media query system
- [ ] Create responsive variants
- [ ] Test cross-device compatibility

### Phase 7: Additional Systems (Week 7-8)
- [ ] Icon sizing system
- [ ] Z-index layers
- [ ] Finalize configuration system
- [ ] Performance optimization

### Phase 8: Documentation & Examples (Week 8-9)
- [ ] API documentation
- [ ] Usage examples
- [ ] Migration guides
- [ ] Best practices guide

---

## 5. Key Components to Handle

### 5.1 Core Components

1. **Scale Generator**
   - Generates Fibonacci sequences
   - Calculates golden ratio powers
   - Converts to appropriate units

2. **Token System**
   - Stores all design values
   - Type-safe access
   - Serializable for themes

3. **CSS Generator**
   - Generates custom properties
   - Generates utility classes
   - Handles responsive variants

4. **Runtime API**
   - JavaScript/TypeScript functions
   - React/Vue/Angular integrations
   - Dynamic calculations

### 5.2 Developer Tools

1. **CLI Tool**
   - Generate custom scales
   - Preview sizing relationships
   - Validate configurations

2. **Visual Debugger**
   - Show spacing overlays
   - Display golden ratio grids
   - Highlight proportions

3. **Documentation Generator**
   - Auto-generate scale tables
   - Create visual examples
   - Export design specs

---

## 6. Technical Decisions

### 6.1 Unit Choice: REM vs PX

**Decision**: Use REM as primary unit
- Respects user browser font size preferences
- Accessibility-friendly
- Easy to scale entire design system
- Convert to PX when needed for specific cases

### 6.2 Scale Precision

**Decision**: Round to 3 decimal places
- Balance between precision and practicality
- `1.618rem` instead of `1.618033988749895rem`
- Sufficient for visual design

### 6.3 Naming Convention

**Decision**: Use Fibonacci numbers as scale keys
- `spacing-8`, `spacing-13`, `spacing-21`
- Clear relationship to mathematical foundation
- Avoids confusion with arbitrary scales

### 6.4 Framework Integration

**Decision**: Framework-agnostic core with adapters
- Core package in vanilla JS/TS
- Separate packages for React, Vue, Angular
- Allows maximum reusability

---

## 7. Testing Strategy

### 7.1 Unit Tests
- Scale generation accuracy
- Token value consistency
- Utility function behavior

### 7.2 Visual Regression Tests
- CSS output consistency
- Responsive behavior
- Cross-browser rendering

### 7.3 Integration Tests
- Framework adapter functionality
- Real-world component usage
- Performance benchmarks

---

## 8. Success Metrics

1. **Mathematical Accuracy**: All values derived correctly from φ and Fibonacci
2. **Performance**: < 10KB gzipped core library
3. **Developer Experience**: Intuitive API, comprehensive types
4. **Adoption**: Easy to integrate, clear documentation
5. **Accessibility**: WCAG 2.1 AA compliant sizing

---

## 9. Open Questions

1. **Should we support multiple base units?** (e.g., 14px, 16px, 18px)
2. **How granular should responsive variants be?** (all scales or subset?)
3. **Should we provide a visual design tool?** (Figma plugin, web app)
4. **How to handle edge cases?** (very small screens, very large displays)
5. **Should we include animation/transition timing?** (based on Fibonacci)

---

## Next Steps

1. Review this plan with stakeholders
2. Create proof-of-concept for spacing system
3. Validate approach with real designs
4. Set up development environment
5. Begin Phase 1 implementation
