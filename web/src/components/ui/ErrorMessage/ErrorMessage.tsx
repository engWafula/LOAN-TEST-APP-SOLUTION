import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p className="error-message__text">
        <strong>Error:</strong> {message}
      </p>
      {onRetry && (
        <button className="error-message__button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
