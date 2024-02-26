import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 404 page', () => {
  render(<App />);
  expect(screen.getByText(/Looks like that page doesn't exist./)).toBeInTheDocument();
});
