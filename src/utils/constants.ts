import type { Genre, GenresObj } from "@/types/book.interface";
import type { Constants } from "@/types/utils";

export const constants: Constants = {
  AUTH: {
    REDUCERS: {
      ACTION_TYPES: {
        // LOGIN
        LOGIN_START: "LOGIN_START",
        LOGIN_SUCCESS: "LOGIN_SUCCESS",
        LOGIN_ERROR: "LOGIN_ERROR",
        // LOGOUT
        LOGOUT: "LOGOUT",
        // REGISTER
        REGISTER_START: "REGISTER_START",
        REGISTER_SUCCESS: "REGISTER_SUCCESS",
        REGISTER_ERROR: "REGISTER_ERROR",
        PROFILE_START: "PROFILE_START",
        PROFILE_SUCCESS: "PROFILE_SUCCESS",
        PROFILE_ERROR: "PROFILE_ERROR",
        PROFILE_UPDATE: "PROFILE_UPDATE",
        DELETE_ACCOUNT_START: "DELETE_ACCOUNT_START",
        DELETE_ACCOUNT_SUCCESS: "DELETE_ACCOUNT_SUCCESS",
        DELETE_ACCOUNT_ERROR: "DELETE_ACCOUNT_ERROR",
        // SESSION
        SESSION_RESTORED: "SESSION_RESTORED",
        SESSION_CLEARED: "SESSION_CLEARED",
      },
    },
  },
  BOOK: {
    REDUCERS: {
      ACTION_TYPES: {
        GET_BOOKS_START: "GET_BOOKS_START",
        GET_BOOKS_SUCCESS: "GET_BOOKS_SUCCESS",
        GET_BOOKS_ERROR: "GET_BOOKS_ERROR",
        GET_BOOK_DETAILS_START: "GET_BOOK_DETAILS_START",
        GET_BOOK_DETAILS_SUCCESS: "GET_BOOK_DETAILS_SUCCESS",
        GET_BOOK_DETAILS_ERROR: "GET_BOOK_DETAILS_ERROR",
        CREATE_BOOK_START: "CREATE_BOOK_START",
        CREATE_BOOK_SUCCESS: "CREATE_BOOK_SUCCESS",
        CREATE_BOOK_ERROR: "CREATE_BOOK_ERROR",
        UPDATE_BOOK_START: "UPDATE_BOOK_START",
        UPDATE_BOOK_SUCCESS: "UPDATE_BOOK_SUCCESS",
        UPDATE_BOOK_ERROR: "UPDATE_BOOK_ERROR",
        DELETE_BOOK_START: "DELETE_BOOK_START",
        DELETE_BOOK_SUCCESS: "DELETE_BOOK_SUCCESS",
        DELETE_BOOK_ERROR: "DELETE_BOOK_ERROR",
      },
    },
  },
};

export const colorByGenre: Record<Genre, string> = {
  Ficcion:
    "border-rose-200 bg-rose-100 text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200",
  Ensayo:
    "border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200",
  Poesia:
    "border-violet-200 bg-violet-100 text-violet-800 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-200",
  Historia:
    "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  Otros:
    "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};

export const genres: GenresObj[] = [
  { id: "ficcion", label: "Ficcion" },
  { id: "ensayo", label: "Ensayo" },
  { id: "poesia", label: "Poesia" },
  { id: "historia", label: "Historia" },
  { id: "otros", label: "Otros" },
];
// const genres: Genre[] = ['Ficción', 'Ensayo', 'Poesía', 'Historia', 'Otros'];
