import { cn } from '../../src/utils/cn';

describe('cn', () => {
  test('merges class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  test('removes duplicate classes using tailwind-merge', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  test('handles conditional class names', () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn('text-lg', false && 'hidden', 'p-4')).toBe('text-lg p-4');
  });

  test('handles empty inputs', () => {
    expect(cn()).toBe('');
  });

  test('handles undefined, null, or falsy values', () => {
    expect(cn(null, undefined, '', false, 'visible')).toBe('visible');
  });
});
