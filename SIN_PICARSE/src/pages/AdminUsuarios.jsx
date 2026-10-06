import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

export default function AdminUsuarios() {
  const { usuariosAdmin, eliminarUsuario, agregarUsuario } = useContext(AdminContext);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");

  const handleAgregar = (e) => {
    e.preventDefault();
    agregarUsuario(nombre, correo, pass);
    setNombre(""); setCorreo(""); setPass("");
  };

  return (
    <div className="p-4 w-100">
      <h3 className="mb-3 text-dark">Gestión de Usuarios</h3>
      <table className="table table-dark table-striped">
        <thead><tr><th>#</th><th>Usuario</th><th>Correo</th><th>Contraseña</th><th>Rol</th></tr></thead>
        <tbody>
          {usuariosAdmin.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.nombre_usuario}</td><td>{u.correo}</td><td>{u.contraseña}</td>
              <td><span className="badge bg-info text-dark">Cliente</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row mt-3">
        <div className="col-md-5">
          <form onSubmit={(e) => { e.preventDefault(); eliminarUsuario(parseInt(e.target.usuarioId.value)); e.target.reset(); }}>
            <label>Eliminar usuario por ID:</label>
            <input type="number" name="usuarioId" className="form-control" required />
            <button type="submit" className="btn btn-outline-light mt-2">Eliminar</button>
          </form>
        </div>
        <div className="col-md-7">
          <form onSubmit={handleAgregar}>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="form-control mb-2" required />
            <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo" className="form-control mb-2" required />
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Contraseña" className="form-control mb-2" required />
            <button type="submit" className="btn btn-success w-100">Agregar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
}