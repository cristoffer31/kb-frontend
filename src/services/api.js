import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Solo actuamos si es un error 401 REAL
    if (error.response && error.response.status === 401) {
      
      // IMPORTANTE: No hacer nada si el error viene del mismo Login 
      // (para que Login.jsx pueda mostrar "Contraseña incorrecta")
      if (!error.config.url.includes("/auth/login")) {
          console.warn("Sesión caducada o token inválido.");
          
          // Borramos credenciales
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
          // NO recargamos la página con window.location.href
          // Simplemente dejamos que el usuario siga como "invitado"
          // Si intenta entrar a una zona privada, el router lo detendrá.
      }
    }
    return Promise.reject(error);
  }
);

export default api;