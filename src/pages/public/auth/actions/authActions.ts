import { api } from "@/api/axios";
import type { AuthApiErrorResponse } from "@/types/auth.interfaces";
import type { LoginActionResult, LoginForm, LoginResponse } from "@/types/login.interface";
import type { RegisterActionResult, RegisterForm, RegisterResponse } from "@/types/register.interface";
import axios from "axios";

export const loginAction = async (
  loginForm: LoginForm,
): Promise<LoginActionResult> => {
  try {
    const { data } = await api.post<LoginResponse>(`/auth/login`, loginForm);

    return { ok: true, data };
  } catch (error: unknown) {
    // mensaje por defecto
    let message = "No se pudo iniciar sesion";
    let statusCode: number | undefined;
    // diferenciamos la respuesta de error en caso del status code
    if (axios.isAxiosError<AuthApiErrorResponse>(error)) {
      statusCode = error.response?.status;

      switch (statusCode) {
        case 401:
          message = error.response?.data?.message ?? "Credenciales inválidas";
          break;
        default:
          message = error.response?.data?.message ?? message;
          break;
      }
    }

    return { ok: false, message, statusCode };
  }
};

export const registerAction = async (
  registerForm: RegisterForm,
): Promise<RegisterActionResult> => {
  try {
    const { data } = await api.post<RegisterResponse>(
      "/auth/register",
      registerForm,
    );

    return { ok: true, data };
  } catch (error: unknown) {
    // mensaje por defecto
    let message = "No se pudo registrar la cuenta";
    let statusCode: number | undefined;
    // diferenciamos la respuesta de error en caso del status code
    if (axios.isAxiosError<AuthApiErrorResponse>(error)) {
      statusCode = error.response?.status;
      const responseData = error.response?.data;

      switch (statusCode) {
        case 401:
          message = responseData?.message ?? "Credenciales inválidas";
          break;
        case 400: {
          const details = handleErrorDetails(responseData);
          message = [responseData?.message, details].filter(Boolean).join(": ") || message;
          break;
        }
        default:
          message = responseData?.message ?? message;
          break;
      }
    }

    return { ok: false, message, statusCode };
  }
};

const handleErrorDetails = (errorData?: AuthApiErrorResponse): string => {
  return errorData?.details?.join(", ") ?? "";
};
