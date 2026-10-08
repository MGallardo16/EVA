import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase.from("categorias").select("*");
    if (error) {
      console.error("Error al obtener categorías:", error);
    } else if (data) {
      setCategorias(data);
    }
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("categorias")
      .insert([{ nombre }])
      .select();

    if (error) {
      console.error("Error al agregar categoría:", error);
    } else if (data) {
      setCategorias((prev) => [...prev, ...data]);
      setNombre("");
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.categoriaId.value);

    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar categoría:", error);
    } else {
      setCategorias((prev) => prev.filter((c) => c.id !== id));
      e.target.reset();
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Gestión de Categorías</h3>

      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "20%" }}>#</th>
              <th style={{ width: "80%" }}>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-muted py-3">No hay categorías registradas.</td>
              </tr>
            ) : (
              categorias.map((c) => (
                <tr key={c.id}>
                  <td className="fw-bold ps-3">{c.id}</td>
                  <td>{c.nombre}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="row align-items-center g-4">
        
        <div className="col-md-5">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Eliminar categoría</h5>
            <form onSubmit={handleEliminar}>
              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="categoriaId" className="form-label mb-0 fw-bold">id:</label>
                <input
                  type="number"
                  name="categoriaId"
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
            <h5 className="card-title mb-3">Agregar Nueva Categoría</h5>
            <form onSubmit={handleAgregar}>
              <div className="mb-3">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Nombre de la categoría"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-pill">Agregar Categoría</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}