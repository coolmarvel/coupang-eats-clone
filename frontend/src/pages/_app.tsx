import '@/styles/globals.css';
import { QueryClient } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          cacheTime: Infinity,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    })
  );

  return <Component {...pageProps} />;
}
