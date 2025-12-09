import api from "./api";

export async function loginApi(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

// --- ACTUALIZADO: Envía el objeto completo con teléfono ---
export async function registerApi(nombre, email, password, telefono) {
  return api.post("/auth/register", { 
      nombre, 
      email, 
      password,
      telefono // <--- Nuevo campo
  });
}

export async function meApi() {
  return (await api.get("/auth/me")).data;
}

export async function updateProfile(datos) {
  const res = await api.put("/auth/me", datos);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
}