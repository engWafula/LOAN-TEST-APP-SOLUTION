import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render spinner', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should render with message', () => {
    render(<LoadingSpinner message="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should render different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    let spinner = document.querySelector('.loading-spinner--small');
    expect(spinner).toBeInTheDocument();

    rerender(<LoadingSpinner size="medium" />);
    spinner = document.querySelector('.loading-spinner--medium');
    expect(spinner).toBeInTheDocument();

    rerender(<LoadingSpinner size="large" />);
    spinner = document.querySelector('.loading-spinner--large');
    expect(spinner).toBeInTheDocument();
  });

  it('should render inline when specified', () => {
    render(<LoadingSpinner size="small" inline />);
    const spinner = document.querySelector('.loading-spinner--small');
    expect(spinner).toBeInTheDocument();
    expect(spinner?.parentElement).not.toHaveClass('loading-spinner__container');
  });
});

