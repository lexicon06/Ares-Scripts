print("votos.js ha sido cargado");

var voto = "";
var votacion = false;
var tiempo = 0;
var vroom = 0;

var si = 0;
var no = 0;

var opciones = [];
var votosOpciones = [];

var tipo = 0;

var admins_only = true;

function onLoad() {
  if (Registry.exists("VoteAdmin"))
    admins_only = Registry.getValue("VoteAdmin") == "on";
  else Registry.setValue("VoteAdmin", "on");
}

function onCommand(userobj, command, target, args) {
  if (userobj.level > 0) {
    if (command == "voteall on") {
      Registry.setValue("VoteAdmin", "off");
      admins_only = false;
      print(userobj.name + " sets vote command for all users");
    } else if (command == "voteall off") {
      Registry.setValue("VoteAdmin", "on");
      admins_only = true;
      print(userobj.name + " sets vote command for admins only");
    }
  }

  if (userobj.level > 0 || !admins_only) {
    if (command.substr(0, 5) == "voto " || command.substr(0, 5) == "vote ") {
      vroom = userobj.vroom;
      if (votacion) {
        print(vroom, "Ya hay una votación activa");
      } else {
        voto = command.substr(5);
        opciones = [];
        votosOpciones = [];
        var splitter = voto.split(",");
        if (splitter.length > 1) {
          voto = splitter[0];
          for (var i = 1; i < splitter.length; i++) {
            opciones.push(splitter[i]);
            votosOpciones.push(0);
          }
        }
        Users.local(function (i) {
          i.voto = false;
        });
		
        print(vroom, "");
        print(vroom, "\x06\x07" + voto);
        var abc = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
        if (opciones.length > 0) {
          for (var i = 1; i <= opciones.length; i++) {
            print(vroom, abc[i] + ") " + opciones[i - 1]);
          }
          print(vroom, "\x09Vota con (a,b,c etc)");
          tipo = 1;
        } else {
          print(vroom, "a) Sí");
          print(vroom, "b) No");
          print(vroom, "\x09Vota con (a,b)");
          tipo = 0;
        }
		
		var uName = stripColors(userobj.name);
		
		printToAdmins("\x0314ADMINS: \x06"+uName+"\x06 ha iniciado una votación");

        votacion = true;
        tiempo = Date.now() + 30000;
      }
    }
  }
}

function onTimer() {
  if (Date.now() >= tiempo && votacion) {
    votacion = false;
    var cantidad = 0;
    var total = 0;

    Users.local(function (i) {
      if (i.voto == true) {
        cantidad++;
      }
      total++;
    });

    var votos = (cantidad / total) * 100;

    print(
      vroom,
      "Votaron el " + Math.round(votos) + "% de " + total + " personas"
    );

    if (tipo == 0) {
      if (si > no) {
        print(vroom, voto + ": Votación Exitosa! La mayoría ha votado \x06Sí");
      } else if (no > si) {
        print(vroom, voto + ": Votación Exitosa! La mayoría ha votado \x06No");
      } else if (no == si && no != 0) {
        print(vroom, voto + ": Votación Ha sido un empate");
      } else if (no == 0 && si == 0) {
        print(vroom, voto + ": Votación Fallida! Nadie ha votado");
      }
    } else {
      var maxVotes = -1;
      for (var i = 0; i < votosOpciones.length; i++) {
        if (votosOpciones[i] > maxVotes) {
          maxVotes = votosOpciones[i];
        }
      }

      var winningOptions = [];
      for (var i = 0; i < votosOpciones.length; i++) {
        if (votosOpciones[i] === maxVotes) {
          winningOptions.push(opciones[i]);
        }
      }

      if (winningOptions.length > 1) {
        print(
          vroom,
          voto +
            ": Votación Ha sido un empate entre " +
            winningOptions.join(", ")
        );
      } else {
        print(
          vroom,
          voto +
            ": Votación Exitosa! La mayoría ha votado \x06" +
            winningOptions[0]
        );
      }
    }

    voto = "";
    si = 0;
    no = 0;
    opciones = [];
    votosOpciones = [];
  }
}

function onJoin(u) {
  u.voto = false;
}

function onTextBefore(u, tx) {
  var chk = stripColors(tx);
  chk = chk.toLowerCase();
  if (tipo == 0) {
    if (votacion && u.voto == false && (chk === "a" || chk === "b")) {
      u.voto = true;
      if (chk == "a") {
        si++;
        print(
          u,
          "Tu voto ha sido registrado correctamente " +
            u.name +
            "! has votado \x06Sí"
        );
      } else {
        no++;
        print(
          u,
          "Tu voto ha sido registrado correctamente " +
            u.name +
            "! has votado \x06No"
        );
      }
      return "";
    }
  } else if (tipo == 1) {
    var abc = ["a", "b", "c", "d", "e", "f", "g", "h"];
    if (votacion && u.voto == false && abc.indexOf(chk) > -1) {
      u.voto = true;
      var index = abc.indexOf(chk);
      votosOpciones[index]++;
      print(
        u,
        "Tu voto ha sido registrado correctamente " +
          u.name +
          "! has votado \x06" +
          opciones[index]
      );
      return "";
    }
  }
  return tx;
}


printToAdmins=function(a){Users.local(function(i){i.level>0&&print(i,a)})};
