//--------------------------------------------------------------
// ESTADO DE SESIÓN
// JSON.parse(localStorage.getItem("usuarios")) busca si ya existen usuarios guardados
// en la memoria del navegador. Si no hay nada, inicia con un usuario de prueba predeterminado.

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  {
    id: 1,
    nombre_usuario: "Usuario Prueba",
    correo: "usuarioPrueba@gmail.com",
    contraseña: "123"
  },
  {
    id: 2,
    nombre_usuario: "Camila Silva",
    correo: "csilva@gmail.com",
    contraseña: "passCamila123"
  },
  {
    id: 3,
    nombre_usuario: "Matías Rojas",
    correo: "mrojas@duocuc.cl",
    contraseña: "claveMati2026"
  },
  {
    id: 4,
    nombre_usuario: "Valentina Sepúlveda",
    correo: "vsepulveda@gmail.com",
    contraseña: "valenPassword456"
  },
  {
    id: 5,
    nombre_usuario: "Gonzalo Morales",
    correo: "gmorales@gmail.com",
    contraseña: "gonzaPass789"
  }
];

//De esta forma simplemente damos una cantidad limitada de dominios para le ingreso a la página.
function dominioValido(correo) {
    return correo.ensWith("@gmail.com") 
    || correo.endsWith("@duocuc.cl") 
    || correo.endsWith("@profesor.duocuc.cl");
}

if (!dominioValido(correo)) {
    alert("El correo debe ser de un dominio válido: @gmail.com, @duocuc.cl o @profesor.duocuc.cl");
    return;
}

//--------------------------------------------------------------
// EVENTOS DE ANIMACIÓN
// Se asignan los eventos de click a los botones correspondientes para ejecutar las animaciones.
// El evento resize ajusta la interfaz si la pantalla cambia de tamaño (responsivo).
document.getElementById("btn-registrarse").addEventListener("click", animacionRegistrarse)
document.getElementById("btn-iniciar-sesión").addEventListener("click", animacionIniciarSesion)
window.addEventListener("resize", anchoPag);

// Variables que seleccionan los contenedores e inputs del HTML mediante sus clases.
var container_login_registro = document.querySelector(".container-login-registro");

var formulario_login = document.querySelector(".form-login");
var formulario_registro = document.querySelector(".form-registro");
var behind_box_login = document.querySelector(".behind-box-login");
var behind_box_registro = document.querySelector(".behind-box-registro");

//--------------------------------------------------------------
// Función que detecta el ancho de la pantalla y acomoda los formularios según el tamaño.
function anchoPag(){
    if(window.innerWidth > 850){
        behind_box_login.style.display = "block";
        behind_box_registro.style.display = "block";
    }else{
        behind_box_registro.style.display = "block";
        behind_box_registro.style.opacity = "1";
        behind_box_login.style.display = "none";
        formulario_login.style.display = "block";
        formulario_registro.style.display = "none";
        container_login_registro.style.left = "8px";
    }
}

// Llama a la función al cargar la página para aplicar el diseño correcto desde el inicio.
anchoPag();


//--------------------------------------------------------------
// Función para la animación visual cuando se presiona el botón de Iniciar Sesión.
// Mueve el contenedor blanco hacia la izquierda y muestra el formulario de login.
function animacionIniciarSesion(){
    if(window.innerWidth > 850){
        formulario_registro.style.display = "none"; // Se oculta el formulario de registro para que no sea visible.
        container_login_registro.style.left = "50px"; // Se desplaza la caja contenedora blanca hacia la izquierda (a 50px de posición).
        formulario_login.style.display = "block"; // Se hace visible el formulario de inicio de sesión.
        behind_box_registro.style.opacity = "1"; // Se vuelve completamente visible el mensaje y texto del fondo de registro.
        behind_box_login.style.opacity = "0"; // Se vuelve invisible el mensaje del fondo de inicio de sesión para evitar superposiciones.
    }else{
        formulario_registro.style.display = "none";
        container_login_registro.style.left = "0px";
        formulario_login.style = "block";
        behind_box_registro.style.display = "block";
        behind_box_login.style.display = "none";      
    }
    
}

