// src/components/RequireAuth.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function RequireAuth({ children }) {
  const { isLogged, cargandoAuth } = useContext(AuthContext);

  console.log("🛡️ RequireAuth evaluando:", { isLogged, cargandoAuth });

  if (cargandoAuth) {
    console.log("⏳ RequireAuth: Cargando...");
    return <div>Cargando...</div>;
  }
  
  if (!isLogged) {
    console.log("🚫 RequireAuth: No autenticado, redirigiendo a /login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ RequireAuth: Autenticado, mostrando contenido");
  return children;
}
