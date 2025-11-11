import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Exercises from '../components/Exercises';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Exercises', () => {
  const mockExercises = [
    {
      id: '1',
      name: 'push up',
      bodyPart: 'chest',
      target: 'pectorals',
      equipment: 'body weight',
      gifUrl: 'https://example.com/pushup.gif',
    },
    {
      id: '2',
      name: 'pull up',
      bodyPart: 'back',
      target: 'lats',
      equipment: 'body weight',
      gifUrl: 'https://example.com/pullup.gif',
    },
  ];

  it('should render exercises when provided', () => {
    renderWithRouter(<Exercises exercises={mockExercises} bodyPart="" />);

    expect(screen.getByText(/push up/i)).toBeInTheDocument();
    expect(screen.getByText(/pull up/i)).toBeInTheDocument();
  });

  it('should display exercise count', () => {
    renderWithRouter(<Exercises exercises={mockExercises} bodyPart="" />);

    expect(screen.getByText(/\(2 exercises\)/i)).toBeInTheDocument();
  });

  it('should display singular exercise count for single exercise', () => {
    renderWithRouter(<Exercises exercises={[mockExercises[0]]} bodyPart="" />);

    expect(screen.getByText(/\(1 exercise\)/i)).toBeInTheDocument();
  });

  it('should display body part in title when provided', () => {
    renderWithRouter(<Exercises exercises={mockExercises} bodyPart="chest" />);

    expect(screen.getByText(/chest exercises/i)).toBeInTheDocument();
  });

  it('should display default title when no body part provided', () => {
    renderWithRouter(<Exercises exercises={mockExercises} bodyPart="" />);

    expect(screen.getByText(/showing results/i)).toBeInTheDocument();
  });

  it('should display empty state when no exercises', () => {
    renderWithRouter(<Exercises exercises={[]} bodyPart="" />);

    expect(
      screen.getByText(/no exercises found\. try a different search or filter\./i)
    ).toBeInTheDocument();
  });

  it('should display empty state when exercises is null', () => {
    renderWithRouter(<Exercises exercises={null} bodyPart="" />);

    expect(
      screen.getByText(/no exercises found\. try a different search or filter\./i)
    ).toBeInTheDocument();
  });

  it('should render exercise cards in a grid', () => {
    const { container } = renderWithRouter(<Exercises exercises={mockExercises} bodyPart="" />);

    const grid = container.querySelector('.MuiGrid-container');
    expect(grid).toBeInTheDocument();
  });

  it('should have exercises section with id', () => {
    const { container } = renderWithRouter(<Exercises exercises={mockExercises} bodyPart="" />);

    const section = container.querySelector('#exercises');
    expect(section).toBeInTheDocument();
  });
});