//--------------------------------------------------------------
// Función para la animación visual cuando se presiona el botón de Registrarse.
// Mueve el contenedor blanco hacia la derecha y muestra el formulario de registro.
function animacionRegistrarse(){
    if(window.innerWidth > 850){
    formulario_registro.style.display = "block";
    container_login_registro.style.left = "500px";
    formulario_login.style.display = "none";
    behind_box_registro.style.opacity = "0";
    behind_box_login.style.opacity = "1";        
    }else{
        formulario_registro.style.display = "block";
        container_login_registro.style.left = "0px";
        formulario_login.style.display = "none";
        behind_box_registro.style.display = "none";
        behind_box_login.style.display = "block";
        behind_box_login.style.opacity = "1"         
    }

}

//--------------------------------------------------------------
// REGISTRO DE USUARIOS
// Escucha el evento "submit" (cuando se envía el formulario de registro).
// e.preventDefault() evita que la página se recargue automáticamente.
formulario_registro.addEventListener("submit", function(e) {
    e.preventDefault();

    // Capturar valores usando los 'name' o 'inputs' dentro de tu form
    const inputs = formulario_registro.querySelectorAll("input");
    const nombre = inputs[0].value;
    const correo = inputs[1].value;
    const contraseña = inputs[2].value;



    // find() busca en el array si ya existe un usuario creado con ese mismo correo.
    const existe = usuarios.find(u => u.correo === correo);
    if (existe) {
        alert("Este correo ya está registrado, intenta con otro.");
        return;// Detiene la función para no crear duplicados
    }

    // Busca el ID más alto existente y le suma 1 (si el array está vacío, empieza en 1)
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    // push() agrega el nuevo objeto usuario con sus datos al array "usuarios".
    usuarios.push({ id:nuevoId, nombre_usuario: nombre, correo: correo, contraseña: contraseña });

    // localStorage.setItem guarda la lista actualizada en la memoria del navegador.
    // JSON.stringify convierte el array de JS a texto para poder guardarlo.
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario creado exitosamente");
    formulario_registro.reset(); // Limpia los campos de texto
    animacionIniciarSesion(); // Lo mueve al panel de login automáticamente

});

//--------------------------------------------------------------
// INICIO DE SESIÓN
// Escucha el evento "submit" (cuando se envía el formulario de login).
formulario_login.addEventListener("submit", function(e) {
    e.preventDefault();

    // Captura los inputs del formulario de login.
    const inputs = formulario_login.querySelectorAll("input");
    const correo = inputs[0].value;
    const contraseña = inputs[1].value;

    // Lee los administradores de localStorage (o usa el admin por defecto)
    let administradores = JSON.parse(localStorage.getItem("administradores")) || [
        { id: 1, nombre_usuario: "SuperAdmin",
            correo: "admin@gmail.com",
            contraseña: "admin123"
        },
        {
            id: 2,
            nombre_usuario: "adan_adm",
            correo: "ad.ramirezn@duocuc.cl",
            contraseña: "admin123"
        },
        {
            id: 3,
            nombre_usuario: "marcelo_adm",
            correo: "marc.gallardos@duocuc.cl",
            contraseña: "admin123"
        },
        {
            id:4,
            nombre_usuario: "user_adm_prueba_eliminar",
            correo: "adminEliminar@gmail.com",
            contraseña: "eliminarAdmin123"
        }
    ];

    // Busca si el correo y la contraseña coinciden con algún admin guardado
    const adminValido = administradores.find(a => a.correo === correo && a.contraseña === contraseña);

    if (adminValido) {
        // Guarda en localStorage la sesión activa con su rol 'admin'
        localStorage.setItem("usuarioLogueado", JSON.stringify({
            id: adminValido.id,
            nombre_usuario: adminValido.nombre_usuario,
            correo: adminValido.correo,
            rol: "admin"
        }));

        alert(`¡Bienvenido/a Administrador ${adminValido.nombre_usuario}!`);
        window.location = "home_adm.html";
        return; // Detiene la ejecución para no evaluar como usuario común
    }

    // Si no fue admin, busca en el arreglo de usuarios normales
    const usuarioValido = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);

    if (usuarioValido) {
        // Guarda los datos del usuario cliente
        localStorage.setItem("usuarioLogueado", JSON.stringify({
            ...usuarioValido,
            rol: "cliente"
        }));

        alert(`¡Bienvenido/a ${usuarioValido.nombre_usuario}!`);
        window.location = "index.html"; // Redirige a la página principal
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});