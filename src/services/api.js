import axios from "axios";

// 1. Leemos la variable de entorno. 
// Si no existe (por error), usa localhost como respaldo.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // --- AÑADE ESTO ---
  console.log("⚡ [INTERCEPTOR] Intentando llamar a:", config.url);
  console.log("⚡ [INTERCEPTOR] Token en LocalStorage:", token ? "SÍ (empieza con " + token.substring(0, 5) + ")" : "❌ NO (es null/undefined)");
  // ------------------
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // --- Y ESTO ---
    console.log("⚡ [INTERCEPTOR] Header añadido:", config.headers.Authorization);
  }
  return config;
});

export default api;