# Development Guide

This guide is for contributors and developers working on the fibo-blocks framework.

## Project Structure

```
fibo-blocks/
├── src/
│   ├── core/              # Core mathematical functions
│   │   ├── constants.ts   # PHI, Fibonacci constants
│   │   ├── types.ts       # TypeScript type definitions
│   │   └── calculations.ts # Scale generation functions
│   ├── tokens/            # Design tokens
│   │   ├── spacing.ts     # Spacing scale (Fibonacci)
│   │   ├── typography.ts  # Typography scale (Golden Ratio)
│   │   ├── borders.ts     # Border widths and radius
│   │   ├── dimensions.ts  # Containers, breakpoints
│   │   ├── shadows.ts     # Shadows and z-index
│   │   └── index.ts       # Token exports
│   ├── styles/            # CSS output
│   │   └── base.css       # CSS custom properties
│   ├── utils/             # Utility functions
│   │   ├── spacing.ts     # Spacing helpers
│   │   ├── typography.ts  # Typography helpers
│   │   └── responsive.ts  # Breakpoint helpers
│   └── index.ts           # Main entry point
├── tests/                 # Unit tests
├── examples/              # Usage examples
└── docs/                  # Documentation
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- TypeScript knowledge
- Understanding of design systems

### Installation

```bash
# Clone the repository
git clone https://github.com/Raducioiu/fibo-blocks.git
cd fibo-blocks

# Install dependencies
npm install
```

### Development Commands

```bash
# Build TypeScript
npm run build:ts

# Build CSS
npm run build:css

# Build everything
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Development mode (watch TypeScript)
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

## Development Workflow

### 1. Making Changes

When adding new features or fixing bugs:

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes in the appropriate directory
3. Write tests for new functionality
4. Ensure all tests pass: `npm test`
5. Build the project: `npm run build`
6. Commit with clear messages

### 2. Adding New Design Tokens

To add a new design token:

1. **Define the token** in `src/tokens/`:
   ```typescript
   // src/tokens/your-token.ts
   export const yourToken = {
     sm: '...',
     md: '...',
     lg: '...',
   } as const;
   ```

2. **Export from index**:
   ```typescript
   // src/tokens/index.ts
   export { yourToken } from './your-token';
   ```

3. **Add CSS custom properties**:
   ```css
   /* src/styles/base.css */
   :root {
     --fibo-your-token-sm: ...;
     --fibo-your-token-md: ...;
   }
   ```

4. **Create utility functions** (if needed):
   ```typescript
   // src/utils/your-utilities.ts
   export function getYourToken(key: string) {
     return yourToken[key];
   }
   ```

### 3. Adding Calculation Functions

When adding new mathematical functions:

1. Add to `src/core/calculations.ts`
2. Include JSDoc documentation
3. Add unit tests in `tests/calculations.test.ts`
4. Export from `src/core/index.ts`

Example:

```typescript
/**
 * Your function description
 *
 * @param input - Description
 * @returns Description
 *
 * @example
 * yourFunction(5) // expected output
 */
export function yourFunction(input: number): number {
  // Implementation
  return input * PHI;
}
```

### 4. Writing Tests

All new functions should have tests:

```typescript
// tests/your-feature.test.ts
import { yourFunction } from '../src/core/calculations';

describe('yourFunction', () => {
  it('should do something', () => {
    expect(yourFunction(5)).toBe(expectedValue);
  });

  it('should handle edge cases', () => {
    expect(yourFunction(0)).toBe(0);
  });
});
```

### 5. Updating CSS

When modifying CSS custom properties:

1. Update `src/styles/base.css`
2. Ensure naming follows convention: `--fibo-{category}-{key}`
3. Add comments for clarity
4. Test in `examples/index.html`

## Code Standards

### TypeScript

- Use strict type checking
- Prefer `const` over `let`
- Use explicit return types for functions
- Add JSDoc comments for public APIs

