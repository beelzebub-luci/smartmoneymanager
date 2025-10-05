import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Money Manager app', () => {
  render(<App />);
  const appTitle = screen.getByText(/Smart Money Manager/i);
  expect(appTitle).toBeInTheDocument();
});
