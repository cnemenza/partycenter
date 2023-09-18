import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='vertical full ltr main-section antialiased relative font-nunito text-default font-normal'>
      <div className='text-black dark:text-white-dark min-h-screen'>
        <div className='relative flex min-h-screen items-center justify-center overflow-hidden'>
          <div className='px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20'>
            <div className='relative'>
              <Image
                priority={false}
                width='0'
                height='0'
                sizes='100vw'
                src='/assets/images/404-light.svg'
                alt='404'
                className='mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl'
              />
              <p className='mt-5 text-xl dark:text-white'>The page you requested was not found!</p>
              <Link className='btn btn-primary mx-auto !mt-7 w-max border-0 uppercase shadow-none' href='/'>
                HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
