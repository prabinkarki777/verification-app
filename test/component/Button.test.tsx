import { render, screen, fireEvent } from '@testing-library/react';

import Button from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders with the correct label', () => {
    render(<Button label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('applies the correct styles for primary variant', () => {
    render(<Button label="Primary Button" variant="primary" />);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('btn-primary');
    expect(button).toHaveClass('text-white');
  });

  it('applies the correct styles for secondary variant', () => {
    render(<Button label="Secondary Button" variant="secondary" />);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-gray-500');
    expect(button).toHaveClass('text-white');
  });

  it('applies the correct styles for danger variant', () => {
    render(<Button label="Danger Button" variant="danger" />);
    const button = screen.getByText('Danger Button');
    expect(button).toHaveClass('bg-red-500');
    expect(button).toHaveClass('text-white');
  });

  it('applies the correct size classes for sm size', () => {
    render(<Button label="Small Button" size="sm" />);
    const button = screen.getByText('Small Button');
    expect(button).toHaveClass('px-5');
    expect(button).toHaveClass('py-2');
  });

  it('applies the correct size classes for md size', () => {
    render(<Button label="Medium Button" size="md" />);
    const button = screen.getByText('Medium Button');
    expect(button).toHaveClass('px-12');
    expect(button).toHaveClass('py-2.5');
  });

  it('applies the correct size classes for lg size', () => {
    render(<Button label="Large Button" size="lg" />);
    const button = screen.getByText('Large Button');
    expect(button).toHaveClass('px-15');
    expect(button).toHaveClass('py-3.5');
  });

  it('fires click event correctly', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
