import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { booksByUser } from "../actions/book.actions";

export const useBook = () => {
  const [searchParams] = useSearchParams();
  // * Scamos de los parametros de la url los datos necesarios para filtrar
  // `genre` indica el genero literario a buscar (si lo hubiese)
  const genres = searchParams.get("genres") || undefined;

  // `limit` indica cuántos productos solicitar por página; usamos 10 si no viene en la URL.
  const limit = searchParams.get("limit") || "10";

  // `page` indica qué página solicitar; empezamos en la página 1 si no viene en la URL.
  const page = searchParams.get("page") || "1";

  const {
    state: { token, user, authReady, isAuthenticated },
  } = useAuth();

  return useQuery({
    queryKey: ["books", {userId: user?.id, genres, limit, page}],
    queryFn: async () => {
      if (!token) {
        throw new Error("No hay una sesión activa");
      }

      // peticion
      return booksByUser({genres, limit, page});
    },
    enabled: authReady && isAuthenticated && Boolean(token),
    retry: false,
  });
};
