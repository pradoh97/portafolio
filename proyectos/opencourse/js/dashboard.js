let categorias, botonAlternarCategorias;

iniciarApp();

function iniciarApp(){
  categorias = document.querySelector('.categorias');
  botonAlternarCategorias = document.getElementById('alternar-categorias');
  alternarCategorias();
  agregarEventListeners();
}

function agregarEventListeners(){
  botonAlternarCategorias.addEventListener('click', alternarCategorias);
}

function alternarCategorias(){
  let accion, cat = ' categorias';
  if(categorias.classList.contains('oculto')){
    accion = 'Ocultar';
    categorias.classList.add('categorias');
    categorias.classList.remove('oculto');
  } else if(categorias.classList.contains('categorias')){
    accion = 'Mostrar';
    categorias.classList.remove('categorias');
    categorias.classList.add('oculto');
  }
  botonAlternarCategorias.innerText = accion + cat;
}
