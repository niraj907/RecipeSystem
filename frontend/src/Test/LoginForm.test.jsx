// LoginForm.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@/components/store/authStore';

// Mock the store
jest.mock('../components/store/authStore', () => ({
  useAuthStore: jest.fn(),
}));


// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Wrapper to include routing context
const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe('LoginForm', () => {
  beforeEach(() => {
    useAuthStore.mockReturnValue({
      login: jest.fn(() => Promise.resolve()),
      loading: false,
      error: null,
    });
  });

  it('renders email and password fields', () => {
    render(<LoginForm />, { wrapper: Wrapper });

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
  });

  it('shows validation error when fields are empty and submit is clicked', async () => {
    render(<LoginForm />, { wrapper: Wrapper });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('calls login function on valid form submission', async () => {
    const mockLogin = jest.fn(() => Promise.resolve());
    useAuthStore.mockReturnValue({
      login: mockLogin,
      loading: false,
      error: null,
    });

    render(<LoginForm />, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: '1234' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', '1234');
    });
  });
});
