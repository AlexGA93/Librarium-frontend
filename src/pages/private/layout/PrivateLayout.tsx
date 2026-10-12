import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PrivateSideBar } from '../components/PrivateSideBar/PrivateSideBar';

export const PrivateLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSidebarOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isSidebarOpen]);

  return (
    <section className="flex min-h-screen">
      <PrivateSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="min-w-0 flex-1 p-6 text-foreground">
        <header className="mb-4 flex items-center gap-3 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Abrir menú de navegación"
            aria-expanded={isSidebarOpen}
            aria-controls="private-sidebar"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </Button>
          <span className="font-serif text-lg font-semibold">Librarium</span>
        </header>
        <Outlet />
      </main>
    </section>
  );
};
