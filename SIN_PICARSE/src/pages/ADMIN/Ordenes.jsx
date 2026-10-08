import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      const { data, error } = await supabase.from("ordenes").select("*");
      if (!error) setOrdenes(data);
    };
    fetchOrdenes();
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
