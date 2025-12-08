import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaUserCircle, FaBoxOpen, FaSignOutAlt, FaChevronDown, FaCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import { useEmpresa } from "../context/EmpresaContext"; // Importar contexto
import { buscarProductos } from "../services/productoService";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const closeTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const { usuario, isLogged, isAdmin, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CarritoContext);
  const { empresaActual } = useEmpresa(); // Usar empresa actual

  const searchRef = useRef(null);
  
  // Prefijo de URL (ej: /kb, /kpbm)
  const prefix = `/${empresaActual.slug}`;

  const handleMenuEnter = () => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); setShowUserMenu(true); };
  const handleMenuLeave = () => { closeTimeoutRef.current = setTimeout(() => setShowUserMenu(false), 300); };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.trim().length > 1) {
        try {
          // Buscamos solo en la empresa actual
          const resultados = await buscarProductos(search, null, empresaActual.id);
          setSugerencias((resultados.content || []).slice(0, 5)); 
          setMostrarSugerencias(true);
        } catch (error) { setSugerencias([]); }
      } else { setSugerencias([]); setMostrarSugerencias(false); }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, empresaActual]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`${prefix}/productos?buscar=${encodeURIComponent(search)}`);
      setOpen(false); setMostrarSugerencias(false);
    }
  };

  const irAProducto = (id) => {
      // Navegamos manteniendo la empresa actual en la URL
      navigate(`${prefix}/producto/${id}`);
      setSearch(""); setMostrarSugerencias(false);
  };

  return (
    <header className="navbar-container">
      <div className="topbar">
        Envíos rápidos • {empresaActual.heroTitle}
      </div>

      <nav className="navbar">
        <Link className="navbar-logo" to={prefix}>
          {/* Logo dinámico */}
          <img src={empresaActual.logo} alt={empresaActual.nombre} className="navbar-logo-img" />
        </Link>

        <div className="navbar-search" ref={searchRef}>
          <div className="search-wrapper">
            <input
                type="text"
                placeholder={`Buscar en ${empresaActual.nombre}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => search.length > 1 && setMostrarSugerencias(true)}
            />
            <button className="search-btn" onClick={handleSearch}><FaSearch /></button>
          </div>

          {mostrarSugerencias && sugerencias.length > 0 && (
            <div className="sugerencias-box">
                {sugerencias.map((prod) => (
                    <div key={prod.id} className="sugerencia-item" onClick={() => irAProducto(prod.id)}>
                        <img src={prod.imagenUrl || "/placeholder.png"} alt={prod.nombre} />
                        <div className="sugerencia-info">
                            <span className="s-nombre">{prod.nombre}</span>
                            <span className="s-precio">${Number(prod.precio).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>

        <div className={`navbar-links ${open ? "active" : ""}`}>
          <Link to={prefix} onClick={() => setOpen(false)}>Inicio</Link>
          <Link to={`${prefix}/productos`} onClick={() => setOpen(false)}>Catálogo</Link>
          <Link to="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          {isAdmin && <Link to="/admin" className="admin-nav-link" onClick={() => setOpen(false)}>Admin</Link>}
        </div>

        <div className="navbar-icons">
          <Link to="/carrito" className="icon-btn cart-icon">
            <FaShoppingCart />
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>

          {!isLogged ? (
            <Link to="/login" className="login-btn-nav"><FaUser /> Ingresar</Link>
          ) : (
            <div className="user-dropdown-container" onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
              <button className="user-btn-trigger">
                  <FaUserCircle className="avatar-icon"/> <span className="user-name-nav">{usuario?.nombre?.split(' ')[0]}</span> <FaChevronDown className="chevron-icon"/>
              </button>
              {showUserMenu && (
                  <div className="user-dropdown-menu">
                      <div className="dropdown-header"><strong>Hola, {usuario?.nombre}</strong></div>
                      <Link to="/mis-pedidos" className="dropdown-item"><FaBoxOpen /> Mis Pedidos</Link>
                      <button className="dropdown-item logout" onClick={logout}><FaSignOutAlt /> Salir</button>
                  </div>
              )}
            </div>
          )}
          <button className="hamburger" onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;