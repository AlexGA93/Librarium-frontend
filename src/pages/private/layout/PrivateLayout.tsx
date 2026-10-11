import { Outlet } from 'react-router-dom';
import { PrivateSideBar } from '../components/PrivateSideBar/PrivateSideBar';

export const PrivateLayout = () => {
  return (
    <section className="flex min-h-screen">
    <PrivateSideBar />
    <main className="min-w-0 flex-1 pt-6 text-foreground">
      <Outlet />
    </main>
  </section>
  )
}
