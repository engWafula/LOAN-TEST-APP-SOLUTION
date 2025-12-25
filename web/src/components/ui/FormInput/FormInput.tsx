import * as React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FormInputProps extends InputProps {
  error?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Input
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FormInput.displayName = 'FormInput';

export { FormInput };

