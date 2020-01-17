let botonAlternarMenu = document.getElementById('alternar-menu');

iniciarApp();

function iniciarApp(){
  botonAlternarMenu.addEventListener('click', alternarMenu);
  alternarMenu();
}

function alternarMenu(){
  let enlacesNavPrincipal = document.querySelectorAll('header > nav > a');
  let textoBoton = ' menu';

  if(enlacesNavPrincipal[0].hidden){
    textoBoton = 'Hide' + textoBoton;
  } else {
    textoBoton = 'Show' + textoBoton;
  }
  botonAlternarMenu.innerText = textoBoton;

  enlacesNavPrincipal.forEach( enlace => enlace.hidden = !enlace.hidden);

}
