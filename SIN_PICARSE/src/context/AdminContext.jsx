import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "./Autenticacion";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const { usuario } = useContext(AuthContext);
  const [productosAdmin, setProductosAdmin] = useState([]);
  const [usuariosAdmin, setUsuariosAdmin] = useState([]);
  const [admins, setAdmins] = useState([]);

  const recargarDatos = async () => {
    try {
      // Todos los roles podrán ver productos
      const productos = await api.getProductos();
      if (productos) setProductosAdmin(productos);

      // Solo el ADMIN tiene permiso en el backend para ver /api/v1/usuarios
      if (usuario?.rol === "admin") {
        const todosLosUsuarios = await api.getUsuarios();
        if (todosLosUsuarios) {
          setUsuariosAdmin(
            todosLosUsuarios
              .filter((u) => u.rol === "CLIENTE" || u.rol === "VENDEDOR")
              .map((u) => ({ ...u, nombre_usuario: u.nombre }))
          );
          setAdmins(
            todosLosUsuarios
              .filter((u) => u.rol === "ADMIN")
              .map((a) => ({ ...a, nombre_admin: a.nombre }))
          );
        }
      }
    } catch (error) {
      console.error("Error cargando datos del panel:", error);
    }
  };

  useEffect(() => {
    if (usuario) {
      recargarDatos();
    }
  }, [usuario]);

  const eliminarUsuario = async (id) => {
    await api.eliminarUsuario(id);
    setUsuariosAdmin((prev) => prev.filter((u) => u.id !== id));
  };

  const agregarUsuario = async (nombre, correo, contraseña, rol = "CLIENTE") => {
    const creado = await api.crearUsuario({ nombre, correo, password: contraseña, rol });
    if (creado) {
      setUsuariosAdmin((prev) => [...prev, { ...creado, nombre_usuario: creado.nombre }]);
    }
  };

  const eliminarAdmin = async (id) => {
    await api.eliminarUsuario(id);
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const agregarAdmin = async (nombre, correo, contraseña) => {
    const creado = await api.crearUsuario({ nombre, correo, password: contraseña, rol: "ADMIN" });
    if (creado) {
      setAdmins((prev) => [...prev, { ...creado, nombre_admin: creado.nombre }]);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        productosAdmin,
        usuariosAdmin,
        admins,
        recargarDatos,
        eliminarUsuario,
        agregarUsuario,
        eliminarAdmin,
        agregarAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}