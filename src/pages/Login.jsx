// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import "./Auth.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log("🔵 Componente Login renderizado", { email, error });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Intentando login con:", email);
      const success = await login(email, password);
      
      if (success) {
        console.log("✅ Login exitoso, redirigiendo a /kb");
        // Navegamos directamente a /kb en lugar de /
        navigate("/kb", { replace: true }); 
      }
    } catch (err) {
      console.error("❌ Error en login:", err);

      // Lógica de errores mejorada:
      // 1. Si el backend envía un mensaje específico ("error": "..."), lo mostramos.
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } 
      // 2. Si es un 401 genérico (Credenciales malas)
      else if (err.response && err.response.status === 401) {
        setError("Correo o contraseña incorrectos.");
      } 
      // 3. Error de conexión u otro
      else {
        setError(err.message || "No se pudo iniciar sesión. Verifica tu conexión.");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Iniciar sesión</h2>
        <p>Ingresa con tu cuenta de KB COLLECTION</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Entrar
          </button>
        </form>
        
        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
          <Link to="/recuperar" style={{ color: '#64748b', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</Link>
        </div>

        <p className="auth-footer-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}