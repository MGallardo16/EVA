export default function Reportes() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

  return (
    <div className="p-3 bg-light rounded">
      <h2>Reportes</h2>
      <p><strong>Total de productos:</strong> {productos.length}</p>
      <p><strong>Total de usuarios:</strong> {usuarios.length}</p>
      <p><strong>Total de órdenes:</strong> {ordenes.length}</p>
      <p><em>(Más adelante puedes agregar gráficos con Chart.js)</em></p>
    </div>
  );
}
