# Responsive System - Automatic Size Adaptation

Fibo-blocks provides **three levels of responsive adaptation** - from fully automatic to manual control.

## 🎯 How It Works

The framework adapts sizing based on screen size using:

1. **CSS-based adaptation** (No JavaScript required)
2. **JavaScript viewport detection** (Enhanced control)
3. **Manual breakpoint utilities** (Full control)

---

## Level 1: Automatic CSS Adaptation (Recommended)

### Just import the CSS - everything adapts automatically!

```html
<!-- Include responsive CSS -->
<link rel="stylesheet" href="fibo-blocks/src/styles/index.css">
```

Now all sizing automatically adapts to viewport width:

### ✨ What Adapts Automatically

#### 1. **Root Font Size**
```css
:root {
  /* Automatically scales: 14px (mobile) → 18px (desktop) */
  font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1.125rem);
}
```

#### 2. **Fluid Typography**
```html
<h1 class="fibo-text-fluid-xl">
  <!-- Automatically scales from 1.618rem to 2.618rem -->
  This heading adapts to screen size
</h1>
```

All fluid text classes:
- `.fibo-text-fluid-xs` - 10px → 13px
- `.fibo-text-fluid-sm` - 13px → 16px
- `.fibo-text-fluid-base` - 16px → 21px
- `.fibo-text-fluid-lg` - 21px → 26px
- `.fibo-text-fluid-xl` - 26px → 42px
- `.fibo-text-fluid-2xl` - 42px → 68px
- `.fibo-text-fluid-3xl` - 68px → 110px

#### 3. **Responsive Spacing**
```html
<div class="fibo-container-fluid">
  <!-- Padding automatically adapts: 20px → 52px -->
  Content with adaptive padding
</div>

<section class="fibo-section-spacing">
  <!-- Margin automatically adapts: 32px → 84px -->
  Sections with natural spacing
</section>
```

#### 4. **Responsive Grids**
```html
<div class="fibo-grid-responsive">
  <!-- 1 column (mobile) → 2 cols (tablet) → 3 cols (desktop) → 5 cols (wide) -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### 5. **Golden Ratio Layout**
```html
<div class="fibo-grid-golden">
  <!-- Stacks on mobile, 61.8%/38.2% split on desktop -->
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>
```

---

## Level 2: JavaScript-Enhanced Adaptation

### For dynamic adaptation and fine control

```typescript
import { initResponsiveSystem } from 'fibo-blocks';

// Initialize automatic adaptation
initResponsiveSystem({
  adaptFontSize: true,      // Adjust root font size
  adaptSpacing: true,        // Adjust spacing values
  adaptContentWidth: true,   // Adjust max-width
});
```

### What JavaScript Adds

#### 1. **Viewport Detection**
```typescript
import { getViewportInfo } from 'fibo-blocks';

const viewport = getViewportInfo();
console.log(viewport);
// {
//   width: 1440,
//   height: 900,
//   breakpoint: 'lg',
//   orientation: 'landscape',
//   devicePixelRatio: 2
// }
```

#### 2. **Watch for Changes**
```typescript
import { watchViewport } from 'fibo-blocks';

const cleanup = watchViewport((info) => {
  console.log('Breakpoint changed:', info.breakpoint);
  // Update your UI, load different assets, etc.
});

// Later: cleanup();
```

#### 3. **Responsive Values**
```typescript
import { useResponsiveValue } from 'fibo-blocks';

const padding = useResponsiveValue({
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
}, 16);

console.log(padding()); // Returns value for current viewport
```

#### 4. **Match Viewport**
```typescript
import { matchesViewport } from 'fibo-blocks';

if (matchesViewport('lg', 'up')) {
  // Viewport is >= 1424px
  console.log('Large desktop or wider');
}

if (matchesViewport('md', 'only')) {
  // Viewport is exactly 'md' breakpoint
  console.log('Tablet landscape');
}
```

---

## Level 3: Manual Control

### For complete customization

#### Custom Media Queries
```typescript
import { mediaQuery } from 'fibo-blocks';

