let navegacionPrincipal, botonAlternarMenu;

window.addEventListener('load', iniciarApp);

function iniciarApp(){
  navegacionPrincipal = document.getElementById('navbar');
  botonAlternarMenu = navegacionPrincipal.querySelector('span');
  navegacionPrincipal.addEventListener('click', alternarMenu);
  window.addEventListener('resize', alternarMenu);

  alternarMenu();
}

function alternarMenu(e){

  let enlaces = navegacionPrincipal.querySelectorAll('a');

  if(e && e.target.nodeName === 'A' && window.innerWidth > 500){
    return;
  }

  if(e && e.type == 'resize'){
    if(window.innerWidth > 500){
      enlaces.forEach( enlace => enlace.hidden = false);
    } else {
      enlaces.forEach( enlace => enlace.hidden = true);
      botonAlternarMenu.innerText = 'Mostrar' + ' menú';
    }
  }
  if(!e && window.innerWidth <= 500 || window.innerWidth <= 500 && e.type == 'click'){

    let accion;

    enlaces.forEach( enlace => enlace.hidden = !enlace.hidden);

    if(enlaces[0].hidden){
      accion = 'Mostrar';
    } else {
      accion = 'Ocultar';
    }

    botonAlternarMenu.innerText = accion + ' menú';
  }
}
