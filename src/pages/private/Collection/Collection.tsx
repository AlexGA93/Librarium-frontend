import { Button } from "@/components/ui/button";
import type { GenresObj } from "@/types/book.interface";
import { colorByGenre } from "@/utils/constants";
import { cn } from "cn";
import { BookOpen, LibraryBig, Plus, RotateCw } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { BookCard } from "../components/BookCard/BookCard";
import { useBook } from "../hooks/useBook.tsx";

export const Collection = () => {
  // * 1- Llamamos al custom hook encargado de coordinar la gestion de acciones con las llamadas y nutrir al componente con resultados


  // * Extraemos los datos de los que se nutre el componente de un customHook
  const {books, loading, error, refetch
  } = useBook();

  // * sacamos las dimensiones en funcion del datos del custom hook
  const bookCount = books?.length ?? 0;

  // * sacamos la cuenta de los generos pertenecientes dentro del dato del custom hook
  const genreCount = books ? new Set(books.map((book) => book.genre)).size : 0;

  // * accedemos a los parametros de busqueda de la url para operar con los filtros
  const [searchParams, setSearchParams] = useSearchParams();

  // * obtenemos los generos y formamos un array con ellos
  const currentGenres =
    searchParams.get("genres")?.split(",").filter(Boolean) ?? [];

  // * declaramos un array de generos para la interfaz
  // const genres: Genre[] = ["Ficcion", "Ensayo", "Poesia", "Historia", "Otros"];
  const genres: GenresObj[] = [
    { id: 'ficcion', label: 'Ficcion' },
    { id: 'ensayo', label: 'Ensayo' },
    { id: 'poesia', label: 'Poesia' },
    { id: 'historia', label: 'Historia' },
    { id: 'otros', label: 'Otros' },
  ]

  const setGenreParameter = (genre: string) => {
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter((currentGenre) => currentGenre !== genre)
      : [...currentGenres, genre];

    const nextSearchParams = new URLSearchParams(searchParams);
    if (newGenres.length > 0) {
      nextSearchParams.set("genres", newGenres.join(","));
    } else {
      nextSearchParams.delete("genres");
    }
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  }
  return (
    <div className="animate__animated animate__fadeIn mx-auto w-full max-w-6xl space-y-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-brand-coral uppercase">
            Biblioteca personal
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
            Mi colección
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Todas tus lecturas en un mismo lugar. Tu biblioteca, a tu manera.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link to="/private/book/new" />}
          className="h-11 gap-2 rounded-2xl bg-brand-coral p-5 font-semibold text-brand-burgundy shadow-sm hover:bg-brand-coral/90 hover:text-white"
        >
          <Plus aria-hidden="true" />
          Añadir libro
        </Button>
      </header>

      <section
        aria-label="Resumen de tu colección"
        className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-border bg-muted/50 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-20 size-56 rounded-full bg-brand-coral/10 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
            <LibraryBig aria-hidden="true" className="size-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              Un rincón para cada historia
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Guarda las obras que te acompañan y vuelve a ellas cuando quieras.
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-8 border-t border-border pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          <div>
            <p className="font-serif text-3xl font-bold text-foreground">
              {loading ? "—" : bookCount}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {bookCount === 1 ? "libro" : "libros"}
            </p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="font-serif text-3xl font-bold text-foreground">
              {loading ? "—" : genreCount}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {genreCount === 1 ? "género" : "géneros"}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="books-heading" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="books-heading"
              className="font-serif text-2xl font-bold text-foreground"
            >
              Tus libros
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading
                ? "Cargando tu colección…"
                : `${bookCount} ${bookCount === 1 ? "obra guardada" : "obras guardadas"}`}
            </p>
          </div>

          {!loading && !error && bookCount > 0 && (
            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              {bookCount} {bookCount === 1 ? "libro" : "libros"}
            </span>
          )}
        </div>
        {/* Filtro de badgets por genero */}
        <div className="flex flex-row flex-wrap">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              className={cn(
                currentGenres.includes(genre.id) ? colorByGenre[genre.label] : '',
                'mx-3'
              )}
              variant={currentGenres.includes(genre.id) ? "default" : "outline"}
            onClick={() =>setGenreParameter(genre.id)}
            >{genre.label}</Button>
          ))}
        </div>
        {loading ? (
          <div
            role="status"
            className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card px-6 text-center shadow-sm"
          >
            <BookOpen className="size-7 animate-pulse text-brand-coral" />
            <p className="text-sm text-muted-foreground">
              Cargando tu biblioteca…
            </p>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-3xl border border-destructive/20 bg-card px-6 text-center shadow-sm"
          >
            <BookOpen className="size-7 text-destructive" />
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">
                No se pudo cargar tu colección
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                {error}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => void refetch()}
              className="mt-1 gap-2 rounded-xl"
            >
              <RotateCw
                aria-hidden="true"
                className={loading ? "animate-spin" : ""}
              />
              Reintentar
            </Button>
          </div>
        ) : bookCount === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-brand-coral/10 text-brand-coral">
              <BookOpen aria-hidden="true" className="size-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-foreground">
                Tu colección empieza aquí
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Todavía no has añadido ningún libro. Registra tu primera obra
                para empezar a construir tu biblioteca.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link to="/private/book/new" />}
              className="mt-2 gap-2 rounded-xl bg-brand-coral px-4 text-brand-burgundy hover:bg-brand-coral/90"
            >
              <Plus aria-hidden="true" />
              Añadir mi primer libro
            </Button>
          </div>
        ) : (
          <div
            aria-label="Listado de libros"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {/* Libros */}
            {books.map((book, id) => (
              <BookCard key={`${book.title}-${id}`} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
