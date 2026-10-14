import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/pages/public/hooks/useAuth";
import type {
  RegisterForm,
  RegisterFormValues
} from "@/types/register.interface";
import { constants } from "@/utils/constants";
import { cn } from "cn";
import { AlertCircleIcon, BookOpenText, Lock, LockOpen } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../../hooks/useRegister";

export const Register = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [register, setRegister] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);

  // custom hooks
  const { state, dispatch } = useAuth(); // * estado global
  const { mutateAsync: submitRegister, isPending } = useRegister(); // * peticion mediante accion

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegister((currentRegister) => ({
      ...currentRegister,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * validamos que las claves sean iguales antes de hacer nada.
    if (register.password !== register.password2) {
      setIsError(true);
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_ERROR,
        payload: "Las claves no coinciden",
      });
      return;
    }

    setIsError(false);

    const payload: RegisterForm = {
      name: register.name,
      email: register.email,
      password: register.password,
    };

    submitRegister(payload, {
      onSuccess: () => {
        toast.success("Usuario registrado correctamente");
        navigate("/auth/login");
      },
    });
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

        <div className="mt-6 w-full">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              className="bg-gray-50"
              name="name"
              type="text"
              placeholder="Usuario..."
              value={register.name}
              onChange={handleChange}
              required
            />
            <Input
              className="bg-gray-50"
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
                  className={cn("bg-gray-50", isError && "border-red-500")}
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
            <Field>
              <ButtonGroup>
                <Input
                  id="input-button-group"
                  className={cn("bg-gray-50", isError && "border-red-500")}
                  name="password2"
                  type={showPass ? "text" : "password"}
                  placeholder="Repetir Clave..."
                  value={register.password2}
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
              className="bg-brand-coral h-11 w-full rounded-xl"
              size="lg"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Registrarse"}
            </Button>
            {state.error && (
              <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Error durante el registro</AlertTitle>
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
