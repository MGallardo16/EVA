import { createContext, useState } from "react";
import { usuariosEjemplo } from "../data/usuarios";
import { administradoresEjemplo } from "../data/administradores";
import { dominioValido } from "../utils/Validaciones";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa con sesión activa si existe en localStorage
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioActivo")) || null
  );

  const login = (correo, contraseña) => {
    if (!dominioValido(correo)) {
      alert("Correo inválido. Solo se permiten @gmail.com, @duocuc.cl o @profesor.duocuc.cl");
      return false;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosEjemplo;
    const administradores = JSON.parse(localStorage.getItem("administradores")) || administradoresEjemplo;

    const adminValido = administradores.find(a => a.correo === correo && a.contraseña === contraseña);
    if (adminValido) {
      const adminData = { ...adminValido, rol: "admin" };
      setUsuario(adminData);
      localStorage.setItem("usuarioActivo", JSON.stringify(adminData));
      localStorage.setItem("isLoggedIn", "true");
      alert(`¡Bienvenido/a Administrador ${adminValido.nombre_usuario}!`);
      return true;
    }

    const usuarioValido = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
    if (usuarioValido) {
      const userData = { ...usuarioValido, rol: "cliente" };
      setUsuario(userData);
      localStorage.setItem("usuarioActivo", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      alert(`¡Bienvenido/a ${usuarioValido.nombre_usuario}!`);
      return true;
    }

    alert("Correo o contraseña incorrectos.");
    return false;
  };

  const registro = (nombre, correo, contraseña) => {
    if (!dominioValido(correo)) {
      alert("El correo debe ser válido (@gmail.com, @duocuc.cl, @profesor.duocuc.cl)");
      return false;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosEjemplo;
    if (usuarios.find(u => u.correo === correo)) {
      alert("Este correo ya está registrado.");
      return false;
    }

    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const nuevoUsuario = { id: nuevoId, nombre_usuario: nombre, correo, contraseña };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario creado exitosamente");
    return true;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("isLoggedIn");
    alert("Has cerrado sesión con éxito.");
    // Aquí no usamos window.location.href, el Dashboard.jsx se encarga de redirigir con navigate("/")
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
