import type { AuthAction, AuthInitialState } from "@/types/auth.interfaces";
import { constants } from "@/utils/constants";

export const authReducer = (state: AuthInitialState, action: AuthAction) => {
  switch (action.type) {
    // * LOGIN
    // LOGIN_START
    case constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    // LOGIN_SUCCESS
    case constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    // LOGIN_ERROR
    case constants.AUTH.REDUCERS.ACTION_TYPES.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };
    // * LOGOUT
    case constants.AUTH.REDUCERS.ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      };

    // * REGISTER
    case constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case constants.AUTH.REDUCERS.ACTION_TYPES.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
