import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../Login';

// Mock axios
jest.mock('axios');

// Mock only MemoryRouter and useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }) => children,
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  const mockLogin = jest.fn();

  const renderLogin = () => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('successfully logs in with valid credentials', async () => {
    // Mock successful login response
    mockLogin.mockResolvedValueOnce({});

    renderLogin();

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Wait for the login to process
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });
  });
});