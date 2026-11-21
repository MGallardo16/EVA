import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "CLIENTE",
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await api.getUsuarios();
      if (data) {
        setUsuarios(data.filter((u) => u.rol === "CLIENTE" || u.rol === "VENDEDOR"));
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      const creado = await api.crearUsuario(nuevoUsuario);
      if (creado) {
        setUsuarios((prev) => [...prev, creado]);
        setNuevoUsuario({ nombre: "", correo: "", password: "", rol: "CLIENTE" });
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert(error.message || "Error al crear usuario");
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.idEliminar.value);

    try {
      await api.eliminarUsuario(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      e.target.reset();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert(error.message || "Error al eliminar usuario");
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Gestión de Usuarios / Clientes y Vendedores</h3>

      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "350px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "30%" }}>Usuario</th>
              <th style={{ width: "35%" }}>Correo</th>
              <th style={{ width: "25%" }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">No hay usuarios registrados.</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td className="fw-bold ps-3">{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    <span className={`badge ${u.rol === "VENDEDOR" ? "bg-warning text-dark" : "bg-info text-dark"}`}>
                      {u.rol}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="row align-items-start g-4">
        <div className="col-md-4">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Eliminar Usuario</h5>
            <form onSubmit={handleEliminar}>
              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="idEliminar" className="form-label mb-0 fw-bold">ID:</label>
                <input
                  type="number"
                  name="idEliminar"
                  className="form-control bg-secondary text-white border-0"
                  min="1"
                  placeholder="ID a eliminar"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-danger w-100 rounded-pill">
                Eliminar
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Agregar Nuevo Usuario</h5>
            <form onSubmit={handleAgregar}>
              <div className="row g-2 mb-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Nombre de usuario"
                    value={nuevoUsuario.nombre}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Correo electrónico"
                    value={nuevoUsuario.correo}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-7">
                  <input
                    type="password"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Contraseña"
                    value={nuevoUsuario.password}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-5">
                  <select
                    className="form-select bg-secondary text-white border-0"
                    value={nuevoUsuario.rol}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
                  >
                    <option value="CLIENTE">Rol: CLIENTE</option>
                    <option value="VENDEDOR">Rol: VENDEDOR</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">
                Agregar Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}