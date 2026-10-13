import { userDataAction } from "@/pages/private/actions/user.actions";
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

  // * aplicamos un efecto inmediato en el componente de una sola ejecucion (cuando el mismo se crea) para restaurar el usuario realizando el ciclo de peticion de los datos en caso de disponer del token
  useEffect(() => {
    // definimos funcion asincrona
    const restoreSession = async () => {
      let token: string | null;

      try {
        token = localStorage.getItem("token");
      } catch {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
        });
        return;
      }

      if (!token) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
        });
        return;
      }

      const result = await userDataAction(token);

      if (!result.ok) {
        try {
          localStorage.removeItem("token");
        } catch {
          // El navegador puede bloquear el almacenamiento local.
        }

        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
        });
        return;
      }

      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_RESTORED,
        payload: {
          token,
          user: result.data.data!,
        },
      });
    };
    // llamamos a al funcion asincrona
    void restoreSession();
  }, []);

  return <AuthContext value={{ state, dispatch }}>{children}</AuthContext>;
};
