import { useState, useEffect } from "react";
import api from "../services/api"; 
import { useEmpresa } from "../context/EmpresaContext"; // <--- Importamos el contexto
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cargando, setCargando] = useState(true);
  
  // Obtenemos la empresa actual para filtrar los banners
  const { empresaActual } = useEmpresa();

  useEffect(() => {
    async function fetchBanners() {
      try {
        // Le enviamos el ID de la empresa al backend
        const res = await api.get("/carousel", { 
            params: { empresaId: empresaActual.id } 
        });

        if (res.data && res.data.length > 0) {
          setSlides(res.data);
        } else {
          // Fallback: Imágenes por defecto si la empresa no tiene banners aún
          setSlides([
            { id: 1, imageUrl: "/banner_n1.png", titulo: `Bienvenido a ${empresaActual.nombre}` },
            { id: 2, imageUrl: "/banner_n2.png", titulo: "Grandes Ofertas" }
          ]);
        }
      } catch (error) {
        console.error("Error cargando carrusel", error);
        // Fallback de error
        setSlides([
            { id: 1, imageUrl: "/banner_n1.png" },
            { id: 2, imageUrl: "/banner_n2.png" }
        ]);
      } finally {
        setCargando(false);
      }
    }
    fetchBanners();
  }, [empresaActual]); // <--- Se recarga si cambias de empresa

  // Autoplay
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (cargando) return <div className="carousel-loading">Cargando...</div>;
  if (slides.length === 0) return null;

  return (
    <div className="carousel-container">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={slide.id || index} className="carousel-slide">
            <img src={slide.imageUrl} alt={slide.titulo || "Banner"} />
            {slide.titulo && (
                <div className="carousel-caption">
                    <h3>{slide.titulo}</h3>
                </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="carousel-btn left" onClick={prevSlide}><FaChevronLeft /></button>
          <button className="carousel-btn right" onClick={nextSlide}><FaChevronRight /></button>
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <span key={i} onClick={() => setCurrent(i)} className={`dot ${current === i ? "active" : ""}`}></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}