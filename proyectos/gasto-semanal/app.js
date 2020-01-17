//Clase para alertas y cuadros que se deben agregar en la página.
class Interfaz {
  /*  tipos: 1 = error, 2 = advertencia, 3 = completado, 4 = mensaje */
  constructor(mensaje, tipo = 4) {
    this.mensaje = mensaje;
    this.tipo = tipo;
  }

  //Agrega el cuadro de alerta correspondiente con el mensaje del objeto.
  agregrarInterfaz(){
    let padre = document.querySelector('.inputs');
    let hermano = document.querySelector('h3').nextElementSibling;
    let elemento = document.createElement('p');

    elemento.innerText = this.mensaje;
    elemento.classList.add('mensaje');

    //Verifica el tipo de alerta para aplicar la clase de CSS correspondiente.
    switch (this.tipo) {
      case 1:
      elemento.classList.add('error');
      break;
      case 2:
      elemento.classList.add('advertencia');
      break;
      case 3:
      elemento.classList.add('completado');
      break;
    }

    //Si se trata de confirmacion, no se agrega a localStorage. De otra forma verifica si la objeto existe o no en localStorage. Si existe, sale del método.
    if(this.tipo == 3){
      padre.insertBefore(elemento,hermano);
    } else if(!estaEnLocalStorage(this, 'alerta')){
      agregarLocalStorage(this, 'alerta');
      padre.insertBefore(elemento,hermano);
    }
  }
}

class Presupuesto {
  constructor(montoInicial, restante = montoInicial) {
    this.montoInicial = montoInicial;
    this.montoRestante = restante;
  }
}

class Gasto {
  constructor(nombre, monto) {
    this.nombre = nombre;
    this.monto = monto;
  }
}

const nombreGasto = document.querySelector('.inputs input[name="nombre del gasto"]');
const montoGasto = document.querySelector('.inputs input[name="monto del gasto"]');
const agregarGasto =  document.querySelector('button');
const totalPresupuesto = document.querySelector('.gastos p:nth-child(2) span');
const restantePresupuesto = document.querySelector('.gastos p:nth-child(3) span');
let presupuesto;

document.onload = iniciarApp;
iniciarApp();

//------------------------------------------------------------
//Funciones para el inicio de la aplicación
//Ejecuta los métodos para iniciar la app sin alertas y con el formulario vacio.
function iniciarApp(){
  eventListeners();
  eliminarLocalStorage('alerta');
  agregarGasto.disabled = true;
  document.querySelector('form').reset();
  if(obtenerLocalStorage('gastos').length){
    cargarGastosLocalStorage();
    modificarAspectoGastoRestante();
  }

  //Verifica si ya existe un valor de presupuesto. Si no existe lo crea y lo agrega a localStorage.
  if(!obtenerLocalStorage('presupuesto').length){
    presupuesto = new Presupuesto(parseFloat(prompt("Ingresa tu monto inicial")));
    agregarLocalStorage(presupuesto, 'presupuesto');
  }

  cargarPresupuesto();
}

//Crea los eventListeners que se van a usar en cada control.
function eventListeners(){
  nombreGasto.oninput = campoModificado;
  montoGasto.oninput = campoModificado;
  agregarGasto.onclick = cargarGasto;
}
//------------------------------------------------------------

//------------------------------------------------------------
//Funciones para la comprobación del formulario.

//Verifica si el campo que pierde el foco es válido, ademas elimina el mensaje de error si el campo es válido.
function campoValido(nombreCampo, valor, tipoEsperado){
  let mensajeError;
  if(valor == '' || !valor.replace(/\s/g, '').length){
    eliminarLocalStorage('alerta', `El ${nombreCampo} tiene que ser un número.`);
    mensajeError = `Recuerde ingresar un ${nombreCampo}.`;
  }
  //Verifica cadenas que deberian ser numéricas.
  else if(isNaN(valor) && tipoEsperado == 'number'){
    eliminarLocalStorage('alerta', `Recuerde ingresar un ${nombreCampo}.`);
    mensajeError = `El ${nombreCampo} tiene que ser un número.`;
  }
  //Elimina alertas si todo es válido.
   else {
    eliminarLocalStorage('alerta', `El ${nombreCampo} tiene que ser un número.`);
    eliminarLocalStorage('alerta', `Recuerde ingresar un ${nombreCampo}.`);
    mensajeError = '';
  }
  return mensajeError;
}

//Verifica que campo pierde el foco.
function campoModificado(e){
  let mensajeError;

  //Verifica el campo del nombre de gasto.
  if (e.target == nombreGasto){
    nombreGasto.classList.add('campo-invalido');
    mensajeError = campoValido(nombreGasto.name, nombreGasto.value, 'string');
  }

  //Verifica si el campo de monto tiene un número o texto.
  if(e.target == montoGasto){
    montoGasto.classList.add('campo-invalido');
    let monto = parseFloat(montoGasto.value);
    mensajeError = campoValido(montoGasto.name, montoGasto.value, 'number');
  }

  //Si hay algun error, mensajeError tendrá un valor, y este valor se almacena en localStorage y se agrega a la interfaz.
  if(mensajeError){
    let mensajeNuevo = new Interfaz(mensajeError, 1);
    mensajeNuevo.agregrarInterfaz();
  } else {
    e.target.classList.remove('campo-invalido');
  }

  //Luego de verificar todos los campos verifica si se debe habilitar el botón de agregar.
  habilitarAgregar();
}

