const PROYECTOS_MOSTRAR = 3;

let metadatosProyecto = [];
let url = [];

let galeria;
let proyectos = [];
let proyectosDOM = [PROYECTOS_MOSTRAR];
let botonAccion = [];

class Proyecto {
  constructor(nombre, repositorio, portada) {
    this.nombre = nombre.replace(/^\w/, (c) => c.toUpperCase());
    this.repositorio = url['codigo'] + repositorio;
    this.portada = url['portada'] + portada,
    this.vivo = url['vivo'] + repositorio
  }
}

url['codigo'] = 'https://github.com/pradoh97/';
url['vivo'] = 'https://pradoh97.github.io/';
url['portada'] = 'img/';

metadatosProyecto['reproductor de musica'] = {
  'repositorio': 'reproductor-de-musica-web/',
  'portada': 'reproductor.png'
};
metadatosProyecto['taskly'] = {
  'repositorio': 'taskly/',
  'portada': 'taskly.png'
};
metadatosProyecto['galeria de fotos'] = {
  'repositorio': 'img-slider/',
  'portada': 'galería.png'
};
metadatosProyecto['tarjetas de productos'] = {
  'repositorio': 'A-bit-of-CSS-and-HTML/Sesion%202%20-%20tarjetas/Mercado%20Libre/',
  'portada': 'tarjetas.png'
};
metadatosProyecto['carrito de compras'] = {
  'repositorio': 'cursos-pagos/',
  'portada': 'carrito.png'
};
metadatosProyecto['opencourse'] = {
  'repositorio': 'opencourse/',
  'portada': 'opencourse.png'
};
metadatosProyecto['planes'] = {
  'repositorio': 'frontend-challenge-3/',
  'portada': 'planes.png'
};
metadatosProyecto['wrox'] = {
  'repositorio': 'wrox-remake/',
  'portada': 'wrox.png'
};

botonAccion['izquierda'] = document.querySelector('.controles button:first-child');
botonAccion['derecha'] = document.querySelector('.controles button:last-child');
botonAccion['izquierda'].addEventListener('click', () => actualizarGaleria(-1));
botonAccion['derecha'].addEventListener('click', () =>  actualizarGaleria(1));
document.addEventListener('keydown', moverConFlechas);

iniciarGaleria();

//Carga los 3 primeros proyectos a la galería.
function iniciarGaleria() {
  galeria = document.querySelector('.galeria');

  for(proyecto in metadatosProyecto){
    let proyectoNuevo = new Proyecto(proyecto, metadatosProyecto[proyecto].repositorio, metadatosProyecto[proyecto].portada);
    proyectos.push(proyectoNuevo);
  }

  for(let i = 0; i < PROYECTOS_MOSTRAR; i++){
    proyectosDOM[i] = document.createElement('a');
    proyectosDOM[i].classList.add('galeria__proyecto');
    proyectosDOM[i].target = "_blank"

    let portada = document.createElement('img');
    let titulo = document.createElement('h2');

    if(i != 1) proyectosDOM[i].classList.add('small');

    proyectosDOM[i].appendChild(portada);
    proyectosDOM[i].appendChild(titulo);
    galeria.appendChild(proyectosDOM[i]);
  }

  actualizarGaleria();
}

function actualizarGaleria(direccion = 0){
  let tmp;

  if(direccion > 0){
    tmp = proyectos.shift();
    proyectos.push(tmp);
  } else if(direccion < 0){
    tmp = proyectos.pop();
    proyectos.unshift(tmp);
  }

  for(proyecto in proyectosDOM){
    let portada = proyectosDOM[proyecto].querySelector('img');
    let titulo = proyectosDOM[proyecto].querySelector('h2');

    if(proyecto == 1){
      let probarVivo = document.querySelector('.controles a');
      probarVivo.href = proyectos[proyecto].vivo;
    }

    proyectosDOM[proyecto].href = proyectos[proyecto].repositorio;
    proyectosDOM[proyecto].title = proyectos[proyecto].nombre;

    portada.src = proyectos[proyecto].portada;
    titulo.innerText = proyectos[proyecto].nombre;

  }
}

function moverConFlechas(e){
  if(e.keyCode == '37') actualizarGaleria(-1);
  if(e.keyCode == '39') actualizarGaleria(1);
}
