import { BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export const Login = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-1rem)] w-full max-w-md items-center justify-center px-3 sm:px-6">
      <div className="flex w-full flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-black">
          <BookOpenText className="size-8 text-white" aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-muted-foreground">Accede a tu santuario personal</p>
        </div>

        <Button className="mt-8 h-11 w-full rounded-xl" size="lg">
          Inicio de Sesion
        </Button>

        <p className="mt-6 text-sm text-muted-foreground">
          No tienes una cuenta?{' '}
          <Link className="font-medium text-foreground underline underline-offset-4" to="/register">
            Registrate
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Volver a Inicio{' '}
          <Link className="font-medium text-foreground underline underline-offset-4" to="/">
            Registrate
          </Link>
        </p>
      </div>
    </section>
  )
}
