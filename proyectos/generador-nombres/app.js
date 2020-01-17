var selectOrigen = document.getElementById('origen');
var selectGenero = document.getElementById('genero');
var inputCantidadNombres = document.getElementById('cantidad');
var botonGenerar = document.querySelector('button');
var form = document.querySelector('form');

iniciarApp();

function iniciarApp(){
  botonGenerar.disabled = true;
  form.reset();
  agregarEventos();
}

function agregarEventos(){
  selectOrigen.oninput = validarFormulario;
  selectGenero.oninput = validarFormulario;
  inputCantidadNombres.oninput = validarFormulario;
  form.onsubmit = enviarFormulario;
}

function validarFormulario(e){
  if (e.target.value == '') {
    botonGenerar.disabled = true;
  }
  if (e.target == inputCantidadNombres && !parseInt(inputCantidadNombres)) {
    botonGenerar.disabled = true;
  }

  if(selectOrigen.value != '' && selectGenero.value != '' && parseInt(inputCantidadNombres.value)){
    botonGenerar.disabled = false;
  }
}

function enviarFormulario(e){
  e.preventDefault();

  let request = crearRequest();
  let response;
  let listadoNombres = '<h3>Nombres generados</h3><div>';

  fetch(request)
    .then(res => res.json())
    .then(function(datos){
      if(datos.length){
        datos.forEach(dato => listadoNombres += `<p>${dato.name}</p>`);
      } else {
        listadoNombres += `<p>${datos.name}</p>`;
      }
      listadoNombres += `</div>`
      document.querySelector('.listado').innerHTML = listadoNombres;
    })
    .catch(error => console.log(error));

  botonGenerar.disabled = true;
  form.reset();
}

function crearRequest(){
  let request='https://uinames.com/api/?';

  request += 'region=' + selectOrigen.value;
  request += '&gender=' + selectGenero.value;
  request += '&amount=' + inputCantidadNombres.value;

  return request;
}
