

import { Button } from '@/components/ui/button';
import { BookOpen, Camera, Info } from 'lucide-react';
import { useState } from 'react';

export const Book = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    fechaPublicacion: '',
    genero: 'Ficción',
    sinopsis: '',
    portada: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const generos = ['Ficción', 'Ensayo', 'Poesía', 'Historia', 'Otros'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // if (file) {
    //   setFormData({ ...formData, portada: file });
    //   setPreviewUrl(URL.createObjectURL(file));
    // }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Libro guardado:', formData);
    // Lógica para persistir en tu base de datos o almacenamiento local
  };

  return (
    <div className="animate__animated animate__fadeIn flex-1 flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      {/* 1. Header Superior con Buscador */}
      {/* <header className="h-16 px-8 lg:px-12 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-20">

        <div className="flex items-center gap-3 text-muted-foreground">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Configuración"
            className="size-11 rounded-full hover:bg-accent"
          >
            <Settings className="w-7 h-7" />
          </Button>
        </div>
      </header> */}

      {/* 2. Contenido Principal */}
      <main className="p-8 lg:p-12 max-w-6xl w-full mx-auto space-y-8">
        {/* Cabecera Editorial */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-brand-coral uppercase">
            Nueva Adquisición
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
            Expandir el Archivo
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Registra una nueva obra en tu biblioteca personal. Cada entrada es un portal a un nuevo mundo de conocimiento.
          </p>
        </div>

        {/* Formulario en 2 Columnas */}
        <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-2">
          
          {/* Columna Izquierda: Carga de Portada y Cita */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative border-2 border-dashed border-border bg-muted/50 hover:bg-accent transition-colors rounded-3xl p-8 flex flex-col items-center justify-center text-center aspect-3/4 cursor-pointer group shadow-sm">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa de portada"
                  className="w-full h-full object-cover rounded-2xl shadow-md"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-brand-coral shadow-sm mb-4 group-hover:scale-105 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium text-foreground text-base mb-1">
                    Subir Portada
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                    Formatos aceptados: JPG, PNG.<br />Recomendado: 1200 x 1600 px.
                  </p>
                </>
              )}
            </div>

            {/* Cita Literaria */}
            <div className="border-l-2 border-border pl-6 py-1 space-y-2">
              <blockquote className="font-serif italic text-lg text-muted-foreground leading-snug">
                "Un hogar sin libros es como un cuerpo sin alma."
              </blockquote>
              <cite className="block text-xs font-semibold text-muted-foreground tracking-wider uppercase not-italic">
                — Cicerón
              </cite>
            </div>
          </div>

          {/* Columna Derecha: Campos de Información */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Sección 01: Detalles de la Obra */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  01
                </span>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Detalles de la Obra
                </h2>
              </div>

              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    Título del Libro
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Ej. El Laberinto de la Soledad"
                    className="w-full bg-muted/50 border border-input focus:border-ring focus:bg-background text-foreground text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-muted-foreground"
                  />
                </div>

                {/* Autor y Fecha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Autor
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.autor}
                      onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                      placeholder="Nombre completo"
                      className="w-full bg-muted/50 border border-input focus:border-ring focus:bg-background text-foreground text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      Fecha de Publicación
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.fechaPublicacion}
                        onChange={(e) => setFormData({ ...formData, fechaPublicacion: e.target.value })}
                        className="w-full bg-muted/50 border border-input focus:border-ring focus:bg-background text-foreground text-sm rounded-xl px-4 py-3 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 02: Categorización */}
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  02
                </span>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Categorización
                </h2>
              </div>

              {/* Pills de Género */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground">
                  Género Literario
                </label>
                <div className="flex flex-wrap gap-2">
                  {generos.map((item) => {
                    const isSelected = formData.genero === item;
                    return (
                      <Button
                        variant={isSelected ? 'default' : 'secondary'}
                        type="button"
                        key={item}
                        onClick={() => setFormData({ ...formData, genero: item })}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${isSelected ? 'shadow-sm' : 'hover:bg-accent'}`}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Sinopsis */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Sinopsis o Notas Personales
                </label>
                <textarea
                  rows={4}
                  value={formData.sinopsis}
                  onChange={(e) => setFormData({ ...formData, sinopsis: e.target.value })}
                  placeholder="Describe brevemente la trama o por qué este libro es importante para ti..."
                  className="w-full bg-muted/50 border border-input focus:border-ring focus:bg-background text-foreground text-sm rounded-xl p-4 outline-none transition-all placeholder:text-muted-foreground resize-none"
                />
              </div>
            </div>

            {/* Pie del Formulario: Botón de Guardado e Info */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>Se guardará automáticamente en tu colección personal.</span>
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-coral hover:bg-brand-coral/90 text-brand-burgundy hover:text-white px-7 py-5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Guardar en Colección</span>
                <BookOpen className="w-4 h-4" />
              </Button>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
};

export default Book;
