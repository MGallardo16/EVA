import { productos } from "../data/productos";
import ProductCard from "../components/CartaProducto";

export default function Productos() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      <div className="row">
        {productos.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}