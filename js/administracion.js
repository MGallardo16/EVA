function cargarTablaAdminProd() {
    const contenedor = document.getElementById("contenido-principal");

    if (!contenedor) {
        console.error("No se encontró el contenedor 'contenido-principal' en el HTML.");
        return;
    }
    let datosProductos = JSON.parse(localStorage.getItem("productos"));
    if (!datosProductos && typeof productos !== "undefined") {
        datosProductos = productos;
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    if (!datosProductos) {
        datosProductos = [];
    }
    let filas = "";
    if (datosProductos.length === 0) {
        filas = `<tr><td colspan="3" class="text-center">No hay productos disponibles.</td></tr>`;
    } else {
        datosProductos.forEach(item => {
            filas += `
                <tr>
                    <td class="fw-bold ps-3">${item.id}</td>
                    <td>${item.nombre}</td>
                    <td class="text-end pe-3">$${item.precio.toLocaleString("es-CL")}</td>
                </tr>
            `;
        });
    }
    contenedor.innerHTML = `
        <div class="container-fluid">
            <h3 class="mb-4 text-dark">Gestión de Productos</h3>

            <div class="border border-secondary rounded" style="max-height: 700px; overflow-y: auto;">
                <table class="table table-dark table-striped table-hover align-middle mb-0 text-start">
                    <thead style="position: sticky; top: 0; z-index: 2;" class="table-dark border-bottom border-secondary">
                        <tr>
                            <th scope="col" class="py-3 ps-3" style="width: 10%;">#</th>
                            <th scope="col" class="py-3" style="width: 60%;">Nombre</th>
                            <th scope="col" class="py-3 text-end pe-3" style="width: 30%;">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filas}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function cargarTablaAdminUsers() {
    const contenedor = document.getElementById("contenido-principal");
    if (!contenedor) {
        console.error("No se encontró el contenedor 'contenido-principal' en el HTML.");
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios || usuarios.length === 0) {
        usuarios = [
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
                correo: "gmorales@yahoo.com",
                contraseña: "gonzaPass789"
            }
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    let filas = "";
    usuarios.forEach((user) => {
        filas += `
            <tr>
                <td class="fw-bold ps-3">${user.id}</td>
                <td>${user.nombre_usuario}</td>
                <td>${user.correo}</td>
                <td>${user.contraseña}</td>
                <td class="text-end pe-3">
                    <span class="badge bg-info text-dark">Cliente</span>
                </td>
            </tr>
        `;
    });
    contenedor.innerHTML = `
        <div class="p-4 w-100">
            <h3 class="mb-3 text-dark">Gestión de Usuarios</h3>
            <div class="border border-secondary rounded shadow-sm" style="max-height: 300px; overflow-y: auto;">
                <table class="table table-dark table-striped table-hover align-middle mb-0 text-start">
                    <thead style="position: sticky; top: 0; z-index: 2;" class="table-dark border-bottom border-secondary">
                        <tr>
                            <th scope="col" class="py-3 ps-3" style="width: 10%;">#</th>
                            <th scope="col" class="py-3" style="width: 40%;">Usuario</th>
                            <th scope="col" class="py-3" style="width: 30%;">Correo</th>
                            <th scope="col" class="py-3" style="width: 10%;">Contraseña</th>
                            <th scope="col" class="py-3 text-end pe-3" style="width: 10%;">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filas}
                    </tbody>
                </table>
            </div>
            <div class="row align-items-center g-4 mt-1">
                <div class="col-md-5">
                    <div class="card bg-dark text-white border-secondary p-3 shadow-sm">
                        <h5 class="card-title mb-3">Eliminar usuario</h5>
                        <form id="form-eliminar-usuario">
                            <div class="mb-3 d-flex align-items-center gap-2">
                                <label for="usuario-id" class="form-label mb-0 fw-bold">id:</label>
                                <input type="number" id="usuario-id" class="form-control bg-secondary text-white border-0" min="1" step="1" required>
                            </div>
                            <button type="submit" class="btn btn-outline-light w-100 rounded-pill">Eliminar</button>
                        </form>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card bg-dark text-white border-secondary p-3 shadow-sm">
                        <h5 class="card-title mb-3">Agregar Nuevo Usuario</h5>
                        <form id="form-crear-usuario">
                            <div class="mb-2">
                                <input type="text" id="nuevo-nombre" class="form-control bg-secondary text-white border-0" placeholder="Nombre de usuario" required>
                            </div>
                            <div class="mb-2">
                                <input type="email" id="nuevo-correo" class="form-control bg-secondary text-white border-0" placeholder="Correo electrónico" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" id="nueva-pass" class="form-control bg-secondary text-white border-0" placeholder="Contraseña" required>
                            </div>
                            <button type="submit" class="btn btn-success w-100 rounded-pill">Agregar Usuario</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    const formEliminarUser = document.getElementById("form-eliminar-usuario");
        formEliminarUser.addEventListener("submit", function(e){
        e.preventDefault();
        const idEliminar = parseInt(document.getElementById("usuario-id").value);

        const index = usuarios.findIndex(u => u.id === idEliminar);
        if(index !== -1){
            usuarios.splice(index, 1);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert(`Usuario con id ${idEliminar} eliminado correctamente`);

            cargarTablaAdminUsers();
        }else{
            alert(`No se encontro ningun usuario con el id ${idEliminar}`);
        }
    });

    const formCrearUser = document.getElementById("form-crear-usuario");

        if (formCrearUser) {
            formCrearUser.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = document.getElementById("nuevo-nombre").value;
            const correo = document.getElementById("nuevo-correo").value;
            const contraseña = document.getElementById("nueva-pass").value;
            const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(a => a.id)) + 1 : 1;
            const nuevoUsuario = {
            id: nuevoId,
            nombre_usuario: nombre,
            correo: correo,
            contraseña: contraseña
            }
        });
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert(`Usuario ${nombre} creado correctamente`);
        cargarTablaAdminUsers();
    };
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