import { registerAction } from "@/actions/authActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import type { RegisterForm } from "@/types/auth.interfaces";
import { constants } from "@/utils/constants";
import axios from "axios";
import { AlertCircleIcon, BookOpenText, Lock, LockOpen } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  // custom hooks
  const { state, dispatch } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegister((currentRegister) => ({
      ...currentRegister,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(register);
    try {
      // despachamos la accion de REGISTER_START para reaccionar correctamente al proceso
      // loading: true
      // error: null
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_START,
      });

      // realizamos peticion
      const result = await registerAction(register);

      if (!result.ok) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_ERROR,
          payload: result.message,
        });
      } else {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_SUCCESS,
        });

        toast.success("Usuario registrado correctamente");

        navigate("/auth/login");
      }
    } catch (error: unknown) {
      let message = "No se pudo iniciar sesion";

      if (axios.isAxiosError(error)) {
        message = error.response?.data.message ?? message;
      }

      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_ERROR,
        payload: message,
      });
    }
  };

  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };
  return (
    <section className="animate__animated animate__fadeIn mx-auto flex min-h-[calc(100vh-1rem)] w-full max-w-md items-center justify-center px-3 sm:px-6">
      <div className="flex w-full flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-coral">
          <BookOpenText className="size-8 text-white" aria-hidden="true" />
        </div>

        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Crea tu cuenta
          </h1>
          <p className="text-muted-foreground">Comienza tu coleccion</p>
        </div>

        <div className="mt-6 w-ful">
          <form onSubmit={handleSubmit}>
            <Input
              className="my-2 bg-gray-100"
              name="name"
              type="text"
              placeholder="Usuario..."
              value={register.name}
              onChange={handleChange}
              required
            />
            <Input
              className="my-2 bg-gray-100"
              name="email"
              type="email"
              placeholder="Email..."
              value={register.email}
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
                  value={register.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleShowPass}
                >
                  {showPass ? <LockOpen /> : <Lock />}
                </Button>
              </ButtonGroup>
            </Field>

            <Button
              type="submit"
              className="bg-brand-coral mt-8 h-11 w-full rounded-xl"
              size="lg"
              disabled={state.loading}
            >
              {state.loading ? <Spinner /> : "Registrarse"}
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
          Ya tienes una cuenta?{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            to="/auth/login"
          >
            Inicia Sesion
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
