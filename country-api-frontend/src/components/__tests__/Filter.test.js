import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from '../Filter';

// Mock fetch
global.fetch = jest.fn();

// Mock window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('Filter Component', () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { cca3: 'USA', name: { common: 'United States' }, region: 'Americas' },
      ]),
    });
  });

  test('renders dropdown with all region options', () => {
    render(<Filter onFilter={mockOnFilter} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  test('calls onFilter with fetched data when a valid region is selected', async () => {
    render(<Filter onFilter={mockOnFilter} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Americas' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v2/region/Americas');
      expect(mockOnFilter).toHaveBeenCalledWith([
        { cca3: 'USA', name: { common: 'United States' }, region: 'Americas' },
      ]);
    });
  });

  test('shows alert when empty region is selected', () => {
    render(<Filter onFilter={mockOnFilter} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });

    expect(mockAlert).toHaveBeenCalledWith('Please select a valid region to filter by.');
    expect(fetch).not.toHaveBeenCalled();
    expect(mockOnFilter).not.toHaveBeenCalled();
  });

  test('handles fetch error gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockRejectedValue(new Error('Network error'));

    render(<Filter onFilter={mockOnFilter} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Africa' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v2/region/Africa');
      expect(mockOnFilter).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error filtering:', expect.any(Error));
    });

    console.error.mockRestore();
  });
});