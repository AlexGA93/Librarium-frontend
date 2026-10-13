import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// TODO: INTERCEPTORES
// herramienta interna de axios que permite 'interceptar' las peticiones de la app y modificar cosas tanto de las peticiones como de las respuestas

// * En todas las peticiones vamos a interceptarlas para icorporar el token a las cabeceras
api.interceptors.request.use((config) => {
  // extraemos el token de localstorage
  const token = localStorage.getItem("token");

  // comprobamos
  if (token) {
    // incorporamos token a la peticion
    config.headers.Authorization = `Bearer ${token}`;
  }

  // devovlemos
  return config;
});
