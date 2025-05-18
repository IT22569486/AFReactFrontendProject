import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryList from '../CountryList';


// ✅ Mock fetch
global.fetch = jest.fn();

// ✅ Mock child components that aren’t under test
jest.mock('../SearchBar', () => () => <div data-testid="mock-searchbar" />);
jest.mock('../Filter', () => () => <div data-testid="mock-filter" />);

describe('CountryList Component', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      capital: ['Washington, D.C.'],
      population: 331002651,
      region: 'Americas',
      flags: { png: 'https://flagcdn.com/us.png' },
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      capital: ['Ottawa'],
      population: 37742154,
      region: 'Americas',
      flags: { png: 'https://flagcdn.com/ca.png' },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCountries),
    });
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <CountryList />
      </MemoryRouter>
    );

    // Just verify nothing has rendered yet
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  test('displays countries after fetching data', async () => {
    render(
      <MemoryRouter>
        <CountryList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('Capital: Washington, D.C.')).toBeInTheDocument();
      expect(screen.getByText('Capital: Ottawa')).toBeInTheDocument();
      expect(screen.getByText('Population: 331,002,651')).toBeInTheDocument();
      expect(screen.getByText('Population: 37,742,154')).toBeInTheDocument();

      const regionElements = screen.getAllByText('Region: Americas');
      expect(regionElements).toHaveLength(2);

      expect(screen.getByAltText('United States flag')).toHaveAttribute('src', 'https://flagcdn.com/us.png');
      expect(screen.getByAltText('Canada flag')).toHaveAttribute('src', 'https://flagcdn.com/ca.png');

      const links = screen.getAllByRole('link', { name: /View Details/i });
      expect(links[0]).toHaveAttribute('href', '/country/USA');
      expect(links[1]).toHaveAttribute('href', '/country/CAN');
    });
  });

  test('handles fetch error gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <CountryList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('United States')).not.toBeInTheDocument();
      expect(screen.queryByText('Canada')).not.toBeInTheDocument();
    });

    console.error.mockRestore();
  });
});
