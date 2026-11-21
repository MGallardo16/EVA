import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Reportes() {
  const [boletas, setBoletas] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [dataBoletas, dataProductos] = await Promise.all([
          api.getBoletas(),
          api.getProductos(),
        ]);
        setBoletas(dataBoletas || []);
        setProductos(dataProductos || []);
      } catch (error) {
        console.error("Error al generar reportes:", error);
      }
    };
    cargarDatos();
  }, []);

  const totalVentas = boletas.reduce((acc, b) => acc + (b.total || 0), 0);
  const productosBajoStock = productos.filter((p) => p.stock <= 5);

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Reportes del Sistema</h3>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-dark border-success text-white p-3">
            <span className="text-secondary small">Ingresos Totales (IVA incl.)</span>
            <h4 className="text-success fw-bold mb-0">${totalVentas.toLocaleString("es-CL")}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark border-info text-white p-3">
            <span className="text-secondary small">Órdenes / Boletas Emitidas</span>
            <h4 className="text-info fw-bold mb-0">{boletas.length}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark border-warning text-white p-3">
            <span className="text-secondary small">Productos con Stock Crítico (≤ 5)</span>
            <h4 className="text-warning fw-bold mb-0">{productosBajoStock.length}</h4>
          </div>
        </div>
      </div>

      <h5 className="mb-3">Alertas de Inventario Crítico</h5>
      <div className="border border-secondary rounded shadow-sm" style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary">
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock Actual</th>
            </tr>
          </thead>
          <tbody>
            {productosBajoStock.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-success py-3">
                  Todos los productos tienen stock saludable (&gt; 5 unidades).
                </td>
              </tr>
            ) : (
              productosBajoStock.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold ps-3">{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria?.nombre || "Sin categoría"}</td>
                  <td className="text-warning fw-bold">{p.stock} u.</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}