import Image from 'next/image';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col items-center justify-center bg-gray-100 rounded-tl-lg rounded-bl-lg p-4'>
        <div className='my-2'>
          <Image src='/assets/images/logo.png' priority={false} alt='Party Center' width='150' height='100' />
        </div>
        {children}
      </div>
      <div className='bg-[#0058e5] hidden lg:flex items-center justify-center'>
        <Image
          src='/assets/images/auth-background.jpg'
          alt='Auth Background'
          priority={false}
          width='0'
          height='0'
          sizes='100vw'
          className='w-full object-cover'
        />
      </div>
    </div>
  );
}

export default Layout;
