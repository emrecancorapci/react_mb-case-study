import Header from '@/components/layout/header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <Header />
      <main className="my-10 grid w-full grid-cols-6 flex-row justify-between gap-2">
        <Outlet />
      </main>
    </div>
  );
}
