import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-900 mb-4">
      <p className="m-0 mb-3 last:mb-0">
        <strong>Error:</strong> {message}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-red-600 text-white hover:bg-red-700 focus:outline-2 focus:outline-red-600 focus:outline-offset-2"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
