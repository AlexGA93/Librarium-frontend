import type { LoginForm } from "@/types/login.interface";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../auth/actions/authActions";

export const useLogin = () => 
    useMutation({
        // Datos que espera la API
        mutationFn: (payload: LoginForm) => loginAction(payload),
        // no se reintentara automaticamente
        retry: false
    });