//Habilita el botón de agregar gasto cuando el campo de gasto tiene un valor y el campo de monto tiene un valor numérico.
function habilitarAgregar(){
  if(montoGasto.value == '' || nombreGasto.value == ''){
    agregarGasto.disabled = true;
  } else {
    !obtenerLocalStorage('alerta').length ? agregarGasto.disabled = false : agregarGasto.disabled = true;
  }
}
//------------------------------------------------------------

//------------------------------------------------------------
//Funciones para mostrar y remover alertas del DOM.

//Recibe un valor y busca la alerta correspondiente en el DOM para borrarla.
function eliminarAlertaDOM(valor){
  let objetos = Array.from(document.querySelectorAll(".mensaje"));
  for(el of objetos){
    if(el.innerText == valor){
      el.remove();
    }
  }
}

//Elimina los items de localStorage y elimina un item específico.
function eliminarLocalStorage(clave, valor = undefined){

  //Elimina todos los items de localStorage
  if(!valor){
    localStorage.removeItem(clave);
  }
  //Elimina un item específico de localStorage
  else {
    let objetos = obtenerLocalStorage(clave);

    //Busca el item en localStorage
    for(let [index,obj] of objetos.entries()){
      if(valor == obj.mensaje){
        objetos.splice(index,1);
      }
    }
    eliminarAlertaDOM(valor);
    localStorage.setItem('alerta', JSON.stringify(objetos));
  }
}

//Retorna true si el item ya se encontraba en localStorage y false si no.
function estaEnLocalStorage(objeto, clave){
  let objetos = obtenerLocalStorage(clave);
  if(objetos.length){
    for(obj of objetos){
      if(objeto.mensaje == obj.mensaje){
        return true;
      }
    }
    return false;
  }
}

//Agrega un item a localStorage.
function agregarLocalStorage(objeto, clave){
  let objetos = obtenerLocalStorage(clave);
  objetos.push(objeto);
  localStorage.setItem(clave, JSON.stringify(objetos));
}

//Retorna como array todos los items de una determinada clave.
function obtenerLocalStorage(clave){
  let objetos;
  if (localStorage.getItem(clave)) {
     objetos = JSON.parse(localStorage.getItem(clave));
  }
  if(!objetos){
    objetos = [];
  }
  return objetos;
}
//------------------------------------------------------------

//------------------------------------------------------------
//Funciones para manipular el presupuesto en el DOM.
function cargarPresupuesto(){
  presupuesto = new Presupuesto(obtenerLocalStorage('presupuesto')[0].montoInicial, obtenerLocalStorage('presupuesto')[0].montoRestante);
  totalPresupuesto.innerText = presupuesto.montoInicial;
  restantePresupuesto.innerText = presupuesto.montoRestante;
}

function cargarGasto(e){
  agregarGasto.disabled = true;
  e.preventDefault();

  let gasto = new Gasto(nombreGasto.value, montoGasto.value);
  let mensaje = 'Gasto agregado.'
  let agregado = new Interfaz(mensaje,3);

  agregarLocalStorage(gasto, 'gastos');
  agregado.agregrarInterfaz();
  modificarPresupuesto(gasto.monto);
  modificarAspectoGastoRestante();
  cargarGastoDOM(gasto);

  document.querySelector('form').reset();
  setTimeout( function(){
    eliminarAlertaDOM(mensaje);
  }, 3000);
}

//Agrega el gasto al DOM.
function cargarGastoDOM(gasto){
  let elemento = document.createElement('div');
  let informacion = `<span>${gasto.nombre}</span>
  <span>$${gasto.monto}</span>`

  elemento.classList.add('gasto');
  elemento.innerHTML = informacion;
  document.querySelector('.gastos').appendChild(elemento);
}

//Carga los gastos desde el local localStorage
function cargarGastosLocalStorage(){
  let gastos = obtenerLocalStorage('gastos');
  for(gasto of gastos){
    cargarGastoDOM(gasto);
  }
}

function modificarAspectoGastoRestante(){

  let presupuesto = obtenerLocalStorage('presupuesto');
  presupuesto[0] = new Presupuesto(presupuesto[0].montoInicial, parseFloat(presupuesto[0].montoRestante));

  if(presupuesto[0].montoRestante <= presupuesto[0].montoInicial / 4){
    restantePresupuesto.parentElement.classList.add('restante-bajo');
  } else if(presupuesto[0].montoRestante <= presupuesto[0].montoInicial / 2){
    restantePresupuesto.parentElement.classList.add('restante-medio');
  }
}

function modificarPresupuesto(gasto){
  let presupuesto = obtenerLocalStorage('presupuesto');
  presupuesto[0] = new Presupuesto(presupuesto[0].montoInicial, parseFloat(presupuesto[0].montoRestante));
  presupuesto[0].montoRestante -= gasto;

  localStorage.setItem('presupuesto', JSON.stringify(presupuesto));
  cargarPresupuesto();
}
//------------------------------------------------------------
