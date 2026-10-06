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
function dominioValido(correo) {
    return correo.endsWith("@gmail.com") 
    || correo.endsWith("@duocuc.cl") 
    || correo.endsWith("@profesor.duocuc.cl");
}
var container_login_registro = document.querySelector(".container-login-registro");
var formulario_login = document.querySelector(".form-login");
var formulario_registro = document.querySelector(".form-registro");
var behind_box_login = document.querySelector(".behind-box-login");
var behind_box_registro = document.querySelector(".behind-box-registro");
document.getElementById("btn-registrarse").addEventListener("click", animacionRegistrarse)
document.getElementById("btn-iniciar-sesión").addEventListener("click", animacionIniciarSesion)
window.addEventListener("resize", anchoPag);
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
anchoPag();
function animacionIniciarSesion(){
    if(window.innerWidth > 850){
        formulario_registro.style.display = "none"; 
        container_login_registro.style.left = "50px"; 
        formulario_login.style.display = "block"; 
        behind_box_registro.style.opacity = "1"; 
        behind_box_login.style.opacity = "0"; 
    }else{
        formulario_registro.style.display = "none";
        container_login_registro.style.left = "0px";
        formulario_login.style.display = "block";
        behind_box_registro.style.display = "block";
        behind_box_login.style.display = "none";      
    }
    
}
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
formulario_registro.addEventListener("submit", function(e) {
    e.preventDefault();
    const inputs = formulario_registro.querySelectorAll("input");
    const nombre = inputs[0].value;
    const correo = inputs[1].value;
    const contraseña = inputs[2].value;
    if (!dominioValido(correo)) {
        alert("El correo debe ser de un dominio válido: @gmail.com, @duocuc.cl o @profesor.duocuc.cl");
        return;
    }
    const existe = usuarios.find(u => u.correo === correo);
    if (existe) {
        alert("Este correo ya está registrado, intenta con otro.");
        return;
    }
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    usuarios.push({ id:nuevoId, nombre_usuario: nombre, correo: correo, contraseña: contraseña });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario creado exitosamente");
    formulario_registro.reset(); 
    animacionIniciarSesion(); 

});
formulario_login.addEventListener("submit", function(e) {
    e.preventDefault();
    const inputs = formulario_login.querySelectorAll("input");
    const correo = inputs[0].value;
    const contraseña = inputs[1].value;
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
    const adminValido = administradores.find(a => a.correo === correo && a.contraseña === contraseña);
    if (adminValido) {
        localStorage.setItem("usuarioLogueado", JSON.stringify({
            id: adminValido.id,
            nombre_usuario: adminValido.nombre_usuario,
            correo: adminValido.correo,
            rol: "admin"
        }));
        alert(`¡Bienvenido/a Administrador ${adminValido.nombre_usuario}!`);
        window.location = "home_adm.html";
        return; 
    }
    const usuarioValido = usuarios.find(u => u.correo === correo && u.contraseña === contraseña);
    if (usuarioValido) {
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