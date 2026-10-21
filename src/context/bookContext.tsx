import { booksReducer } from "@/reducers/booksReducer";
import type {
  BookContextValue,
  BookInitialState,
} from "@/types/book.interface";
import { createContext, useReducer, type PropsWithChildren } from "react";

const initialState: BookInitialState = {
  books: [],
  loading: false,
  error: null,
  hasLoaded: false,
};

export const BookContext = createContext<BookContextValue | undefined>(
  undefined,
);

export const BookProvider = ({ children }: PropsWithChildren) => {
  // usamos useReducer
  const [state, dispatch] = useReducer(booksReducer, initialState);

  // * inspeccionamos el estado del provider para ver el historial de acciones
  const dispatchWithLog: BookContextValue["dispatch"] = (action) => {
    if (import.meta.env.VITE_DEV === "true") {
      console.log("[auth action]", action);
    }

    dispatch(action);
  };

  return (
    <BookContext value={{ state, dispatch: dispatchWithLog }}>
      {children}
    </BookContext>
  );
};
