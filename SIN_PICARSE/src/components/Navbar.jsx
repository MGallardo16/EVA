import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav 
        className="navbar navbar-expand-lg navbar-dark bg-dark w-100 p-0" 
        style={{ height: "80px", minHeight: "80px", maxHeight: "80px" }}
      >
        <div className="container-fluid container-lg d-flex justify-content-between align-items-center h-100 px-3">
          <Link className="navbar-brand fw-bold p-0 m-0 d-flex align-items-center" to="/">
            <img 
              src="/images/Logo SIN PICARSE.png" 
              alt="SIN PICARSE" 
              style={{ width: "auto", height: "55px", objectFit: "contain" }} 
            />
          </Link>

          <button 
            className="navbar-toggler border-0 shadow-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse bg-dark" id="navbarNav">
            <div className="d-flex ms-auto align-items-center flex-column flex-lg-row py-3 py-lg-0 w-100 justify-content-end">
              <ul className="navbar-nav d-flex align-items-center mb-2 mb-lg-0">
                <li className="nav-item me-lg-3">
                  <Link className="nav-link" to="/productos">Productos</Link>
                </li>
                <li className="nav-item me-lg-3">
                  <Link className="nav-link" to="/carrito">Carrito</Link>
                </li>

                {!usuario ? (
                  <li className="nav-item">
                    <Link 
                      className="btn btn-outline-danger btn-sm d-inline-flex align-items-center justify-content-center" 
                      style={{ height: "36px", minWidth: "120px" }}
                      to="/login"
                    >
                      Iniciar Sesión
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item me-lg-3 text-white my-2 my-lg-0">
                      Bienvenido, <strong>{usuario.nombre_usuario}</strong>
                    </li>
                    <li className="nav-item">
                      <button
                        id="btn-logout"
                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center"
                        style={{ height: "36px", minWidth: "120px" }}
                        onClick={() => {
                          logout();
                          navigate("/");
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
        </div>
      </nav>

      {usuario?.rol === "admin" && (
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-danger rounded-circle position-fixed shadow"
          style={{
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            zIndex: 1050
          }}
          title="Ir al Dashboard"
        >
          ⚙️
        </button>
      )}
    </>
  );
}