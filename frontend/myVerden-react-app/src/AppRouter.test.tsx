import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import AppRouter from './AppRouter';

vi.mock('./components/Pages/Login/LoginPage', () => ({
  default: () => <div>LoginPage</div>,
}));

vi.mock('./store/AuthStore', () => ({
  useAuthStore: vi.fn(),
}));

import { useAuthStore } from './store/AuthStore';

describe('AppRouter', () => {
  it('renders login page when not authenticated at /login', () => {
    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ isAuthenticated: false }),
    );
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('redirects to dashboard when authenticated at /login', () => {
    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ isAuthenticated: true }),
    );
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(screen.queryByText('LoginPage')).not.toBeInTheDocument();
  });

  it('redirects root to login when not authenticated', () => {
    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ isAuthenticated: false }),
    );
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('redirects root to dashboard when authenticated', () => {
    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ isAuthenticated: true }),
    );
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(screen.queryByText('LoginPage')).not.toBeInTheDocument();
  });
});
