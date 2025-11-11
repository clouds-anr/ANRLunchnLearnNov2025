import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchExercises from '../components/SearchExercises';
import * as exerciseApi from '../utils/exerciseApi';

// Mock the API module
vi.mock('../utils/exerciseApi');

describe('SearchExercises', () => {
  const mockSetExercises = vi.fn();
  const mockSetBodyPart = vi.fn();

  const mockExercises = [
    {
      id: '1',
      name: 'push up',
      bodyPart: 'chest',
      target: 'pectorals',
      equipment: 'body weight',
    },
    {
      id: '2',
      name: 'pull up',
      bodyPart: 'back',
      target: 'lats',
      equipment: 'body weight',
    },
    {
      id: '3',
      name: 'squat',
      bodyPart: 'upper legs',
      target: 'quadriceps',
      equipment: 'body weight',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    exerciseApi.fetchExercises.mockResolvedValue(mockExercises);
    exerciseApi.fetchExercisesByBodyPart.mockResolvedValue(mockExercises);
    exerciseApi.searchExercises.mockImplementation((term, exercises) =>
      exercises.filter((ex) => ex.name.toLowerCase().includes(term.toLowerCase()))
    );
  });

  it('should render search input and button', () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    expect(screen.getByPlaceholderText(/search exercises/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search button/i })).toBeInTheDocument();
  });

  it('should render body part filter buttons', () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    expect(screen.getByRole('button', { name: /filter by chest/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter by back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter by upper legs/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter by shoulders/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter by upper arms/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter by lower legs/i })).toBeInTheDocument();
  });

  it('should fetch exercises on mount', async () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalledWith(1000);
    });

    await waitFor(() => {
      expect(mockSetExercises).toHaveBeenCalledWith(mockExercises.slice(0, 9));
    });
  });

  it('should show loading indicator while fetching', async () => {
    exerciseApi.fetchExercises.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockExercises), 100))
    );

    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    expect(screen.getByLabelText(/loading exercises/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByLabelText(/loading exercises/i)).not.toBeInTheDocument();
    });
  });

  it('should update search input value', async () => {
    const user = userEvent.setup();
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText(/search exercises/i);
    await user.clear(input);
    await user.type(input, 'push');

    await waitFor(() => {
      expect(input).toHaveValue('push');
    });
  });

  it('should perform search when search button is clicked', async () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText(/search exercises/i);
    const searchButton = screen.getByRole('button', { name: /search button/i });

    fireEvent.change(input, { target: { value: 'push' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(exerciseApi.searchExercises).toHaveBeenCalledWith('push', mockExercises);
    });
  });

  it('should perform search when Enter key is pressed', async () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText(/search exercises/i);

    fireEvent.change(input, { target: { value: 'pull' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(exerciseApi.searchExercises).toHaveBeenCalledWith('pull', mockExercises);
    });
  });

  it('should fetch exercises by body part when filter button is clicked', async () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalled();
    });

    const chestButton = screen.getByRole('button', { name: /filter by chest/i });
    fireEvent.click(chestButton);

    await waitFor(() => {
      expect(exerciseApi.fetchExercisesByBodyPart).toHaveBeenCalledWith('chest');
    });

    await waitFor(() => {
      expect(mockSetBodyPart).toHaveBeenCalledWith('chest');
    });
  });

  it('should display error message on fetch failure', async () => {
    exerciseApi.fetchExercises.mockRejectedValue(new Error('API Error'));

    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load exercises/i)).toBeInTheDocument();
    });
  });

  it('should disable inputs while loading', async () => {
    exerciseApi.fetchExercisesByBodyPart.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockExercises), 100))
    );

    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalled();
    });

    const chestButton = screen.getByRole('button', { name: /filter by chest/i });
    fireEvent.click(chestButton);

    const input = screen.getByPlaceholderText(/search exercises/i);
    const searchButton = screen.getByRole('button', { name: /search button/i });

    expect(input).toBeDisabled();
    expect(searchButton).toBeDisabled();

    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });
  });

  it('should clear search when body part filter is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    await waitFor(() => {
      expect(exerciseApi.fetchExercises).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText(/search exercises/i);
    await user.type(input, 'push');

    const chestButton = screen.getByRole('button', { name: /filter by chest/i });
    fireEvent.click(chestButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should have proper accessibility attributes', () => {
    render(<SearchExercises setExercises={mockSetExercises} setBodyPart={mockSetBodyPart} />);

    const input = screen.getByPlaceholderText(/search exercises/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('aria-label', 'Search exercises');

    const searchButton = screen.getByRole('button', { name: /search button/i });
    expect(searchButton).toHaveAttribute('aria-label', 'Search button');
  });
});
