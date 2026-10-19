/**
 * * Definimos una clase que crea un error personalizado
 * Esta clase se usara para cuando loginAction o registerAction  devuelven un error de la API
 * De otra forma, TanStack no ejecutaria su onError en la mutacion, por lo que siempre considera la promesa resuelta
 */

export class BookError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "BookError";
    this.statusCode = statusCode;
  }
}