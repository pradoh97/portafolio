let navegacionPrincipal, botonAlternarMenu;

window.addEventListener('load', iniciarApp);

function iniciarApp(){
  navegacionPrincipal = document.querySelector('header > nav')
  botonAlternarMenu = navegacionPrincipal.querySelector('span');
  navegacionPrincipal.addEventListener('click', alternarMenu);

  eliminarTextNodesNav(navegacionPrincipal);
  alternarMenu();
}

function eliminarTextNodesNav(contenedor){
  contenedor.childNodes.forEach(elemento =>{
    if(elemento.nodeType === 3){
      elemento.remove();
    }
  });
}

function alternarMenu(e){

  if(e && e.target.nodeName === 'A' && window.innerWidth > 500){
    return;
  }
  let enlaces = navegacionPrincipal.querySelectorAll('a');
  let accion;

  enlaces.forEach( enlace => enlace.hidden = !enlace.hidden);

  if(enlaces[0].hidden){
    accion = 'Ver';
  } else {
    accion = 'Ocultar';
  }

  botonAlternarMenu.innerText = accion + ' proyectos';
}
