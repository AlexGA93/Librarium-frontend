import { AlertCircleIcon, BookOpenText, Lock, LockOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import type { LoginForm } from "@/types/login.interface";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
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
  const { state } = useAuth();
  const { mutate: submitLogin, isPending } = useLogin();
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

    // * llamamos a la mutacion del custom hook gestionado por TanStack query
    submitLogin(login, {
      onSuccess: () => {
        toast.success("Sesión iniciada correctamente");
        navigate("/private");
      },
    });
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
