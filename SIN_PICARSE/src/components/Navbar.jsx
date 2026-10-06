import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold" to="/">
            <img
              src="/images/Logo SIN PICARSE.png"
              alt="SIN PICARSE"
              style={{ width: "150px", height: "76px" }}
            />
          </Link>
          <div className="d-flex ms-auto align-items-center">
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item me-3">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="/carrito">Carrito</Link>
              </li>
              {!usuario ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item me-3 text-white">
                    Bienvenido, <strong>{usuario.nombre_usuario}</strong>
                  </li>
                  <li className="nav-item">
                    <button
                      id="btn-logout"
                      className="btn btn-danger"
                      onClick={() => {
                        logout();
                        navigate("/"); // vuelve al home al cerrar sesión
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Botón flotante solo visible para administradores */}
      {usuario?.rol === "admin" && (
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-danger rounded-circle position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            zIndex: 1050
          }}
          title="Ir al Dashboard"
        >
          ⮌
        </button>
      )}
    </>
  );
}
