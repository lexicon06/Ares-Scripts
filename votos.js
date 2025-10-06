print("votos.js v2.0 - Script mejorado cargado"); // (ES5 compatible)

// ============================================================
//  Sistema de votaciones para salas (compatible con Ares Server)
//  Autor: [Pablo Santillan]
//  Descripción: Permite crear y gestionar votaciones tipo sí/no
//  o con múltiples opciones. Compatible con entornos ES5.
// ============================================================

// ---------------------
// Variables globales
// ---------------------
var voto = "";              // Pregunta o tema de la votación actual
var votacion = false;       // Estado de votación activa
var tiempo = 0;             // Timestamp de fin de votación
var vroom = 0;              // Sala donde se inició la votación

var si = 0;
var no = 0;
var opciones = [];
var votosOpciones = [];
var tipo = 0;               // 0 = binaria, 1 = múltiple
var admins_only = true;     // Solo admins pueden iniciar votaciones

// ---------------------
// Constantes del sistema
// ---------------------
var TIEMPO_VOTACION = 30000;            // 30 segundos por votación
var MAX_OPCIONES = 26;                  // Límite (a–z)
var LETRAS_VALIDAS = "abcdefghijklmnopqrstuvwxyz";

// ---------------------
// Inicialización
// ---------------------
function onLoad() {
    // Recuperar configuración persistente del registro
    if (Registry.exists("VoteAdmin")) {
        admins_only = Registry.getValue("VoteAdmin") == "on";
    } else {
        Registry.setValue("VoteAdmin", "on");
    }
}

// ---------------------
// Validación de permisos
// ---------------------
function puedeVotar(userobj) {
    return userobj.level > 0 || !admins_only;
}

// ---------------------
// Reset de estado interno
// ---------------------
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

