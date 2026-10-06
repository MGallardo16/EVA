function cargarTablaAdminProd() {
  const contenedor = document.getElementById("contenido-principal");
  if (!contenedor) {
    console.error("No se encontró el contenedor 'contenido-principal' en el HTML.");
    return;
  }

  // Obtener productos desde localStorage o inicializar
  let productos = JSON.parse(localStorage.getItem("productos"));
  if (!productos || productos.length === 0) {
    productos = [
      { id: 1, nombre: "Monopoly Banco Electrónico", precio: 30990, stock: 10 },
      { id: 2, nombre: "Jenga Clásico", precio: 16990, stock: 15 },
      { id: 3, nombre: "UNO", precio: 3990, stock: 50 }
    ];
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  // Construir filas de la tabla
  let filas = "";
  productos.forEach((prod) => {
    filas += `

    
      <tr>
        <td class="fw-bold ps-3">${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>$${prod.precio.toLocaleString("es-CL")}</td>
        <td>${prod.stock}</td>
      </tr>
    `;
  });

  // Renderizar contenido en el área principal
  contenedor.innerHTML = `
    <h2>Gestión de Productos</h2>
    <div class="row">
      <!-- Tabla -->
      <div class="col-md-8">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>

      <!-- Formularios -->
      <div class="col-md-4">
        <div class="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar producto</h5>
          <form id="form-eliminar-prod">
            <label for="prod-id" class="form-label">ID:</label>
            <input type="number" id="prod-id" class="form-control mb-2" min="1" step="1" required>
            <button type="submit" class="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>

        <div class="p-3 bg-secondary rounded">
          <h5>Agregar Nuevo Producto</h5>
          <form id="form-crear-prod">
            <input type="text" id="nuevo-nombre-prod" class="form-control mb-2" placeholder="Nombre" required>
            <input type="number" id="nuevo-precio-prod" class="form-control mb-2" placeholder="Precio" required>
            <input type="number" id="nuevo-stock-prod" class="form-control mb-2" placeholder="Stock" required>
            <button type="submit" class="btn btn-success w-100">Agregar Producto</button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Lógica de eliminar producto
  const formEliminarProd = document.getElementById("form-eliminar-prod");
  formEliminarProd.addEventListener("submit", function(e) {
    e.preventDefault();
    const idEliminar = parseInt(document.getElementById("prod-id").value);
    const index = productos.findIndex(p => p.id === idEliminar);
    if (index !== -1) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      alert(`Producto con id ${idEliminar} eliminado correctamente`);
      cargarTablaAdminProd();
    } else {
      alert(`No se encontró ningún producto con el id ${idEliminar}`);
    }
  });

  // Lógica de agregar producto
  const formCrearProd = document.getElementById("form-crear-prod");
  formCrearProd.addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = document.getElementById("nuevo-nombre-prod").value;
    const precio = parseInt(document.getElementById("nuevo-precio-prod").value);
    const stock = parseInt(document.getElementById("nuevo-stock-prod").value);
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    const nuevoProducto = { id: nuevoId, nombre, precio, stock };
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    alert(`Producto "${nombre}" agregado correctamente`);
    cargarTablaAdminProd();
  });
}


function cargarTablaAdministradores() {
    const contenedor = document.getElementById("contenido-principal");
    if (!contenedor) {
        console.error("No se encontró el contenedor 'contenido-principal' en el HTML.");
        return;
    }
    let admins = JSON.parse(localStorage.getItem("administradores"));
    if (!admins || admins.length === 0) {
        admins = [
            { id: 1, nombre_usuario: "SuperAdmin",
                correo: "admin@correo.com",
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
        localStorage.setItem("administradores", JSON.stringify(admins));
    }
    if (!admins) {
        admins = [];
    }
    let filas = "";
    admins.forEach(admin => {
        filas += `
            <tr>
                <td class="fw-bold ps-3">${admin.id}</td>
                <td>${admin.nombre_usuario}</td>
                <td>${admin.correo}</td>
                <td class="text-end pe-3">
                    <span class="badge bg-danger">Admin</span>
                </td>
            </tr>
        `;
    });
    contenedor.innerHTML = `
        <div class="p-4 w-100 text-white">
            <h3 class="mb-4">Gestión de Administradores</h3>
            <div class="border border-secondary rounded shadow-sm mb-4" style="max-height: 250px; overflow-y: auto;">
                <table class="table table-dark table-striped table-hover align-middle mb-0 text-start">
                    <thead style="position: sticky; top: 0; z-index: 2;" class="table-dark border-bottom border-secondary">
                        <tr>
                            <th scope="col" class="py-3 ps-3" style="width: 15%;">#</th>
                            <th scope="col" class="py-3" style="width: 45%;">Usuario</th>
                            <th scope="col" class="py-3" style="width: 30%;">Correo</th>
                            <th scope="col" class="py-3 text-end pe-3" style="width: 10%;">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filas}
                    </tbody>
                </table>
            </div>
            <div class="row align-items-center g-4">
                <div class="col-md-5">
                    <div class="card bg-dark text-white border-secondary p-3 shadow-sm">
                        <h5 class="card-title mb-3">Eliminar admin</h5>
                        <form id="form-eliminar-admin">
                            <div class="mb-3 d-flex align-items-center gap-2">
                                <label for="admin-id" class="form-label mb-0 fw-bold">id:</label>
                                <input type="number" id="admin-id" class="form-control bg-secondary text-white border-0" min="1" step="1" required>
                            </div>
                            <button type="submit" class="btn btn-outline-light w-100 rounded-pill">Eliminar</button>
                        </form>
                    </div>
                </div>

                <div class="col-md-7">
                    <div class="card bg-dark text-white border-secondary p-3 shadow-sm">
                        <h5 class="card-title mb-3">Agregar Nuevo Admin</h5>
                        <form id="form-crear-admin">
                            <div class="mb-2">
                                <input type="text" id="nuevo-nombre" class="form-control bg-secondary text-white border-0" placeholder="Nombre de usuario" required>
                            </div>
                            <div class="mb-2">
                                <input type="email" id="nuevo-correo" class="form-control bg-secondary text-white border-0" placeholder="Correo electrónico" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" id="nueva-pass" class="form-control bg-secondary text-white border-0" placeholder="Contraseña" required>
                            </div>
                            <button type="submit" class="btn btn-success w-100 rounded-pill">Agregar Administrador</button>
                        </form>
                    </div>
                </div>
            </div>  
        </div>
    `;
    const formCrearAdmin = document.getElementById("form-crear-admin");
    if (formCrearAdmin) {
        formCrearAdmin.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = document.getElementById("nuevo-nombre").value;
            const correo = document.getElementById("nuevo-correo").value;
            const contraseña = document.getElementById("nueva-pass").value;
            const nuevoId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
            const nuevoAdmin = {
            id: nuevoId,
            nombre_usuario: nombre,
            correo: correo,
            contraseña: contraseña
            };
            admins.push(nuevoAdmin);
            localStorage.setItem("administradores", JSON.stringify(admins));
            alert(`Administrador ${nombre} creado correctamente`);
            cargarTablaAdministradores();
        });
    }
    const formEliminar = document.getElementById("form-eliminar-admin");
    if(formEliminar){
        formEliminar.addEventListener("submit", function(e){
            e.preventDefault();
            const idEliminar = parseInt(document.getElementById("admin-id").value);
            const index = admins.findIndex(a => a.id === idEliminar);
            if(index !== -1){
                admins.splice(index, 1);
                localStorage.setItem("administradores", JSON.stringify(admins));
                alert(`Administrador con id ${idEliminar} eliminado correctamente`);
                cargarTablaAdministradores();
            }else{
                alert(`No se encontro ningun administrador con el id ${idEliminar}`);
            }
        })
    }
}

function cargarTablaOrdenes() {
  const contenedor = document.getElementById("contenido-principal");
  contenedor.innerHTML = `
    <h2>Órdenes / Boletas</h2>
    <p>Aquí se mostrarán las órdenes registradas.</p>
  `;
}

function cargarTablaCategorias() {
  const contenedor = document.getElementById("contenido-principal");
  contenedor.innerHTML = `
    <h2>Categorías</h2>
    <p>Aquí podrás crear y editar categorías de productos.</p>
  `;
}

function cargarTablaReportes() {
  const contenedor = document.getElementById("contenido-principal");
  contenedor.innerHTML = `
    <h2>Reportes</h2>
    <p>Aquí se mostrarán estadísticas y reportes de ventas.</p>
  `;
}

function cargarPerfilAdmin() {
  const contenedor = document.getElementById("contenido-principal");
  contenedor.innerHTML = `
    <h2>Perfil del Administrador</h2>
    <p>Aquí podrás editar tus datos de perfil.</p>
  `;
}


function cargarTablaAdminUsers() {
  const contenedor = document.getElementById("contenido-principal");
  if (!contenedor) {
    console.error("No se encontró el contenedor 'contenido-principal' en el HTML.");
    return;
  }

  // Obtener usuarios desde localStorage o inicializar
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (!usuarios || usuarios.length === 0) {
    usuarios = [
      { id: 1, nombre_usuario: "Usuario Prueba", correo: "usuarioPrueba@gmail.com", contraseña: "123" },
      { id: 2, nombre_usuario: "Camila Silva", correo: "csilva@gmail.com", contraseña: "passCamila123" },
      { id: 3, nombre_usuario: "Matías Rojas", correo: "mrojas@duocuc.cl", contraseña: "claveMati2026" },
      { id: 4, nombre_usuario: "Valentina Sepúlveda", correo: "vsepulveda@gmail.com", contraseña: "valenPassword456" },
      { id: 5, nombre_usuario: "Gonzalo Morales", correo: "gmorales@yahoo.com", contraseña: "gonzaPass789" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  // Construir filas de la tabla
  let filas = usuarios.map(user => `
    <tr>
      <td class="fw-bold ps-3">${user.id}</td>
      <td>${user.nombre_usuario}</td>
      <td>${user.correo}</td>
      <td>${user.contraseña}</td>
    </tr>
  `).join("");

  // Renderizar contenido
  contenedor.innerHTML = `
    <h2>Gestión de Usuarios</h2>
    <div class="row">
      <!-- Tabla -->
      <div class="col-md-8" style="max-height: 400px; overflow-y: auto;">
        <table class="table table-dark table-striped">
          <thead>
            <tr><th>#</th><th>Usuario</th><th>Correo</th><th>Contraseña</th></tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>

      <!-- Formularios -->
      <div class="col-md-4">
        <div class="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar usuario</h5>
          <form id="form-eliminar-usuario">
            <label for="usuario-id" class="form-label">ID:</label>
            <input type="number" id="usuario-id" class="form-control mb-2" min="1" step="1" required>
            <button type="submit" class="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>

        <div class="p-3 bg-secondary rounded">
          <h5>Agregar Nuevo Usuario</h5>
          <form id="form-crear-usuario">
            <input type="text" id="nuevo-nombre" class="form-control mb-2" placeholder="Nombre de usuario" required>
            <input type="email" id="nuevo-correo" class="form-control mb-2" placeholder="Correo electrónico" required>
            <input type="password" id="nueva-pass" class="form-control mb-2" placeholder="Contraseña" required>
            <button type="submit" class="btn btn-success w-100">Agregar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Lógica de eliminar usuario
  const formEliminarUser = document.getElementById("form-eliminar-usuario");
  formEliminarUser.addEventListener("submit", function(e) {
    e.preventDefault();
    const idEliminar = parseInt(document.getElementById("usuario-id").value);
    const index = usuarios.findIndex(u => u.id === idEliminar);
    if (index !== -1) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert(`Usuario con id ${idEliminar} eliminado correctamente`);
      cargarTablaAdminUsers();
    } else {
      alert(`No se encontró ningún usuario con el id ${idEliminar}`);
    }
  });

  // Lógica de agregar usuario
  const formCrearUser = document.getElementById("form-crear-usuario");
  formCrearUser.addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = document.getElementById("nuevo-nombre").value;
    const correo = document.getElementById("nuevo-correo").value;
    const contraseña = document.getElementById("nueva-pass").value;
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    const nuevoUsuario = { id: nuevoId, nombre_usuario: nombre, correo, contraseña };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert(`Usuario "${nombre}" creado correctamente`);
    cargarTablaAdminUsers();
  });
}


