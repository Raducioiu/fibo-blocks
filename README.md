# fibo-blocks

A modern UX framework based on the golden ratio and Fibonacci sequence principles for creating harmonious, mathematically balanced user interfaces.

## Overview

**fibo-blocks** is a design system and component library that leverages the golden ratio (φ ≈ 1.618) and Fibonacci sequence to create visually appealing, naturally balanced layouts and components. By applying these mathematical principles found throughout nature, fibo-blocks helps developers build interfaces that feel intuitively right to users.

## Motivation

The golden ratio and Fibonacci sequence appear throughout nature, art, and architecture, from the spiral of a nautilus shell to the proportions of the Parthenon. These same principles can create user interfaces that feel naturally balanced and visually harmonious, improving user experience and aesthetic appeal.

## Features

### Planned Features

- **Golden Ratio Layout System**: Grid and flexbox utilities based on φ proportions
- **Fibonacci-Based Spacing Scale**: Consistent spacing using Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21, 34...)
- **Typography Scale**: Font sizing following golden ratio progression
- **Component Library**: Pre-built UI components with golden ratio proportions
- **Responsive Breakpoints**: Screen size breakpoints based on Fibonacci sequence
- **Color Harmony**: Color palette generation using golden ratio relationships
- **Animation Timing**: Transition and animation durations following natural proportions
- **Design Tokens**: Configurable design tokens based on mathematical principles

## The Mathematics Behind fibo-blocks

### The Fibonacci Sequence

The Fibonacci sequence is a series where each number is the sum of the two preceding ones:
```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
```

### The Golden Ratio (φ)

The golden ratio (approximately 1.618033988749...) is derived from the Fibonacci sequence. As the sequence progresses, the ratio between consecutive Fibonacci numbers approaches φ:

```
1/1 = 1
2/1 = 2
3/2 = 1.5
5/3 = 1.666...
8/5 = 1.6
13/8 = 1.625
21/13 = 1.615...
```

### Application in UX Design

- **Layout Proportions**: Dividing space in golden ratio (e.g., 61.8% / 38.2%)
- **Spacing**: Using Fibonacci numbers for consistent margin and padding
- **Visual Hierarchy**: Sizing elements with golden ratio relationships
- **Typography**: Creating harmonious type scales

## Installation

```bash
# npm
npm install fibo-blocks

# yarn
yarn add fibo-blocks

# pnpm
pnpm add fibo-blocks
```

> Note: Package is currently in development and not yet published

## Usage

```javascript
// Example usage (planned API)
import { FiboGrid, FiboContainer, fiboSpacing } from 'fibo-blocks';

// Using golden ratio grid
<FiboGrid ratio="golden">
  <FiboGrid.Main>
    {/* Main content (larger section) */}
  </FiboGrid.Main>
  <FiboGrid.Aside>
    {/* Sidebar content (smaller section) */}
  </FiboGrid.Aside>
</FiboGrid>

// Using Fibonacci spacing
const styles = {
  margin: fiboSpacing(5), // Uses 5th Fibonacci number
  padding: fiboSpacing(3), // Uses 3rd Fibonacci number
};
```

## Project Structure

```
fibo-blocks/
├── src/
│   ├── core/           # Core utilities and calculations
│   ├── components/     # UI components
│   ├── layout/         # Layout system
│   ├── tokens/         # Design tokens
│   └── utils/          # Helper functions
├── docs/               # Documentation
├── examples/           # Usage examples
└── tests/              # Test suite
```

## Development Status

This project is currently in the initial planning and development phase. The framework is being designed with the following goals:

- **Framework Agnostic**: Usable with React, Vue, Angular, or vanilla JavaScript
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Lightweight**: Minimal bundle size with tree-shaking support
- **Customizable**: Extensible design system with configuration options
- **Accessible**: Built with WCAG compliance in mind

## Roadmap

- [ ] Core mathematical utilities (golden ratio, Fibonacci calculations)
- [ ] Design token system
- [ ] Grid layout system
- [ ] Spacing utilities
- [ ] Typography scale
- [ ] Component library (basic components)
- [ ] Documentation site
- [ ] Framework-specific integrations
- [ ] Advanced components
- [ ] Theme customization tools

## Contributing

Contributions are welcome! This project is in early development, and we'd love your input on:

- Feature suggestions
- API design feedback
- Documentation improvements
- Bug reports
- Code contributions

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

### Learn More About the Golden Ratio

- [Golden Ratio in Design](https://www.canva.com/learn/what-is-the-golden-ratio/)
- [Fibonacci in Nature](https://www.mathsisfun.com/numbers/nature-golden-ratio-fibonacci.html)
- [The Golden Ratio in Web Design](https://webdesign.tutsplus.com/articles/applying-the-golden-ratio-in-modern-designs--webdesign-7970)

## License

This project is licensed under the GNU Lesser General Public License v3.0 (LGPL-3.0) - see the [LICENSE](LICENSE) file for details.

This means you can:
- Use the library in both open source and proprietary projects
- Modify the library for your own needs
- Distribute the library

With the requirement that:
- Modifications to the library itself must be shared under LGPL-3.0
- You must provide attribution and include the license notice

## Author

Created with ♾️ by the fibo-blocks team

## Acknowledgments

- Inspired by the natural mathematical patterns found throughout the universe
- Built on the shoulders of giants in design, mathematics, and web development

---

**Status**: 🚧 In Development

Made with the golden ratio • φ ≈ 1.618
