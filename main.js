// Variables y constantes
let tareas = []; 
const maxTareas = 10; 

console.log("Máximo de tareas permitidas en Lista de Tareas:", maxTareas);

// Función para agregar una tarea
function agregarTarea() {
    if (tareas.length >= maxTareas) {
        console.log("Error: No se puede agregar más tareas. Límite alcanzado.");
        alert("No podes agregar más tareas. Has alcanzado el límite máximo.");
        return;
    }

    const nuevaTarea = prompt("Ingresá una nueva tarea:");
    if (!nuevaTarea || nuevaTarea.trim() === "") {
        console.log("Error: Tarea no válida. El usuario ingresó una tarea vacía.");
        alert("La tarea no puede estar vacía.");
        return;
    }

    tareas.push(nuevaTarea.trim()); 
    console.log(`Tarea agregada: "${nuevaTarea.trim()}"`);
    console.log("Estado actual de las tareas:", tareas);
    mostrarTareas();
}

// Función para mostrar todas las tareas
function mostrarTareas() {
    if (tareas.length === 0) {
        console.log("No hay tareas para mostrar.");
        alert("La lista de tareas está vacía.");
        return;
    }

    let lista = "Tus tareas:\n";
    for (let i = 0; i < tareas.length; i++) {
        lista += `${i + 1}. ${tareas[i]}\n`;
    }

    console.log("Mostrando tareas:");
    console.log(lista);
    alert(lista); 
}

// Función para eliminar una tarea
function eliminarTarea() {
    if (tareas.length === 0) {
        console.log("Error: No hay tareas para eliminar.");
        alert("No hay tareas para eliminar.");
        return;
    }

    const indice = parseInt(prompt("Ingresá el número de la tarea que queres eliminar:")) - 1;

    if (isNaN(indice) || indice < 0 || indice >= tareas.length) {
        console.log("Error: El usuario ingresó un número inválido.");
        alert("Número inválido. Intentá de nuevo.");
        return;
    }

    const tareaEliminada = tareas.splice(indice, 1); 
    console.log(`Tarea eliminada: "${tareaEliminada}"`);
    console.log("Estado actual de las tareas:", tareas);
    mostrarTareas();
}

// Menú principal
function menuPrincipal() {
    let continuar = true;

    while (continuar) {
        const opcion = prompt(
            "Lista de Tareas\n\nElige una opción:\n1. Agregar tarea\n2. Mostrar tareas\n3. Eliminar tarea\n4. Salir"
        );

        switch (opcion) {
            case "1":
                agregarTarea();
                break;
            case "2":
                mostrarTareas();
                break;
            case "3":
                eliminarTarea();
                break;
            case "4":
                continuar = confirm("¿Estás seguro de que querés salir?");
                console.log("El usuario decidió salir del simulador.");
                break;
            default:
                console.log("El usuario ingresó una opción inválida.");
                alert("Opción no válida. Intenta de nuevo.");
        }
    }
}

// Iniciar el simulador
menuPrincipal();
