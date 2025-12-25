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
    const input = screen.getByDisplayValue('Test value') as HTMLInputElement;
    expect(input.value).toBe('Test value');
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
    let input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('text');

    rerender(<FormInput type="email" />);
    input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');

    rerender(<FormInput type="password" data-testid="password-input" />);
    input = screen.getByTestId('password-input') as HTMLInputElement;
    expect(input.type).toBe('password');
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
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.type).toBe('number');
    expect(input.step).toBe('0.01');
    expect(input.min).toBe('0');
  });

  it('should support date input type', () => {
    render(<FormInput type="date" />);
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('date');
  });

});