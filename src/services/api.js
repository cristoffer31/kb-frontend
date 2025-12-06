import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor de SOLICITUD (Ya lo tienes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AGREGA ESTO: Interceptor de RESPUESTA ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (No autorizado / Token vencido o malo)
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Sesión caducada o token inválido. Cerrando sesión...");

      // 1. Limpiar basura local
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 2. Redirigir al login (solo si no estamos ya ahí)
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
// ---------------------------------------------

export default api;