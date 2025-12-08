import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { EMPRESAS } from "../../config/empresas";

export default function SabesaLayout() {
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-gradient", EMPRESAS.sabesa.gradient);
    document.documentElement.style.setProperty("--primary-color", EMPRESAS.sabesa.colorAccent);
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navbar />
      <main style={{ paddingTop: '100px', minHeight: '80vh', background: '#f1f5f9' }}><Outlet /></main>
      <Footer />
    </div>
  );
}