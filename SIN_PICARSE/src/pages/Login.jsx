import { useState, useContext } from "react";
import { AuthContext } from "../context/Autenticacion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, registro } = useContext(AuthContext);
  const [modo, setModo] = useState("login"); // "login" o "registro"
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contraseña = e.target.contraseña.value;
    const ok = login(correo, contraseña);
    if (ok) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard"); // redirige al panel
    }
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const correo = e.target.correo.value;
    const contraseña = e.target.contraseña.value;
    const ok = registro(nombre, correo, contraseña);
    if (ok) {
      setModo("login"); // vuelve al login después de registrar
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <button className="btn btn-outline-danger me-2" onClick={() => setModo("login")}>
          Iniciar Sesión
        </button>
        <button className="btn btn-outline-danger" onClick={() => setModo("registro")}>
          Registrarse
        </button>
      </div>

      {modo === "login" ? (
        <form onSubmit={handleLogin} className="form-login">
          <div className="mb-3">
            <input type="email" name="correo" className="form-control" placeholder="Correo" required />
          </div>
          <div className="mb-3">
            <input type="password" name="contraseña" className="form-control" placeholder="Contraseña" required />
          </div>
          <button type="submit" className="btn btn-danger w-100">Entrar</button>
        </form>
      ) : (
        <form onSubmit={handleRegistro} className="form-registro">
          <div className="mb-3">
            <input type="text" name="nombre" className="form-control" placeholder="Nombre de usuario" required />
          </div>
          <div className="mb-3">
            <input type="email" name="correo" className="form-control" placeholder="Correo" required />
          </div>
          <div className="mb-3">
            <input type="password" name="contraseña" className="form-control" placeholder="Contraseña" required />
          </div>
          <button type="submit" className="btn btn-danger w-100">Registrarse</button>
        </form>
      )}
    </div>
  );
}
