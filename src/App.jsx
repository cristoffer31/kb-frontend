import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; 

// Contextos
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { EmpresaProvider } from "./context/EmpresaContext"; // <--- IMPORTANTE

// Componentes Globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Layouts por Empresa
import KBLayout from "./apps/kb/KBLayout";
import KPBMLayout from "./apps/kpbm/KPBMLayout";
import SabesaLayout from "./apps/sabesa/SabesaLayout";

// Homes Específicos
import HomeKB from "./apps/kb/pages/HomeKB";
import HomeKPBM from "./apps/kpbm/pages/HomeKPBM";
import HomeSabesa from "./apps/sabesa/pages/HomeSabesa";

// Páginas Compartidas
import Login from "./pages/Login";
import Register from "./pages/Register";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import MisPedidos from "./pages/MisPedidos";
import Productos from "./pages/Productos"; 
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProductos from "./admin/AdminProductos";
import AdminCategorias from "./admin/AdminCategorias";
import AdminInventario from "./admin/AdminInventario";
import AdminPedidos from "./admin/AdminPedidos";
import AdminCupones from "./admin/AdminCupones";
import AdminCarousel from "./admin/AdminCarousel";
import AdminZonas from "./admin/AdminZonas";
import AdminUsuarios from "./admin/AdminUsuarios";

import { RequireAuth } from "./components/RequireAuth";
import { RequireAdmin } from "./components/RequireAdmin";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      <AuthProvider>
        <CarritoProvider>
          
          {/* --- AQUÍ ESTÁ LA SOLUCIÓN: EmpresaProvider DEBE envolver todo --- */}
          <EmpresaProvider> 
            
            {/* Navbar Global (Se oculta en admin o dentro de los layouts específicos si se prefiere) */}
            {/* En esta arquitectura, los Layouts (KBLayout, etc) ya traen su navbar, 
                así que ocultamos este global si estamos en una ruta de empresa o admin */}
            {!isAdminRoute && 
             !location.pathname.startsWith("/kb") && 
             !location.pathname.startsWith("/kpbm") && 
             !location.pathname.startsWith("/sabesa") && 
             <Navbar />
            }

            <Routes>
              {/* Redirección Inicial a KB */}
              <Route path="/" element={<Navigate to="/kb" replace />} />

              {/* === EMPRESA 1: KB COLLECTION === */}
              <Route path="/kb" element={<KBLayout />}>
                 <Route index element={<HomeKB />} />
                 <Route path="productos" element={<Productos />} />
                 <Route path="producto/:id" element={<ProductoDetalle />} />
              </Route>

              {/* === EMPRESA 2: KPBM === */}
              <Route path="/kpbm" element={<KPBMLayout />}>
                 <Route index element={<HomeKPBM />} />
                 <Route path="productos" element={<Productos />} />
                 <Route path="producto/:id" element={<ProductoDetalle />} />
              </Route>

              {/* === EMPRESA 3: SABESA === */}
              <Route path="/sabesa" element={<SabesaLayout />}>
                 <Route index element={<HomeSabesa />} />
                 <Route path="productos" element={<Productos />} />
                 <Route path="producto/:id" element={<ProductoDetalle />} />
              </Route>

              {/* === RUTAS GLOBALES (Login, Carrito, etc) === */}
              {/* Estas usarán el Navbar Global que pusimos arriba */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<RequireAuth><Carrito /></RequireAuth>} />
              <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/mis-pedidos" element={<RequireAuth><MisPedidos /></RequireAuth>} />

              {/* === ADMIN === */}
              <Route path="/admin" element={<RequireAdmin><AdminLayout><AdminDashboard /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/productos" element={<RequireAdmin><AdminLayout><AdminProductos /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/categorias" element={<RequireAdmin><AdminLayout><AdminCategorias /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/inventario" element={<RequireAdmin><AdminLayout><AdminInventario /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/pedidos" element={<RequireAdmin><AdminLayout><AdminPedidos /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/cupones" element={<RequireAdmin><AdminLayout><AdminCupones /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/carousel" element={<RequireAdmin><AdminLayout><AdminCarousel /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/zonas" element={<RequireAdmin><AdminLayout><AdminZonas /></AdminLayout></RequireAdmin>} />
              <Route path="/admin/usuarios" element={<RequireAdmin><AdminLayout><AdminUsuarios /></AdminLayout></RequireAdmin>} />

            </Routes>

            {/* Footer Global (oculto en admin) */}
            {!isAdminRoute && <Footer />}

          </EmpresaProvider>
          {/* ------------------------------------------------------------- */}

        </CarritoProvider>
      </AuthProvider>
    </div>
  );
}

export default App;