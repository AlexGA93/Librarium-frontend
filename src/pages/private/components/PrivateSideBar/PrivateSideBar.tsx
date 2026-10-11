import logo from "@/assets/icons/open_book.svg";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, PlusSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const PrivateSideBar = () => {
  // accedemos a los parametros de url
  const { pathname } = useLocation();
  // acceder al estado global
  const { state } = useAuth();
  const userName = state.user?.name ?? "Usuario";

  const navItems = [
    {
      id: "coleccion",
      label: "Mi Colección",
      icon: BookOpen,
      pathName: "/private",
    },
    {
      id: "anadir",
      label: "Añadir Libro",
      icon: PlusSquare,
      pathName: "/private/book/new",
    },
    { id: "perfil", label: "Perfil", icon: User, pathName: "/private/profile" },
  ];

  const handleActiveLink = (to: string) => pathname === to;

  return (
    <aside className="w-64 h-screen bg-background border-r border-border flex flex-col justify-between p-6 select-none shrink-0 font-sans">
      <div className="space-y-8">
        {/* Identidad de Marca / Logo */}
        <div className="flex items-center gap-3 px-2">
          {/* Isotipo con forma de libro */}
          <div className="w-8 h-8 flex items-center justify-center ">
            <img className="size-8" src={logo} alt="Librarium" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Librarium
          </span>
        </div>

        {/* Menú de Navegación */}
        <nav className="space-y-1.5" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.pathName}
              className={`cursor-pointer w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all duration-150 text-left ${
                handleActiveLink(item.pathName)
                  ? "bg-accent text-accent-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium"
              }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${
                  handleActiveLink(item.pathName)
                    ? "text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Perfil de Usuario / Bibliotecario */}
      <div className="pt-6 border-t border-border flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-brand-coral text-primary-foreground flex items-center justify-center font-medium shadow-sm shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-sm font-semibold text-foreground truncate">
            {userName}
          </span>
          <Link
            to="/private/profile"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
          >
            Ver Perfil
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default PrivateSideBar;
