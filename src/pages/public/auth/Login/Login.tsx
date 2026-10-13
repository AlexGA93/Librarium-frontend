import { AlertCircleIcon, BookOpenText, Lock, LockOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/pages/public/hooks/useAuth";
import type { LoginForm } from "@/types/login.interface";
import { constants } from "@/utils/constants";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { userDataAction } from "../../../private/actions/user.actions";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  // hooks
  const navigate = useNavigate();
  const [login, setLogin] = useState<LoginForm>({
    email: "johnDoe@mail.com",
    password: "9JoHnDoE3@",
  });
  const [showPass, setShowPass] = useState<boolean>(false);
  // custom hooks
  const { state, dispatch } = useAuth();
  const { mutateAsync: submitLogin, isPending } = useLogin();
  // methods
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLogin((currentLogin) => ({
      ...currentLogin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * Fase 1: iniciar el estado de carga y limpiar errores anteriores.
    dispatch({ type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_START });

    try {
      // *: peticion mediante tanstack query (y custom hook)
      // * Fase 2: enviar las credenciales al backend.
      // const loginResult = await loginAction(login);
      const loginResult = await submitLogin(login); 
      
      // * Fase 3: detener el flujo si el backend rechaza el inicio de sesión.
      if (!loginResult.ok) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR,
          payload: loginResult.message,
        });
        return;
      }

      // * Fase 4: comprobar que la respuesta incluya el token necesario.
      const token = loginResult.data.token;
      

      if (!token) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR,
          payload: "El servidor no devolvió un token",
        });
        return;
      }
      
      // * Fase 5: validar el token y obtener el perfil del usuario autenticado.
      const userResult = await userDataAction(token);

      

      if (!userResult.ok) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR,
          payload: userResult.message,
        });
        localStorage.removeItem('token');
        return;
      }

      // * Fase 6: persistir el token tras confirmar que el perfil se obtuvo correctamente.
      localStorage.setItem("token", token);

      // * Fase 7: guardar token y usuario en el estado global.
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_SUCCESS,
        payload: { token, user: userResult.data.data! },
      });

      // * Fase 8: informar del éxito y navegar al área privada.
      toast.success("Sesión iniciada correctamente");
      navigate("/private");
    } catch {
      // * Fase 9: limpiar el token si ocurre un error inesperado.
      try {
        localStorage.removeItem("token");
      } catch {
        // El navegador puede bloquear el acceso al almacenamiento local.
      }

      // * Fase 10: reflejar el error y finalizar el estado de carga.
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR,
        payload: "No se pudo completar el inicio de sesión",
      });
    }
  };

  return (
    <section className="animate__animated animate__fadeIn mx-auto flex min-h-[calc(100vh-1rem)] w-full max-w-md items-center justify-center px-3 sm:px-6">
      <div className="flex w-full flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-coral">
          <BookOpenText className=" size-8 text-white" aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="text-muted-foreground">
            Accede a tu santuario personal
          </p>
        </div>

        <div className="mt-6 w-ful">
          <form onSubmit={handleSubmit}>
            <Input
              className="my-2 bg-gray-100"
              name="email"
              type="email"
              placeholder="Email..."
              value={login.email}
              onChange={handleChange}
              required
            />
            <Field>
              <ButtonGroup>
                <Input
                  id="input-button-group"
                  className="bg-gray-100"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Clave..."
                  value={login.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? <LockOpen /> : <Lock />}
                </Button>
              </ButtonGroup>
            </Field>

            <Button
              type="submit"
              className="bg-brand-coral mt-8 h-11 w-full rounded-xl"
              size="lg"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Inicio de Sesion"}
            </Button>
            {state.error && (
              <Alert variant="destructive" className="max-w-md my-3">
                <AlertCircleIcon />
                <AlertTitle>Error durante Login</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </form>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No tienes una cuenta?{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            to="/auth/register"
          >
            Registrate
          </Link>
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Volver al{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            to="/"
          >
            Inicio
          </Link>
        </p>
      </div>
    </section>
  );
};
