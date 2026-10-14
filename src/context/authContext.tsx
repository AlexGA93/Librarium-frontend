import { userDataAction } from "@/pages/private/actions/user.actions";
import { AuthError } from "@/pages/public/auth/actions/errors/auth.error";
import { authReducer } from "@/reducers/authReducer";
import type {
  AuthContextValue,
  AuthInitialState,
} from "@/types/auth.interfaces";
import { constants } from "@/utils/constants";
import {
  createContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";

// initial state
const initialState: AuthInitialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: "",
  authReady: false,
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // usamos useReducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // * inspeccionamos el estado del provider para ver el historial de acciones
  const dispatchWithLog: AuthContextValue["dispatch"] = (action) => {
    if (import.meta.env.VITE_DEV === "true") {
      console.log("[auth action]", action);
    }

    dispatch(action);
  };

  // * aplicamos un efecto inmediato en el componente de una sola ejecucion (cuando el mismo se crea) para restaurar el usuario realizando el ciclo de peticion de los datos en caso de disponer del token
  useEffect(() => {
    // definimos funcion asincrona
    const restoreSession = async () => {
      let token: string | null;

      try {
        token = localStorage.getItem("token");
      } catch {
        dispatchWithLog({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
        });
        return;
      }

      if (!token) {
        dispatchWithLog({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
        });
        return;
      }

      try {
        const response = await userDataAction(token);
        const user = response.data;

        if (!user) {
          throw new AuthError(
            response.message || "El servidor no devolvió los datos del usuario",
          );
        }

        dispatchWithLog({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_RESTORED,
          payload: { token, user },
        });
      } catch (error: unknown) {
        if (error instanceof AuthError && error.statusCode === 401) {
          try {
            localStorage.removeItem("token");
          } catch (storageError: unknown) {
            console.error("No se pudo eliminar el token inválido.", storageError);
          }
        } else {
          console.error("No se pudo restaurar la sesión.", error);
        }

        dispatchWithLog({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
        });
      }
    };
    // llamamos a al funcion asincrona
    void restoreSession();
  }, []);

  return (
    <AuthContext value={{ state, dispatch: dispatchWithLog }}>
      {children}
    </AuthContext>
  );
};
