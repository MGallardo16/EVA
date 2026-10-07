import { createContext, useState } from "react";
import { supabase } from "../supabaseClient";
import { dominioValido } from "../utils/Validaciones";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa con sesión activa si existe en localStorage
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioActivo")) || null
  );

  // LOGIN (Conectado a Supabase)
  const login = async (correo, contraseña) => {
    if (!dominioValido(correo)) {
      alert("Correo inválido. Solo se permiten @gmail.com, @duocuc.cl o @profesor.duocuc.cl");
      return null;
    }

    try {
      // 1. Buscar en administradores (usa 'nombre_admin')
      const { data: admin } = await supabase
        .from("administradores")
        .select("*")
        .eq("correo", correo)
        .eq("contraseña", contraseña)
        .maybeSingle();

      if (admin) {
        const adminData = {
          ...admin,
          nombre_usuario: admin.nombre_admin, // Estandarizamos para el resto de la app
          rol: "admin",
        };
        setUsuario(adminData);
        localStorage.setItem("usuarioActivo", JSON.stringify(adminData));
        localStorage.setItem("isLoggedIn", "true");
        alert(`¡Bienvenido/a Administrador ${admin.nombre_admin}!`);
        return adminData;
      }

      // 2. Buscar en usuarios (clientes)
      const { data: cliente } = await supabase
        .from("usuarios")
        .select("*")
        .eq("correo", correo)
        .eq("contraseña", contraseña)
        .maybeSingle();

      if (cliente) {
        const clienteData = { ...cliente, rol: "cliente" };
        setUsuario(clienteData);
        localStorage.setItem("usuarioActivo", JSON.stringify(clienteData));
        localStorage.setItem("isLoggedIn", "true");
        alert(`¡Bienvenido/a ${cliente.nombre_usuario}!`);
        return clienteData;
      }

      alert("Correo o contraseña incorrectos.");
      return null;

    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión con la base de datos.");
      return null;
    }
  };

  // REGISTRO (Inserta directo en la tabla 'usuarios' de Supabase)
  const registro = async (nombre, correo, contraseña) => {
    if (!dominioValido(correo)) {
      alert("El correo debe ser válido (@gmail.com, @duocuc.cl, @profesor.duocuc.cl)");
      return false;
    }

    try {
      // Verificar si ya existe en usuarios
      const { data: existente } = await supabase
        .from("usuarios")
        .select("id")
        .eq("correo", correo)
        .maybeSingle();

      if (existente) {
        alert("Este correo ya está registrado.");
        return false;
      }

      // Insertar nuevo usuario
      const { error } = await supabase.from("usuarios").insert([
        {
          nombre_usuario: nombre,
          correo: correo,
          contraseña: contraseña,
        },
      ]);

      if (error) throw error;

      alert("Usuario creado exitosamente");
      return true;

    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error al registrar el usuario en la base de datos.");
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("isLoggedIn");
    alert("Has cerrado sesión con éxito.");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}