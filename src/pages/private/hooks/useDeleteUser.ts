import { useAuth } from "@/hooks/useAuth";
import { AuthError } from "@/pages/public/auth/actions/errors/auth.error";
import { constants } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { deleteUserDataAction } from "../actions/user.actions";

interface DeleteUserVariables {
  userId: number;
}

interface DeleteUserResult {
  tokenRemoved: boolean;
}

/**
 * Elimina la cuenta tras una acción explícita del usuario.
 *
 * Se usa useMutation porque esta operación modifica datos en el servidor y no
 * debe ejecutarse al montar el componente ni revalidarse como una consulta.
 * El componente pasa el usuario y el token al invocar mutate; el hook coordina
 * la petición, la limpieza de la sesión y las transiciones del reducer.
 */
export const useDeleteUser = () => {
  const { dispatch } = useAuth();

  return useMutation({
    mutationFn: async ({ userId }: DeleteUserVariables): Promise<DeleteUserResult> => {
      const result = await deleteUserDataAction(userId);

      if (!result.ok) {
        throw new AuthError(result.message);
      }

      try {
        localStorage.removeItem("token");
        return { tokenRemoved: true };
      } catch (error: unknown) {
        console.error(
          "La cuenta se eliminó, pero no se pudo borrar el token local.",
          error,
        );
        return { tokenRemoved: false };
      }
    },
    onMutate: () => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_START,
      });
    },
    onSuccess: () => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_SUCCESS,
      });
    },
    onError: (error) => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_ERROR,
        payload:
          error instanceof AuthError
            ? error.message
            : "Hubo un problema durante el borrado de la cuenta",
      });
    },
    retry: false,
  });
};