import { createContext, useState } from "react";
import { api } from "../services/api";
import { dominioValido } from "../utils/Validaciones";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioActivo")) || null
  );

  // "Normaliza" el objeto del backend para mantener compatibilidad con componentes previos
  const normalizarUsuario = (authData, extra = {}) => {
    const rolLower = authData.rol ? authData.rol.toLowerCase() : "cliente";
    return {
      id: authData.id,
      nombre: authData.nombre,
      nombre_usuario: authData.nombre,
      nombre_admin: authData.nombre,
      correo: authData.correo,
      rol: rolLower, // "admin", "vendedor" o "cliente"
      rolBackend: authData.rol, // "ADMIN", "VENDEDOR" o "CLIENTE"
      ...extra,
    };
  };

  // LOGIN (Conectado al Spring Boot /api/v1/auth/login)
  const login = async (correo, contraseña) => {
    if (!dominioValido(correo)) {
      alert("Correo inválido. Solo se permiten @gmail.com, @duocuc.cl o @profesor.duocuc.cl");
      return null;
    }

    try {
      const data = await api.login(correo, contraseña);

      // Guardar el JWT para futuras peticiones protegidas
      localStorage.setItem("token", data.token);

      const userData = normalizarUsuario(data);
      setUsuario(userData);
      localStorage.setItem("usuarioActivo", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      if (userData.rol === "admin") {
        alert(`¡Bienvenido/a Administrador ${userData.nombre}!`);
      } else if (userData.rol === "vendedor") {
        alert(`¡Bienvenido/a Vendedor ${userData.nombre}!`);
      } else {
        alert(`¡Bienvenido/a ${userData.nombre}!`);
      }

      return userData;
    } catch (error) {
      console.error("Error en login:", error);
      alert(error.message || "Correo o contraseña incorrectos.");
      return null;
    }
  };

  // Login con Google (sincronizado con el backend)
  const loginWithGoogle = async (datosGoogle) => {
    const { email, name, picture } = datosGoogle;

    if (!dominioValido(email)) {
      alert("Correo de Google inválido. Dominio no permitido.");
      return null;
    }

    const googlePass = `GoogleAuth_${email}_2026`;

    try {
      let data;
      try {
        data = await api.login(email, googlePass);
      } catch {
        data = await api.registro(name, email, googlePass);
      }

      localStorage.setItem("token", data.token);
      const userData = normalizarUsuario(data, { avatar: picture, provider: "google" });

      setUsuario(userData);
      localStorage.setItem("usuarioActivo", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      alert(`¡Bienvenido/a ${userData.nombre}!`);
      return userData;
    } catch (error) {
      console.error("Error en loginWithGoogle:", error);
      alert("Error al autenticar con Google.");
      return null;
    }
  };

  // REGISTRO (Conectado al Spring Boot /api/v1/auth/registro)
  const registro = async (nombre, correo, contraseña) => {
    if (!dominioValido(correo)) {
      alert("El correo debe ser válido (@gmail.com, @duocuc.cl, @profesor.duocuc.cl)");
      return false;
    }

    try {
      await api.registro(nombre, correo, contraseña);
      alert("Usuario creado exitosamente");
      return true;
    } catch (error) {
      console.error("Error en registro:", error);
      alert(error.message || "Error al registrar el usuario.");
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("isLoggedIn");
    alert("Has cerrado sesión con éxito.");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, loginWithGoogle, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}