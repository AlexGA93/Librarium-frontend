import { authReducer } from "@/reducers/authReducer";
import type { AuthContextValue, AuthInitialState } from "@/types/auth.interfaces";
import { createContext, useReducer, type PropsWithChildren } from "react";

// initial state
const initialState: AuthInitialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: "",
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    // usamos useReducer
    const [state, dispatch] = useReducer(
        authReducer,
        initialState
    );

    return (
        <AuthContext value={{state, dispatch}}>{children}</AuthContext>
    );
};