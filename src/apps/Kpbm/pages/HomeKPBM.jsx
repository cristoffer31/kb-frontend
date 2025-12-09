import React, { useEffect, useState } from "react";
import { useEmpresa } from "../../../context/EmpresaContext";
import { listarProductos, listarOfertas } from "../../../services/productoService";
import ProductCard from "../../../components/ProductCard";
import ProductModal from "../../../components/ProductModal";
import Carousel from "../../../components/Carousel"; 
import { useNavigate } from "react-router-dom";
import { EMPRESAS } from "../../../config/empresas";
import "../../../pages/Home.css";

export default function HomeKPBM() {
  const { empresaActual } = useEmpresa();
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos filtrados por la empresa (ID 2)
    listarProductos(0, empresaActual.id).then(d => setProductos(d.content || []));
    listarOfertas(empresaActual.id).then(d => setOfertas(d || []));
  }, [empresaActual]);

  return (
    <div className="home-wrapper">
       <section className="home-hero" style={{ background: empresaActual.gradient }}>
          <div className="container home-hero-inner">
             
             <div className="home-hero-left">
                <span className="badge-oficial" style={{background: 'rgba(255,255,255,0.25)'}}>
                    Colección Exclusiva
                </span>
                <h1>{empresaActual.nombre}</h1>
                <p>
                    Realza tu belleza con nuestra línea exclusiva de <strong>maquillaje, cosméticos y joyería fina</strong>.
                    El toque de distinción que buscas.
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

                    {/* Ir a SABESA */}
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
                    alt="Logo KPBM" 
                    style={{maxHeight:'280px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'}}
                />
             </div>
          </div>
       </section>

       <div className="container" style={{marginTop:'40px'}}>
          <div style={{ marginBottom: '50px' }}>
              <Carousel />
          </div>

          <h2 className="section-title-center" style={{color: empresaActual.colorAccent, fontFamily: "'Playfair Display', serif"}}>
             Nuestras Colecciones
          </h2>
          
          <div className="product-grid-normal">
             {productos.map(p => (
                 <div key={p.id} onClick={() => setSeleccionado(p)} style={{cursor:'pointer'}}>
                    <ProductCard producto={p} />
                 </div>
             ))}
             {productos.length === 0 && (
                 <div className="empty-state">
                     <p>Pronto nuevas colecciones disponibles.</p>
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