// ---------------------
// Procesamiento de texto de votación
// ---------------------
function procesarOpcionesVoto(textoVoto) {
    var partes = textoVoto.split(",");
    voto = partes[0];

    if (partes.length > 1) {
        opciones = [];
        votosOpciones = [];

        // Limitar número de opciones permitidas
        var maxOpciones = Math.min(partes.length - 1, MAX_OPCIONES);

        for (var i = 1; i <= maxOpciones; i++) {
            var opcionLimpia = partes[i].replace(/^\s+|\s+$/g, '');
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

// ---------------------
// Presentación de la votación
// ---------------------
function mostrarOpcionesVotacion() {
    print(vroom, "");
    print(vroom, "\x06\x07" + voto);

    if (tipo == 1) {
        // Votación múltiple
        for (var i = 0; i < opciones.length; i++) {
            print(vroom, LETRAS_VALIDAS.charAt(i) + ") " + opciones[i]);
        }
        var letrasDisponibles = LETRAS_VALIDAS.slice(0, opciones.length);
        print(vroom, "\x09Vota con (" + letrasDisponibles + ")");
    } else {
        // Votación binaria
        print(vroom, "a) Si");
        print(vroom, "b) No");
        print(vroom, "\x09Vota con (a,b)");
    }

    print(vroom, "\x0314Tiempo limite: " + (TIEMPO_VOTACION / 1000) + " segundos");
}

// ---------------------
// Notificaciones internas
// ---------------------
function notificarAdmins(userobj) {
    var nombreLimpio = stripColors(userobj.name);
    printToAdmins("\x0314ADMINS: \x06" + nombreLimpio + "\x06 inició votación: \"" + voto + "\"");
}

// ---------------------
// Ciclo de vida de la votación
// ---------------------
function iniciarVotacion(userobj, textoVoto) {
    if (votacion) {
        print(vroom, "Ya hay una votación activa");
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

// ---------------------
// Procesamiento de votos
// ---------------------
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

    if (tipo == 0) return procesarVotoBinario(userobj, eleccionLimpia);
    return procesarVotoMultiple(userobj, eleccionLimpia);
}

// ---------------------
// Resultados y estadísticas
// ---------------------
function calcularEstadisticas() {
    var votantes = 0;
    var totalUsuarios = 0;

    Users.local(function(userobj) {
        if (userobj.voto) votantes++;
        totalUsuarios++;
    });

    var porcentajeParticipacion = totalUsuarios > 0
        ? Math.round((votantes / totalUsuarios) * 100)
        : 0;

    return {
        votantes: votantes,
        total: totalUsuarios,
        porcentaje: porcentajeParticipacion
    };
}

function mostrarResultadosBinarios() {
    var totalVotos = si + no;

    if (totalVotos == 0) {
        print(vroom, voto + ": Votación fallida — sin votos");
        return;
    }

    if (si > no) {
        print(vroom, voto + ": Aprobado — mayoría \x06Sí\x06 (" + si + " vs " + no + ")");
    } else if (no > si) {
        print(vroom, voto + ": Rechazado — mayoría \x06No\x06 (" + no + " vs " + si + ")");
    } else {
        print(vroom, voto + ": Empate (" + si + " - " + no + ")");
    }
}

function mostrarResultadosMultiples() {
    var maxVotos = -1, i;

    // Calcular opción ganadora
    for (i = 0; i < votosOpciones.length; i++) {
        if (votosOpciones[i] > maxVotos) maxVotos = votosOpciones[i];
    }

    if (maxVotos == 0) {
        print(vroom, voto + ": Votación fallida — sin votos");
        return;
    }

    // Mostrar desglose por opción
    for (i = 0; i < opciones.length; i++) {
        var esGanador = votosOpciones[i] == maxVotos ? "* " : "";
        print(vroom, esGanador + opciones[i] + ": " + votosOpciones[i] + " votos");
    }

    // Determinar ganadores
    var ganadores = [];
    for (i = 0; i < votosOpciones.length; i++) {
        if (votosOpciones[i] == maxVotos) ganadores.push(opciones[i]);
    }

    if (ganadores.length > 1) {
        print(vroom, voto + ": Empate entre " + ganadores.join(", ") + " (" + maxVotos + " votos c/u)");
    } else {
        print(vroom, voto + ": Gana \x06" + ganadores[0] + "\x06 con " + maxVotos + " votos");
    }
}

function finalizarVotacion() {
    if (!votacion) return;

    votacion = false;
    var stats = calcularEstadisticas();

    print(vroom, "");
    print(vroom, "Resultado: \"" + voto + "\"");
    print(vroom, "Participación: " + stats.porcentaje + "% (" + stats.votantes + "/" + stats.total + ")");

    if (tipo == 0) mostrarResultadosBinarios();
    else mostrarResultadosMultiples();

    limpiarDatosVotacion();
}

// ---------------------
// Eventos del servidor
// ---------------------
function onCommand(userobj, command, target, args) {
    // Comandos administrativos
    if (userobj.level > 0) {
        if (command == "voteall on") {
            Registry.setValue("VoteAdmin", "off");
            admins_only = false;
            print(userobj.name + " habilitó votaciones para todos");
            return;
        } else if (command == "voteall off") {
            Registry.setValue("VoteAdmin", "on");
            admins_only = true;
            print(userobj.name + " restringió votaciones solo a admins");
            return;
        } else if (command == "votestop" && votacion) {
            print(userobj.name + " detuvo la votación actual");
            finalizarVotacion();
            return;
        }
    }

    // Validar permisos
    if (!puedeVotar(userobj)) return;

    // Comando de creación de votación
    if (command.substr(0, 5) == "voto " || command.substr(0, 5) == "vote ") {
        var textoVoto = command.substr(5).replace(/^\s+|\s+$/g, '');

        if (!textoVoto) {
            print(userobj, "Uso: voto <pregunta> o voto <pregunta>,<opcion1>,<opcion2>...");
            return;
        }

        iniciarVotacion(userobj, textoVoto);
    }
}

function onTimer() {
    if (Date.now() >= tiempo && votacion) finalizarVotacion();
}

function onJoin(userobj) {
    userobj.voto = false;
}

function onTextBefore(userobj, text) {
    if (!votacion) return text;

    var textoLimpio = stripColors(text).replace(/^\s+|\s+$/g, '');

    if (procesarVoto(userobj, textoLimpio)) return "";
    return text;
}

// ---------------------
// Utilidades
// ---------------------
function printToAdmins(mensaje) {
    Users.local(function(userobj) {
        if (userobj.level > 0) print(userobj, mensaje);
    });
}
