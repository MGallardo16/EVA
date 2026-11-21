const API_BASE_URL = 'http://localhost:8080/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const config = {
    ...options,
    headers,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (response.status === 204) {
    return null;
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const errorMessage =
      data?.error ||
      data?.message ||
      `Error ${response.status}: No se pudo completar la operación`;
    throw new Error(errorMessage);
  }
  return data;
}
export const api = {
  // AUTENTICACIÓN 
  login: (correo, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, password }),
    }),

  registro: (nombre, correo, password) =>
    request('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({ nombre, correo, password }),
    }),

  //PRODUCTOS
  getProductos: () => request('/productos'),
  getProductoById: (id) => request(`/productos/${id}`),
  crearProducto: (producto) =>
    request('/productos', {
      method: 'POST',
      body: JSON.stringify(producto),
    }),
  actualizarProducto: (id, producto) =>
    request(`/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(producto),
    }),
  eliminarProducto: (id) =>
    request(`/productos/${id}`, {
      method: 'DELETE',
    }),

  // CATEGORÍAS
  getCategorias: () => request('/categorias'),
  crearCategoria: (categoria) =>
    request('/categorias', {
      method: 'POST',
      body: JSON.stringify(categoria),
    }),
  eliminarCategoria: (id) =>
    request(`/categorias/${id}`, {
      method: 'DELETE',
    }),

  // BOLETAS / ÓRDENES 
  getBoletas: () => request('/boletas'),
  getBoletaById: (id) => request(`/boletas/${id}`),
  crearBoleta: (boletaRequest) =>
    request('/boletas', {
      method: 'POST',
      body: JSON.stringify(boletaRequest),
    }),

  //USUARIOS Y ADMINISTRADORES (Solo ADMIN)
  getUsuarios: () => request('/usuarios'),
  crearUsuario: (usuario) =>
    request('/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuario),
    }),
  actualizarUsuario: (id, usuario) =>
    request(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(usuario),
    }),
  eliminarUsuario: (id) =>
    request(`/usuarios/${id}`, {
      method: 'DELETE',
    }),
};