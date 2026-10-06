import { useState, useEffect } from "react";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("productos"));
    if (!data || data.length === 0) {
      data = [
        { id: 1, nombre: "Monopoly Banco Electrónico", precio: 30990, stock: 50 },
        { id: 2, nombre: "Jenga Clásico", precio: 16990, stock: 50 },
      { id: 3, nombre: "Uno", precio: 3990, stock: 50 },
      { id: 4, nombre: "Dos", precio: 8990, stock: 50 },
      { id: 5, nombre: "Ajedrez Clásicode Madera", precio: 12990, stock: 50 },
      { id: 6, nombre: "Catan: El Juego", precio: 28990, stock: 50 },
      { id: 7, nombre: "Juego de Mesa Ludo", precio: 7990, stock: 50 },
      { id: 8, nombre: "Ruleta de tragos", precio: 14990, stock: 50 },
      { id: 9, nombre: "Harmonies", precio: 29990, stock: 50 },
      { id: 10, nombre: "The Castles of Burgundy", precio: 59990, stock: 50 },
      { id: 11, nombre: "DUNE: IMPERIUM - UPRISING", precio: 110990, stock: 50 },
      { id: 12, nombre: "TERRAFORMING MARS", precio: 63990, stock: 50 },
      { id: 13, nombre: "THE OLD KINGS CROWN", precio: 62990, stock: 50 },
      { id: 14, nombre: "SCRABBLE 2 en 1", precio: 19990, stock: 50 },
      { id: 15, nombre: "¡QUE DICE CHILE!", precio: 11990, stock: 50 },
      { id: 16, nombre: "Monos Locos", precio: 14990, stock: 50 },
      { id: 17, nombre: "Connect 4 Clásico", precio: 12990, stock: 50 },
      { id: 18, nombre: "¿Quién es Quien?", precio: 13990, stock: 50 },
      { id: 19, nombre: "Taca taca sobremesa", precio: 24990, stock: 50 },
      { id: 20, nombre: "Mala leche", precio: 15990, stock: 50 },
      { id: 21, nombre: "Cubo rubik 3x3x3", precio: 5990, stock: 50 },
      { id: 22, nombre: "Monopoly Star Wars", precio: 25990, stock: 50 },
      { id: 23, nombre: "Battleship", precio: 222990, stock: 50 },
      { id: 24, nombre: "Simon Clásico", precio: 26990, stock: 50 },
      { id: 25, nombre: "Dominó", precio: 6990, stock: 50 }
    ];
    localStorage.setItem("productos", JSON.stringify(data));
  }
  setProductos(data);
}, []);


  const eliminarProducto = (id) => {
    const nuevos = productos.filter(p => p.id !== id);
    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
  };

  const agregarProducto = (nombre, precio, stock) => {
    const nuevoId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const nuevo = { id: nuevoId, nombre, precio: parseInt(precio), stock: parseInt(stock) };
    const nuevos = [...productos, nuevo];
    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
  };

  return (
    <div className="row">
      <div className="col-md-8" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2>Gestión de Productos</h2>
        <table className="table table-dark table-striped">
          <thead><tr><th>#</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr></thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
        <div className="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar producto</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            eliminarProducto(parseInt(e.target.id.value));
          }}>
            <input type="number" name="id" className="form-control mb-2" placeholder="ID" required />
            <button type="submit" className="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>
        <div className="p-3 bg-secondary rounded">
          <h5>Agregar Nuevo Producto</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            agregarProducto(e.target.nombre.value, e.target.precio.value, e.target.stock.value);
          }}>
            <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" required />
            <input type="number" name="precio" className="form-control mb-2" placeholder="Precio" required />
            <input type="number" name="stock" className="form-control mb-2" placeholder="Stock" required />
            <button type="submit" className="btn btn-success w-100">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
