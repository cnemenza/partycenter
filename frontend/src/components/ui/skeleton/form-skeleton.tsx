import { cn } from '@/utils';

interface FormSkeletonProps {
  className?: string;
}

const FormSkeleton = ({ className }: FormSkeletonProps) => {
  return (
    <div className={cn('cursor-wait space-y-3', className)}>
      <div className='grid gap-4'>
        <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>
        <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='grid gap-y-2'>
          <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>
          <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
        </div>

        <div className='grid gap-y-2'>
          <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>
          <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
        </div>
      </div>

      <div className='grid gap-4'>
        <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>
        <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='grid gap-y-2'>
          <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>
          <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
        </div>

        <div className='grid gap-y-2'>
          <div className='bg-gray-200 h-4 animate-pulse rounded-lg w-6/12'></div>
          <div className='bg-gray-200 h-9 animate-pulse rounded-lg w-full'></div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
