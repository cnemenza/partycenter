import { cn } from '@/utils';

interface InputSkeletonProps {
  hasLabel: boolean;
  className?: string;
}

const InputSkeleton = ({ hasLabel, className }: InputSkeletonProps) => {
  return (
    <div className={cn('grid gap-y-2 cursor-wait', className)}>
      {hasLabel && <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>}
      <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
    </div>
  );
};

export { InputSkeleton };
