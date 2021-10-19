const PROYECTOS_MOSTRAR = 3;
const EXTENSION_PORTADA = '.jpg';

let metadatosProyecto = [];
let url = [];
let portada = []

let galeria;
let proyectos = [];
let proyectosDOM = [PROYECTOS_MOSTRAR];
let botonAccion = [];

class Proyecto {
  constructor(nombre, repositorio, portada) {
    this.nombre = nombre;
    this.repositorio = url['codigo'] + repositorio;
    this.portada = portada;
    this.vivo = url['vivo'] + repositorio
  }
}

url['codigo'] = 'https://github.com/pradoh97/';
url['vivo'] = 'https://pradoh97.github.io/';
url['portada'] = 'img/';

metadatosProyecto['reproductor de musica'] = {
  'repositorio': 'reproductor-de-musica-web/',
  'portada': 'reproductor'
};
metadatosProyecto['taskly'] = {
  'repositorio': 'taskly/',
  'portada': 'taskly'
};
metadatosProyecto['galeria de fotos'] = {
  'repositorio': 'img-slider/',
  'portada': 'galería'
};
metadatosProyecto['tarjetas de productos'] = {
  'repositorio': 'A-bit-of-CSS-and-HTML/Sesion%202%20-%20tarjetas/Mercado%20Libre/',
  'portada': 'tarjetas'
};
metadatosProyecto['carrito de compras'] = {
  'repositorio': 'cursos-pagos/',
  'portada': 'carrito'
};
metadatosProyecto['opencourse'] = {
  'repositorio': 'opencourse/',
  'portada': 'opencourse'
};
metadatosProyecto['planes'] = {
  'repositorio': 'frontend-challenge-3/',
  'portada': 'planes'
};
metadatosProyecto['wrox'] = {
  'repositorio': 'wrox-remake/',
  'portada': 'wrox'
};

botonAccion['izquierda'] = document.querySelector('.controles button:first-child');
botonAccion['derecha'] = document.querySelector('.controles button:last-child');
botonAccion['izquierda'].addEventListener('click', () => actualizarGaleria(-1));
botonAccion['derecha'].addEventListener('click', () =>  actualizarGaleria(1));
document.addEventListener('keydown', moverConFlechas);

iniciarGaleria();

function cargarImagenes(url){
    return new Image().src = url;
}

//Carga los 3 primeros proyectos a la galería.
function iniciarGaleria() {
  galeria = document.querySelector('.galeria');

  for(proyecto in metadatosProyecto){
    let nombre = proyecto.replace(/^\w/, (c) => c.toUpperCase());
    let uriPortada = url['portada'] + metadatosProyecto[proyecto].portada + EXTENSION_PORTADA;

    let proyectoNuevo = new Proyecto(nombre, metadatosProyecto[proyecto].repositorio, uriPortada);

    portada[nombre] = cargarImagenes(uriPortada);

    proyectos.push(proyectoNuevo);
  }

  for(let i = 0; i < PROYECTOS_MOSTRAR; i++){
    proyectosDOM[i] = document.createElement('a');
    proyectosDOM[i].classList.add('galeria__proyecto');
    proyectosDOM[i].target = "_blank"

    let titulo = document.createElement('h2');
    let portada = document.createElement('img');

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
    let titulo = proyectosDOM[proyecto].querySelector('h2');

    if(proyecto == 1){
      let probarVivo = document.querySelector('.controles a');
      probarVivo.href = proyectos[proyecto].repositorio;
    }

    proyectosDOM[proyecto].href = proyectos[proyecto].vivo;
    proyectosDOM[proyecto].title = proyectos[proyecto].nombre;
    proyectosDOM[proyecto].firstChild.src = portada[proyectos[proyecto].nombre];
    titulo.innerText = proyectos[proyecto].nombre;

  }
}

function moverConFlechas(e){
  if(e.keyCode == '37') actualizarGaleria(-1);
  if(e.keyCode == '39') actualizarGaleria(1);
}
