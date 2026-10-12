import type { constants } from "@/utils/constants";
import type { Dispatch } from "react";

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthInitialState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
export interface LoginResponse {
  user: User | null;
  token: string;
}

export type LoginActionResult =
  | { ok: true; data: LoginResponse; }
  | { ok: false; message: string; statusCode?: number };


export interface RegisterResponse{
  code: number;
  message: string;
  error?: string | null;
}

export interface AuthApiErrorResponse {
  message?: string;
  details?: string[];
}

export type RegisterActionResult =
  | { ok: true; data: RegisterResponse; }
  | { ok: false; message: string; statusCode?: number };

export type AuthAction =
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_START }
  | {
      type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_SUCCESS;
      payload: LoginResponse;
    }
  | {
      type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR;
      payload: string;
    }
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.LOGOUT }
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_START }
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_SUCCESS }
  | {
      type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_ERROR;
      payload: string;
    }
  | {
      type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_UPDATE;
      payload: User;
    };

  export interface AuthContextValue {
  state: AuthInitialState;
  dispatch: Dispatch<AuthAction>;
}