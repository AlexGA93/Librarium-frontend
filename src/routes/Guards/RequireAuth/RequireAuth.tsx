import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: PropsWithChildren) => {
  // accedemos al estado global
  const { state } = useAuth();
  // accedemos a la ruta
  const location = useLocation();

  // * COMPROBACIONES
  // * 1 - Si el estado pone que aun no esta ready, esta cargado, mostramos spinner
  if (!state.authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  // * 2 - Si el estado refleja que se ha iniciado sesion, redirigimos
  if (!state.isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }
  // * 3- Si no se da otra opcion, navegamos a los hijos
  return children;
};
