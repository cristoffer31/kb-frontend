import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EMPRESAS, getEmpresaBySlug } from "../config/empresas";

// Creamos el contexto con un valor por defecto seguro para evitar la pantalla blanca
const EmpresaContext = createContext({
  empresaActual: EMPRESAS.kb,
  EMPRESAS: EMPRESAS
});

export function EmpresaProvider({ children }) {
  const location = useLocation();
  const [empresaActual, setEmpresaActual] = useState(EMPRESAS.kb);

  useEffect(() => {
    const pathSegments = location.pathname.split("/"); 
    const slugPosible = pathSegments[1]; 

    if (Object.values(EMPRESAS).some(e => e.slug === slugPosible)) {
        const empresaEncontrada = getEmpresaBySlug(slugPosible);
        setEmpresaActual(empresaEncontrada);
        
        document.documentElement.style.setProperty("--primary-gradient", empresaEncontrada.gradient);
        document.documentElement.style.setProperty("--primary-color", empresaEncontrada.colorAccent);
    } 
  }, [location]);

  return (
    <EmpresaContext.Provider value={{ empresaActual, EMPRESAS }}>
      {children}
    </EmpresaContext.Provider>
  );
}

export const useEmpresa = () => {
    const context = useContext(EmpresaContext);
    if (!context) {
        // Esto ayuda a detectar si olvidaste el Provider
        console.error("⚠️ useEmpresa se está usando fuera de EmpresaProvider");
        return { empresaActual: EMPRESAS.kb }; // Fallback de emergencia
    }
    return context;
};