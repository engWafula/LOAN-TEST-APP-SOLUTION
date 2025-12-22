import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  inline?: boolean;
}

const sizeClasses = {
  small: 'w-3.5 h-3.5 border-2',
  medium: 'w-8 h-8 border-[3px]',
  large: 'w-12 h-12 border-[3px]',
};

export function LoadingSpinner({ size = 'medium', message, inline = false }: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        'inline-block rounded-full animate-spin border-gray-200 border-t-primary',
        sizeClasses[size]
      )}
    />
  );

  if (inline) {
    return spinner;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {spinner}
      {message && <p className="mt-4 text-gray-500">{message}</p>}
    </div>
  );
}
