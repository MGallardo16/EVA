import { useState, useEffect } from "react";

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ordenes")) || [
      { id: 1, usuario: "Camila Silva", total: 30990, fecha: "2026-10-06" },
      { id: 2, usuario: "Matías Rojas", total: 16990, fecha: "2026-10-05" }
    ];
    setOrdenes(data);
    localStorage.setItem("ordenes", JSON.stringify(data));
  }, []);

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2>Órdenes / Boletas</h2>
      <table className="table table-dark table-striped">
        <thead><tr><th>ID</th><th>Usuario</th><th>Total</th><th>Fecha</th></tr></thead>
        <tbody>
          {ordenes.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.usuario}</td>
              <td>${o.total}</td>
              <td>{o.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
