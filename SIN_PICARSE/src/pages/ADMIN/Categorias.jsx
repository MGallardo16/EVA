import { useState, useEffect } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categorias")) || [
      { id: 1, nombre: "Clásicos" },
      { id: 2, nombre: "Estrategia" },
      { id: 3, nombre: "Fiesta" }
    ];
    setCategorias(data);
    localStorage.setItem("categorias", JSON.stringify(data));
  }, []);

  const eliminarCategoria = (id) => {
    const nuevas = categorias.filter(c => c.id !== id);
    setCategorias(nuevas);
    localStorage.setItem("categorias", JSON.stringify(nuevas));
  };

  const agregarCategoria = (nombre) => {
    const nuevoId = categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1;
    const nueva = { id: nuevoId, nombre };
    const nuevas = [...categorias, nueva];
    setCategorias(nuevas);
    localStorage.setItem("categorias", JSON.stringify(nuevas));
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
          }}>
            <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" required />
            <button type="submit" className="btn btn-success w-100">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