const styles = {
  padding: '1rem',

  [mediaQuery('md', 'min')]: {
    padding: '2rem',
  },

  [mediaQuery('lg', 'min')]: {
    padding: '3.25rem',
  },
};
```

#### Fluid Typography Generator
```typescript
import { fluidFontSize } from 'fibo-blocks';

const fluidHeading = fluidFontSize(
  1.618,  // min: 26px
  4.236,  // max: 68px
  336,    // min viewport
  1424    // max viewport
);

// Returns: 'clamp(1.618rem, ...calculation..., 4.236rem)'
```

---

## 📱 Breakpoint System

### Fibonacci-Based Breakpoints

| Breakpoint | Width (px) | Width (rem) | Use Case |
|------------|-----------|-------------|----------|
| **xs** | 336px | 21rem | Mobile landscape |
| **sm** | 544px | 34rem | Tablet portrait |
| **md** | 880px | 55rem | Tablet landscape |
| **lg** | 1424px | 89rem | Desktop |
| **xl** | 2304px | 144rem | Large desktop |

### How Sizing Changes

#### Typography Progression
```
Mobile (xs):   base × 0.875 = 14px
Tablet (sm):   base × 0.9375 = 15px
Desktop (md):  base × 1 = 16px
Large (lg):    base × 1.125 = 18px
```

#### Spacing Progression
```
Mobile:   spacing-5 = 20px
Tablet:   spacing-8 = 32px
Desktop:  spacing-13 = 52px
```

#### Container Padding
```
< 544px:   20px (spacing-5)
< 1424px:  32px (spacing-8)
> 1424px:  52px (spacing-13)
```

---

## 🎨 Practical Examples

### Example 1: Responsive Card

```html
<div class="card">
  <h2 class="fibo-text-fluid-xl">Card Title</h2>
  <p class="fibo-body-responsive">
    Text that adapts to screen size
  </p>
</div>

<style>
.card {
  /* Padding adapts: 20px → 32px → 52px */
  padding: clamp(var(--fibo-spacing-5), 3vw, var(--fibo-spacing-13));

  /* Border radius adapts */
  border-radius: var(--fibo-radius-responsive);

  /* Shadow depth adapts */
  box-shadow: var(--fibo-shadow-responsive);

  /* Margin adapts */
  margin-bottom: clamp(var(--fibo-spacing-5), 3vw, var(--fibo-spacing-8));
}
</style>
```

### Example 2: Responsive Grid Layout

```html
<div class="fibo-grid-responsive">
  <!-- Automatically: 1 col → 2 cols → 3 cols → 5 cols -->
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
</div>
```

### Example 3: Golden Ratio Sidebar

```html
<div class="fibo-grid-golden">
  <main>
    <!-- Takes 61.8% width on desktop, full width on mobile -->
    <h1 class="fibo-heading-responsive">Main Content</h1>
    <p class="fibo-body-responsive">Article text...</p>
  </main>

  <aside>
    <!-- Takes 38.2% width on desktop, full width on mobile -->
    <div class="fibo-visible-xs">Mobile sidebar</div>
  </aside>
</div>
```

### Example 4: JavaScript Integration

```typescript
import {
  initResponsiveSystem,
  watchViewport,
  getViewportInfo,
  matchesViewport
} from 'fibo-blocks';

// Initialize automatic adaptation
const cleanup = initResponsiveSystem({
  adaptFontSize: true,
  adaptSpacing: true,
});

// Watch for breakpoint changes
watchViewport((info) => {
  console.log(`Screen size: ${info.width}px`);
  console.log(`Breakpoint: ${info.breakpoint}`);

  // Load different assets per breakpoint
  if (info.breakpoint === 'xs') {
    // Load mobile images
  } else if (matchesViewport('lg', 'up')) {
    // Load high-res images
  }
});

// Get current viewport anytime
const viewport = getViewportInfo();
document.body.dataset.breakpoint = viewport.breakpoint;
```

### Example 5: React Component

```tsx
import { useState, useEffect } from 'react';
import { getViewportInfo, watchViewport } from 'fibo-blocks';

