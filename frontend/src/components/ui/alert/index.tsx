import { cn } from '@/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const alertVariants = cva('flex items-center p-3.5 rounded', {
  variants: {
    variant: {
      primary: 'text-white bg-primary',
      danger: 'text-white bg-danger',
      warning: 'text-white bg-warning',
      info: 'text-white bg-info',
      dark: 'text-white bg-dark'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  message: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant, title, message }, ref) => {
  return (
    <div ref={ref} className={cn(alertVariants({ variant, className }))}>
      <span className='ltr:pr-2 rtl:pl-2'>
        {title && <strong className='ltr:mr-1 rtl:ml-1'>{title}</strong>} {message}
      </span>
    </div>
  );
});

export { Alert };
