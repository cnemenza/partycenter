const Loader = ({ text }: { text: string }) => {
  return (
    <div className='absolute w-full h-full z-50 overflow-hidden flex flex-col items-center justify-center'>
      <span className='animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full h-12 w-12 mb-4'></span>
      <h2 className='text-center text-primary font-bold text-xl'>Loading...</h2>
      {text !== null && <p className='w-1/2 text-center text-black'>{text}</p>}
    </div>
  );
};

export { Loader };
