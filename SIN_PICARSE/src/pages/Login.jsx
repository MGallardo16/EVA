import { useState, useContext } from "react";
import { AuthContext } from "../context/Autenticacion";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const { login, registro } = useContext(AuthContext);
  const [modo, setModo] = useState("login"); // "login" o "registro"
  const navigate = useNavigate();
  const [showPassLogin, setShowPassLogin] = useState(false);
  const [showPassRegistro, setShowPassRegistro] = useState(false);

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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const usuarioGoogle = await login(decoded.email, null, {
        nombre: decoded.name,
        avatar: decoded.picture,
        esGoogle: true
      });

      if (usuarioGoogle) {
        if (usuarioGoogle.rol === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error procesando credencial de Google:", error);
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
              <div className="input-group">
                <input
                  type={showPassLogin ? "text" : "password"}
                  name="contraseña"
                  className="form-control"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassLogin(!showPassLogin)}
                >
                  {showPassLogin ? "🔓" : "🔒"}  
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-2">
              Entrar
            </button>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1 my-0" />
              <span className="px-2 text-muted small">O</span>
              <hr className="flex-grow-1 my-0" />
            </div>

            <div className="d-flex justify-content-center my-2">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error("Error al iniciar sesión con Google")}
                shape="rectangular"
                theme="outline"
                size="large"
                width="350"
                text="signin_with"
              />
            </div>

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
              <div className="input-group">
                <input
                  type={showPassRegistro ? "text" : "password"} 
                  name="contraseña"
                  className="form-control"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassRegistro(!showPassRegistro)}
                >
                  {showPassRegistro ? "🔓" : "🔒"}
                </button>
              </div>
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