import { ProgressProvider, QueryClientProvider, StoreProvider, ToastProvider } from '@/components/providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Party Center Online',
  description: 'Party Center Web Control'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' dir='ltr'>
      <body className={`${nunito.className}`}>
        <ProgressProvider>
          <QueryClientProvider>
            <StoreProvider>
              <ToastProvider>{children}</ToastProvider>
            </StoreProvider>
          </QueryClientProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
