import { useAuth } from "@/hooks/useAuth";
import { useBooks } from "@/hooks/useBooks";
import { constants } from "@/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { booksByUser } from "../actions/book.actions";
import { BookError } from "../actions/errors/book.error";

interface UseBookOptions {
  enabled?: boolean;
}

export const useBook = ({ enabled = true }: UseBookOptions = {}) => {
  // * 1- estado local para hacer un refetch
  const [reloadCount, setReloadCount] = useState<number>(0);
  // * 2- accedemos a los parametros de la url
  const [searchParams] = useSearchParams();

  const genres = searchParams.get("genres") || undefined;
  const limit = searchParams.get("limit") || "100";
  const page = searchParams.get("page") || "1";

   const refetch = useCallback(() => {
    setReloadCount((count) => count + 1);
  }, []);

  // * 3- llamamos a useAuth (estado global de autenticacion) para comprobaciones
  const {
    state: { token, authReady, isAuthenticated },
    dispatch: dispatchAuth,
  } = useAuth();
 
  // * 4- llamamos a useBooks (estado global de los libros)
  const { state: {books, loading, error}, dispatch } = useBooks();
  const lastRequest = useRef<{ params: string; reloadCount: number } | null>(null);
  const requestParams = JSON.stringify([genres, limit, page]);

  // * 5- delcaraos un hook useEffect
  useEffect(() => {
    // * 5.1- Comprobacion si estamos autenticados
    if (!enabled || !authReady || !isAuthenticated || !token) return;

    if (
      lastRequest.current?.params === requestParams &&
      lastRequest.current.reloadCount === reloadCount
    ) {
      return;
    }

    lastRequest.current = { params: requestParams, reloadCount };

    // * 5.2- definimos funcion clave
    const loadBooks = async () => {
      // * 5.2.1- despachamos el comienzo del proceso
      dispatch({ type: constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_START });
      
      try {
        
        // * 5.2.2- comenzamos proceso asincrono llamando a la accion
        const result = await booksByUser({ genres, limit, page });

        // * 5.2.3- comprobamos
        if (!result) {
          dispatch({
            type: constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_ERROR,
            payload: 'Error obteniendo los libros del usuario'
          });
        } 

        //* 5.2.4- en caso contrario, actualizamos el estado global con los libros
        dispatch({
            type: constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_SUCCESS,
            payload: result,
          });

      } catch (error) {
        // * en caso de error en el proceso despachamos error igualmente
        dispatch({
            type: constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_ERROR,
            payload: error instanceof BookError
                        ? error.message
                        : "No se pudo completar la obtencion de los libros del usuario",
          });

        if (error instanceof BookError && error.statusCode === 401) {
          try {
            localStorage.removeItem("token");
          } catch (storageError: unknown) {
            console.error("No se pudo eliminar el token expirado.", storageError);
          }

          dispatchAuth({
            type: constants.AUTH.REDUCERS.ACTION_TYPES.SESSION_EXPIRED,
          });
        }
      }
      
    };
    
    // * 5.3- inicializamos funcion asincrona dentro del useEffect
    void loadBooks();
  }, [authReady, isAuthenticated, token, genres, limit, page, dispatch, dispatchAuth, enabled, reloadCount, requestParams])
  
  // * DEVOLVEMOS LOS RESULTADOS DEL ESTADO GLOBAL
  return { books, loading, error, refetch};
  // const [searchParams] = useSearchParams();
  // // * Scamos de los parametros de la url los datos necesarios para filtrar
  // // `genre` indica el genero literario a buscar (si lo hubiese)
  // const genres = searchParams.get("genres") || undefined;

  // // `limit` indica cuántos productos solicitar por página; usamos 10 si no viene en la URL.
  // const limit = searchParams.get("limit") || "10";

  // // `page` indica qué página solicitar; empezamos en la página 1 si no viene en la URL.
  // const page = searchParams.get("page") || "1";

  // const {
  //   state: { token, user, authReady, isAuthenticated },
  // } = useAuth();

  // return useQuery({
  //   queryKey: ["books", {userId: user?.id, genres, limit, page}],
  //   queryFn: async () => {
  //     if (!token) {
  //       throw new Error("No hay una sesión activa");
  //     }

  //     // peticion
  //     return booksByUser({genres, limit, page});
  //   },
  //   enabled: authReady && isAuthenticated && Boolean(token),
  //   retry: false,
  // });
};
