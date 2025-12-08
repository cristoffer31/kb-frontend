import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { EMPRESAS } from "../../config/empresas";

export default function KBLayout() {
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-gradient", EMPRESAS.kb.gradient);
    document.documentElement.style.setProperty("--primary-color", EMPRESAS.kb.colorAccent);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <main style={{ paddingTop: '100px', minHeight: '80vh' }}><Outlet /></main>
      <Footer />
    </div>
  );
}