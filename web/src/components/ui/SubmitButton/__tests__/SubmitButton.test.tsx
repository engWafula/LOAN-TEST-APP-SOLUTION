import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { SubmitButton } from '../SubmitButton';

describe('SubmitButton', () => {
  it('should render button with children', () => {
    render(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should render button with custom text', () => {
    render(<SubmitButton>Add Payment</SubmitButton>);
    expect(screen.getByRole('button', { name: 'Add Payment' })).toBeInTheDocument();
  });

  it('should be disabled when loading is true', () => {
    render(<SubmitButton loading>Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<SubmitButton disabled>Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should be disabled when both loading and disabled are true', () => {
    render(<SubmitButton loading disabled>Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });


})