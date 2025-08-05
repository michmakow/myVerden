import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from './LoginPage';
import { useAuthStore } from '@/store/AuthStore';
import { useNavigate } from 'react-router-dom';

vi.mock('@/assets/myVerden_logo_big.svg', () => ({ default: 'logo.svg' }));
vi.mock('@/assets/login_page_picture.png', () => ({ default: 'picture.png' }));
vi.mock('@/assets/login_page_sketch.png', () => ({ default: 'sketch.png' }));

vi.mock('@/store/AuthStore', () => ({ useAuthStore: vi.fn() }));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

describe('LoginPage', () => {
  it('handles interactions and submission', async () => {
    vi.useFakeTimers();
    const login = vi.fn();
    const navigate = vi.fn();
    (useAuthStore as any).mockImplementation((selector: any) => selector({ login }));
    (useNavigate as any).mockReturnValue(navigate);

    render(<LoginPage />);

    const container = screen.getByAltText('login_page_sketch').parentElement as HTMLElement;
    fireEvent.mouseMove(container, { clientX: 10, clientY: 10 });
    fireEvent.mouseLeave(container);

    const form = container.querySelector('form')!;
    fireEvent.mouseEnter(form);
    fireEvent.mouseMove(container, { clientX: 20, clientY: 20 });
    fireEvent.mouseLeave(form);

    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });

    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons[0];
    const submitButton = buttons[1];

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');

    expect(submitButton).toHaveTextContent('LOG IN');
    fireEvent.click(submitButton);
    expect(submitButton).not.toHaveTextContent('LOG IN');

    await vi.advanceTimersByTimeAsync(5000);
    expect(login).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/dashboard');

    vi.useRealTimers();
  });
});
