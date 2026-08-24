import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { BookOpenText, Lock, LockOpen } from 'lucide-react'
import React, { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

interface Register {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const [register, setRegister] = useState<Register>({name:"",email: "", password: ""});
    const [showPass,setShowPass] = useState<boolean>(false);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
  
      setRegister((currentRegister) => ({
        ...currentRegister,
        [name]: value,
      }))
    };
  
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(register);
      // TODO: dispatch de la accion de registro para el estado global de usuario
    };
  
    const toggleShowPass = () => {
      setShowPass(prev => !prev);
    };
  return (
    <section className="animate__animated animate__fadeIn mx-auto flex min-h-[calc(100vh-1rem)] w-full max-w-md items-center justify-center px-3 sm:px-6">
      <div className="flex w-full flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-black">
          <BookOpenText className="size-8 text-white" aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Crea tu cuenta</h1>
          <p className="text-muted-foreground">Comienza tu coleccion</p>
        </div>

        <div className="mt-6 w-ful">
          <form onSubmit={handleSubmit}>
            <Input
              className='my-2 bg-gray-100'
              name='name'
              type='text'
              placeholder='Usuario...'
              value={register.name}
              onChange={handleChange}
              required
            />
            <Input
              className='my-2 bg-gray-100'
              name='email'
              type='email'
              placeholder='Email...'
              value={register.email}
              onChange={handleChange}
              required
            />
            <Field>
              <ButtonGroup>
                <Input
                  id="input-button-group"
                  className='bg-gray-100'
                  name='password'
                  type={showPass ? 'text':'password'}
                  placeholder='Clave...'
                  value={register.password}
                  onChange={handleChange}
                  required
                />
                <Button type='button' variant='outline' onClick={toggleShowPass}>
                  {
                    showPass ? (<LockOpen />) : (<Lock />)
                  }
                  
                </Button>
              </ButtonGroup>
            </Field>
            
             <Button type='submit' className="mt-8 h-11 w-full rounded-xl" size="lg">
              Registrarse
              <Spinner />
        </Button>
          </form>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Ya tienes una cuenta?{' '}
          <Link className="font-medium text-foreground underline underline-offset-4" to="/login">
            Inicia Sesion
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Volver al{' '}
          <Link className="font-medium text-foreground underline underline-offset-4" to="/">
            Inicio
          </Link>
        </p>
      </div>
    </section>
  )
}
