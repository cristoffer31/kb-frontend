import React, { useState, useContext } from "react";
import "./Auth.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState(""); // <--- NUEVO ESTADO
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      // Enviamos también el teléfono
      await register(nombre, email, password, telefono);
      setOk("Registro exitoso. Te hemos enviado un SMS/Correo de verificación.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Error de registro:", err);

      if (err.response && err.response.data) {
        if (err.response.data.error) {
            setError(err.response.data.error);
        } else if (err.response.data.parameterViolations) {
            const msg = err.response.data.parameterViolations[0].message;
            setError(msg);
        } else {
            setError("Datos inválidos. Revisa la información.");
        }
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Crear cuenta</h2>

        {error && <div className="auth-error">{error}</div>}
        {ok && <div className="auth-ok">{ok}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Nombre completo"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          {/* --- NUEVO INPUT DE TELÉFONO --- */}
          <input
            type="tel"
            placeholder="Teléfono (ej: +50370000000)"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            title="Incluye el código de área, ej: +503..."
          />

          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Registrarme
          </button>
        </form>

        <div className="auth-footer-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}