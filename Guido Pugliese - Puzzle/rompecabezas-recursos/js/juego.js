
var instrucciones = ["Usa las flechas para desplazar las piezas","Completa la imagen","Intenta realizarlo en la menor cantidad de movimientos"];

var movimientos = [];

var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var grillaGanadora = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];


var filaVacia = 2;
var columnaVacia = 2;


function mostrarInstrucciones(instrucciones) {
 for (var i = 0;i < instrucciones.length;i++){
   mostrarInstruccionEnLista(instrucciones[i],"lista-instrucciones")
 }
}

function KeyLog(key) {
  if (key === codigosDireccion.ABAJO) {
    movimientos.push(codigosDireccion.ABAJO);
    actualizarUltimoMovimiento(key)
  }
  else if (key === codigosDireccion.ARRIBA) {
    movimientos.push(codigosDireccion.ARRIBA)
    actualizarUltimoMovimiento(key)
  }
  else if (key === codigosDireccion.DERECHA){
    movimientos.push(codigosDireccion.DERECHA)
    actualizarUltimoMovimiento(key)
  }
  else if (key === codigosDireccion.IZQUIERDA) {
    movimientos.push(codigosDireccion.IZQUIERDA)
    actualizarUltimoMovimiento(key)
  }
}

function chequearSiGano(){
  var aciertos = 0;
  for (var i = 0;i < grilla.length;i++){
    for (var j = 0;j < grilla.length;j++){
      if (grilla[i][j] == grillaGanadora[i][j]){
        aciertos++
      }else{
        aciertos--
      }
    }
  }
  if (aciertos == 9){
    return true;
  }
}


function mostrarCartelGanador() {
  document.getElementById("victory").style.display = "block";
}

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
var Pieza1 = grilla[filaPos1][columnaPos1]
var Pieza2 = grilla[filaPos2][columnaPos2]
grilla[filaPos1][columnaPos1] = Pieza2;
grilla[filaPos2][columnaPos2] = Pieza1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila
    columnaVacia = nuevaColumna
}


function posicionValida(fila, columna) {
  if (fila < 3 && columna < 3 && fila >= 0 && columna >= 0){
    return true;
  }else{
    return false;
  }
}

function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;
  var Boton = direccion;

  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  else if (direccion === codigosDireccion.DERECHA){ 
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }
    
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        KeyLog(Boton);
    }
}

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}


function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
}

function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {
      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 500);
            }
            evento.preventDefault();
        }
    })
}

function iniciar() {
    document.getElementById("victory").style.display = "none";
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}
function Reiniciar() {
  document.getElementById("victory").style.display = "none";
  mezclarPiezas(30);
  capturarTeclas();
}

iniciar();