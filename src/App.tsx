import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/authContext";
import { BookProvider } from "./context/bookContext";
import { routes } from "./routes/app.routes";

// generamos el query cLient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Aplico el Provider el cual accede al useReducer para el estado */}
      <AuthProvider>
        {/* Aplico el Provider el cual accede al useReducer para el estado de los Libros */}
        <BookProvider>
          {/* Incorporamos Toaster a la app */}
          <Toaster />
          {/* Rutas de la aplicacion */}
          <RouterProvider router={routes} />
          {/* definicion de las React Query DevTools de Tanstack Query */}
          <ReactQueryDevtools initialIsOpen={false} />
        </BookProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
