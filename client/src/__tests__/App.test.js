import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders learn react link', () => {
  render(<App />);
  const text = screen.getByText('SECONDS (UPTIME)');
  expect(text).toBeInTheDocument();
});
