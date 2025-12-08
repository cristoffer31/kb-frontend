export const EMPRESAS = {
  kb: {
    id: 1,
    slug: "kb",
    nombre: "KB Collection Internacional",
    logo: "/kb_logo_M.png", 
    // Azul Clásico
    gradient: "linear-gradient(135deg, #0061ff 0%, #004aad 100%)",
    colorAccent: "#004aad",
    heroTitle: "Higiene y Estilo Premium",
  },
  kpbm: {
    id: 2,
    slug: "kpbm",
    nombre: "KPBM",
    logo: "/kpbm_logo.png", 
    // Fucsia y Dorado (Joyería)
    gradient: "linear-gradient(135deg, #db2777 0%, #d97706 100%)",
    colorAccent: "#be185d",
    heroTitle: "Higiene y Estilo Premium",
  },
  sabesa: {
    id: 3,
    slug: "sabesa",
    nombre: "Sabesa",
    logo: "/sabesa_logo.png", 
    // Azul Oscuro y Rojo (Industrial)
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #dc2626 100%)",
    colorAccent: "#1e3a8a",
    heroTitle: "Higiene y Estilo Premium",
  }
};

export const getEmpresaBySlug = (slug) => {
  return Object.values(EMPRESAS).find(e => e.slug === slug) || EMPRESAS.kb;
};