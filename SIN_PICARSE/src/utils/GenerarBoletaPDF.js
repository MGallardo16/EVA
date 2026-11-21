import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportarBoletaPDF = (boleta) => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(18);
  doc.setTextColor(220, 53, 69);
  doc.text("SIN PICARSE - BOLETA ELECTRÓNICA", 14, 22);

  // Datos de la boleta
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`N° Orden: #${boleta.idOrden}`, 14, 32);
  doc.text(`Fecha: ${boleta.fecha}`, 14, 38);
  doc.text(`Cliente: ${boleta.usuario}`, 14, 44);
  doc.text(`Dirección: ${boleta.direccion}`, 14, 50);
  doc.text(`Teléfono: ${boleta.telefono}`, 14, 56);

  // Tabla con el detalle de compra
  const columnas = ["Producto", "Cant.", "Precio Unit.", "Subtotal"];
  const filas = boleta.items.map((item) => [
    item.nombre,
    item.cantidad,
    `$${Number(item.precio).toLocaleString("es-CL")}`,
    `$${(Number(item.precio) * item.cantidad).toLocaleString("es-CL")}`,
  ]);

  autoTable(doc, {
    startY: 64,
    head: [columnas],
    body: filas,
    theme: "striped",
    headStyles: { fillColor: [220, 53, 69] },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Pagado (IVA incl.): $${Number(boleta.total).toLocaleString("es-CL")}`, 14, finalY);

  // Descarga
  doc.save(`Boleta_Orden_${boleta.idOrden}.pdf`);
};