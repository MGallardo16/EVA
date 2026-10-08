import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (!error) setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (!error) setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const agregarUsuario = async (nombre, correo, contraseña) => {
    const { data, error } = await supabase.from("usuarios").insert([
      { nombre_usuario: nombre, correo, contraseña }
    ]).select();
    if (!error && data) setUsuarios(prev => [...prev, ...data]);
  };

  return (
    <div className="row">
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

      <div className="col-md-4">
        <div className="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar usuario</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            const id = parseInt(e.target.idEliminar.value);
            eliminarUsuario(id);
            e.target.reset();
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
            e.target.reset();
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
