// Se verifica si existe una sesión activa en la memoria del navegador (localStorage).
// localStorage.getItem("usuarioLogueado") !== null evalúa si hay un usuario conectado.
// Devuelve "true" si hay un usuario logueado, o "false" si no lo hay (deshabilitando los botones de añadir).

let usuarioLogueado = localStorage.getItem("usuarioLogueado") !== null;

//------------------------------------------------------

//el const destacados agarra los primeros 4 productos de la lista productos en js.

const destacados = productos.slice(0,4);

//-----------------------------------------------

//Se declara una función llamada mostrarDestacados.
//Mostrará los productos destacados en el HTML.

function mostrarDestacados(){

  //Este const buscará en el contenedor del HTML con id "preview-productos"
  //Es ahí donde insertará los cards de productos.
    const contenedor = document.getElementById("preview-productos");
    //Limpia el contenedor antes de llenarlo, así se evita que se acumulen productos cada
    //vez que se ejecute la función.
    contenedor.innerHTML = "";

    //Recorre cada producto dentro del array de destacados.
    //La variable "productos" representa un producto en cada iteración.
    destacados.forEach(productos =>{
      //va agregando una card por cada producto
      //el div class="col-md-3 mb4" hace que cada producto ocupe 1/4 del ancho
      //en pantallas medianas.
      //el card bg-dark text-light hace que la card esté oscura y el texto claro.
      //se muestra la imagen correspondiente al producto de la iteracion,
      //Se presenta una imagen recortada en 290px de alto, ajustada al ancho, para que sean parejas.
      //Más abajo está los botones, si el usuarioLogueado es falso, están disabled,
      //Si está logueado, podrá agregarlos al carro.
      //El boton de ver producto lleva directo al producto correspondiente al id.
      
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
//Llama a la función cada que se carga la página.
mostrarDestacados();