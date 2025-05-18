import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';

// Mock fetch
global.fetch = jest.fn();

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { cca3: 'USA', name: { common: 'United States' }, region: 'Americas' },
      ]),
    });
  });

  test('renders search input with placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a country...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('form-control');
  });

  test('calls onSearch with fetched data when query length is greater than 2', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'United' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v2/name/United');
      expect(mockOnSearch).toHaveBeenCalledWith([
        { cca3: 'USA', name: { common: 'United States' }, region: 'Americas' },
      ]);
    });
  });

  test('does not call fetch when query length is 2 or less', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Un' } });

    expect(fetch).not.toHaveBeenCalled();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('handles fetch error gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockRejectedValue(new Error('Network error'));

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'United' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v2/name/United');
      expect(mockOnSearch).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error searching:', expect.any(Error));
    });

    console.error.mockRestore();
  });

  test('handles non-ok response gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    });

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'United' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v2/name/United');
      expect(mockOnSearch).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error searching:', expect.any(Error));
    });

    console.error.mockRestore();
  });
});