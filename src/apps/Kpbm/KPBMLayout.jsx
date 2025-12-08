import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { EMPRESAS } from "../../config/empresas";

export default function KPBMLayout() {
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-gradient", EMPRESAS.kpbm.gradient);
    document.documentElement.style.setProperty("--primary-color", EMPRESAS.kpbm.colorAccent);
  }, []);

  return (
    <div style={{ fontFamily: "'Playfair Display', serif" }}>
      <div style={{background:'#f59e0b', color:'white', textAlign:'center', fontSize:'0.8rem'}}>✨ Joyería Exclusiva ✨</div>
      <Navbar />
      <main style={{ paddingTop: '100px', minHeight: '80vh', background: '#fff0f5' }}><Outlet /></main>
      <Footer />
    </div>
  );
}