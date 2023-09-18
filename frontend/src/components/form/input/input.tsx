import { cn } from '@/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, type, ...props }, ref) => {
  return (
    <>
      {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
      <input type={type} className={cn('form-input', className)} ref={ref} {...props} />
    </>
  );
});

export { Input };
