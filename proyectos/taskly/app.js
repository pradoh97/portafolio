var listaTareas;

iniciarApp();
mostrarTareas();
contarTareas();

//Inicializar event listeners
function iniciarApp(){
  listaTareas = document.querySelector('.tareas').children[1];
  listaTareas.onclick = modificarTarea;
  listaTareas.ondblclick = eliminarTareaDOM;
  document.querySelector('form').onsubmit = agregarTarea;
}

function contarTareas(){
  //Obtiene tareas totales y completas
  let totalTareas = listaTareas.children.length;
  //Selecciona las tareas con clase 'completa'.
  let tareasCompletas = document.querySelectorAll(".completa").length;

  //Agrega el contador con las tareas completas/totales.
  document.getElementById('conteo-tareas').innerText =  `${tareasCompletas}\\${totalTareas}`
}

function agregarTarea(e){
  e.preventDefault();
  //Obtiene el texto que ingresa el usuario como tarea
  let textoTarea = document.getElementById('nueva-tarea');

  //No hace nada si el input está vacio pero debería agregar una alerta.
  if (!textoTarea.value) {
    //agregarAlerta();
    return;
  } else {
    /*  Crea un item de lista y asigna el span con el cuerpo de la tarea nueva,
    *   le agrega la clase 'incompleta' por defecto y crea el botón de eliminar.
    */
    let tarea = document.createElement('li');
    tarea.innerHTML = `<span class="incompleta">${textoTarea.value}</span><span>x</span>`;

    //Agrega la tarea al listado de tareas y a localStorage.
    listaTareas.appendChild(tarea);
    agregarTareaLocalStorage(textoTarea.value);

    //Envia el formulario y limpia el input.
    e.target.reset();

    //Actualiza.
    contarTareas();
  }
}

//Agrega la tarea a local storage.
function agregarTareaLocalStorage(tarea){
  let tareas = obtenerTareasLocalStorage();
  tareas.push(tarea);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function obtenerTareasLocalStorage(){
  let tareas;

  if(localStorage.getItem('tareas') === null){
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }
  return tareas;
}

function eliminarTareaDOM(e){
  if(e.target.localName != 'ul'){
    e.target.parentElement.remove();
    if(e.type == "dblclick"){
      eliminarTareaLocalStorage(e.target.innerText);
    } else{
      eliminarTareaLocalStorage(e.target.previousElementSibling.innerText);
    }
    contarTareas();
  }
}

function modificarTarea(e){
  let elemento = e.target;
  let clase = elemento.classList;

  if(clase[0] == "incompleta"){
    clase.remove("incompleta");
    clase.add("completa");
  }else if(clase[0] == "completa") {
    clase.remove("completa");
    clase.add("incompleta");
  }

  if(elemento.innerText == "x"){
    eliminarTareaDOM(e);
  }
  contarTareas();
}

function mostrarTareas(){
  obtenerTareasLocalStorage().forEach(textoTarea => {
    let tarea = document.createElement('li');
    let spanTarea = document.createElement('span');
    let spanEliminar = document.createElement('span');

    spanTarea.innerText = textoTarea;
    spanTarea.classList.add("incompleta");
    spanEliminar.innerText = 'x';

    tarea.appendChild(spanTarea);
    tarea.appendChild(spanEliminar);
    listaTareas.appendChild(tarea);
    contarTareas();
  });
}
function eliminarTareaLocalStorage(tareaBorrar){
  let tareas = obtenerTareasLocalStorage();
  tareas.forEach(function(tarea, index){
    if(tareaBorrar === tarea){
      tareas.splice(index,1);
    }
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
