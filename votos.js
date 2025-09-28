print("votos.js v2.0 - Script mejorado cargado"); //(ES5 compatible)

// Variables globales del sistema de votación
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

// Constantes
var TIEMPO_VOTACION = 30000;
var MAX_OPCIONES = 26;
var LETRAS_VALIDAS = "abcdefghijklmnopqrstuvwxyz";

function onLoad() {
    if (Registry.exists("VoteAdmin")) {
        admins_only = Registry.getValue("VoteAdmin") == "on";
    } else {
        Registry.setValue("VoteAdmin", "on");
    }
}

function puedeVotar(userobj) {
    return userobj.level > 0 || !admins_only;
}

function limpiarDatosVotacion() {
    voto = "";
    si = 0;
    no = 0;
    opciones = [];
    votosOpciones = [];
    votacion = false;
}

function resetearVotosUsuarios() {
    Users.local(function(userobj) {
        userobj.voto = false;
    });
}

function procesarOpcionesVoto(textoVoto) {
    var partes = textoVoto.split(",");
    voto = partes[0];
    
    if (partes.length > 1) {
        opciones = [];
        votosOpciones = [];
        
        // Limitar número de opciones
        var maxOpciones = Math.min(partes.length - 1, MAX_OPCIONES);
        
        for (var i = 1; i <= maxOpciones; i++) {
            var opcionLimpia = partes[i].replace(/^\s+|\s+$/g, ''); // trim manual
            if (opcionLimpia) {
                opciones.push(opcionLimpia);
                votosOpciones.push(0);
            }
        }
        tipo = 1;
    } else {
        tipo = 0;
    }
}

function mostrarOpcionesVotacion() {
    print(vroom, "");
    print(vroom, "\x06\x07" + voto);
    
    if (tipo == 1) {
        // Opciones múltiples
        for (var i = 0; i < opciones.length; i++) {
            print(vroom, LETRAS_VALIDAS.charAt(i) + ") " + opciones[i]);
        }
        var letrasDisponibles = LETRAS_VALIDAS.slice(0, opciones.length);
        print(vroom, "\x09Vota con (" + letrasDisponibles + ")");
    } else {
        // Votación sí/no
        print(vroom, "a) Si");
        print(vroom, "b) No");
        print(vroom, "\x09Vota con (a,b)");
    }
    
    print(vroom, "\x0314Tiempo limite: " + (TIEMPO_VOTACION / 1000) + " segundos");
}

function notificarAdmins(userobj) {
    var nombreLimpio = stripColors(userobj.name);
    printToAdmins("\x0314ADMINS: \x06" + nombreLimpio + "\x06 inicio votacion: \"" + voto + "\"");
}

function iniciarVotacion(userobj, textoVoto) {
    if (votacion) {
        print(vroom, "Ya hay una votacion activa");
        return false;
    }
    
    vroom = userobj.vroom;
    procesarOpcionesVoto(textoVoto);
    resetearVotosUsuarios();
    mostrarOpcionesVotacion();
    notificarAdmins(userobj);
    
    votacion = true;
    tiempo = Date.now() + TIEMPO_VOTACION;
    
    return true;
}

function procesarVotoBinario(userobj, eleccion) {
    if (eleccion == "a") {
        si++;
        userobj.voto = true;
        print(userobj, "Voto registrado " + userobj.name + "! Has votado \x06Si");
        return true;
    } else if (eleccion == "b") {
        no++;
        userobj.voto = true;
        print(userobj, "Voto registrado " + userobj.name + "! Has votado \x06No");
        return true;
    }
    return false;
}

function procesarVotoMultiple(userobj, eleccion) {
    var indice = LETRAS_VALIDAS.indexOf(eleccion);
    
    if (indice >= 0 && indice < opciones.length) {
        votosOpciones[indice]++;
        userobj.voto = true;
        print(userobj, "Voto registrado " + userobj.name + "! Has votado \x06" + opciones[indice]);
        return true;
    }
    return false;
}

function procesarVoto(userobj, eleccion) {
    if (!votacion || userobj.voto) {
        return false;
    }
    
    var eleccionLimpia = eleccion.toLowerCase();
    
    if (tipo == 0) {
        return procesarVotoBinario(userobj, eleccionLimpia);
    } else {
        return procesarVotoMultiple(userobj, eleccionLimpia);
    }
}

function calcularEstadisticas() {
    var votantes = 0;
    var totalUsuarios = 0;
    
    Users.local(function(userobj) {
        if (userobj.voto) votantes++;
        totalUsuarios++;
    });
    
    var porcentajeParticipacion = totalUsuarios > 0 ? Math.round((votantes / totalUsuarios) * 100) : 0;
    
    return {
        votantes: votantes,
        total: totalUsuarios,
        porcentaje: porcentajeParticipacion
    };
}