function cargarTablaCategorias() {
  const contenedor = document.getElementById("contenido-principal");
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [
    { id: 1, nombre: "Clásicos" },
    { id: 2, nombre: "Estrategia" },
    { id: 3, nombre: "Fiesta" }
  ];
  localStorage.setItem("categorias", JSON.stringify(categorias));

  let filas = categorias.map(c => `
    <tr><td>${c.id}</td><td>${c.nombre}</td></tr>
  `).join("");

  contenedor.innerHTML = `
    <h2>Gestión de Categorías</h2>
    <div class="row">
      <div class="col-md-8" style="max-height:400px;overflow-y:auto;">
        <table class="table table-dark table-striped">
          <thead><tr><th>#</th><th>Nombre</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
      <div class="col-md-4">
        <div class="mb-4 p-3 bg-secondary rounded">
          <h5>Eliminar categoría</h5>
          <form id="form-eliminar-cat">
            <input type="number" id="cat-id" class="form-control mb-2" placeholder="ID" required>
            <button type="submit" class="btn btn-danger w-100">Eliminar</button>
          </form>
        </div>
        <div class="p-3 bg-secondary rounded">
          <h5>Agregar Nueva Categoría</h5>
          <form id="form-crear-cat">
            <input type="text" id="nuevo-cat" class="form-control mb-2" placeholder="Nombre" required>
            <button type="submit" class="btn btn-success w-100">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById("form-eliminar-cat").onsubmit = e => {
    e.preventDefault();
    const id = parseInt(document.getElementById("cat-id").value);
    categorias = categorias.filter(c => c.id !== id);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    cargarTablaCategorias();
  };

  document.getElementById("form-crear-cat").onsubmit = e => {
    e.preventDefault();
    const nombre = document.getElementById("nuevo-cat").value;
    const nuevoId = categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1;
    categorias.push({ id: nuevoId, nombre });
    localStorage.setItem("categorias", JSON.stringify(categorias));
    cargarTablaCategorias();
  };
}


function cargarTablaReportes() {
  const contenedor = document.getElementById("contenido-principal");
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const totalProductos = productos.length;
  const totalUsuarios = usuarios.length;

  contenedor.innerHTML = `
    <h2>Reportes</h2>
    <div class="p-3 bg-light rounded">
      <p><strong>Total de productos:</strong> ${totalProductos}</p>
      <p><strong>Total de usuarios:</strong> ${totalUsuarios}</p>
      <p><em>(Más adelante puedes agregar gráficos con Chart.js)</em></p>
    </div>
  `;
}


function cargarTablaOrdenes() {
  const contenedor = document.getElementById("contenido-principal");
  let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [
    { id: 1, usuario: "Camila Silva", total: 30990, fecha: "2026-10-06" },
    { id: 2, usuario: "Matías Rojas", total: 16990, fecha: "2026-10-05" }
  ];
  localStorage.setItem("ordenes", JSON.stringify(ordenes));

  let filas = ordenes.map(o => `
    <tr><td>${o.id}</td><td>${o.usuario}</td><td>$${o.total}</td><td>${o.fecha}</td></tr>
  `).join("");

  contenedor.innerHTML = `
    <h2>Órdenes / Boletas</h2>
    <div class="row">
      <div class="col-md-12" style="max-height:400px;overflow-y:auto;">
        <table class="table table-dark table-striped">
          <thead><tr><th>ID</th><th>Usuario</th><th>Total</th><th>Fecha</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    </div>
  `;
}


function cargarPerfilAdmin() {
  const contenedor = document.getElementById("contenido-principal");
  let perfil = JSON.parse(localStorage.getItem("perfilAdmin")) || {
    nombre: "SuperAdmin",
    correo: "admin@correo.com",
    contraseña: "admin123"
  };
  localStorage.setItem("perfilAdmin", JSON.stringify(perfil));

  contenedor.innerHTML = `
    <h2>Perfil del Administrador</h2>
    <form id="form-perfil" class="p-3 bg-secondary rounded col-md-6">
      <label class="form-label">Nombre:</label>
      <input type="text" id="perfil-nombre" class="form-control mb-2" value="${perfil.nombre}">
      <label class="form-label">Correo:</label>
      <input type="email" id="perfil-correo" class="form-control mb-2" value="${perfil.correo}">
      <label class="form-label">Contraseña:</label>
      <input type="password" id="perfil-pass" class="form-control mb-2" value="${perfil.contraseña}">
      <button type="submit" class="btn btn-primary w-100">Guardar cambios</button>
    </form>
  `;

  document.getElementById("form-perfil").onsubmit = e => {
    e.preventDefault();
    perfil = {
      nombre: document.getElementById("perfil-nombre").value,
      correo: document.getElementById("perfil-correo").value,
      contraseña: document.getElementById("perfil-pass").value
    };
    localStorage.setItem("perfilAdmin", JSON.stringify(perfil));
    alert("Perfil actualizado correctamente");
    cargarPerfilAdmin();
  };
}
