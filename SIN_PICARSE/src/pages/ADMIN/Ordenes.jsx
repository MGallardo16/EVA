import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    try {
      const data = await api.getBoletas();
      setOrdenes(data || []);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    }
  };

  const formatearDetalle = (detalles) => {
    if (!detalles || detalles.length === 0) return "Sin detalles";
    return detalles
      .map((d) => `${d.producto?.nombre || "Producto"} (x${d.cantidad})`)
      .join(", ");
  };

  return (
    <div className="p-4 w-100 text-white">
      <h3 className="mb-4">Órdenes / Boletas</h3>

      <div className="border border-secondary rounded shadow-sm" style={{ maxHeight: "420px", overflowY: "auto" }}>
        <table className="table table-dark table-striped table-hover align-middle mb-0 text-start">
          <thead className="table-dark border-bottom border-secondary" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th style={{ width: "8%" }}>ID</th>
              <th style={{ width: "22%" }}>Usuario</th>
              <th style={{ width: "33%" }}>Detalle</th>
              <th style={{ width: "14%" }}>Total</th>
              <th style={{ width: "13%" }}>Fecha</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-white py-3">No hay órdenes registradas.</td>
              </tr>
            ) : (
              ordenes.map((o) => (
                <tr key={o.id}>
                  <td className="fw-bold ps-3">{o.id}</td>
                  <td>{o.usuario?.nombre || o.usuario?.correo || "Cliente"}</td>
                  <td className="text-white small">{formatearDetalle(o.detalles)}</td>
                  <td className="text-success fw-bold">${Number(o.total).toLocaleString("es-CL")}</td>
                  <td>{o.fecha ? new Date(o.fecha).toLocaleDateString("es-CL") : "-"}</td>
                  <td>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => setOrdenSeleccionada(o)}
                    >
                      Detalle
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Panel de Detalle de la Boleta seleccionada */}
      {ordenSeleccionada && (
        <div className="card bg-dark text-white border-info mt-4 p-3 shadow">
          <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
            <h5 className="mb-0 text-info">Detalle de Boleta #{ordenSeleccionada.id}</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setOrdenSeleccionada(null)}>
              Cerrar ✕
            </button>
          </div>
          <p className="mb-1"><strong>Cliente:</strong> {ordenSeleccionada.usuario?.nombre} ({ordenSeleccionada.usuario?.correo})</p>
          <p className="mb-1"><strong>Dirección de envío:</strong> {ordenSeleccionada.direccionEnvio}</p>
          <p className="mb-1"><strong>Teléfono:</strong> {ordenSeleccionada.telefono}</p>
          {ordenSeleccionada.indicaciones && (
            <p className="mb-2"><strong>Indicaciones:</strong> {ordenSeleccionada.indicaciones}</p>
          )}
          <table className="table table-dark table-sm mt-2">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {ordenSeleccionada.detalles?.map((d) => (
                <tr key={d.id}>
                  <td>{d.producto?.nombre}</td>
                  <td>{d.cantidad}</td>
                  <td>${Number(d.precioUnitario).toLocaleString("es-CL")}</td>
                  <td className="text-end">${(d.precioUnitario * d.cantidad).toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end fw-bold text-success fs-5">
            Total (IVA incl.): ${Number(ordenSeleccionada.total).toLocaleString("es-CL")}
          </div>
        </div>
      )}
    </div>
  );
}