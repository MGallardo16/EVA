import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre_usuario: "",
    correo: "",
    contraseña: ""
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const { data, error } = await supabase.from("usuarios").select("*").order("id", { ascending: true });
    if (error) {
      console.error("Error al obtener usuarios:", error);
    } else if (data) {
      setUsuarios(data);
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("usuarios")
      .insert([nuevoUsuario])
      .select();

    if (error) {
      console.error("Error al agregar usuario:", error);
    } else if (data) {
      setUsuarios((prev) => [...prev, ...data]);
      setNuevoUsuario({ nombre_usuario: "", correo: "", contraseña: "" });
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.idEliminar.value);

    const { error } = await supabase.from("usuarios").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar usuario:", error);
    } else {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      e.target.reset();
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Gestión de Usuarios / Clientes</h3>

      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "350px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "30%" }}>Usuario</th>
              <th style={{ width: "35%" }}>Correo</th>
              <th style={{ width: "25%" }}>Contraseña</th>
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
                  <td>{u.nombre_usuario}</td>
                  <td>{u.correo}</td>
                  <td className="text-muted">••••••••</td>
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
                    value={nuevoUsuario.nombre_usuario}
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre_usuario: e.target.value })}
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

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Contraseña"
                  value={nuevoUsuario.contraseña}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })}
                  required
                />
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