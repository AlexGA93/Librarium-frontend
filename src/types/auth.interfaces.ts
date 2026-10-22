import type { constants } from "@/utils/constants";
import type { Dispatch } from "react";
import type { User } from "./user.interface";

export interface AuthSession {
  user: User;
  token: string;
}

export interface AuthInitialState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authReady: boolean;
  sessionExpired: boolean;
}
export interface AuthApiErrorResponse {
  message?: string;
  details?: string[];
}

export type AuthAction =
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_START }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_SUCCESS;
    payload: AuthSession;
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
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_START }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_SUCCESS;
    payload: User;
  }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_ERROR;
    payload: string;
  }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_UPDATE;
    payload: User;
  }
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_START }
  | { type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_SUCCESS }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_ERROR;
    payload: string;
  }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_RESTORED,
    payload: AuthSession;
  }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_CLEARED,
  }
  | {
    type: typeof constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_EXPIRED,
  }
  ;

  export interface AuthContextValue {
  state: AuthInitialState;
  dispatch: Dispatch<AuthAction>;
}

export interface CheckStatusResponse {
  user: User;
  token: string;
}