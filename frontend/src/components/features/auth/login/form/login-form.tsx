'use client';

import { Alert } from '@/components/ui/alert';
import { login } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as z from 'zod';

function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(validationSchema)
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      router.replace('/dashboard');
    },
    onError: () => {
      setIsLoading(false);
    }
  });

  const onSubmit = async (values: any) => {
    loginMutation.mutate(values);
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
      {loginMutation.isError && (
        <div className='flex justify-center'>
          <Alert variant='danger' className='w-full max-w-md' message={loginMutation.error} />
        </div>
      )}

      <div className={`text-center ${errors.username ? 'has-error' : ''}`}>
        <input
          {...register('username')}
          className='w-full max-w-md py-2 px-4 rounded-lg outline-none form-input'
          name='username'
          type='text'
          placeholder='Username'
        />
      </div>
      <div className={`text-center ${errors.password ? 'has-error' : ''}`}>
        <input
          {...register('password')}
          className='w-full max-w-md py-2 px-4 rounded-lg outline-none form-input '
          name='password'
          type='password'
          placeholder='Password'
        />
      </div>
      <div className='w-full max-w-md mx-auto'>
        <button
          disabled={isLoading}
          type='submit'
          className='disabled:pointer-events-none disabled:opacity-60 font-bold w-full bg-[#0058e5] py-2 px-4 rounded-lg text-white hover:bg-gray-300 hover:text-black transition-colors'
        >
          {isLoading ? 'Sending...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
export { LoginForm };
