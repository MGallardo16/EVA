import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Administradores() {
  const [administradores, setAdministradores] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await supabase.from("administradores").select("*");
      if (!error) setAdministradores(data);
    };
    fetchAdmins();
  }, []);

  const eliminarAdmin = async (id) => {
    const { error } = await supabase.from("administradores").delete().eq("id", id);
    if (!error) setAdministradores(prev => prev.filter(a => a.id !== id));
  };

  const agregarAdmin = async (nombre, correo, contraseña) => {
    const { data, error } = await supabase.from("administradores").insert([
      { nombre_admin: nombre, correo, contraseña }
    ]).select();
    if (!error && data) setAdministradores(prev => [...prev, ...data]);
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
                <td>{a.nombre_admin}</td>
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
            e.target.reset();
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
            e.target.reset();
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
