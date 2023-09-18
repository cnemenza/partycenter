'use client';

import React from 'react';
import { Toaster } from 'sonner';

function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position='top-right' visibleToasts={3} duration={6000} richColors closeButton={true} />
      {children}
    </>
  );
}

export default ToastProvider;
