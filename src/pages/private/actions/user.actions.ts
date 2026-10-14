import { api } from "@/api/axios";
import { AuthError } from "@/pages/public/auth/actions/errors/auth.error";
import type { AuthApiErrorResponse } from "@/types/auth.interfaces";
import type {
  User,
  UserAcreditationResult,
  UserDeletionResult,
  UserResponse,
} from "@/types/user.interface";
import axios from "axios";

export const userDataAction = async (
  token: string,
): Promise<UserAcreditationResult> => {
  try {
    // * configuramos y realizamos la peticion
    const { data: response } = await api.get<UserResponse>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // * reaccionamos al caso de error posible
    if (!response.data) {
      throw new AuthError(
        response.message || "El servidor no devolvió los datos del usuario",
      );
    }
    return response;

  } catch(error: unknown) {
    
    let statusCode: number | undefined;
    if (axios.isAxiosError<AuthApiErrorResponse>(error)) {
       statusCode = error!.response?.status;
    } 
    // * lanzamos la clase del error personalizado
    throw new AuthError("No se pudieron obtener los datos del usuario", statusCode);
  }
};


export const editUserDataAction = async (
  payloadEdit:{
    user: User,
  userId: number,
  token: string
  }
): Promise<UserAcreditationResult> => {
  const { user, userId, token } = payloadEdit;
  try {

    const { data } = await api.put<UserResponse>(`/users/${userId}`,
      user,
      {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return data;
  } catch (error: unknown) {
    
    let statusCode: number | undefined;
    if (axios.isAxiosError<AuthApiErrorResponse>(error)) {
       statusCode = error!.response?.status;
    } 
    // * lanzamos la clase del error personalizado
    throw new AuthError("No se pudieron obtener los datos del usuario", statusCode);
  }
};


export const deleteUserDataAction = async (
  userId: number,
  token: string
): Promise<UserDeletionResult> => {
  try {
    await api.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "No se pudo eliminar la cuenta. Inténtalo de nuevo.",
    };
  }
};