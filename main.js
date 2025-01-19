// Variables
let tareasPendientes = JSON.parse(localStorage.getItem("tareasPendientes")) || [];
let tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

// DOM
const inputTarea = document.getElementById("input-tarea");
const btnAgregar = document.getElementById("btn-agregar");
const btnMostrarCompletadas = document.getElementById("btn-mostrar-completadas");
const listaPendientes = document.getElementById("lista-pendientes");
const listaCompletadas = document.getElementById("lista-completadas");

// Functions
function agregarTarea() {
    const tarea = inputTarea.value.trim();

    if (!tarea) {
        alert("La tarea no puede estar vacía.");
        return;
    }

    tareasPendientes.push(tarea);
    guardarDatos();
    inputTarea.value = "";
    mostrarPendientes();
}

// Tareas Pendientes
function mostrarPendientes() {
    listaPendientes.innerHTML = ""; 

    if (tareasPendientes.length === 0) {
        listaPendientes.textContent = "No hay tareas pendientes.";
        return;
    }

    tareasPendientes.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.textContent = tarea;

        // Botón Completar
        const btnCompletar = document.createElement("button");
        btnCompletar.textContent = "Completar";
        btnCompletar.classList.add("complete");
        btnCompletar.addEventListener("click", () => completarTarea(index));

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("delete");
        btnEliminar.addEventListener("click", () => eliminarPendiente(index));

        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        listaPendientes.appendChild(li);
    });
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