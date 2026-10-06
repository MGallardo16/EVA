import { useState, useEffect } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios")) || [
      { id: 1, nombre_usuario: "Usuario Prueba", correo: "usuarioPrueba@gmail.com", contraseña: "123" },
      { id: 2, nombre_usuario: "Camila Silva", correo: "csilva@gmail.com", contraseña: "passCamila123" },
      { id: 3, nombre_usuario: "Matías Rojas", correo: "mrojas@duocuc.cl", contraseña: "claveMati2026" }
    ];
    setUsuarios(data);
    localStorage.setItem("usuarios", JSON.stringify(data));
  }, []);

  const eliminarUsuario = (id) => {
    const nuevos = usuarios.filter(u => u.id !== id);
    setUsuarios(nuevos);
    localStorage.setItem("usuarios", JSON.stringify(nuevos));
  };

  const agregarUsuario = (nombre, correo, contraseña) => {
    const nuevoId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const nuevo = { id: nuevoId, nombre_usuario: nombre, correo, contraseña };
    const nuevos = [...usuarios, nuevo];
    setUsuarios(nuevos);
    localStorage.setItem("usuarios", JSON.stringify(nuevos));
  };

  return (
    <div className="row">
      {/* Tabla */}
      <div className="col-md-8" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2>Gestión de Usuarios</h2>
        <table className="table table-dark table-striped">
          <thead>
            <tr><th>#</th><th>Usuario</th><th>Correo</th><th>Contraseña</th></tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre_usuario}</td>
                <td>{u.correo}</td>
                <td>{u.contraseña}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formularios */}
      <div className="col-md-4">
        <div className="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar usuario</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            const id = parseInt(e.target.idEliminar.value);
            eliminarUsuario(id);
          }}>
            <input type="number" name="idEliminar" className="form-control mb-2" placeholder="ID" required />
            <button type="submit" className="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>

        <div className="p-3 bg-secondary rounded">
          <h5>Agregar Nuevo Usuario</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            const nombre = e.target.nombre.value;
            const correo = e.target.correo.value;
            const contraseña = e.target.contraseña.value;
            agregarUsuario(nombre, correo, contraseña);
          }}>
            <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" required />
            <input type="email" name="correo" className="form-control mb-2" placeholder="Correo" required />
            <input type="password" name="contraseña" className="form-control mb-2" placeholder="Contraseña" required />
            <button type="submit" className="btn btn-success w-100">Agregar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
}
