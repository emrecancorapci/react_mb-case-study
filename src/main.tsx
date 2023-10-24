import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { RouterProvider } from 'react-router-dom';
import ThemeProvider from './providers/theme-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
