import React, { useEffect, useState } from "react";
import { useEmpresa } from "../../../context/EmpresaContext"; // Ojo a la ruta
import { listarProductos, listarOfertas } from "../../../services/productoService";
import ProductCard from "../../../components/ProductCard";
import ProductModal from "../../../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { EMPRESAS } from "../../../config/empresas";
import "../../../pages/Home.css"; // Reusa estilos

export default function HomeKPBM() {
  const { empresaActual } = useEmpresa();
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    listarProductos(0, empresaActual.id).then(d => setProductos(d.content || []));
    listarOfertas(empresaActual.id).then(d => setOfertas(d || []));
  }, [empresaActual]);

  return (
    <div className="home-wrapper">
       <section className="home-hero" style={{ background: empresaActual.gradient }}>
          <div className="container home-hero-inner">
             <div className="home-hero-left">
                <h1>{empresaActual.nombre}</h1>
                <p>Bienvenido a la tienda oficial KPBM.</p>
                {/* BOTONES PARA CAMBIAR DE EMPRESA */}
                <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
                    <button className="btn-hero" onClick={() => navigate('/kb')}>Ir a KB</button>
                    <button className="btn-hero" onClick={() => navigate('/sabesa')}>Ir a SABESA</button>
                </div>
             </div>
             <div className="home-hero-right">
                <img src={empresaActual.logo} alt="Logo" style={{maxHeight:'250px'}}/>
             </div>
          </div>
       </section>

       <div className="container" style={{marginTop:'40px'}}>
          {/* Muestra Productos... (Mismo código de tu Home original) */}
          <h2 className="section-title-center">Nuestros Productos</h2>
          <div className="product-grid-normal">
             {productos.map(p => (
                 <div key={p.id} onClick={() => setSeleccionado(p)}><ProductCard producto={p} /></div>
             ))}
          </div>
       </div>
       {seleccionado && <ProductModal producto={seleccionado} onClose={() => setSeleccionado(null)} />}
    </div>
  );
}