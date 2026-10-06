let usuarioLogueado = localStorage.getItem("usuarioLogueado") !== null;
const destacados = productos.slice(0,4);

function mostrarDestacados(){

    const contenedor = document.getElementById("preview-productos");
    contenedor.innerHTML = "";
    destacados.forEach(productos =>{

        contenedor.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card bg-dark text-light h-100">
          <img src="${productos.imagen}" class="card-img-top" alt="${productos.nombre}" style="height:290px; object-fit: cover; witdh:100%">
          <div class="card-body">
            <h5 class="card-title">${productos.nombre}</h5>
            <p class="card-text">$${productos.precio}</p>
            <a href="producto_e.html?id=${productos.id}" class="btn btn-danger">
              Ver producto
            </a>
            <br></br>
            <button class="btn btn-danger" ${usuarioLogueado ? "" : "disabled"}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    `
    });
}

const usuarioLogue = localStorage.getItem("usuarioLogueado");
const btnLogin = document.getElementById("btn-login");
if(usuarioLogue && btnLogin){
  btnLogin.classList.add("d-none");
}
mostrarDestacados();