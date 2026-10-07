import { useState, useContext } from "react";
import { AuthContext } from "../context/Autenticacion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, registro } = useContext(AuthContext);
  const [modo, setModo] = useState("login"); // "login" o "registro"
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contraseña = e.target.contraseña.value;

    const usuarioLogueado = await login(correo, contraseña);

    if (usuarioLogueado) {
      if (usuarioLogueado.rol === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const correo = e.target.correo.value;
    const contraseña = e.target.contraseña.value;

    const ok = await registro(nombre, correo, contraseña);
    if (ok) {
      setModo("login");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1 my-5" style={{ minHeight: "65vh" }}>
      
      <div className="card p-4 shadow-sm" style={{ maxWidth: "420px", width: "100%", borderRadius: "10px" }}>
        
        {modo === "login" ? (
          
          <form onSubmit={handleLogin} className="form-login">
            <h4 className="text-center mb-4">Iniciar Sesión</h4>
            
            <div className="mb-3">
              <label className="form-label text-secondary small">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                placeholder="ejemplo@duocuc.cl"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label text-secondary small">Contraseña</label>
              <input
                type="password"
                name="contraseña"
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-2">
              Entrar
            </button>

            <div className="text-center mt-3 pt-2 border-top">
              <small className="text-muted">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-danger text-decoration-none fw-bold small"
                  onClick={() => setModo("registro")}
                >
                  Regístrate
                </button>
              </small>
            </div>
          </form>
        ) : (
          
          <form onSubmit={handleRegistro} className="form-registro">
            <h4 className="text-center mb-4">Crear Cuenta</h4>
            
            <div className="mb-3">
              <label className="form-label text-secondary small">Nombre de usuario</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                placeholder="ejemplo@duocuc.cl"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small">Contraseña</label>
              <input
                type="password"
                name="contraseña"
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-2">
              Registrarse
            </button>

            <div className="text-center mt-3 pt-2 border-top">
              <small className="text-muted">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-danger text-decoration-none fw-bold small"
                  onClick={() => setModo("login")}
                >
                  Inicia sesión
                </button>
              </small>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}