function mostrarResultadosBinarios() {
    var totalVotos = si + no;
    
    if (totalVotos == 0) {
        print(vroom, voto + ": Votacion Fallida! Nadie ha votado");
        return;
    }
    
    if (si > no) {
        print(vroom, voto + ": Votacion Exitosa! La mayoria voto \x06Si\x06 (" + si + " vs " + no + ")");
    } else if (no > si) {
        print(vroom, voto + ": Votacion Exitosa! La mayoria voto \x06No\x06 (" + no + " vs " + si + ")");
    } else {
        print(vroom, voto + ": Votacion termino en empate (" + si + " - " + no + ")");
    }
}

function mostrarResultadosMultiples() {
    var maxVotos = -1;
    var i;
    
    // Encontrar máximo de votos
    for (i = 0; i < votosOpciones.length; i++) {
        if (votosOpciones[i] > maxVotos) {
            maxVotos = votosOpciones[i];
        }
    }
    
    if (maxVotos == 0) {
        print(vroom, voto + ": Votacion Fallida! Nadie ha votado");
        return;
    }
    
    // Mostrar desglose
    for (i = 0; i < opciones.length; i++) {
        var esGanador = votosOpciones[i] == maxVotos ? "* " : "";
        print(vroom, esGanador + opciones[i] + ": " + votosOpciones[i] + " votos");
    }
    
    // Encontrar ganadores
    var ganadores = [];
    for (i = 0; i < votosOpciones.length; i++) {
        if (votosOpciones[i] == maxVotos) {
            ganadores.push(opciones[i]);
        }
    }
    
    if (ganadores.length > 1) {
        print(vroom, voto + ": Empate entre " + ganadores.join(", ") + " (" + maxVotos + " votos c/u)");
    } else {
        print(vroom, voto + ": Votacion Exitosa! Gano \x06" + ganadores[0] + "\x06 con " + maxVotos + " votos");
    }
}

function finalizarVotacion() {
    if (!votacion) return;
    
    votacion = false;
    var stats = calcularEstadisticas();
    
    print(vroom, "");
    print(vroom, "Resultado: \"" + voto + "\"");
    print(vroom, "Participacion: " + stats.porcentaje + "% (" + stats.votantes + "/" + stats.total + " personas)");
    
    if (tipo == 0) {
        mostrarResultadosBinarios();
    } else {
        mostrarResultadosMultiples();
    }
    
    limpiarDatosVotacion();
}

function onCommand(userobj, command, target, args) {
    // Comandos de administración
    if (userobj.level > 0) {
        if (command == "voteall on") {
            Registry.setValue("VoteAdmin", "off");
            admins_only = false;
            print(userobj.name + " habilito votaciones para todos");
            return;
        } else if (command == "voteall off") {
            Registry.setValue("VoteAdmin", "on");
            admins_only = true;
            print(userobj.name + " restringio votaciones solo a admins");
            return;
        } else if (command == "votestop" && votacion) {
            print(userobj.name + " detuvo la votacion actual");
            finalizarVotacion();
            return;
        }
    }
    
    // Verificar permisos para votar
    if (!puedeVotar(userobj)) {
        return;
    }
    
    // Comando de votación
    if (command.substr(0, 5) == "voto " || command.substr(0, 5) == "vote ") {
        var textoVoto = command.substr(5);
        
        // Trim manual para compatibilidad
        textoVoto = textoVoto.replace(/^\s+|\s+$/g, '');
        
        if (!textoVoto) {
            print(userobj, "Uso: voto <pregunta> o voto <pregunta>,<opcion1>,<opcion2>...");
            return;
        }
        
        iniciarVotacion(userobj, textoVoto);
    }
}

function onTimer() {
    if (Date.now() >= tiempo && votacion) {
        finalizarVotacion();
    }
}

function onJoin(u) {
    u.voto = false;
}

function onTextBefore(u, tx) {
    if (!votacion) {
        return tx;
    }
    
    var textoLimpio = stripColors(tx);
    // Trim manual
    textoLimpio = textoLimpio.replace(/^\s+|\s+$/g, '');
    
    if (procesarVoto(u, textoLimpio)) {
        return ""; // Suprimir mensaje de voto
    }
    
    return tx;
}

// Función auxiliar mejorada pero compatible
function printToAdmins(mensaje) {
    Users.local(function(userobj) {
        if (userobj.level > 0) {
            print(userobj, mensaje);
        }
    });
}
