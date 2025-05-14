import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '@/components/auth/ForgotPassword';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@/components/store/authStore';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('@/components/store/authStore', () => ({
  useAuthStore: jest.fn()
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  }
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows an error toast when email is empty', async () => {
    useAuthStore.mockReturnValue({
      isLoading: false,
      error: null,
      forgotPassword: jest.fn()
    });

    renderWithRouter(<ForgotPassword />);

    const submitButton = screen.getByText(/send reset link/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("please field the email required!");
    });
  });

  it('calls forgotPassword when email is provided', async () => {
    const mockForgotPassword = jest.fn().mockResolvedValue();
    useAuthStore.mockReturnValue({
      isLoading: false,
      error: null,
      forgotPassword: mockForgotPassword,
    });

    renderWithRouter(<ForgotPassword />);

    const input = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText(/send reset link/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
    });

    expect(screen.getByText(/you will receive a password reset link shortly/i)).toBeInTheDocument();
  });

  it('shows error toast if forgotPassword throws error', async () => {
    const mockForgotPassword = jest.fn().mockRejectedValue(new Error('Email not found'));
    useAuthStore.mockReturnValue({
      isLoading: false,
      error: 'Email not found',
      forgotPassword: mockForgotPassword,
    });

    renderWithRouter(<ForgotPassword />);

    const input = screen.getByPlaceholderText(/email address/i);
    fireEvent.change(input, { target: { value: 'wrong@example.com' } });

    const submitButton = screen.getByText(/send reset link/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email not found");
    });
  });
});
