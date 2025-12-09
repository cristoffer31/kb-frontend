import React, { useEffect, useState } from "react";
import { useEmpresa } from "../../../context/EmpresaContext";
import { listarProductos, listarOfertas } from "../../../services/productoService";
import ProductCard from "../../../components/ProductCard";
import ProductModal from "../../../components/ProductModal";
import Carousel from "../../../components/Carousel"; 
import { useNavigate } from "react-router-dom";
import { EMPRESAS } from "../../../config/empresas";
import "../../../pages/Home.css"; // Estilos compartidos

export default function HomeKB() {
  const { empresaActual } = useEmpresa();
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos filtrados por la empresa (ID 1)
    listarProductos(0, empresaActual.id).then(d => setProductos(d.content || []));
    listarOfertas(empresaActual.id).then(d => setOfertas(d || []));
  }, [empresaActual]);

  return (
    <div className="home-wrapper">
       {/* HERO SECTION */}
       <section className="home-hero" style={{ background: empresaActual.gradient }}>
          <div className="container home-hero-inner">
             
             <div className="home-hero-left">
                <span className="badge-oficial">Tienda Oficial</span>
                <h1>{empresaActual.nombre}</h1>
                <p>
                    Tu destino número uno para productos de <strong>higiene personal, cuidado del hogar y variedades</strong>. 
                    Calidad garantizada para toda la familia.
                </p>
                
                {/* NAVEGACIÓN ENTRE EMPRESAS (SOLO LOGOS) */}
                <div className="nav-brands-container">
                    
                    {/* Botón para ir a KPBM */}
                    <div 
                        className="brand-card-link" 
                        onClick={() => navigate('/kpbm')}
                        data-tooltip="Ir a Joyería (KPBM)"
                    >
                        <img src={EMPRESAS.kpbm.logo} alt="KPBM" />
                    </div>

                    {/* Botón para ir a SABESA */}
                    <div 
                        className="brand-card-link" 
                        onClick={() => navigate('/sabesa')}
                        data-tooltip="Ir a Industrial (Sabesa)"
                    >
                        <img src={EMPRESAS.sabesa.logo} alt="Sabesa" />
                    </div>

                </div>
             </div>

             <div className="home-hero-right">
                <img 
                    src={empresaActual.logo} 
                    alt="Logo KB" 
                    style={{maxHeight:'280px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'}}
                />
             </div>
          </div>
       </section>

       {/* CONTENIDO PRINCIPAL */}
       <div className="container" style={{marginTop:'40px'}}>
          
          {/* CARRUSEL */}
          <div style={{ marginBottom: '50px' }}>
              <Carousel />
          </div>

          {/* SECCIÓN DE OFERTAS */}
          {ofertas.length > 0 && (
              <div style={{marginBottom:'60px'}}>
                  <h2 className="section-title-center" style={{color: '#dc2626'}}>🔥 Ofertas Relámpago</h2>
                  <div className="product-grid-normal">
                      {ofertas.map(p => (
                          <div key={p.id} onClick={() => setSeleccionado(p)} style={{cursor:'pointer'}}>
                              <ProductCard producto={p} />
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* CATÁLOGO GENERAL */}
          <h2 className="section-title-center" style={{color: empresaActual.colorAccent}}>
             Catálogo General
          </h2>
          
          <div className="product-grid-normal">
             {productos.map(p => (
                 <div key={p.id} onClick={() => setSeleccionado(p)} style={{cursor:'pointer'}}>
                    <ProductCard producto={p} />
                 </div>
             ))}
             {productos.length === 0 && (
                 <div className="empty-state">
                    <p>No hay productos disponibles por el momento.</p>
                 </div>
             )}
          </div>
       </div>

       {/* MODAL DE PRODUCTO */}
       {seleccionado && (
           <ProductModal producto={seleccionado} onClose={() => setSeleccionado(null)} />
       )}
    </div>
  );
}