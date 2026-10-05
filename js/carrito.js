
//------------------------------------------------------

//Limpia el contenedor del carrito antes de dibujar los productos.

function productosHtml(){
    const contenedor = document.querySelector("#carrito-contenido");
    const totales = document.querySelector("#carrito-totales");
    contenedor.innerHTML = "";
    totales.innerHTML = "";

    let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
    //Aquí se recorre cada producto y crea una fila tr con sus datos.
    carrito.forEach(producto => {
        const {imagen, nombre, precio, cantidad, id} = producto;
        const tr = document.createElement('tr');

        const tdImg = document.createElement('td');
        const producImg= document.createElement('img');
        producImg.src= imagen;
        tdImg.appendChild(producImg);

        const tdNombre = document.createElement('td');
        tdNombre.textContent= nombre;
        
        
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent= `$${precio}`;

        const tdCant = document.createElement('td');
        const producCant= document.createElement('input');
        producCant.type= 'number';
        producCant.min = 1;
        producCant.value= cantidad;
        producCant.dataset.id= id;

        producCant.addEventListener('change', (e) => {
            const nuevaCantidad = parseInt(e.target.value);
            const productoEditado = carrito.find(p => p.id === id);
            if (productoEditado) {
                productoEditado.cantidad = nuevaCantidad;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                productosHtml();
            }
        });

        tdCant.appendChild(producCant);
        
    
        const tdBorrar = document.createElement('td');
        const producBorrar = document.createElement('button');
        producBorrar.type= 'button';
        producBorrar.textContent= 'x';
        producBorrar.addEventListener('click', () => {
            let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
            carrito = carrito.filter(product => product.id !== id);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            productosHtml();
        });
        tdBorrar.appendChild(producBorrar);

tdBorrar.appendChild(producBorrar);



        tr.appendChild(tdImg);
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdCant);
        tr.appendChild(tdBorrar);

        contenedor.appendChild(tr);

    });

    

    
    // Aquí se hacen los cálculos de subtotal, IVA y total, y se agregan al final de la tabla.
    const subtotal = carrito.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    totales.innerHTML += `
        <tr><td colspan="5">Subtotal: $${subtotal}</td></tr>
        <tr><td colspan="5">IVA (19%): $${iva.toFixed(2)}</td></tr>
        <tr><td colspan="5"><strong>Total: $${Math.round(total)}</strong></td></tr>
    `;
}

document.addEventListener('DOMContentLoaded',() => {
    const btnSimular= document.getElementById("btn-simular-compra");
    if(btnSimular){
        btnSimular.addEventListener('click', () => {
            let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
            if (carrito.length === 0) {
                alert("El carrito está vacío. Agrega productos antes de simular la compra.");
                return;

        }
        alert("¡Listo! Tus pedidos estarán en camino muy pronto.");
            
            localStorage.removeItem("carrito");
            carrito = [];
            productosHtml();
        
        
    });
    }
});

document.addEventListener('DOMContentLoaded', productosHtml);