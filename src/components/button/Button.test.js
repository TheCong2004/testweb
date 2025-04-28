import { render, screen } from '@testing-library/react';
import Button from './Button';

test('hiển thị văn bản prop "label"', () => {
  render(<Button label="Click me" />);
  const buttonElement = screen.getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});

