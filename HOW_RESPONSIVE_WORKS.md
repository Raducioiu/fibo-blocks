# How the Responsive System Works

## 🎯 Quick Answer

**The framework automatically adapts sizing based on screen size in three ways:**

## 1. CSS-Only (Automatic - No JavaScript)

### Just import the CSS:

```html
<link rel="stylesheet" href="fibo-blocks/src/styles/index.css">
```

Now everything adapts automatically:

### What Happens:

#### Root Font Size Scales
```css
:root {
  /* 14px on mobile → 18px on desktop */
  font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1.125rem);
}
```

#### Typography Scales Smoothly
```html
<h1 class="fibo-text-fluid-xl">
  <!-- Automatically: 26px → 42px based on viewport -->
</h1>
```

#### Spacing Adapts
```html
<div class="fibo-container-fluid">
  <!-- Padding: 20px → 52px automatically -->
</div>
```

#### Grids Reorganize
```html
<div class="fibo-grid-responsive">
  <!-- 1 column → 2 → 3 → 5 columns (Fibonacci!) -->
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

#### Layouts Adapt
```html
<div class="fibo-grid-golden">
  <!-- Stacks on mobile, 61.8%/38.2% on desktop -->
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>
```

### How It Works:

The CSS uses **`clamp()`** function:
```css
/* Typography example */
font-size: clamp(1rem, 0.832rem + 0.88vw, 1.618rem);
/*             min     formula with vw     max        */
```

- **min**: Smallest size (mobile)
- **formula**: Scales with viewport width (vw units)
- **max**: Largest size (desktop)

The browser automatically calculates the size based on viewport width!

---

## 2. JavaScript-Enhanced (Optional)

For dynamic behavior and detection:

```javascript
import { initResponsiveSystem, getViewportInfo } from 'fibo-blocks';

// Auto-adapt sizing
initResponsiveSystem({
  adaptFontSize: true,     // Adjust root font size
  adaptSpacing: true,       // Adjust spacing values
  adaptContentWidth: true,  // Adjust max-widths
});

// Get current viewport
const viewport = getViewportInfo();
console.log(viewport);
// {
//   width: 1440,
//   height: 900,
//   breakpoint: 'lg',          // xs, sm, md, lg, xl
//   orientation: 'landscape',
//   devicePixelRatio: 2
// }
```

### Watch for Changes:

```javascript
import { watchViewport } from 'fibo-blocks';

watchViewport((info) => {
  console.log('Breakpoint changed to:', info.breakpoint);
  // Update UI, load different assets, etc.
});
```

---

## 3. The Breakpoint System

### Fibonacci-Based Breakpoints:

| Name | Width (px) | Width (rem) | Fibonacci | Use Case |
|------|-----------|-------------|-----------|----------|
| xs   | 336       | 21          | 21        | Mobile |
| sm   | 544       | 34          | 34        | Tablet portrait |
| md   | 880       | 55          | 55        | Tablet landscape |
| lg   | 1424      | 89          | 89        | Desktop |
| xl   | 2304      | 144         | 144       | Large desktop |

### How Sizes Change:

```
Screen Size          Font Size    Container Padding    Grid Columns
───────────────────────────────────────────────────────────────────
< 544px (xs, sm)     14-15px      20px (spacing-5)     1 column
544-880px (md)       16px         32px (spacing-8)     2-3 columns
880-1424px (lg)      16-17px      32px (spacing-8)     3-5 columns
> 1424px (xl)        18px         52px (spacing-13)    5 columns
```

---

## 📊 Real Examples

### Example 1: Responsive Card (CSS Only)

```html
<div class="card">
  <h2 class="fibo-text-fluid-xl">Card Title</h2>
  <p class="fibo-body-responsive">
    This text automatically scales
  </p>
</div>

<style>
.card {
  /* Padding adapts smoothly */
  padding: clamp(var(--fibo-spacing-5), 3vw, var(--fibo-spacing-13));
  /* 20px → 52px */

  /* Border radius adapts */
  border-radius: var(--fibo-radius-responsive);
  /* 4px → 8px → 13px */

  /* Shadow deepens */
  box-shadow: var(--fibo-shadow-responsive);
  /* sm → md → lg */
}
</style>
```

### Example 2: Responsive Grid

```html
<div class="fibo-grid-responsive">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
  <div class="card">Item 4</div>
  <div class="card">Item 5</div>
</div>
```

**What happens:**
- Mobile (< 544px): **1 column** - vertical stack
- Tablet portrait (544px): **2 columns** - comfortable grid
- Tablet landscape (880px): **3 columns** - more content visible
- Desktop (1424px): **5 columns** - Fibonacci number!

### Example 3: Golden Ratio Layout

```html
<div class="fibo-grid-golden">
  <main>
    <!-- On desktop: takes 61.8% width -->
    <h1 class="fibo-heading-responsive">Article Title</h1>
    <p>Content...</p>
  </main>
  <aside>
    <!-- On desktop: takes 38.2% width -->
    <div>Sidebar</div>
  </aside>
