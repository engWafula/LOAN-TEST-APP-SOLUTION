import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  inline?: boolean;
}

export function LoadingSpinner({ size = 'medium', message, inline = false }: LoadingSpinnerProps) {
  const spinner = (
    <div className={`loading-spinner loading-spinner--${size}`} />
  );

  if (inline) {
    return spinner;
  }

  return (
    <div className="loading-spinner__container">
      {spinner}
      {message && <p className="loading-spinner__message">{message}</p>}
    </div>
  );
}
