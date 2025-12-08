import api from "./api";

// Acepta empresaId opcional
export async function listarProductos(page = 0, empresaId = null) {
  const params = { page, size: 12 };
  if (empresaId) params.empresaId = empresaId;
  const res = await api.get("/productos", { params });
  return res.data;
}

export async function listarOfertas(empresaId = null) {
  const params = {};
  if (empresaId) params.empresaId = empresaId;
  const res = await api.get("/productos/ofertas", { params });
  return res.data; 
}

export async function buscarProductos(texto = "", categoriaId = null, empresaId = null) {
  const params = {};
  if (texto) params.nombre = texto;
  if (categoriaId) params.categoriaId = categoriaId;
  if (empresaId) params.empresaId = empresaId;
  const res = await api.get("/productos/buscar", { params });
  return res.data;
}

export async function obtenerProducto(id) {
  const res = await api.get(`/productos/${id}`);
  return res.data;
}

// ... mantén las funciones de crear/editar/eliminar igual ...