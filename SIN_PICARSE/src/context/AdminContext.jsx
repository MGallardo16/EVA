import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [productosAdmin, setProductosAdmin] = useState([]);
  const [usuariosAdmin, setUsuariosAdmin] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: productos } = await supabase.from("productos").select("*");
      const { data: usuarios } = await supabase.from("usuarios").select("*");
      const { data: administradores } = await supabase.from("administradores").select("*");

      if (productos) setProductosAdmin(productos);
      if (usuarios) setUsuariosAdmin(usuarios);
      if (administradores) setAdmins(administradores);
    };
    fetchData();
  }, []);

  const eliminarUsuario = async (id) => {
    await supabase.from("usuarios").delete().eq("id", id);
    setUsuariosAdmin(prev => prev.filter(u => u.id !== id));
  };

  const agregarUsuario = async (nombre, correo, contraseña) => {
    const { data, error } = await supabase.from("usuarios").insert([
      { nombre_usuario: nombre, correo, contraseña }
    ]).select();
    if (!error && data) setUsuariosAdmin(prev => [...prev, ...data]);
  };

  const eliminarAdmin = async (id) => {
    await supabase.from("administradores").delete().eq("id", id);
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  const agregarAdmin = async (nombre, correo, contraseña) => {
    const { data, error } = await supabase.from("administradores").insert([
      { nombre_admin: nombre, correo, contraseña }
    ]).select();
    if (!error && data) setAdmins(prev => [...prev, ...data]);
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
