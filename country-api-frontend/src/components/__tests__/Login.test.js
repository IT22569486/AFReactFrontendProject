import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { AuthContext } from '../../context/AuthContext';

// Mock login function
const mockLogin = jest.fn();

const renderWithAuthContext = () => {
  return render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <Login />
    </AuthContext.Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  test('renders login form fields and button', () => {
    renderWithAuthContext();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('calls login function on form submission', async () => {
    mockLogin.mockResolvedValueOnce(); // simulate successful login

    renderWithAuthContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'rrr@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '12345678' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('rrr@gmail.com', '12345678');
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  test('displays error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    renderWithAuthContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('wrong@example.com', 'wrongpass');
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
