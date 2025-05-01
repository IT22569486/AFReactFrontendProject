import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CountryDetails from '../CountryDetails';
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn();

// Mock axios to prevent AuthContext errors
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  interceptors: {
    response: {
      use: jest.fn(),
      eject: jest.fn(),
    },
  },
}));

const mockCountryData = {
  name: { common: 'France' },
  flags: { png: 'https://flagcdn.com/fr.png' },
  capital: ['Paris'],
  population: 67391582,
  region: 'Europe',
  languages: { fra: 'French' },
};

// Utility to render component with context and router
const renderWithContextAndRouter = (user, code = 'FR') => {
  return render(
    <AuthContext.Provider value={{ user }}>
      <MemoryRouter initialEntries={[`/country/${code}`]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

// Custom text matcher for split text
const findByTextContent = (text) => (content, element) => {
  const hasText = (node) => node.textContent === text;
  const elementHasText = hasText(element);
  const childrenDontHaveText = Array.from(element.children).every((child) => !hasText(child));
  return elementHasText && childrenDontHaveText;
};

describe('CountryDetails Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    // Mock fetch to resolve immediately for tests where fetch isn't the focus
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [mockCountryData],
    });
  });

  it('redirects to home if user is not authenticated', () => {
    renderWithContextAndRouter(null);

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('displays loading state initially', async () => {
    // Mock fetch to return a pending promise to keep it in loading state
    fetch.mockReturnValue(new Promise(() => {}));

    renderWithContextAndRouter({ id: 1, email: 'test@example.com' });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays country details correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockCountryData],
    });

    renderWithContextAndRouter({ id: 1, email: 'test@example.com' });

    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    expect(screen.getByAltText('France flag')).toHaveAttribute('src', mockCountryData.flags.png);
    expect(screen.getByText(findByTextContent('Capital: Paris'))).toBeInTheDocument();
    expect(screen.getByText(findByTextContent('Population: 67,391,582'))).toBeInTheDocument();
    expect(screen.getByText(findByTextContent('Region: Europe'))).toBeInTheDocument();
    expect(screen.getByText(findByTextContent('Languages: French'))).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    renderWithContextAndRouter({ id: 1, email: 'test@example.com' });

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renders N/A for missing capital', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ ...mockCountryData, capital: undefined }],
    });

    renderWithContextAndRouter({ id: 1, email: 'test@example.com' });

    await waitFor(() => {
      expect(screen.getByText(findByTextContent('Capital: N/A'))).toBeInTheDocument();
    });
  });
});