import { AuthRedirect } from '@/components/common/Auth-Redirect';
import { QueryClient } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import '@/styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const [queryClient] = useState(
  //   new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         staleTime: 1000 * 60 * 5, // 5 minutes
  //         cacheTime: Infinity,
  //         refetchOnWindowFocus: false,
  //         refetchOnMount: false,
  //       },
  //     },
  //   })
  // );

  return (
    <SessionProvider session={session}>
      <AuthRedirect />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
