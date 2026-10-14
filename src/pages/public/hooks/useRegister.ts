import { constants } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { registerAction } from "../auth/actions/authActions";
import { AuthError } from "../auth/actions/errors/auth.error";

/**
 * Gestiona el envío de un registro, que crea un usuario en el servidor.
 *
 * Se usa useMutation porque el registro es una operación iniciada explícitamente
 * por el usuario y con efectos en el servidor. useQuery ejecutaría la petición
 * al montar el componente y podría revalidarla, lo que no es apropiado para
 * crear una cuenta ni para guardar su resultado en una caché de consultas.
 *
 * El hook no recibe el formulario al crearse: el componente entrega el payload
 * a mutate/mutateAsync cuando se envía el formulario. mutationFn lo pasa a la
 * acción que realiza la petición Axios.
 */
export const useRegister = () => {
  const { dispatch } = useAuth();
  
  // * devolvemos el useMutation de tanstack-query y gestionamos las aciones y despachados
    return useMutation({
      // * mutacion que ejecuta la funcion que gestiona las tareas asincronas (llamada a la accion que gestiona la peticion a la API) y la gestion del token.
      mutationFn: registerAction,
      // * Esta función se dispara antes de que la función de mutación se ejecute, y recibe las mismas variables. Útil para actualizaciones optimistas aplicadas con la esperanza de que la mutación tenga éxito. El valor que devuelve se pasa a onSuccess, onError y onSettled como onMutateResult, que es donde generalmente se revierte una actualización optimista. Si se devuelve una promesa, se espera antes de que se ejecute la función de mutación.
      onMutate: () => {
        dispatch({ type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_START });
      },
      // * Esta función se dispara cuando la mutación tiene éxito, y se pasa el resultado de la mutación. Si se devuelve una promesa, se espera antes de que se ejecute onSettled.
      onSuccess: () => {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_SUCCESS,
        });
      },
      // * Esta función se dispara cuando la mutación encuentra un error, y se pasa el error. Si se devuelve una promesa, se espera antes de que se ejecute onSettled.
      onError: (error) => {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_ERROR,
          payload:
            error instanceof AuthError
              ? error.message
              : "No se pudo completar el inicio de sesión",
        });
      },
    });
}