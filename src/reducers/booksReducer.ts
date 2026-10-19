import type {
  BookAction,
  BookInitialState,
} from "@/types/book.interface";
import { constants } from "@/utils/constants";

export const booksInitialState: BookInitialState = {
  books: [],
  actualBook: null,
  loading: false,
  error: null,
};

export const booksReducer = (
  state: BookInitialState,
  action: BookAction,
): BookInitialState => {
  switch (action.type) {
    case constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_START:
    case constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOK_DETAILS_START:
    case constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_START:
    case constants.BOOK.REDUCERS.ACTION_TYPES.UPDATE_BOOK_START:
    case constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };

    case constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        actualBook: action.payload,
        loading: false,
        error: null,
      };

    case constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_SUCCESS:
    case constants.BOOK.REDUCERS.ACTION_TYPES.UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_SUCCESS:
      return {
        ...state,
        actualBook: null,
        loading: false,
        error: null,
      };

    case constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOKS_ERROR:
    case constants.BOOK.REDUCERS.ACTION_TYPES.GET_BOOK_DETAILS_ERROR:
    case constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_ERROR:
    case constants.BOOK.REDUCERS.ACTION_TYPES.UPDATE_BOOK_ERROR:
    case constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};