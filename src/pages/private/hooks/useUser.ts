import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { userDataAction } from "../actions/user.actions";

export const useUser = () => {
  const {
    state: { token },
  } = useAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      if (!token) {
        throw new Error("No hay una sesión activa");
      }

      return userDataAction(token);
    },
    enabled: Boolean(token),
    retry: false,
  });
};