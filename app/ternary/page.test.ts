import { render, screen, waitFor } from '@testing-library/react';
import Page from './page';
import { GETMethod } from '../api/greet/route';

jest.mock('../api/greet/route', () => ({
  GETMethod: jest.fn(),
}));

describe('Page component', () => {
  it('renders loading state initially', async () => {
    // Mocking the response data
    const mockData = [
      { id: 1, title: 'Test Title 1' },
      { id: 2, title: 'Test Title 2' },
    ];
    GETMethod.mockResolvedValue(mockData);

    render(<Page />);

    // Assert that "Loading..." text is present initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the loading state to resolve
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Assert that the fetched data is rendered
    expect(screen.getByText('This is a title Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('This is a title Test Title 2')).toBeInTheDocument();
  });

  it('renders error state if fetching fails', async () => {
    // Mocking the error
    const errorMessage = 'Failed to fetch data';
    GETMethod.mockRejectedValue(new Error(errorMessage));

    render(<Page />);

    // Assert that "Loading..." text is present initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the loading state to resolve
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Assert that the error message is rendered
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
