import { useState, useEffect, useContext, useRef } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../context/Autenticacion";

export default function Productos() {
  const { usuario } = useContext(AuthContext);
  const esAdmin = usuario?.rol === "admin";
  const fileInputRef = useRef(null);

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "",
    imagen: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const prodData = await api.getProductos();
      const ordenados = (prodData || []).sort((a, b) => a.id - b.id);
      setProductos(ordenados);

      const catData = await api.getCategorias();
      setCategorias(catData || []);
    } catch (error) {
      console.error("Error al cargar datos de productos:", error);
    }
  };

  const handleCargarImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen es muy pesada. Elige una menor a 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNuevoProducto({ ...nuevoProducto, imagen: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const seleccionarParaEditar = (producto) => {
    setProductoEditandoId(producto.id);
    setNuevoProducto({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio ?? "",
      stock: producto.stock ?? "",
      categoriaId: producto.categoria?.id || "",
      imagen: producto.imagen || "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const cancelarEdicion = () => {
    setProductoEditandoId(null);
    setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", categoriaId: "", imagen: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion || "Juego de mesa disponible en Sin Picarse.",
      precio: parseInt(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock),
      categoriaId: nuevoProducto.categoriaId ? parseInt(nuevoProducto.categoriaId) : null,
      imagen: nuevoProducto.imagen || null,
    };

    try {
      if (productoEditandoId) {
        await api.actualizarProducto(productoEditandoId, payload);
        if (productoDetalle?.id === productoEditandoId) {
          setProductoDetalle(null);
        }
        cancelarEdicion();
      } else {
        await api.crearProducto(payload);
        setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", categoriaId: "", imagen: "" });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      fetchData();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert(error.message || "Error al guardar producto");
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.idProducto.value);

    try {
      await api.eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      if (productoDetalle?.id === id) setProductoDetalle(null);
      if (productoEditandoId === id) cancelarEdicion();
      e.target.reset();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert(error.message || "Error al eliminar producto");
    }
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">
        {esAdmin ? "Gestión de Productos" : "Catálogo de Productos (Vista Vendedor)"}
      </h3>

      <div className="border border-secondary rounded shadow-sm mb-4" style={{ maxHeight: "380px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "8%" }}>#</th>
              <th style={{ width: "30%" }}>Nombre</th>
              <th style={{ width: "20%" }}>Categoría</th>
              <th style={{ width: "15%" }}>Precio</th>
              <th style={{ width: "12%" }}>Stock</th>
              <th style={{ width: "15%" }}>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">No hay productos registrados.</td>
              </tr>
            ) : (
              productos.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold ps-3">{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {p.categoria?.nombre || "Sin categoría"}
                    </span>
                  </td>
                  <td className="text-success fw-bold">${Number(p.precio).toLocaleString("es-CL")}</td>
                  <td>{p.stock} u.</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => setProductoDetalle(p)}
                      >
                        Ver detalle
                      </button>
                      {esAdmin && (
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => seleccionarParaEditar(p)}
                        >
                          Editar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tarjeta de detalle de producto seleccionado (Visible para VENDEDOR y ADMIN) */}
      {productoDetalle && (
        <div className="card bg-dark text-white border-info mb-4 p-3 shadow">
          <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
            <h5 className="mb-0 text-info">Detalle del Producto #{productoDetalle.id}</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setProductoDetalle(null)}>
              Cerrar ✕
            </button>
          </div>
          <div className="row align-items-center">
            {productoDetalle.imagen && (
              <div className="col-md-3">
                <img
                  src={productoDetalle.imagen}
                  alt={productoDetalle.nombre}
                  className="img-fluid rounded"
                  style={{ maxHeight: "140px", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="col-md-9">
              <h5>{productoDetalle.nombre}</h5>
              <p className="text-secondary small mb-1">{productoDetalle.descripcion || "Sin descripción"}</p>
              <p className="mb-1"><strong>Categoría:</strong> {productoDetalle.categoria?.nombre || "Sin categoría"}</p>
              <p className="mb-1"><strong>Precio:</strong> <span className="text-success">${Number(productoDetalle.precio).toLocaleString("es-CL")}</span></p>
              <p className="mb-0"><strong>Stock disponible:</strong> {productoDetalle.stock} unidades</p>
            </div>
          </div>
        </div>
      )}

      {/* Formularios de creación/eliminación: SOLO visibles para ADMIN */}
      {esAdmin && (
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  {productoEditandoId ? `Modificar Producto #${productoEditandoId}` : "Agregar Nuevo Producto"}
                </h5>
                {productoEditandoId && (
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={cancelarEdicion}>
                    Cancelar edición
                  </button>
                )}
              </div>
              <form onSubmit={handleGuardar}>
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
                      value={nuevoProducto.categoriaId}
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoriaId: e.target.value })}
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

                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Descripción breve"
                    value={nuevoProducto.descripcion}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    data-bs-theme="dark"
                    className="form-control bg-secondary text-white border-0"
                    onChange={handleCargarImagen}
                  />
                  {nuevoProducto.imagen && (
                    <div className="mt-2 d-flex align-items-center gap-3">
                      <img
                        src={nuevoProducto.imagen}
                        alt="Vista previa"
                        className="rounded border border-info"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => {
                          setNuevoProducto({ ...nuevoProducto, imagen: "" });
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      >
                        Quitar imagen
                      </button>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">
                  {productoEditandoId ? "Actualizar Producto" : "Guardar Producto"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}