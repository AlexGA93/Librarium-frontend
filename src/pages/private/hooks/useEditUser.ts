/**
 * Edita la cuenta tras una acción explícita del usuario.
 *
 * Se usa useMutation porque esta operación modifica datos en el servidor y no
 * debe ejecutarse al montar el componente ni revalidarse como una consulta.
 */

import { useAuth } from "@/hooks/useAuth";
import { AuthError } from "@/pages/public/auth/actions/errors/auth.error";
import type { User } from "@/types/user.interface";
import { constants } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { editUserDataAction } from "../actions/user.actions";

interface EditUserVariables {
  user: User;
  userId: number;
  token: string;
}

export const useEditUser = () => {
  const { dispatch } = useAuth();

  return useMutation({
    mutationFn: async (payloadEdit: EditUserVariables) => {
      const response = await editUserDataAction(payloadEdit);

      if (!response.data) {
        throw new AuthError(
          response.message || "El servidor no devolvió el perfil actualizado",
        );
      }

      return response.data;
    },
    onMutate: () => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_START,
      });
    },
    onSuccess: (session) => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_SUCCESS,
        payload: session,
      });
    },
    onError: (error) => {
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_ERROR,
        payload:
          error instanceof AuthError
            ? error.message
            : "No se pudo completar la edicion de la cuenta",
      });
    },
    retry: false,
  });
};
