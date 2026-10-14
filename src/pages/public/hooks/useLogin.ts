import { userDataAction } from "@/pages/private/actions/user.actions";
import type { LoginForm } from "@/types/login.interface";
import { constants } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../auth/actions/authActions";
import { AuthError } from "../auth/actions/errors/auth.error";
import { useAuth } from "./useAuth";

/**
 * Gestiona el inicio de sesión y la creación de la sesión autenticada.
 *
 * Se usa useMutation porque el login es una operación que inicia explícitamente
 * el usuario al enviar sus credenciales y que ejecuta efectos secundarios:
 * autentica contra el servidor, obtiene los datos del usuario y guarda el token.
 * useQuery no es adecuado porque ejecutaría la petición al montar el componente
 * y podría volver a validarla como parte de la caché de consultas.
 *
 * El hook no recibe las credenciales al crearse: el componente entrega el
 * payload a mutate/mutateAsync al enviar el formulario. mutationFn coordina las
 * peticiones necesarias y devuelve la sesión; los callbacks despachan al
 * reducer el inicio, el éxito o el error del flujo.
 */
export const useLogin = () => {
  const { dispatch } = useAuth();

  // * devolvemos el useMutation de tanstack-query y gestionamos las aciones y despachados
  return useMutation({
    // * mutacion que ejecuta la funcion que gestiona las tareas asincronas (llamada a la accion que gestiona la peticion a la API) y la gestion del token.
    mutationFn: async (payload: LoginForm) => {
      const response = await loginAction(payload);
      const token = response.token;

      if (!token) {
        throw new AuthError("El servidor no devolvió un token");
      }

      // TODO: modificar cuando adaptemos el user tambien
      const userResult = await userDataAction(token);

      if (!userResult.ok || !userResult.data.data) {
        throw new AuthError(
          userResult.ok
            ? "El servidor no devolvió los datos del usuario"
            : userResult.message,
        );
      }

      try {
        localStorage.setItem("token", token);
      } catch {
        throw new AuthError("No se pudo guardar la sesión en este navegador");
      }

      return { token, user: userResult.data.data };
    },
    // * Esta función se dispara antes de que la función de mutación se ejecute, y recibe las mismas variables. Útil para actualizaciones optimistas aplicadas con la esperanza de que la mutación tenga éxito. El valor que devuelve se pasa a onSuccess, onError y onSettled como onMutateResult, que es donde generalmente se revierte una actualización optimista. Si se devuelve una promesa, se espera antes de que se ejecute la función de mutación.
    onMutate: () => {
      dispatch({ type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_START });
    },
    // * Esta función se dispara cuando la mutación tiene éxito, y se pasa el resultado de la mutación. Si se devuelve una promesa, se espera antes de que se ejecute onSettled.
    onSuccess: (session) => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_SUCCESS,
        payload: session,
      });
    },
    // * Esta función se dispara cuando la mutación encuentra un error, y se pasa el error. Si se devuelve una promesa, se espera antes de que se ejecute onSettled.
    onError: (error) => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR,
        payload:
          error instanceof AuthError
            ? error.message
            : "No se pudo completar el inicio de sesión",
      });
    },
  });
};
