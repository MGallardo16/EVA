import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/"><img src="/images/Logo SIN PICARSE.png" alt="SIN PICARSE" style={{ width: '150px', height: '76px' }} /></Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">Carrito</Link>
            </li>
            {!usuario ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  id="btn-logout"
                  className="btn btn-danger ms-3"
                  onClick={logout}
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}