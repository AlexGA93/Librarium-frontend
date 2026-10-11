import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { constants } from "@/utils/constants";
import { LogOut, Pencil, Save, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileForm {
  name: string;
  email: string;
}

export const Profile = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProfileForm>({ name: "", email: "" });
  const user = state.user;
  const initials = user?.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  const startEditing = () => {
    setForm({ name: user?.name ?? "", email: user?.email ?? "" });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setForm({ name: user?.name ?? "", email: user?.email ?? "" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    dispatch({
      type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_UPDATE,
      payload: {
        ...user,
        name: form.name.trim(),
        email: form.email.trim(),
      },
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGOUT });
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-3xl animate__animated animate__fadeIn">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-sm font-medium text-brand-coral">CUENTA</p>
          <h1 className="mt-1 text-3xl font-semibold text-foreground">Perfil</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Consulta y actualiza tus datos personales.
          </p>
        </div>
        {!isEditing && (
          <Button type="button" variant="outline" onClick={startEditing} disabled={!user}>
            <Pencil />
            Editar datos
          </Button>
        )}
      </header>

      <section className="py-8" aria-label="Datos del perfil">
        <div className="flex items-center gap-4 border-b border-border pb-8">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-coral text-lg font-semibold text-brand-burgundy">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-foreground">
              {user?.name ?? "Usuario"}
            </h2>
            <p className="truncate text-sm text-muted-foreground">
              {user?.email ?? "No hay una sesión activa"}
            </p>
          </div>
        </div>

        <form className="grid gap-6 py-8 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Nombre
            <Input
              autoComplete="name"
              value={isEditing ? form.name : user?.name ?? ""}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              readOnly={!isEditing}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Correo electrónico
            <Input
              type="email"
              autoComplete="email"
              value={isEditing ? form.email : user?.email ?? ""}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              readOnly={!isEditing}
              required
            />
          </label>

          {isEditing && (
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button type="submit">
                <Save />
                Guardar cambios
              </Button>
              <Button type="button" variant="outline" onClick={cancelEditing}>
                <X />
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
        <div>
          <h2 className="font-semibold text-foreground">Cerrar sesión</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sal de tu cuenta en este dispositivo.
          </p>
        </div>
        <Button type="button" variant="destructive" onClick={handleLogout}>
          <LogOut />
          Cerrar sesión
        </Button>
      </section>
    </div>
  );
};

export default Profile;