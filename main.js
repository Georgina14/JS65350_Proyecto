// Variables
let tareasPendientes = JSON.parse(localStorage.getItem("tareasPendientes")) || [];
let tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

// DOM
const inputTarea = document.getElementById("input-tarea");
const inputTitulo = document.getElementById('input-titulo');
const btnAgregar = document.getElementById("btn-agregar");
const btnMostrarCompletadas = document.getElementById("btn-mostrar-completadas");
const listaPendientes = document.getElementById("lista-pendientes");
const listaCompletadas = document.getElementById("lista-completadas");

// Functions
function agregarTarea() {
    const titulo = inputTitulo.value.trim();
    const tarea = inputTarea.value.trim();
    console.log('entro')
    if (!titulo) {
        alert("El titulo no puede estar vacio.");
        return;
    }

    if (titulo.length >= 20) {
        alert("El titulo no puede ser mayor a 20 caracteres");
        return;
    }

    if (!tarea) {
        alert("La tarea no puede estar vacía.");
        return;
    }

    tareasPendientes.push({titulo, tarea});
    guardarDatos();
    inputTarea.value = "";
    inputTitulo.value = "";
    mostrarPendientes();
    console.log(tareasPendientes);
}

function guardarEdicion(index) {
    const titulo = inputTitulo.value.trim();
    const tarea = inputTarea.value.trim();

    if (!titulo) {
        alert("El titulo no puede estar vacio.");
        return;
    }

    if (titulo.length >= 20) {
        alert("El titulo no puede ser mayor a 20 caracteres");
        return;
    }

    if (!tarea) {
        alert("La tarea no puede estar vacía.");
        return;
    }

    if (index >= 0 && index < tareasPendientes.length) {
        tareasPendientes[index] = { ...tareasPendientes[index], titulo, tarea };
    } else {
        console.log("Índice fuera de rango");
    }

    guardarDatos();
    inputTarea.value = "";
    inputTitulo.value = "";
    btnAgregar.textContent = "Agregar Tarea";
    mostrarPendientes();
    console.log(tareasPendientes);
}

// Tareas Pendientes
function mostrarPendientes() {
    listaPendientes.innerHTML = ""; 

    if (tareasPendientes.length === 0) {
        listaPendientes.textContent = "No hay tareas pendientes.";
        return;
    }

    tareasPendientes.forEach((item, index) => {
        const li = document.createElement("li");
        const spanTitulo = document.createElement("span");
        spanTitulo.textContent = `${item.titulo}: `;
        spanTitulo.classList.add("titulo");

        const spanTarea = document.createElement("span");
        spanTarea.textContent = `${item.tarea}`;
        spanTarea.classList.add("tarea");

        // Botón Completar
        const btnCompletar = document.createElement("button");
        btnCompletar.textContent = "Completar";
        btnCompletar.classList.add("complete");
        btnCompletar.addEventListener("click", () => completarTarea(index));

        // Botón Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("edit");
        btnEditar.addEventListener("click", () => editarTarea(li, index, item));

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("delete");
        btnEliminar.addEventListener("click", () => eliminarPendiente(index));

        li.appendChild(spanTitulo);
        li.appendChild(spanTarea);
        li.appendChild(btnCompletar);
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        listaPendientes.appendChild(li);
    });
}

function editarTarea(li, index, item) {
    const inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.value = item.titulo;
    
    const inputTarea = document.createElement("input");
    inputTarea.type = "text";
    inputTarea.value = item.tarea;

    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar";
    btnGuardar.classList.add("save");
    btnGuardar.addEventListener("click", () => guardarEdicion(index, inputTitulo.value, inputTarea.value));

    li.innerHTML = "";
    li.appendChild(inputTitulo);
    li.appendChild(inputTarea);
    li.appendChild(btnGuardar);
}

function guardarEdicion(index, nuevoTitulo, nuevaTarea) {
    if (!nuevoTitulo.trim()) {
        alert("El título no puede estar vacío.");
        return;
    }

    if (nuevoTitulo.length >= 20) {
        alert("El título no puede ser mayor a 20 caracteres");
        return;
    }

    if (!nuevaTarea.trim()) {
        alert("La tarea no puede estar vacía.");
        return;
    }

    tareasPendientes[index] = { titulo: nuevoTitulo, tarea: nuevaTarea };

    guardarDatos();
    mostrarPendientes();
}


// Completar
function completarTarea(index) {
    const tareaCompletada = tareasPendientes.splice(index, 1)[0];
    tareasCompletadas.push(tareaCompletada);
    guardarDatos();
    mostrarPendientes();
}

// Tareas Pendientes
function eliminarPendiente(index) {
    tareasPendientes.splice(index, 1);
    guardarDatos();
    mostrarPendientes();
}

// Mostrar tareas completadas
function mostrarCompletadas() {
    listaCompletadas.innerHTML = "";

    if (tareasCompletadas.length === 0) {
        listaCompletadas.textContent = "No hay tareas completadas.";
        return;
    }

    tareasCompletadas.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = tarea;
        listaCompletadas.appendChild(li);
    });
}


function guardarDatos() {
    localStorage.setItem("tareasPendientes", JSON.stringify(tareasPendientes));
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
}

// Event Listeners
btnAgregar.addEventListener("click", agregarTarea);
btnMostrarCompletadas.addEventListener("click", mostrarCompletadas);

// Iniciar
mostrarPendientes();