print("tuti_fruti.js ha sido cargado.");

// Lista de categorías
var categorias = ["Nombre", "Animal", "Fruta", "País", "Objeto"];

// Función para obtener una letra aleatoria
function obtenerLetraAleatoria() {
    var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letras.charAt(Math.floor(Math.random() * letras.length));
}

function onLoad(){
    Users.local(function(i){
        if(i.jugando === undefined){
            i.jugando = false;
            i.letra = null;
            i.respuestas = {};
            i.puntos = 0;
        }
    });

    print("Late loading tuti_fruti.js...");
}

function onJoin(userobj){
    userobj.jugando = false;
    userobj.letra = null;
    userobj.respuestas = {};
    userobj.puntos = 0;
}

function onTextBefore(userobj, text){
    var textOnly = stripColors(text);
    
    if(textOnly === "tuti fruti" && userobj.jugando === false){
        userobj.jugando = true;
        userobj.letra = obtenerLetraAleatoria();
        userobj.respuestas = {};
        userobj.puntos = 0;

        print("(G) ¡Comienza el Tuti Fruti! La letra es: " + userobj.letra);
        print("(~) Categorías: " + categorias.join(", "));
        print("Escribe tus respuestas en el formato: `Palabra1, Palabra2, Palabra3, Palabra4, Palabra5`");
    } else if(userobj.jugando === true){
        var respuestas = textOnly.split(",");
        var puntosGanados = 0;

        // Aplicar trim() manualmente sin usar .map()
        for (var i = 0; i < respuestas.length; i++) {
            respuestas[i] = respuestas[i].trim();
        }

        if (respuestas.length !== categorias.length) {
            print("(I) Debes escribir " + categorias.length + " palabras separadas por comas.");
            return text;
        }

        for (var i = 0; i < categorias.length; i++) {
            var palabra = respuestas[i];

            if (palabra.charAt(0).toUpperCase() === userobj.letra) {
                userobj.respuestas[categorias[i]] = palabra;
                puntosGanados += 5;
            }
        }

        userobj.puntos += puntosGanados;

        print("(Y) Respuestas registradas. Puntos obtenidos: " + puntosGanados);
        print("(*) Puntos totales: " + userobj.puntos);
        print("Escribe más palabras o `terminar` para finalizar.");
    } else if(textOnly === "terminar"){
        print("(*) ¡Juego terminado! Puntos finales: " + userobj.puntos);
        userobj.jugando = false;
        userobj.letra = null;
        userobj.respuestas = {};
        userobj.puntos = 0;
    }

    return text;
}
