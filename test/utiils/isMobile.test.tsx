import { render, screen, waitFor } from '@testing-library/react';

import { useIsMobile } from '../../src/utils/isMobile'; // Adjust the path as needed

// Test component to use the hook
const TestComponent = () => {
  const isMobile = useIsMobile();
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
};

describe('useIsMobile Hook', () => {
  it('should return mobile for mobile user agents', async () => {
    // Mock the userAgent for mobile devices
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      },
      configurable: true,
    });

    render(<TestComponent />);

    // Wait for the effect to run and assert the text
    await waitFor(() => expect(screen.getByText('Mobile')).toBeInTheDocument());
  });

  it('should return desktop for non-mobile user agents', async () => {
    // Mock the userAgent for desktop devices
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      configurable: true,
    });

    render(<TestComponent />);

    // Wait for the effect to run and assert the text
    await waitFor(() => expect(screen.getByText('Desktop')).toBeInTheDocument());
  });
});
