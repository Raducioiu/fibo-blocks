/**
 * Unit tests for core calculation functions
 */

import {
  fibonacci,
  goldenRatioPower,
  round,
  pxToRem,
  remToPx,
  formatCSSValue,
  generateSpacingValue,
  generateFontSize,
  divideByGoldenRatio,
  nearestFibonacci,
  isGoldenRatio,
} from '../src/core/calculations';
import { PHI } from '../src/core/constants';

describe('fibonacci', () => {
  it('should return correct Fibonacci numbers', () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(2)).toBe(1);
    expect(fibonacci(3)).toBe(2);
    expect(fibonacci(5)).toBe(5);
    expect(fibonacci(8)).toBe(21);
    expect(fibonacci(10)).toBe(55);
  });
});

describe('goldenRatioPower', () => {
  it('should calculate powers of PHI correctly', () => {
    expect(goldenRatioPower(0)).toBe(1);
    expect(goldenRatioPower(1)).toBeCloseTo(1.618, 3);
    expect(goldenRatioPower(2)).toBeCloseTo(2.618, 3);
    expect(goldenRatioPower(-1)).toBeCloseTo(0.618, 3);
  });
});

describe('round', () => {
  it('should round to specified precision', () => {
    expect(round(1.618033988, 3)).toBe(1.618);
    expect(round(2.618033988, 2)).toBe(2.62);
    expect(round(1.5, 0)).toBe(2);
  });
});

describe('pxToRem', () => {
  it('should convert pixels to rem', () => {
    expect(pxToRem(16)).toBe(1);
    expect(pxToRem(32)).toBe(2);
    expect(pxToRem(24)).toBe(1.5);
  });

  it('should use custom base unit', () => {
    expect(pxToRem(20, 10)).toBe(2);
  });
});

describe('remToPx', () => {
  it('should convert rem to pixels', () => {
    expect(remToPx(1)).toBe(16);
    expect(remToPx(2)).toBe(32);
    expect(remToPx(1.5)).toBe(24);
  });
});

describe('formatCSSValue', () => {
  it('should format CSS values correctly', () => {
    expect(formatCSSValue(1.618, 'rem')).toBe('1.618rem');
    expect(formatCSSValue(16, 'px')).toBe('16px');
    expect(formatCSSValue(0, 'rem')).toBe('0');
  });
});

describe('generateSpacingValue', () => {
  it('should generate correct spacing values', () => {
    const result = generateSpacingValue(8);
    expect(result.pixels).toBe(32);
    expect(result.value).toBe(2);
    expect(result.css).toBe('2rem');
  });

  it('should handle different Fibonacci numbers', () => {
    const result = generateSpacingValue(13);
    expect(result.pixels).toBe(52);
    expect(result.value).toBe(3.25);
  });
});

describe('generateFontSize', () => {
  it('should generate font sizes based on golden ratio', () => {
    const base = generateFontSize(0);
    expect(base.value).toBe(1);
    expect(base.css).toBe('1rem');

    const large = generateFontSize(1);
    expect(large.value).toBeCloseTo(1.618, 3);
  });
});

describe('divideByGoldenRatio', () => {
  it('should divide by golden ratio correctly', () => {
    const major = divideByGoldenRatio(100, true);
    expect(major).toBeCloseTo(61.8, 1);

    const minor = divideByGoldenRatio(100, false);
    expect(minor).toBeCloseTo(38.2, 1);
  });
});

describe('nearestFibonacci', () => {
  it('should find nearest Fibonacci number', () => {
    expect(nearestFibonacci(10)).toBe(8);
    expect(nearestFibonacci(20)).toBe(21);
    expect(nearestFibonacci(50)).toBe(55);
  });
});

describe('isGoldenRatio', () => {
  it('should identify golden ratio relationships', () => {
    expect(isGoldenRatio(21, 13)).toBe(true);
    expect(isGoldenRatio(8, 5)).toBe(true);
    expect(isGoldenRatio(10, 5)).toBe(false);
  });
});
