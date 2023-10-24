import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Home from './app/home';
import Layout from './app/main-layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </>,
  ),
);
