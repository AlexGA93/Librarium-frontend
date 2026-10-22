import { useBooks } from "@/hooks/useBooks";
import { constants } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { deleteBook } from "../actions/book.actions";
import { BookError } from "../actions/errors/book.error";

export const useDeleteBook = () => {
    const { dispatch } = useBooks();

    return useMutation({
        mutationFn: async (bookId: string) => {
            const response = await deleteBook(bookId)

            return response;
        },
        onMutate: () => {
            dispatch({
                type: constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_START
            })
        },
        onSuccess: (session) => {
            console.log({ session });
            const { bookId } = session;
            //despachamos con el id para actualizarlo en el dispatch
            dispatch({
                type: constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_SUCCESS,
                payload: Number(bookId)
            });
            
        },
        onError: (error) => {
            dispatch({
                type: constants.BOOK.REDUCERS.ACTION_TYPES.DELETE_BOOK_ERROR,
                payload: error instanceof BookError ? error.message : "Hubo un problema durante el borrado del libro"
            })
        },
        retry: false
    })
};