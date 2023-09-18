import { cn } from '@/utils';
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...props }, ref) => {
  return label ? (
    <label className='inline-flex'>
      <input ref={ref} type='checkbox' className={cn('form-checkbox border-primary', className)} {...props} />
      <span>{label}</span>
    </label>
  ) : (
    <input ref={ref} type='checkbox' className={cn('form-checkbox border-primary', className)} {...props} />
  );
});

export { Checkbox };
