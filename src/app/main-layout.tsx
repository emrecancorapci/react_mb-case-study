import Header from '@/components/layout/header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <Header />
      <main className="my-10 flex w-full justify-center">
        <Outlet />
      </main>
    </div>
  );
}
