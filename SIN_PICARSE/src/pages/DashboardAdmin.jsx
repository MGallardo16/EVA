import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Autenticacion";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/"); // redirige al login
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="border-bottom pb-2 text-center">Panel de Administrador</h4>
        <div className="nav flex-column nav-pills">
          <Link to="usuarios" className="nav-link text-white">Gestión de usuarios</Link>
          <Link to="productos" className="nav-link text-white">Gestión de productos</Link>
          <Link to="administradores" className="nav-link text-white">Gestión de administradores</Link>
          <Link to="ordenes" className="nav-link text-white">Órdenes / Boletas</Link>
          <Link to="categorias" className="nav-link text-white">Categorías</Link>
          <Link to="reportes" className="nav-link text-white">Reportes</Link>
          <Link to="perfil" className="nav-link text-white">Perfil</Link>
        </div>
        <button className="btn btn-outline-light mt-3 w-100" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>

      {/* Área principal */}
      <main id="contenido-principal" className="flex-grow-1 p-4 bg-light" style={{ maxHeight: "100vh", overflow: "auto" }}>
        <Outlet /> {/* Aquí se renderizan las páginas según la ruta */}
      </main>
    </div>
  );
}
