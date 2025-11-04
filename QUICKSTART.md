# Quick Start Guide

Get started with fibo-blocks in minutes!

## Installation

```bash
npm install fibo-blocks
# or
yarn add fibo-blocks
# or
pnpm add fibo-blocks
```

> **Note**: Package is currently in development. For now, clone the repository.

## Basic Usage

### 1. Import CSS (Simplest Method)

```html
<!-- In your HTML -->
<link rel="stylesheet" href="node_modules/fibo-blocks/src/styles/base.css">
```

Now use CSS custom properties:

```css
.my-card {
  padding: var(--fibo-spacing-8);      /* 32px */
  font-size: var(--fibo-font-size-lg); /* ~26px */
  border-radius: var(--fibo-radius-lg); /* ~13px */
  box-shadow: var(--fibo-shadow-md);
}
```

### 2. Use JavaScript/TypeScript

```typescript
import { spacing, fontSize, getSpacing } from 'fibo-blocks';

// Access tokens directly
const padding = spacing[8];  // '2rem' (32px)
const large = fontSize.lg;   // '1.618rem' (~26px)

// Use utility functions
const margin = getSpacing(13); // '3.25rem' (52px)

// Create inline styles
const cardStyle = {
  padding: spacing[5],
  fontSize: fontSize.base,
  borderRadius: '0.809rem',
};
```

### 3. Golden Ratio Layout

```html
<div style="
  display: grid;
  grid-template-columns: var(--fibo-golden-major) var(--fibo-golden-minor);
  gap: var(--fibo-spacing-8);
">
  <main>
    <!-- Main content (61.8%) -->
  </main>
  <aside>
    <!-- Sidebar (38.2%) -->
  </aside>
</div>
```

## Common Patterns

### Card Component

```html
<div class="card" style="
  background: white;
  padding: var(--fibo-spacing-8);
  border-radius: var(--fibo-radius-lg);
  box-shadow: var(--fibo-shadow-md);
  margin-bottom: var(--fibo-spacing-5);
">
  <h2 style="
    font-size: var(--fibo-font-size-xl);
    line-height: var(--fibo-line-height-tight);
    margin-bottom: var(--fibo-spacing-5);
  ">
    Card Title
  </h2>
  <p style="
    font-size: var(--fibo-font-size-base);
    line-height: var(--fibo-line-height-relaxed);
  ">
    Card content with harmonious proportions.
  </p>
</div>
```

### Button

```html
<button style="
  padding: var(--fibo-spacing-3) var(--fibo-spacing-5);
  font-size: var(--fibo-font-size-base);
  border-radius: var(--fibo-radius-md);
  box-shadow: var(--fibo-shadow-sm);
">
  Click Me
</button>
```

### Container

```html
<div class="fibo-container fibo-container-lg">
  <!-- Content with max-width of 89rem (1424px) -->
</div>
```

## Scale Reference

### Spacing (Fibonacci)

| Key | Value | Pixels | Use Case |
|-----|-------|--------|----------|
| 1   | 0.25rem | 4px | Minimal spacing |
| 2   | 0.5rem | 8px | Tight spacing |
| 3   | 0.75rem | 12px | Small gaps |
| 5   | 1.25rem | 20px | Standard padding |
| 8   | 2rem | 32px | Card padding |
| 13  | 3.25rem | 52px | Section spacing |
| 21  | 5.25rem | 84px | Large gaps |

### Font Sizes (Golden Ratio)

| Key | Value | Pixels | Use Case |
|-----|-------|--------|----------|
| xs  | 0.618rem | ~10px | Fine print |
| sm  | 0.809rem | ~13px | Small text |
| base | 1rem | 16px | Body text |
| lg  | 1.618rem | ~26px | Subheadings |
| xl  | 2.618rem | ~42px | Headings |
| 2xl | 4.236rem | ~68px | Large headings |

## TypeScript Example

```typescript
import {
  spacing,
  fontSize,
  getSpacing,
  getFontSize,
  typographyStyle,
  PHI,
} from 'fibo-blocks';

// Create a styled component
const cardStyles = {
  padding: getSpacing(8),
  ...typographyStyle('base', 'normal'),
  borderRadius: '0.809rem',
};

// Calculate custom golden ratio values
const customWidth = 1000 / PHI; // ~618px (major portion of 1000px)

// Access Fibonacci numbers
import { fibonacci } from 'fibo-blocks';
const mySpacing = fibonacci(10) * 4; // 55 * 4 = 220px
```

## Responsive Design

```typescript
import { breakpoints, mediaQuery } from 'fibo-blocks';

// In CSS-in-JS
const styles = {
  padding: spacing[5],

  [mediaQuery('md', 'min')]: {
    padding: spacing[8],
  },

  [mediaQuery('lg', 'min')]: {
    padding: spacing[13],
  },
};
```

## React Example

```jsx
import { spacing, fontSize, boxShadow } from 'fibo-blocks';

function Card({ children }) {
  return (
    <div style={{
      padding: spacing[8],
      fontSize: fontSize.base,
      borderRadius: '0.809rem',
      boxShadow: boxShadow.md,
      marginBottom: spacing[5],
    }}>
      {children}
    </div>
  );
}
```

## Vue Example

```vue
<template>
  <div :style="cardStyle">
    <slot />
  </div>
</template>

<script>
import { spacing, fontSize, boxShadow } from 'fibo-blocks';

export default {
  computed: {
    cardStyle() {
      return {
        padding: spacing[8],
        fontSize: fontSize.base,
        borderRadius: '0.809rem',
        boxShadow: boxShadow.md,
      };
    },
  },
};
</script>
```

## Tips

### ✅ Do's

- Use spacing scale for all margins and padding
- Use typography scale for consistent text sizing
- Follow golden ratio for major layout divisions
- Use Fibonacci numbers for grid columns (1, 2, 3, 5, 8)
- Compose spacing values: `${spacing[3]} ${spacing[5]}`

### ❌ Don'ts

- Don't mix fibo-blocks spacing with arbitrary values
- Don't use pixel values directly - use tokens
- Don't create intermediate sizes between scale values
- Avoid breaking the mathematical harmony

## Next Steps

1. **See Examples**: Open `examples/index.html` in your browser
2. **Read Docs**: Check out the full documentation in `SIZING_FRAMEWORK_PLAN.md`
3. **Explore Tokens**: Browse `src/tokens/` to see all available values
4. **Build Something**: Start with a card or button component

## Common Questions

**Q: Why these specific numbers?**
A: They're based on the golden ratio (φ ≈ 1.618) and Fibonacci sequence, found throughout nature and art.

**Q: Can I customize the values?**
A: Yes! Override CSS custom properties or modify the token files.

**Q: What if I need a value between the scale?**
A: Try to stick to the scale. If absolutely necessary, use custom values sparingly.

**Q: Does this work with Tailwind/Bootstrap?**
A: Yes! Use fibo-blocks tokens alongside other frameworks.

## Get Help

- 📖 [Full Documentation](./SIZING_FRAMEWORK_PLAN.md)
- 🔧 [Development Guide](./DEVELOPMENT.md)
- 🐛 [Report Issues](https://github.com/Raducioiu/fibo-blocks/issues)
- 💬 [Discussions](https://github.com/Raducioiu/fibo-blocks/discussions)

---

Happy building with golden ratio proportions! ✨
