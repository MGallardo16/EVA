import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";

export default function DashboardAdmin() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#1e2124" }}>
      {/* Sidebar lateral con fondo negro oscuro y borde divisor */}
      <div 
        className="sidebar p-3 d-flex flex-column text-white border-end border-secondary" 
        style={{ width: "250px", minHeight: "100vh", backgroundColor: "#111315" }}
      >
        <h4 className="border-bottom border-secondary pb-2 text-center fs-5 fw-bold">
          Panel de Administrador
        </h4>
        
        {usuario && (
          <div className="text-center mb-3 text-secondary small">
            Admin: <strong className="text-light">{usuario.nombre_usuario || usuario.nombre_admin}</strong>
          </div>
        )}

        <div className="nav flex-column nav-pills flex-grow-1 gap-1">
          <Link to="/dashboard/usuarios" className="nav-link text-white-50 hover-light py-2">
            Gestión de usuarios
          </Link>
          <Link to="/dashboard/productos" className="nav-link text-white-50 hover-light py-2">
            Gestión de productos
          </Link>
          <Link to="/dashboard/administradores" className="nav-link text-white-50 hover-light py-2">
            Gestión de administradores
          </Link>
          <Link to="/dashboard/ordenes" className="nav-link text-white-50 hover-light py-2">
            Órdenes / Boletas
          </Link>
          <Link to="/dashboard/categorias" className="nav-link text-white-50 hover-light py-2">
            Categorías
          </Link>
          <Link to="/dashboard/reportes" className="nav-link text-white-50 hover-light py-2">
            Reportes
          </Link>
          <Link to="/dashboard/perfil" className="nav-link text-white-50 hover-light py-2">
            Perfil
          </Link>
        </div>

        <div className="mt-auto pt-3 border-top border-secondary">
          <button className="btn btn-outline-light mb-2 w-100 btn-sm" onClick={() => navigate("/")}>
            ← Volver a la Tienda
          </button>
          <button className="btn btn-danger w-100 btn-sm" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Área principal con un tono más claro (#1e2124) */}
      <main id="contenido-principal" className="flex-grow-1 text-white p-4" style={{ backgroundColor: "#1e2124", minHeight: "100vh", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}