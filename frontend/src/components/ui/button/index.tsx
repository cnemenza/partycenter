import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva('btn gap-1.5', {
  variants: {
    variant: {
      primary: 'btn-primary text-white',
      danger: 'bg-danger text-white',
      outline: 'btn-outline-primary bg-transparent shadow-sm',
      dark: 'btn-dark'
    },
    size: {
      default: '',
      sm: 'btn-sm',
      lg: 'btn-lg',
      icon: 'h-9 w-9'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, loading = false, disabled, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && (
              <span className='animate-spin border-2 border-white border-l-transparent rounded-full w-3 h-3 inline-block align-middle'></span>
            )}
            {!loading && icon}
            {children}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn('group relative cursor-pointer', className)} ref={ref} {...props} />;
  }
);

export { Button, ButtonIcon, buttonVariants };
