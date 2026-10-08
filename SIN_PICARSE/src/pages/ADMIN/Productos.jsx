import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria_id: "",
    imagen: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //Carga los productos incluyendo la información de la categoría vinculada
    const { data: prodData, error: prodError } = await supabase
      .from("productos")
      .select(`
        *,
        categorias (
          nombre
        )
      `)
      .order("id", { ascending: true });

    if (prodError) console.error("Error al obtener productos:", prodError);
    else setProductos(prodData || []);

    //Carga las categorías
    const { data: catData, error: catError } = await supabase
      .from("categorias")
      .select("*")
      .order("nombre", { ascending: true });

    if (catError) console.error("Error al obtener categorías:", catError);
    else setCategorias(catData || []);
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: nuevoProducto.nombre,
      precio: parseInt(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock),
      categoria_id: nuevoProducto.categoria_id ? parseInt(nuevoProducto.categoria_id) : null,
      imagen: nuevoProducto.imagen || null
    };

    const { error } = await supabase.from("productos").insert([payload]);

    if (error) {
      console.error("Error al agregar producto:", error);
    } else {
      setNuevoProducto({ nombre: "", precio: "", stock: "", categoria_id: "", imagen: "" });
      fetchData(); // Recarga la lista con las categorías
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.idProducto.value);

    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar producto:", error);
    } else {
      setProductos((prev) => prev.filter((p) => p.id !== id));
      e.target.reset();
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Gestión de Productos</h3>

      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "380px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "8%" }}>#</th>
              <th style={{ width: "32%" }}>Nombre</th>
              <th style={{ width: "20%" }}>Categoría</th>
              <th style={{ width: "15%" }}>Precio</th>
              <th style={{ width: "12%" }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">No hay productos registrados.</td>
              </tr>
            ) : (
              productos.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold ps-3">{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {p.categorias?.nombre || "Sin categoría"}
                    </span>
                  </td>
                  <td className="text-success fw-bold">${Number(p.precio).toLocaleString("es-CL")}</td>
                  <td>{p.stock} u.</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="row align-items-start g-4">
        <div className="col-md-4">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Eliminar Producto</h5>
            <form onSubmit={handleEliminar}>
              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="idProducto" className="form-label mb-0 fw-bold">ID:</label>
                <input
                  type="number"
                  name="idProducto"
                  className="form-control bg-secondary text-white border-0"
                  min="1"
                  placeholder="ID a eliminar"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-danger w-100 rounded-pill">
                Eliminar Producto
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card bg-dark text-white border-secondary p-3 shadow-sm">
            <h5 className="card-title mb-3">Agregar Nuevo Producto</h5>
            <form onSubmit={handleAgregar}>
              <div className="row g-2 mb-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Nombre del juego"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select bg-secondary text-white border-0"
                    value={nuevoProducto.categoria_id}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria_id: e.target.value })}
                  >
                    <option value="">Seleccionar Categoría...</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Precio ($)"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Stock inicial"
                    value={nuevoProducto.stock}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="URL de la Imagen"
                  value={nuevoProducto.imagen}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">
                Guardar Producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}