import { createContext, useState, useEffect } from "react";
import { productos } from "../data/productos";
import { usuariosEjemplo } from "../data/usuarios";
import { administradoresEjemplo } from "../data/administradores";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  // Productos
  const [productosAdmin, setProductosAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("productos")) || productos;
  });

  // Usuarios
  const [usuariosAdmin, setUsuariosAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("usuarios")) || usuariosEjemplo;
  });

  // Administradores
  const [admins, setAdmins] = useState(() => {
    return JSON.parse(localStorage.getItem("administradores")) || administradoresEjemplo;
  });

  // Persistencia
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productosAdmin));
  }, [productosAdmin]);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuariosAdmin));
  }, [usuariosAdmin]);

  useEffect(() => {
    localStorage.setItem("administradores", JSON.stringify(admins));
  }, [admins]);

  // Usuarios
  const eliminarUsuario = (id) => {
    const existe = usuariosAdmin.find(u => u.id === id);
    if (!existe) {
      alert(`No se encontró ningún usuario con el id ${id}`);
      return;
    }
    setUsuariosAdmin(prev => prev.filter(u => u.id !== id));
    alert(`Usuario con id ${id} eliminado correctamente`);
  };

  const agregarUsuario = (nombre, correo, contraseña) => {
    const nuevoId = usuariosAdmin.length > 0 ? Math.max(...usuariosAdmin.map(u => u.id)) + 1 : 1;
    const nuevoUsuario = { id: nuevoId, nombre_usuario: nombre, correo, contraseña };
    setUsuariosAdmin(prev => [...prev, nuevoUsuario]);
    alert(`Usuario ${nombre} creado correctamente`);
  };

  // Administradores
  const eliminarAdmin = (id) => {
    const existe = admins.find(a => a.id === id);
    if (!existe) {
      alert(`No se encontró ningún administrador con el id ${id}`);
      return;
    }
    setAdmins(prev => prev.filter(a => a.id !== id));
    alert(`Administrador con id ${id} eliminado correctamente`);
  };

  const agregarAdmin = (nombre, correo, contraseña) => {
    const nuevoId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
    const nuevoAdmin = { id: nuevoId, nombre_usuario: nombre, correo, contraseña };
    setAdmins(prev => [...prev, nuevoAdmin]);
    alert(`Administrador ${nombre} creado correctamente`);
  };

  return (
    <AdminContext.Provider value={{
      productosAdmin,
      usuariosAdmin,
      admins,
      eliminarUsuario,
      agregarUsuario,
      eliminarAdmin,
      agregarAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
}