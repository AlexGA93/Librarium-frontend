import { api } from "@/api/axios";
import type {
  User,
  UserAcreditationResult,
  UserDeletionResult,
  UserResponse,
} from "@/types/user.interface";

export const userDataAction = async (
  token: string,
): Promise<UserAcreditationResult> => {
  try {
    const { data } = await api.get<UserResponse>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return { ok: true, data };
  } catch {
    return { ok: false, message: "No se pudieron obtener los datos del usuario" };
  }
};


export const editUserDataAction = async (
  payload: User,
  userId: number,
  token: string
): Promise<UserAcreditationResult> => {
  try {

    const { data } = await api.put<UserResponse>(`/users/${userId}`,
      payload,
      {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return { ok: true, data };
  } catch {
    return { ok: false, message: "No se pudieron obtener los datos del usuario" };
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