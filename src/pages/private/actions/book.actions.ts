import { api } from "@/api/axios";
import type {
  Book,
  BookApiErrorResponse,
  BooksResponse,
  DeleteBookResponse,
} from "@/types/book.interface";
import axios from "axios";
import { BookError } from "./errors/book.error";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options{
  genres?: string | undefined;
  limit: string;
  page: string;
}

export const booksByUser = async ({genres, limit, page}: Options):Promise<Book[]> => {
  try {
    const { data } = await api.get<BooksResponse>("/books/all", {
        params: {genres, limit, page}
      });
      
    if (!data || !Array.isArray(data.usersBooks)) {
      throw new BookError(
        "El servidor devolvió una respuesta de libros no válida",
      );
    }
      
      const userBooks: Book[] = data.usersBooks.map((book) => ({
          ...book,
          coverImage: `${BASE_URL}/books-images/${book.cover}`
      }));
    
    return userBooks;
      
  } catch (error: unknown) {
    let statusCode: number | undefined;
    if (axios.isAxiosError<BookApiErrorResponse>(error)) {
      statusCode = error!.response?.status;
    }
    // * lanzamos la clase del error personalizado
    throw new BookError(
      "No se pudieron obtener los datos del usuario",
      statusCode,
    );
  }
};

export const deleteBook = async (bookId: string): Promise<{bookId: string, mssg: string}> => {
  try {
    const { data } = await api.delete<DeleteBookResponse>(`/books/${bookId}`);

    if (!data || data.code !== 200) {
      throw new BookError(data.message)
    }

    return {bookId, mssg:data.message};
    
  } catch (error: unknown) {
    let statusCode: number | undefined;
    if (axios.isAxiosError<BookApiErrorResponse>(error)) {
      statusCode = error!.response?.status;
    }
    // * lanzamos la clase del error personalizado
    throw new BookError(
      "No se pudo borrar el libro seleccionado",
      statusCode,
    );
  }
}