import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/utils';
import userEvent from '@testing-library/user-event';
import { FormInput } from '../FormInput';

describe('FormInput', () => {
  it('should render input element', () => {
    render(<FormInput />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<FormInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should render with value', () => {
    render(<FormInput value="Test value" onChange={vi.fn()} />);
    const input = screen.getByDisplayValue('Test value');
    expect(input).toHaveValue('Test value');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<FormInput disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should be required when required prop is true', () => {
    render(<FormInput required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('should have correct type attribute', () => {
    const { rerender } = render(<FormInput type="text" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');

    rerender(<FormInput type="email" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<FormInput type="password" data-testid="password-input" />);
    input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FormInput onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    
    expect(onChange).toHaveBeenCalled();
  });



  it('should support number input type', () => {
    render(<FormInput type="number" step="0.01" min="0" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('step', '0.01');
    expect(input).toHaveAttribute('min', '0');
  });

  it('should support date input type', () => {
    render(<FormInput type="date" />);
    const input = document.querySelector('input[type="date"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

});