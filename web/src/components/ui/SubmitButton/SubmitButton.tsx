import { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends Omit<ButtonProps, 'children'> {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function SubmitButton({
  children,
  loading = false,
  loadingText,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || loading;
  const displayText = loading && loadingText ? loadingText : children;
  const displayIcon = loading ? (
    <Loader size="sm" className={cn(iconPosition === 'left' ? 'mr-2' : 'ml-2')} />
  ) : icon ? (
    <span className={cn(iconPosition === 'left' ? 'mr-2' : 'ml-2')}>{icon}</span>
  ) : null;

  return (
    <Button className={className} disabled={isDisabled} {...props}>
      {iconPosition === 'left' && displayIcon}
      {displayText}
      {iconPosition === 'right' && displayIcon}
    </Button>
  );
}

