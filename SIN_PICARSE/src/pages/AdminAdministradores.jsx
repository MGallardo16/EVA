import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

export default function AdminAdministradores() {
  const { admins, eliminarAdmin, agregarAdmin } = useContext(AdminContext);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");

  const handleAgregar = (e) => {
    e.preventDefault();
    agregarAdmin(nombre, correo, pass);
    setNombre("");
    setCorreo("");
    setPass("");
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Gestión de Administradores</h3>
      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "15%" }}>#</th>
              <th style={{ width: "45%" }}>Usuario</th>
              <th style={{ width: "30%" }}>Correo</th>
              <th style={{ width: "10%" }} className="text-end">Rol</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id}>
                <td className="fw-bold ps-3">{a.id}</td>
                <td>{a.nombre_usuario}</td>
                <td>{a.correo}</td>
                <td className="text-end pe-3">
                  <span className="badge bg-danger">Admin</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row align-items-center g-4">
        {/* Formulario eliminar admin */}
        <div className="col-md-5">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Eliminar admin</h5>
            <form onSubmit={(e) => {
              e.preventDefault();
              const id = parseInt(e.target.adminId.value);
              eliminarAdmin(id);
              e.target.reset();
            }}>
              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="adminId" className="form-label mb-0 fw-bold">id:</label>
                <input type="number" name="adminId" className="form-control bg-secondary text-white border-0" min="1" step="1" required />
              </div>
              <button type="submit" className="btn btn-outline-light w-100 rounded-pill">Eliminar</button>
            </form>
          </div>
        </div>

        {/* Formulario agregar admin */}
        <div className="col-md-7">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Agregar Nuevo Admin</h5>
            <form onSubmit={handleAgregar}>
              <div className="mb-2">
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control bg-secondary text-white border-0" placeholder="Nombre de usuario" required />
              </div>
              <div className="mb-2">
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="form-control bg-secondary text-white border-0" placeholder="Correo electrónico" required />
              </div>
              <div className="mb-3">
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control bg-secondary text-white border-0" placeholder="Contraseña" required />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-pill">Agregar Administrador</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}