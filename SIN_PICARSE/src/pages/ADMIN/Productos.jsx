import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");
      if (!error) setProductos(data);
    };
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (!error) setProductos(prev => prev.filter(p => p.id !== id));
  };

  const agregarProducto = async (nombre, precio, stock) => {
    const { data, error } = await supabase.from("productos").insert([
      { nombre, precio: parseInt(precio), stock: parseInt(stock) }
    ]).select();
    if (!error && data) setProductos(prev => [...prev, ...data]);
  };

//Necesito que veas el tema de la tabla de productos.
//De acuerdo a los llamados de esta zona, los nombres de las cosas deberían nombrarse así... creo.
//Lo dejaré todo como comentarios mientras.
  /*return (
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
            e.target.reset();
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
            e.target.reset();
          }}>
            <input type="text" name="nombre" className="form-control mb-2" placeholder="Nombre" required />