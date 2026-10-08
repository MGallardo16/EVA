import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data, error } = await supabase.from("categorias").select("*");
      if (!error) setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const eliminarCategoria = async (id) => {
    const { error } = await supabase.from("categorias").delete().eq("id", id);
    if (!error) setCategorias(prev => prev.filter(c => c.id !== id));
  };

  const agregarCategoria = async (nombre) => {
    const { data, error } = await supabase.from("categorias").insert([
      { nombre }
    ]).select();
    if (!error && data) setCategorias(prev => [...prev, ...data]);
  };

  return (
    <div className="row">
      <div className="col-md-8" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2>Gestión de Categorías</h2>
        <table className="table table-dark table-striped">
          <thead><tr><th>#</th><th>Nombre</th></tr></thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id}><td>{c.id}</td><td>{c.nombre}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
        <div className="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar categoría</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            eliminarCategoria(parseInt(e.target.id.value));
            e.target.reset();
          }}>
            <input type="number" name="id" className="form-control mb-2" placeholder="ID" required />
            <button type="submit" className="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>
        <div className="p-3 bg-secondary rounded">
          <h5>Agregar Nueva Categoría</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            agregarCategoria(e.target.nombre.value);
            e.target.reset();
          }}>
            <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" required />
            <button type="submit" className="btn btn-success w-100">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
