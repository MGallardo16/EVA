import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Administradores() {
  const [admins, setAdmins] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await api.getUsuarios();
      if (data) {
        setAdmins(data.filter((u) => u.rol === "ADMIN"));
      }
    } catch (error) {
      console.error("Error al obtener administradores:", error);
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      const creado = await api.crearUsuario({
        nombre,
        correo,
        password: pass,
        rol: "ADMIN",
      });
      if (creado) {
        setAdmins((prev) => [...prev, creado]);
        setNombre("");
        setCorreo("");
        setPass("");
      }
    } catch (error) {
      console.error("Error al agregar administrador:", error);
      alert(error.message || "Error al crear administrador");
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.adminId.value);

    try {
      await api.eliminarUsuario(id);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      e.target.reset();
    } catch (error) {
      console.error("Error al eliminar administrador:", error);
      alert(error.message || "Error al eliminar administrador");
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Gestión de Administradores</h3>

      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "45%" }}>Nombre</th>
              <th style={{ width: "45%" }}>Correo</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted py-3">No hay administradores registrados.</td>
              </tr>
            ) : (
              admins.map((a) => (
                <tr key={a.id}>
                  <td className="fw-bold ps-3">{a.id}</td>
                  <td>{a.nombre}</td>
                  <td>{a.correo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="row align-items-center g-4">
        <div className="col-md-5">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Eliminar admin</h5>
            <form onSubmit={handleEliminar}>
              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="adminId" className="form-label mb-0 fw-bold">id:</label>
                <input
                  type="number"
                  name="adminId"
                  className="form-control bg-secondary text-white border-0"
                  min="1"
                  step="1"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-light w-100 rounded-pill">Eliminar</button>
            </form>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Agregar Nuevo Admin</h5>
            <form onSubmit={handleAgregar}>
              <div className="mb-2">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-pill">Agregar Administrador</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}