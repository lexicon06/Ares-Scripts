var bienvenida;

iniciarPrograma();

function iniciarPrograma() {
    presentacion();
    cargarMotd();

}


function cargarMotd() {
  var motd = new Scribble();
  bienvenida = motd.load("motd.jpg");
  print(0, "Motd cargado perfectamente");
}

function presentacion() {
  print(0, "Motd.js script cargado");
}

function onJoin(usuario) {
  usuario.scribble(bienvenida);
}

