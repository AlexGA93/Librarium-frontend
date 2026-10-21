import type { constants } from "@/utils/constants";
import type { Dispatch } from "react";

export type Genre = 'Ficcion' | 'Ensayo' | 'Poesia' | 'Historia' | 'Otros';

export interface GenresObj {
  id: string;
  label: Genre;
}

export interface Book {
  id?: number;
  title: string;
  author: string;
  releaseDate: string;
  genre: Genre;
  sinopsis: string;
  cover?: string | null;
  coverImage?: string;
  coverFile?: File | null;
  date: string;
}

export interface BookInitialState {
  books: Book[] | [];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

export interface BooksResponse {
  code: number;
  usersBooks: Book[];
}

export interface DeleteBookResponse {
  code: number;
  message: string;
}

export interface BookMutationResponse {
  code: number;
  message: string;
}

export type BookAction =
  // GET BOOKS
  | { type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_START }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_SUCCESS;
      payload: Book[];
    }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_ERROR;
      payload: string;
    }
  // GET BOOK DETAILS
  | { type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOK_DETAILS_START }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOK_DETAILS_SUCCESS;
      payload: Book;
    }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOK_DETAILS_ERROR;
      payload: string;
    }
  // CREATE BOOK
  | { type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_START }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_SUCCESS;
      payload: BookMutationResponse;
    }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_ERROR;
      payload: string;
    }
  // UPDATE BOOK
  | { type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.UPDATE_BOOK_START }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.UPDATE_BOOK_SUCCESS;
      payload: BookMutationResponse;
    }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.UPDATE_BOOK_ERROR;
      payload: string;
    }
  // DELETE BOOK
  | { type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_START }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_SUCCESS;
      payload: BookMutationResponse | number;
    }
  | {
      type: typeof constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_ERROR;
      payload: string;
    };

export interface BookContextValue {
  state: BookInitialState;
  dispatch: Dispatch<BookAction>
}

export interface BookApiErrorResponse {
  code: number;
  message: string;
}