import { LoginForm } from '@/components/features/auth/login/form/login-form';

function LoginPage() {
  return (
    <>
      <div className='flex flex-col items-center gap-8'>
        <h1 className='text-4xl font-bold text-gray-900'>Welcome</h1>
      </div>
      <div className='my-8'>
        <p
          className='
            text-center relative text-gray-500 bg-gray-100 before:max-w-[50px] 
            md:before:max-w-[120px] before:w-full before:-left-[60px] 
            md:before:-left-[140px] before:h-[1px] 
            before:bg-current before:absolute before:top-[50%] 
            after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] 
            after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]'
        >
          Enter your credentials
        </p>
      </div>
      <div className='w-full mb-8'>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
