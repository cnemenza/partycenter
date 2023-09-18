'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';

function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
      <ProgressBar height='6px' color='#2441a8' options={{ showSpinner: true }} shallowRouting />
    </React.Fragment>
  );
}

export default ProgressProvider;
