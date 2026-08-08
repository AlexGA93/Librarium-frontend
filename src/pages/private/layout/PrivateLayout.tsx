import { Outlet } from 'react-router-dom';

export const PrivateLayout = () => {
  return (
    <section>
      <Outlet />
    </section>
  )
}
