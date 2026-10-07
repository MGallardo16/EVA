import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";

export default function Dashboard() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="d-flex">
      <div className="sidebar bg-dark text-white p-3 d-flex flex-column" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="border-bottom pb-2 text-center fs-5">Panel de Administrador</h4>
        
        {usuario && (
          <div className="text-center mb-3 text-secondary small">
            Admin: <strong className="text-white">{usuario.nombre_usuario}</strong>
          </div>
        )}

        <div className="nav flex-column nav-pills flex-grow-1">
          <Link to="usuarios" className="nav-link text-white">Gestión de usuarios</Link>
          <Link to="productos" className="nav-link text-white">Gestión de productos</Link>
          <Link to="administradores" className="nav-link text-white">Gestión de administradores</Link>
          <Link to="ordenes" className="nav-link text-white">Órdenes / Boletas</Link>
          <Link to="categorias" className="nav-link text-white">Categorías</Link>
          <Link to="reportes" className="nav-link text-white">Reportes</Link>
          <Link to="perfil" className="nav-link text-white">Perfil</Link>
        </div>

        <div className="mt-auto pt-3 border-top">
          <button className="btn btn-outline-light mb-2 w-100 btn-sm" onClick={() => navigate("/")}>
            ← Volver a la Tienda
          </button>
          <button className="btn btn-danger w-100 btn-sm" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <main id="contenido-principal" className="flex-grow-1 p-4 bg-light" style={{ maxHeight: "100vh", overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}