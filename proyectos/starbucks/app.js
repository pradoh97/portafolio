iniciarApp();

function iniciarApp(){
  agregarListeners();
}

function agregarListeners(){
  document.getElementById('cookies-policies').addEventListener('click', cerrarCookies);
  document.querySelector('.nav-toggle').addEventListener('click', alternarMenu);
  window.addEventListener('resize', cambiarImagenes)
  window.addEventListener('resize', alternarMenu);
  window.addEventListener('load', alternarMenu);
}

function esMovil(){
  return window.innerWidth < 820 ? true : false;
}

function cerrarCookies(e){
  if(e.target.innerText === 'X'){
    e.target.parentElement.remove();
  }
}

function alternarMenu(e){
  let enlacesNavPrincipal = document.querySelectorAll('header > nav > a');
  if(esMovil()){
    if(e.type === 'load' || e.type === 'resize' && !enlacesNavPrincipal[0].hidden){
      enlacesNavPrincipal.forEach( enlace => enlace.hidden = true);
    } else if(e.type === 'click'){
      enlacesNavPrincipal.forEach( enlace => enlace.hidden = !enlace.hidden);
    }
  } else if(e.type === 'load' || e.type === 'resize'){
    enlacesNavPrincipal.forEach( enlace => enlace.hidden = false);
  }

}

function cambiarImagenes(e){

  let regExp = /mobile/g;
  let imagenes = document.querySelectorAll('main img');

  if(window.innerWidth < 1270){
    if(!regExp.test(imagenes[0].src)){
      for(let i = 0; i < imagenes.length; i++){
        imagenes[i].classList.remove('baner');
        imagenes[i].classList.add('baner-mobile');
        imagenes[i].src = "img/baner" + (i+1) + "-mobile.jpg";
      }
    }
  } else {
    if(regExp.test(imagenes[0].src)){
      for(let i = 0; i < imagenes.length; i++){
        imagenes[i].classList.remove('baner-mobile');
        imagenes[i].classList.add('baner');
        imagenes[i].src = "img/baner" + (i+1) + ".jpg";
      }
    }
  }
}
