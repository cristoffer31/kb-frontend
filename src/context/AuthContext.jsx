import React, { createContext, useEffect, useState } from "react";
import { loginApi, meApi, registerApi } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    async function cargarUsuario() {
      console.log("🔄 Verificando sesión existente...");
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("❌ No hay token guardado");
        setCargandoAuth(false);
        return;
      }

      console.log("🔑 Token encontrado, verificando validez...");
      try {
        const user = await meApi();
        console.log("✅ Usuario cargado desde el backend:", user);
        setUsuario(user);
      } catch (e) {
        console.error("❌ Error cargando sesión:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setCargandoAuth(false);
        console.log("✅ Carga de autenticación completada");
      }
    }
    cargarUsuario();
  }, []);

  async function login(email, password) {
    const data = await loginApi(email, password);
    
    console.log("🔐 Respuesta del login:", data);
    
    // 1. Guardar PRIMERO en Storage
    if (!data.token) {
      console.error("❌ Error: No se recibió token del backend");
      throw new Error("No se recibió token de autenticación");
    }
    
    localStorage.setItem("token", data.token);
    console.log("✅ Token guardado:", data.token.substring(0, 20) + "...");
    
    // Manejo flexible de usuario: soportamos "usuario", "user", o directamente en data
    const user = data.usuario || data.user || data;
    
    if (!user || !user.id) {
      console.error("❌ Error: No se recibió información del usuario", data);
      throw new Error("Respuesta del servidor inválida");
    }
    
    console.log("👤 Usuario recibido:", user);
    localStorage.setItem("user", JSON.stringify(user));
    
    // 2. Actualizar estado
    setUsuario(user);
    console.log("✅ Estado de usuario actualizado");
    
    // 3. Retornar éxito
    return true; 
  }

  // --- ACTUALIZADO: Acepta teléfono ---
  async function register(nombre, email, password, telefono) {
    await registerApi(nombre, email, password, telefono);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsuario(null);
    window.location.href = "/login"; // Redirección forzada para limpiar estados
  }

  // Efecto para monitorear cambios en el estado de autenticación
  useEffect(() => {
    console.log("🔔 Estado de autenticación cambió:", {
      usuario,
      isLogged: !!usuario,
      cargandoAuth
    });
  }, [usuario, cargandoAuth]);

  const esAdmin = usuario?.role === "ADMIN" || usuario?.role === "SUPER_ADMIN";

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        cargandoAuth,
        login,
        register,
        logout,
        isLogged: !!usuario,
        isAdmin: esAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}