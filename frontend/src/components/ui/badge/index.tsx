import { cn } from '@/utils';
import { VariantProps, cva } from 'class-variance-authority';

const badgeVariants = cva('badge', {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      danger: 'bg-danger',
      warning: 'bg-warning',
      info: 'bg-info',
      dark: 'bg-dark'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  text: string;
}

const Badge = ({ variant, text }: BadgeProps) => {
  return <span className={cn(badgeVariants({ variant }))}>{text}</span>;
};

export { Badge };
