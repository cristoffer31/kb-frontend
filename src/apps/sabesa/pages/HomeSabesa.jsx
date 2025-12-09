import React, { useEffect, useState } from "react";
import { useEmpresa } from "../../../context/EmpresaContext";
import { listarProductos, listarOfertas } from "../../../services/productoService";
import ProductCard from "../../../components/ProductCard";
import ProductModal from "../../../components/ProductModal";
import Carousel from "../../../components/Carousel"; 
import { useNavigate } from "react-router-dom";
import { EMPRESAS } from "../../../config/empresas";
import "../../../pages/Home.css";

export default function HomeSabesa() {
  const { empresaActual } = useEmpresa();
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos filtrados por la empresa (ID 3)
    listarProductos(0, empresaActual.id).then(d => setProductos(d.content || []));
    listarOfertas(empresaActual.id).then(d => setOfertas(d || []));
  }, [empresaActual]);

  return (
    <div className="home-wrapper">
       <section className="home-hero" style={{ background: empresaActual.gradient }}>
          <div className="container home-hero-inner">
             
             <div className="home-hero-left">
                <span className="badge-oficial">Distribuidor Autorizado</span>
                <h1>{empresaActual.nombre}</h1>
                <p>
                    Expertos en distribución de <strong>productos industriales, limpieza institucional y suministros de alto volumen</strong>.
                    Soluciones confiables para tu negocio.
                </p>
                
                {/* NAVEGACIÓN */}
                <div className="nav-brands-container">
                    
                    {/* Ir a KB */}
                    <div 
                        className="brand-card-link" 
                        onClick={() => navigate('/kb')}
                        data-tooltip="Ir a Higiene (KB)"
                    >
                        <img src={EMPRESAS.kb.logo} alt="KB" />
                    </div>

                    {/* Ir a KPBM */}
                    <div 
                        className="brand-card-link" 
                        onClick={() => navigate('/kpbm')}
                        data-tooltip="Ir a Joyería (KPBM)"
                    >
                        <img src={EMPRESAS.kpbm.logo} alt="KPBM" />
                    </div>

                </div>
             </div>

             <div className="home-hero-right">
                <img 
                    src={empresaActual.logo} 
                    alt="Logo Sabesa" 
                    style={{maxHeight:'280px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'}}
                />
             </div>
          </div>
       </section>

       <div className="container" style={{marginTop:'40px'}}>
          <div style={{ marginBottom: '50px' }}>
              <Carousel />
          </div>

          <h2 className="section-title-center" style={{color: empresaActual.colorAccent}}>
             Catálogo Industrial
          </h2>
          
          <div className="product-grid-normal">
             {productos.map(p => (
                 <div key={p.id} onClick={() => setSeleccionado(p)} style={{cursor:'pointer'}}>
                    <ProductCard producto={p} />
                 </div>
             ))}
             {productos.length === 0 && (
                 <div className="empty-state">
                     <p>Catálogo en actualización.</p>
                 </div>
             )}
          </div>
       </div>

       {seleccionado && (
           <ProductModal producto={seleccionado} onClose={() => setSeleccionado(null)} />
       )}
    </div>
  );
}