```typescript
// Good
export function getSpacing(key: SpacingKey): string {
  return spacing[key];
}

// Not ideal
export function getSpacing(key) {
  return spacing[key];
}
```

### Naming Conventions

- **Files**: kebab-case (`spacing-utils.ts`)
- **Variables/Functions**: camelCase (`getFontSize`)
- **Types/Interfaces**: PascalCase (`FontSizeKey`)
- **Constants**: UPPER_SNAKE_CASE (`PHI`, `BASE_UNIT`)
- **CSS Custom Properties**: `--fibo-{category}-{key}`

### File Organization

- One primary export per file
- Group related functionality
- Keep files under 300 lines
- Use barrel exports (`index.ts`) for clean imports

## Mathematical Principles

### The Golden Ratio (φ)

```typescript
const PHI = 1.618033988749895;

// Powers of φ for typography
fontSize.lg = base * PHI;      // 1.618 × base
fontSize.xl = base * PHI * PHI; // 2.618 × base
```

### Fibonacci Sequence

```typescript
// Used for spacing
const FIBONACCI = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

// Spacing calculation
spacing[8] = 8 * 4px = 32px = 2rem
spacing[13] = 13 * 4px = 52px = 3.25rem
```

### Key Relationships

1. **φ² = φ + 1** (approximately 2.618)
2. **1/φ ≈ 0.618** (reciprocal, used for "minor" divisions)
3. **Fibonacci ratio approaches φ**: `F(n)/F(n-1) → φ` as n increases

## Testing Strategy

### Unit Tests

- Test all calculation functions
- Test edge cases (0, negative, very large numbers)
- Test precision (round to 3 decimals)

### Integration Tests

- Test token generation
- Test CSS output
- Test utility functions with real data

### Visual Tests

- Use `examples/index.html` for visual regression
- Check cross-browser compatibility
- Test responsive behavior

## Performance Considerations

1. **Precompute values** where possible
2. **Use constants** instead of repeated calculations
3. **Memoize** expensive functions if needed
4. **Tree-shakeable exports** for bundle size

Example:

```typescript
// Good - precomputed
export const PHI_SQUARED = PHI * PHI;

// Not ideal - computed each time
export const getPhiSquared = () => PHI * PHI;
```

## Documentation

### Code Comments

- Explain **why**, not what
- Use JSDoc for all public APIs
- Include examples in JSDoc

### README Updates

When adding major features:

1. Update main README.md
2. Update SIZING_FRAMEWORK_PLAN.md if applicable
3. Add examples to `examples/`

## Releasing

### Version Numbering

Follow semantic versioning:
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.0.1): Bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Build succeeds
- [ ] Examples work
- [ ] Git tag created

## Common Tasks

### Adding a New Spacing Value

1. Add to Fibonacci sequence if needed
2. Update `src/tokens/spacing.ts`
3. Add CSS variable in `src/styles/base.css`
4. Update types if needed
5. Add tests

### Changing Base Unit

To change from 16px to another value:

1. Update `BASE_UNIT` in `src/core/constants.ts`
2. Rebuild: `npm run build`
3. All values will recalculate automatically

### Adding Framework Support (React, Vue, etc.)

1. Create adapter package: `packages/fibo-blocks-react/`
2. Import core tokens
3. Create framework-specific components
4. Publish as separate package

## Troubleshooting

### Build Errors

```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

### Test Failures

```bash
# Run single test file
npm test -- calculations.test.ts

# Run with coverage
npm test -- --coverage
```

### Type Errors

```bash
# Check TypeScript compilation
npx tsc --noEmit
```

## Resources

- [Golden Ratio](https://en.wikipedia.org/wiki/Golden_ratio)
- [Fibonacci Sequence](https://en.wikipedia.org/wiki/Fibonacci_number)
- [Design Tokens](https://designtokens.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

- Open an issue on GitHub
- Check existing documentation
- Review test files for examples

## License

LGPL-3.0 - See LICENSE file for details.
