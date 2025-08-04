print(0, "La botellita y el juego de cara o cruz han sido cargados correctamente.");

var participantes = [];
var botellaTime = 0;
var lastCommandTime = {}; // Temporizador independiente por usuario

function onCommand(userobj, command, target, arguments) {
    var currentTime = Date.now();

 

    if (command.startsWith("botellita")) {
		
		   // Manejo de temporizador individual para "botellita"
    if (!lastCommandTime[userobj.name]) {
        lastCommandTime[userobj.name] = 0; // Inicializa el temporizador del usuario si no existe
    }

    if (currentTime - lastCommandTime[userobj.name] < 10000) {
        var remainingTime = Math.ceil((10000 - (currentTime - lastCommandTime[userobj.name])) / 1000);
        print(userobj, `Espera ${remainingTime} segundos para volver a usar el comando, ${userobj.name}.`);
        return;
    }

    lastCommandTime[userobj.name] = currentTime; // Actualiza el tiempo solo para este usuario
		
        // Configuración inicial del juego de la botellita
        if (botellaTime == 0) {
            botellaTime = currentTime + 3600000; // 1 hora
            print(0, "El juego de la botellita ha comenzado. Se romperá cada hora.");
        }

        if (participantes.length == 0) {
            print(userobj, "Aún no hay participantes, te agregaremos.");
            if (participantes.indexOf(userobj.name) == -1) {
                participantes.push(userobj.name);
            }
        } else {
            var rnd = participantes[Math.floor(Math.random() * participantes.length)];
            var msg = `${userobj.name} giró la botella y le tocó a ${rnd}`;
            print(0, msg);
        }
    }
}

function onTextBefore(userobj, text) {
    var tempText = stripColors(text);
    tempText = tempText.toLowerCase(); // Convierte el texto a minúsculas

    var currentTime = Date.now();

    // Manejo de temporizador individual para el juego de cara o cruz
    if (!lastCommandTime[userobj.name]) {
        lastCommandTime[userobj.name] = 0; // Inicializa el tiempo del usuario si no existe
    }

    if (tempText === "cara" || tempText === "cruz") {
        if (currentTime - lastCommandTime[userobj.name] < 10000) {
            var remainingTime = Math.ceil((10000 - (currentTime - lastCommandTime[userobj.name])) / 1000);
            print(userobj, `Espera ${remainingTime} segundos para volver a intentarlo, ${userobj.name}.`);
            return text;
        }

        lastCommandTime[userobj.name] = currentTime; // Actualiza tiempo solo para este usuario

        var resultado = Math.random() < 0.5 ? "cara" : "cruz";
        var msg = `${userobj.name}, ${tempText === resultado ? "has ganado" : "has perdido"}! Salió ${resultado}.`;
        print(0, msg);
    }

    // Añade al usuario a participantes automáticamente si no está ya
    if (participantes.indexOf(userobj.name) == -1) {
        participantes.push(userobj.name);
    }

    return text;
}

function onPart(userobj) {
    if (participantes.indexOf(userobj.name) !== -1) {
        participantes.splice(participantes.indexOf(userobj.name), 1);
    }
}

function onTimer() {
    if (Date.now() >= botellaTime && participantes.length != 0 && botellaTime != 0) {
        participantes = [];
        print(0, "El juego de la botellita ha terminado. La botella se rompió, una nueva se creará.");
        botellaTime = Date.now() + 3600000;
    }
}
