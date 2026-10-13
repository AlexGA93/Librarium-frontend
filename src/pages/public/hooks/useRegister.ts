import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../auth/actions/authActions";
import type { RegisterForm } from "@/types/register.interface";

/**
 * Gestiona el envío de un registro, que crea un usuario en el servidor.
 *
 * Se usa useMutation porque el registro es una operación iniciada explícitamente
 * por el usuario y con efectos en el servidor. useQuery ejecutaría la petición
 * al montar el componente y podría revalidarla, lo que no es apropiado para
 * crear una cuenta ni para guardar su resultado en una caché de consultas.
 *
 * El hook no recibe el formulario al crearse: el componente entrega el payload
 * a mutate/mutateAsync cuando se envía el formulario. mutationFn lo pasa a la
 * acción que realiza la petición Axios.
 */
export const useRegister = () =>
  useMutation({
    // Datos que espera la API. La confirmación de contraseña no forma parte
    // de RegisterForm y debe validarse en el formulario, sin enviarse al backend.
    mutationFn: (payload: RegisterForm) => registerAction(payload),

    // No se reintenta automáticamente una creación de cuenta: el servidor
    // podría haber procesado el primer intento antes de un error de red.
    retry: false,
  });
