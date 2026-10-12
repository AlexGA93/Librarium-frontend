import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user.interface";
import { constants } from "@/utils/constants";
import { Lock, LockOpen, LogOut, Pencil, Save, Trash, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  deleteUserDataAction,
  editUserDataAction,
} from "../actions/user.actions";

interface ProfileForm {
  name: string;
  email: string;
  password?: string;
  password2?: string;
}

export const Profile = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const user = state.user;
  const initials =
    user?.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  const startEditing = () => {
    setForm({
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      password2: "",
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setForm({
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      password2: "",
    });
    setIsError(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((currentLogin) => ({
      ...currentLogin,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    const userPayload: User = {
      ...user,
      name: form.name.trim(),
      email: form.email.trim(),
    };

    // * De haber password en el valor, coimprobamos si no, seguimos sin ella
    if (form.password !== "") {
      // si hubiera password debemso cercionarnos de que sea igual
      if (form.password !== form.password2) {
        const message = "Las contraseñas deben ser iguales";
        setIsError(true);
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_ERROR,
          payload: message,
        });
        toast.error(message);
        return;
      }
      userPayload["password"] = form.password;
    }

    if (!state.token) {
      const message = "No hay una sesión activa para actualizar el perfil";
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_ERROR,
        payload: message,
      });
      toast.error(message);
      return;
    }

    dispatch({
      type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_START,
    });

    try {
      const result = await editUserDataAction(
        userPayload,
        user.id,
        state.token,
      );

      if (!result.ok) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_ERROR,
          payload: result.message,
        });
        toast.error(result.message);
        return;
      }

      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_SUCCESS,
        payload: result.data.data!,
      });
      setIsEditing(false);
      setIsError(false);
      toast.success("Perfil actualizado correctamente");
    } catch {
      const message = "No se pudieron guardar los cambios del perfil";
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.PROFILE_ERROR,
        payload: message,
      });
      toast.error(message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: constants.AUTH.REDUCERS.ACTION_TYPES.LOGOUT });
    navigate("/auth/login", { replace: true });
  };

  const handleEnableInputs = () => {
    return (!isEditing && "bg-gray-100") || undefined;
  };

  const handleDeleteAccountNotification = () => {
    toast("¿Estás seguro de continuar?", {
      action: {
        label: "Sí, borrar",
        onClick: () => void handleDeleteAccount(),
      },
      cancel: {
        label: "No",
        onClick: () => toast.info("Eliminación de cuenta cancelada"),
      },
    });
  };

  const handleDeleteAccount = async () => {
    if (!user || !state.token) {
      const message = "No hay una sesión activa para eliminar la cuenta";
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_ERROR,
        payload: message,
      });
      toast.error(message);
      return;
    }

    dispatch({
      type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_START,
    });

    try {
      const result = await deleteUserDataAction(user.id, state.token);

      if (!result.ok) {
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_ERROR,
          payload: result.message,
        });
        toast.error(result.message);
        return;
      }

      try {
        localStorage.removeItem("token");
      } catch (error: unknown) {
        console.error("No se pudo eliminar el token local tras borrar la cuenta.", error);
        dispatch({
          type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_SUCCESS,
        });
        navigate("/auth/login", { replace: true });
        toast.error(
          "La cuenta se eliminó, pero no se pudo limpiar el token guardado en este navegador.",
        );
        return;
      }

      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_SUCCESS,
      });
      toast.success("La cuenta se eliminó correctamente");
      navigate("/auth/login", { replace: true });
    } catch {
      const message = "Ocurrió un error al eliminar la cuenta";
      dispatch({
        type: constants.AUTH.REDUCERS.ACTION_TYPES.DELETE_ACCOUNT_ERROR,
        payload: message,
      });
      toast.error(message);
    }
  };
  return (
    <div className="mx-auto w-full max-w-3xl animate__animated animate__fadeIn">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-sm font-medium text-brand-coral">CUENTA</p>
          <h1 className="mt-1 text-3xl font-semibold text-foreground">
            Perfil
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Consulta y actualiza tus datos personales.
          </p>
        </div>
        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={startEditing}
            disabled={!user}
          >
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

        <form
          className="grid gap-6 py-8 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Nombre
            <Input
              className={handleEnableInputs()}
              autoComplete="name"
              value={isEditing ? form.name : (user?.name ?? "")}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              readOnly={!isEditing}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Correo electrónico
            <Input
              className={handleEnableInputs()}
              type="email"
              autoComplete="email"
              value={isEditing ? form.email : (user?.email ?? "")}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              readOnly={!isEditing}
              required
            />
          </label>

          <div className="sm:col-span-2">
            <FieldLabel>
              <Field orientation="horizontal">
                <Checkbox
                  id="toggle-checkbox-2"
                  name="toggle-checkbox-2"
                  checked={isVisible}
                  onCheckedChange={() => setIsVisible((prev) => !prev)}
                />
                <FieldContent>
                  <FieldTitle>Habilitar edición de contraseña</FieldTitle>
                  <FieldDescription>
                    Si no la editas, solo se actualizarán los demás datos.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>

          {isVisible && (
            <div className="sm:col-span-2 grid gap-5 rounded-xl border border-border bg-background p-5 sm:grid-cols-2">
              <p className="text-sm font-medium text-foreground sm:col-span-2">
                Nueva contraseña
              </p>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Contrasena
                <Field>
                  <ButtonGroup>
                    <Input
                      id="input-button-group"
                      className={cn(
                        handleEnableInputs(),
                        isError && "border-red-500",
                      )}
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Clave..."
                      value={form.password}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPass((prev) => !prev)}
                    >
                      {showPass ? <LockOpen /> : <Lock />}
                    </Button>
                  </ButtonGroup>
                </Field>
              </label>
              <label className="grid gap-2 text-sm font-medium text-foreground">
                Confirmar Contrasena
                <Field>
                  <ButtonGroup>
                    <Input
                      id="input-button-group"
                      className={cn(
                        handleEnableInputs(),
                        isError && "border-red-500",
                      )}
                      name="password2"
                      type={showPass ? "text" : "password"}
                      placeholder="Repetir Clave..."
                      value={form.password2}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPass((prev) => !prev)}
                    >
                      {showPass ? <LockOpen /> : <Lock />}
                    </Button>
                  </ButtonGroup>
                </Field>
              </label>
            </div>
          )}

          {isEditing && (
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button
                className="bg-brand-coral"
                type="submit"
                disabled={state.loading}
              >
                {state.loading ? (
                  <>
                    <p>Guardando...</p>
                    <Spinner />
                  </>
                ) : (
                  <>
                    <Save /> Guardar cambios
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEditing}>
                <X />
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </section>

      <Separator />

      <section className="flex flex-wrap items-center justify-between gap-4  py-6">
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

      <Separator />

      <section className="flex flex-wrap items-center justify-between gap-4  py-6">
        <div>
          <h2 className="font-semibold text-foreground">Borrar Cuenta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Borrar cuenta definitivamente
          </p>
        </div>
        <Button className="p-6" type="button" variant="destructive" onClick={handleDeleteAccountNotification}>
          <Trash />
          Borrar Cuenta
        </Button>
      </section>
    </div>
  );
};

export default Profile;
