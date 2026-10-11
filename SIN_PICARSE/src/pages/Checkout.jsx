import { useState, useContext } from "react";
import { CartContext } from "../context/CarritoContext";
import { AuthContext } from "../context/Autenticacion";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { carrito, total, vaciarCarrito } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [calle, setCalle] = useState("");
  const [departamento, setDepartamento] = useState(""); // Opcional
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [indicaciones, setIndicaciones] = useState(""); // Opcional
  const [tipoTelefono, setTipoTelefono] = useState("+56 9");
  const [numeroTelefono, setNumeroTelefono] = useState("");

  const [procesando, setProcesando] = useState(false);
  const [boleta, setBoleta] = useState(null);

  if (carrito.length === 0 && !boleta) {
    return (
      <div className="container my-5 text-center text-white">
        <h4>No tienes productos en tu carrito para procesar el checkout.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/productos")}>
          Ver Productos
        </button>
      </div>
    );
  }

  const handlePagar = async (e) => {
    e.preventDefault();
    setProcesando(true);

    const telefonoCompleto = `${tipoTelefono} ${numeroTelefono}`;
    const direccionCompleta = {
      calle,
      departamento,
      region,
      comuna,
      indicaciones
    };

    const detalleTexto = carrito
      .map((item) => `${item.nombre} (x${item.cantidad})`)
      .join(", ");

    const nombreUsuario = usuario
      ? usuario.nombre_usuario || usuario.nombre_admin || usuario.correo
      : "Cliente Invitado";

    try {
      const { data, error } = await supabase
        .from("ordenes")
        .insert([
          {
            usuario: nombreUsuario,
            detalle: detalleTexto,
            total: Math.round(total),
            direccion_envio: direccionCompleta,
            telefono: telefonoCompleto,
            items: carrito,
            fecha: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Error al registrar orden:", error);
        alert("Ocurrió un error al procesar el pago.");
      } else {
        setBoleta({
          idOrden: data.id,
          fecha: new Date().toLocaleString("es-CL"),
          usuario: nombreUsuario,
          items: [...carrito],
          total: Math.round(total),
          direccion: `${calle} ${departamento ? "Depto " + departamento : ""}, ${comuna}, ${region}`,
          telefono: telefonoCompleto,
          indicaciones
        });

        if (vaciarCarrito) vaciarCarrito();
      }
    } catch (err) {
      console.error("Error en el checkout:", err);
    } finally {
      setProcesando(false);
    }
  };

  if (boleta) {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div className="card bg-dark text-white p-4 border-success shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="text-center mb-4 border-bottom border-success pb-3">
            <h2 className="text-success fw-bold">¡Pago Exitoso!</h2>
            <p className="text-muted mb-0">Boleta Electrónica de Compra N° #{boleta.idOrden}</p>
            <small className="text-secondary">{boleta.fecha}</small>
          </div>

          <div className="mb-3">
            <strong>Cliente:</strong> {boleta.usuario} <br />
            <strong>Dirección de Envío:</strong> {boleta.direccion} <br />
            <strong>Teléfono:</strong> {boleta.telefono} <br />
            {boleta.indicaciones && (
              <>
                <strong>Indicaciones:</strong> {boleta.indicaciones}
              </>
            )}
          </div>

          <h5 className="border-bottom border-secondary pb-2 mt-4">Detalle de Compra</h5>
          <table className="table table-dark table-sm">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {boleta.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td className="text-end">${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-3 fs-5 fw-bold text-success">
            Total Pagado: ${boleta.total.toLocaleString("es-CL")}
          </div>

          <button className="btn btn-outline-light mt-4 w-100" onClick={() => navigate("/")}>
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 text-white">
      <h2 className="mb-4 text-center">Finalizar Compra - Datos de Envío</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handlePagar} className="card bg-dark text-white p-4 border-secondary shadow">
            <h4 className="mb-3 border-bottom border-secondary pb-2">1. Dirección de Entrega</h4>

            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label text-secondary small">Calle y Número *</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ej: Av. Vicuña Mackenna 4860"
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label text-secondary small">Departamento / Block (Opcional)</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ej: Depto 502"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-secondary small">Región *</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ej: Región Metropolitana"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label text-secondary small">Comuna *</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ej: Macul"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small">Indicaciones de Entrega (Opcional)</label>
              <textarea
                className="form-control bg-secondary text-white border-0"
                rows="2"
                placeholder="Ej: Dejar en conserjería o portón negro"
                value={indicaciones}
                onChange={(e) => setIndicaciones(e.target.value)}
              />
            </div>

            <h4 className="mb-3 border-bottom border-secondary pb-2 mt-3">2. Teléfono de Contacto</h4>

            <div className="mb-3">
              <label className="form-label text-secondary small">Número Telefónico *</label>
              <div className="input-group">
                <select
                  className="form-select bg-secondary text-white border-0"
                  style={{ maxWidth: "120px" }}
                  value={tipoTelefono}
                  onChange={(e) => setTipoTelefono(e.target.value)}
                >
                  <option value="+56 9">+56 9 (Móvil)</option>
                  <option value="+56 2">+56 2 (Fijo)</option>
                </select>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="12345678"
                  value={numeroTelefono}
                  onChange={(e) => setNumeroTelefono(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
              <span className="fs-4 fw-bold">Total a Pagar: ${Math.round(total).toLocaleString("es-CL")}</span>
              <button type="submit" className="btn btn-success btn-lg fw-bold" disabled={procesando}>
                {procesando ? "Procesando..." : "Pagar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}