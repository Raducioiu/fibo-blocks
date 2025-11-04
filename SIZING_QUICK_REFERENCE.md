# Fibo-Blocks Sizing Quick Reference

## At a Glance

### Spacing Scale (Fibonacci-based)
```
Scale | Value (rem) | Pixels  | Fibonacci #
------|-------------|---------|------------
0     | 0           | 0px     | 0
1     | 0.25        | 4px     | 1
2     | 0.5         | 8px     | 2
3     | 0.75        | 12px    | 3
5     | 1.25        | 20px    | 5
8     | 2           | 32px    | 8
13    | 3.25        | 52px    | 13
21    | 5.25        | 84px    | 21
34    | 8.5         | 136px   | 34
55    | 13.75       | 220px   | 55
89    | 22.25       | 356px   | 89
```

### Typography Scale (Golden Ratio φ = 1.618)
```
Size  | Value (rem) | Pixels   | Ratio
------|-------------|----------|-------
xs    | 0.618       | ~10px    | base / φ²
sm    | 0.809       | ~13px    | base / φ
base  | 1.000       | 16px     | base
lg    | 1.618       | ~26px    | base × φ
xl    | 2.618       | ~42px    | base × φ²
2xl   | 4.236       | ~68px    | base × φ³
3xl   | 6.854       | ~110px   | base × φ⁴
4xl   | 11.089      | ~177px   | base × φ⁵
```

### Line Heights (Golden Ratio)
```
Type     | Value | Description
---------|-------|---------------------------
tight    | 1.236 | Compact (φ / √φ)
normal   | 1.618 | Standard (φ)
relaxed  | 2.058 | Spacious (φ + 1/φ)
loose    | 2.618 | Very spacious (φ²)
```

### Border Radius
```
Size | Value (rem) | Pixels | Relation
-----|-------------|--------|----------
sm   | 0.125       | 2px    | -
base | 0.25        | 4px    | base / φ⁴
md   | 0.5         | 8px    | base / φ²
lg   | 0.809       | ~13px  | base / φ
xl   | 1.309       | ~21px  | Fibonacci
2xl  | 2.118       | ~34px  | Fibonacci
```

### Border Widths (Fibonacci)
```
Scale | Pixels
------|-------
0     | 0px
1     | 1px
2     | 2px
3     | 3px
5     | 5px
8     | 8px
```

### Breakpoints (Fibonacci)
```
Size | Value (rem) | Pixels  | Fibonacci
-----|-------------|---------|----------
xs   | 21          | 336px   | 21
sm   | 34          | 544px   | 34
md   | 55          | 880px   | 55
lg   | 89          | 1424px  | 89
xl   | 144         | 2304px  | 144
```

### Container Widths (Fibonacci)
```
Size | Value (rem) | Pixels  | Use Case
-----|-------------|---------|------------------
xs   | 21          | 336px   | Mobile cards
sm   | 34          | 544px   | Small forms
md   | 55          | 880px   | Standard content
lg   | 89          | 1424px  | Wide layouts
xl   | 144         | 2304px  | Full-width
```

### Box Shadows (Fibonacci elevation)
```
Level | Y-offset | Blur  | Fibonacci
------|----------|-------|----------
sm    | 1px      | 2px   | 1, 2
base  | 2px      | 3px   | 2, 3
md    | 3px      | 5px   | 3, 5
lg    | 5px      | 8px   | 5, 8
xl    | 8px      | 13px  | 8, 13
2xl   | 13px     | 21px  | 13, 21
```

## Visual Relationships

### Golden Ratio in Action
```
┌─────────────────────────────────┐
│                                 │ 100%
│         Major (61.8%)           │
│                                 │
├─────────────────────────────────┤
│     Minor (38.2%)              │
└─────────────────────────────────┘

Major / Minor = φ (1.618)
```

### Fibonacci Sequence Visualization
```
Spacing progression:
█ (1)
██ (2)
███ (3)
█████ (5)
████████ (8)
█████████████ (13)
█████████████████████ (21)
```

### Typography Scale Progression
```
xs   ████
sm   ██████
base ████████
lg   █████████████
xl   █████████████████████
2xl  ██████████████████████████████████
```

## Common Use Cases

### Card Component
```css
.card {
  padding: var(--spacing-5);        /* 20px */
  border-radius: var(--radius-lg);  /* 13px */
  box-shadow: var(--shadow-md);     /* 3px 5px blur */
  margin-bottom: var(--spacing-8);  /* 32px */
}

.card-title {
  font-size: var(--font-size-lg);   /* 26px */
  line-height: var(--line-height-tight); /* 1.236 */
  margin-bottom: var(--spacing-3);  /* 12px */
}
```

### Button Sizing
```css
.button-sm {
  padding: var(--spacing-2) var(--spacing-3); /* 8px 12px */
  font-size: var(--font-size-sm);             /* 13px */
}

.button-md {
  padding: var(--spacing-3) var(--spacing-5); /* 12px 20px */
  font-size: var(--font-size-base);           /* 16px */
}

.button-lg {
  padding: var(--spacing-5) var(--spacing-8); /* 20px 32px */
  font-size: var(--font-size-lg);             /* 26px */
}
```

### Layout Grid
```css
.layout-grid {
  display: grid;
  grid-template-columns: 61.8fr 38.2fr; /* Golden ratio split */
  gap: var(--spacing-8);                /* 32px */
}
```

### Responsive Typography
```css
.heading {
  font-size: var(--font-size-xl);  /* 42px on base */
}

@media (min-width: 34rem) { /* sm breakpoint */
  .heading {
    font-size: var(--font-size-2xl); /* 68px on tablet+ */
  }
}

@media (min-width: 55rem) { /* md breakpoint */
  .heading {
    font-size: var(--font-size-3xl); /* 110px on desktop */
  }
}
```

## Mathematical Formulas

### Generate Fibonacci Number
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### Calculate Golden Ratio Power
```javascript
const PHI = 1.618033988749895;

function goldenRatio(power) {
  return Math.pow(PHI, power);
}

// Examples:
// φ⁰ = 1
// φ¹ = 1.618
// φ² = 2.618
// φ³ = 4.236
```

### Convert Scale to Pixels
```javascript
function toPx(remValue, baseUnit = 16) {
  return parseFloat(remValue) * baseUnit;
}
```

## Design Principles

1. **Consistency**: All sizes derived from same mathematical base
2. **Harmony**: Ratios feel naturally balanced
3. **Scalability**: System works at any scale
4. **Accessibility**: Respects user preferences (rem-based)
5. **Predictability**: Clear progression patterns

## Why These Numbers?

### Spacing: Fibonacci × 4px
- 4px is smallest visible unit on most screens
- Fibonacci provides natural progression
- Result: harmonious, not arbitrary spacing

### Typography: Golden Ratio Powers
- Each step is 1.618× larger than previous
- Creates clear visual hierarchy
- Avoids too-similar or too-different sizes

### Line Height: Golden Ratio
- 1.618 is mathematically pleasing
- Provides enough space without waste
- Readable for most content types

### Breakpoints: Fibonacci × 16px
- 16px is base font size (1rem)
- Fibonacci provides natural device sizes
- Covers mobile (336px) to large desktop (2304px)
