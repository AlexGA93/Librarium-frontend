import { useBooks } from "@/hooks/useBooks";
import type { Book } from "@/types/book.interface";
import { constants } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { newBook } from "../actions/book.actions";
import { BookError } from "../actions/errors/book.error";

export const useNewBook = () => {
    const { dispatch } = useBooks();

    return useMutation({
        mutationFn: async ({ bookInfo}:{ bookInfo: Book }) => {
            const response = await newBook({ bookInfo})

            return response;
        },
        onMutate: () => {
            dispatch({
                type: constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_START
            })
        },
        onSuccess: (session) => {
            const { bookData } = session;
            //despachamos con el id para actualizarlo en el dispatch
            dispatch({
                type: constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_SUCCESS,
                payload: bookData
            });
            
        },
        onError: (error) => {
            dispatch({
                type: constants.BOOK.REDUCERS.ACTION_TYPES.CREATE_BOOK_ERROR,
                payload: error instanceof BookError ? error.message : "Hubo un problema durante el borrado del libro"
            })
        },
        retry: false
    })
};