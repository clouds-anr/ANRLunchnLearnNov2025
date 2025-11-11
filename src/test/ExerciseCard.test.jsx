import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExerciseCard from '../components/ExerciseCard';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ExerciseCard', () => {
  const mockExercise = {
    id: '1',
    name: 'push up',
    bodyPart: 'chest',
    target: 'pectorals',
    equipment: 'body weight',
    gifUrl: 'https://example.com/pushup.gif',
  };

  it('should render exercise card with all information', () => {
    renderWithRouter(<ExerciseCard exercise={mockExercise} />);

    expect(screen.getByText(/push up/i)).toBeInTheDocument();
    expect(screen.getByText(/chest/i)).toBeInTheDocument();
    expect(screen.getByText(/pectorals/i)).toBeInTheDocument();
    expect(screen.getByText(/body weight/i)).toBeInTheDocument();
    expect(screen.getByText(/Target Muscle/i)).toBeInTheDocument();
    expect(screen.getByText(/Equipment/i)).toBeInTheDocument();
  });

  it('should render image when gifUrl is provided', () => {
    renderWithRouter(<ExerciseCard exercise={mockExercise} />);

    const image = screen.getByAltText('push up');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockExercise.gifUrl);
  });

  it('should render placeholder icon when no gifUrl is provided', () => {
    const exerciseWithoutGif = { ...mockExercise, gifUrl: null };
    const { container } = renderWithRouter(<ExerciseCard exercise={exerciseWithoutGif} />);

    const icon = container.querySelector('svg[data-testid="FitnessCenterIcon"]');
    expect(icon).toBeInTheDocument();
  });

  it('should link to exercise detail page', () => {
    const { container } = renderWithRouter(<ExerciseCard exercise={mockExercise} />);

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', `/exercise/${mockExercise.id}`);
  });

  it('should have proper accessibility attributes', () => {
    renderWithRouter(<ExerciseCard exercise={mockExercise} />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'Exercise: push up');
  });

  it('should render detail sections with icons', () => {
    const { container } = renderWithRouter(<ExerciseCard exercise={mockExercise} />);

    // Check for icons
    const targetMuscleIcon = container.querySelector('svg[data-testid="SportsMartialArtsIcon"]');
    const equipmentIcon = container.querySelector('svg[data-testid="BuildIcon"]');
    
    expect(targetMuscleIcon).toBeInTheDocument();
    expect(equipmentIcon).toBeInTheDocument();
  });

  it('should capitalize exercise information', () => {
    renderWithRouter(<ExerciseCard exercise={mockExercise} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveStyle({ textTransform: 'capitalize' });
  });
});