</div>
```

**What happens:**
- Mobile (< 880px): Stacks vertically (100% width each)
- Desktop (>= 880px): Side-by-side at golden ratio (61.8% / 38.2%)

---

## 🔍 Under the Hood

### The Math Behind Fluid Typography:

```javascript
// Generate font size that scales: 16px → 26px
function fluidFontSize(min, max, minViewport, maxViewport) {
  // Calculate slope of the scaling
  const slope = (max - min) / ((maxViewport - minViewport) / 100);

  // Calculate intersection point
  const intersection = min - (slope * minViewport / 100);

  // Return CSS clamp()
  return `clamp(${min}rem, ${intersection}rem + ${slope}vw, ${max}rem)`;
}

// Result: clamp(1rem, 0.432rem + 2.98vw, 1.618rem)
```

This creates a **linear interpolation** between min and max based on viewport width.

### The CSS Output:

```css
.fibo-text-fluid-lg {
  font-size: clamp(1.318rem, 0.982rem + 1.76vw, 1.618rem);
  /*
     At 336px:  ~21px
     At 700px:  ~23px (interpolated)
     At 1424px: ~26px
  */
}
```

---

## 🎨 Why This Works So Well

### 1. **Mathematical Harmony**
- Uses Fibonacci numbers (1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144)
- Golden ratio divisions (61.8% / 38.2%)
- Natural, pleasing progressions

### 2. **Smooth Scaling**
- No jarring jumps between sizes
- Linear interpolation between breakpoints
- Feels fluid and natural

### 3. **Zero Configuration**
- Works out of the box
- No media queries to write
- CSS handles everything

### 4. **Performance**
- Pure CSS = browser-optimized
- No JavaScript overhead for basic usage
- Hardware accelerated

---

## 🚀 Getting Started

### Minimal Setup:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 1. Import the CSS -->
  <link rel="stylesheet" href="fibo-blocks/src/styles/index.css">
</head>
<body>
  <!-- 2. Use the classes -->
  <div class="fibo-container">
    <h1 class="fibo-text-fluid-2xl">Hello World</h1>
    <div class="fibo-grid-responsive">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    </div>
  </div>
</body>
</html>
```

**That's it!** Everything automatically adapts to screen size.

### Optional JavaScript Enhancement:

```javascript
import { initResponsiveSystem } from 'fibo-blocks';

// Initialize auto-adaptation
initResponsiveSystem();
```

---

## 📖 Key Takeaways

1. **CSS does the heavy lifting** - Uses `clamp()` for automatic scaling
2. **Fibonacci breakpoints** - Natural screen size progression (336, 544, 880, 1424, 2304px)
3. **Golden ratio layouts** - Harmonious proportions (61.8% / 38.2%)
4. **Three levels**: CSS-only → JS-enhanced → Full manual control
5. **Zero config** - Import CSS and start using classes
6. **Performant** - Browser-native calculations, no JS overhead

---

## 🎯 Common Use Cases

| Use Case | Solution | Class/Method |
|----------|----------|--------------|
| Heading that scales | Fluid typography | `.fibo-text-fluid-xl` |
| Adaptive padding | Fluid spacing | `.fibo-container-fluid` |
| Responsive grid | Auto-columns | `.fibo-grid-responsive` |
| Sidebar layout | Golden ratio | `.fibo-grid-golden` |
| Detect breakpoint | JS detection | `getViewportInfo()` |
| React to resize | Watch viewport | `watchViewport()` |

---

## 📚 Learn More

- **[RESPONSIVE_SYSTEM.md](./RESPONSIVE_SYSTEM.md)** - Complete documentation
- **[examples/responsive-demo.html](./examples/responsive-demo.html)** - Interactive demo
- **[SIZING_FRAMEWORK_PLAN.md](./SIZING_FRAMEWORK_PLAN.md)** - Full system design

---

## Summary

**The framework reads screen size using:**
1. **CSS `clamp()`** - Automatic interpolation between min/max values
2. **Viewport width (vw)** - Dynamic units that scale with screen
3. **Media queries** - Breakpoint-specific changes
4. **JavaScript (optional)** - Enhanced detection and control

**All sizing automatically adapts because:**
- Root font size scales with viewport
- CSS custom properties use fluid values
- Grid systems have responsive breakpoints
- Layouts reorganize at Fibonacci thresholds

**You just import the CSS and use the classes!** 🎉

Made with the golden ratio • φ ≈ 1.618
