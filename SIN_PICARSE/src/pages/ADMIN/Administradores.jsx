import { useState, useEffect } from "react";

export default function Administradores() {
  const [administradores, setAdministradores] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("administradores")) || [
      { id: 1, nombre_usuario: "Admin Principal", correo: "admin@duocuc.cl", contraseña: "admin123" },
      { id: 2, nombre_usuario: "Profesor Encargado", correo: "profesor@profesor.duocuc.cl", contraseña: "prof123" }
    ];
    setAdministradores(data);
    localStorage.setItem("administradores", JSON.stringify(data));
  }, []);

  const eliminarAdmin = (id) => {
    const nuevos = administradores.filter(a => a.id !== id);
    setAdministradores(nuevos);
    localStorage.setItem("administradores", JSON.stringify(nuevos));
  };

  const agregarAdmin = (nombre, correo, contraseña) => {
    const nuevoId = administradores.length ? Math.max(...administradores.map(a => a.id)) + 1 : 1;
    const nuevo = { id: nuevoId, nombre_usuario: nombre, correo, contraseña };
    const nuevos = [...administradores, nuevo];
    setAdministradores(nuevos);
    localStorage.setItem("administradores", JSON.stringify(nuevos));
  };

  return (
    <div className="row">
      <div className="col-md-8" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2>Gestión de Administradores</h2>
        <table className="table table-dark table-striped">
          <thead><tr><th>#</th><th>Usuario</th><th>Correo</th><th>Contraseña</th></tr></thead>
          <tbody>
            {administradores.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nombre_usuario}</td>
                <td>{a.correo}</td>
                <td>{a.contraseña}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
        <div className="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar administrador</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            eliminarAdmin(parseInt(e.target.id.value));
          }}>
            <input type="number" name="id" className="form-control mb-2" placeholder="ID" required />
            <button type="submit" className="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>
        <div className="p-3 bg-secondary rounded">
          <h5>Agregar Nuevo Administrador</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            agregarAdmin(e.target.nombre.value, e.target.correo.value, e.target.contraseña.value);
          }}>
            <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" required />
            <input type="email" name="correo" className="form-control mb-2" placeholder="Correo" required />
            <input type="password" name="contraseña" className="form-control mb-2" placeholder="Contraseña" required />
            <button type="submit" className="btn btn-success w-100">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