function ResponsiveCard() {
  const [breakpoint, setBreakpoint] = useState('md');

  useEffect(() => {
    const cleanup = watchViewport((info) => {
      setBreakpoint(info.breakpoint);
    });

    return cleanup;
  }, []);

  return (
    <div className="fibo-card-adaptive" data-breakpoint={breakpoint}>
      <h2 className="fibo-text-fluid-xl">
        Current: {breakpoint}
      </h2>
    </div>
  );
}
```

---

## 🔧 Advanced Techniques

### Custom Fluid Scales

```typescript
import { fluidFontSize, fluidSpacing } from 'fibo-blocks';

// Custom fluid heading
const customHeading = fluidFontSize(2, 4.236, 336, 1424);

// Custom fluid padding
const customPadding = fluidSpacing(1.25, 5.25, 336, 1424);
```

### Interpolated Values

```typescript
import { interpolateResponsiveValue } from 'fibo-blocks';

const currentWidth = window.innerWidth;

const padding = interpolateResponsiveValue(
  { xs: 20, md: 32, lg: 52 },
  currentWidth
);
// Returns smooth interpolation between breakpoints
```

### Container Queries (Modern)

```css
.fibo-container-query {
  container-type: inline-size;
}

@container (min-width: 34rem) {
  .card {
    padding: var(--fibo-spacing-8);
  }
}
```

---

## 🎯 Best Practices

### ✅ Do's

1. **Use fluid typography classes** for text that should scale smoothly
2. **Use responsive grid classes** for automatic column adaptation
3. **Use container-fluid** for padding that adapts to viewport
4. **Let CSS handle it** when possible (better performance)
5. **Use JavaScript** only when you need dynamic behavior

### ❌ Don'ts

1. Don't mix fluid and fixed sizing on the same element
2. Don't create custom breakpoints (use Fibonacci breakpoints)
3. Don't use JavaScript for static responsive design
4. Don't override fluid values with fixed pixel values

---

## 📊 Performance

### CSS-Only Adaptation
- ✅ **Zero JavaScript** - Works instantly
- ✅ **No runtime cost** - Pure CSS calculations
- ✅ **SSR compatible** - Works with server rendering
- ✅ **Fast repaints** - Hardware accelerated

### JavaScript Enhancement
- ✅ **Debounced** - Resize events throttled (150ms)
- ✅ **Efficient** - Only updates on breakpoint change
- ✅ **Small footprint** - ~2KB gzipped
- ✅ **Tree-shakeable** - Import only what you need

---

## 🐛 Troubleshooting

### Text Not Scaling?
```html
<!-- Make sure you import responsive CSS -->
<link rel="stylesheet" href="fibo-blocks/src/styles/index.css">

<!-- Or just responsive CSS -->
<link rel="stylesheet" href="fibo-blocks/src/styles/responsive.css">
```

### JavaScript Not Working?
```typescript
// Make sure to call init
import { initResponsiveSystem } from 'fibo-blocks';
initResponsiveSystem();
```

### Values Look Wrong?
```typescript
// Check current viewport
import { getViewportInfo } from 'fibo-blocks';
console.log(getViewportInfo());
```

---

## 📚 Related Documentation

- [SIZING_FRAMEWORK_PLAN.md](./SIZING_FRAMEWORK_PLAN.md) - Complete sizing system
- [SIZING_QUICK_REFERENCE.md](./SIZING_QUICK_REFERENCE.md) - Scale lookup tables
- [QUICKSTART.md](./QUICKSTART.md) - Getting started guide

---

## Summary

**The responsive system works at three levels:**

1. **CSS (No config needed)** - Import `responsive.css` and sizing adapts automatically
2. **JavaScript (Enhanced)** - Call `initResponsiveSystem()` for viewport detection
3. **Manual (Full control)** - Use utilities like `mediaQuery()` and `fluidFontSize()`

**The framework automatically detects screen size and adapts:**
- ✅ Typography (14px → 18px)
- ✅ Spacing (20px → 52px)
- ✅ Grids (1 → 5 columns)
- ✅ Layouts (stack → golden ratio)
- ✅ Shadows, borders, radius

Made with the golden ratio • φ ≈ 1.618
