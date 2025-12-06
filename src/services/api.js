import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor de Solicitud (Ya lo tienes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AGREGA ESTE INTERCEPTOR DE RESPUESTA ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el servidor dice "401 Unauthorized" (Token vencido o malo)
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Sesión inválida. Cerrando sesión...");

      // Borramos el token malo
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Opcional: Redirigir al login si no estamos ya ahí
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;