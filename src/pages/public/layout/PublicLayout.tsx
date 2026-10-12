import { Outlet } from "react-router-dom"

export const PublicLayout = () => {
  return (
    <section className='min-h-screen p-2 m-2'>
      <Outlet />
    </section>
  )
}
