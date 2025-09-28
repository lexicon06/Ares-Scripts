print(0, "\x0315cambiar.js v2.0 (colores) - Script mejorado cargado\x09\x0309!!\x09.");

// Configuración
var bot = Room.botName;
var COLORES_EVITADOS = [8, 9, 11]; // Colores a evitar en aleatorio

// Mapeo de colores para mejor legibilidad
var COLORES = {
    "negro": "\x0301", "black": "\x0301",
    "marino": "\x0302", "navy": "\x0302",
    "verde": "\x0303", "green": "\x0303", 
    "rojo": "\x0304", "red": "\x0304",
    "marron": "\x0305", "brown": "\x0305",
    "morado": "\x0306", "violeta": "\x0306", "purple": "\x0306",
    "naranja": "\x0307", "orange": "\x0307",
    "turquesa": "\x0310", "turquoise": "\x0310",
    "azul": "\x0312", "blue": "\x0312",
    "rosa": "\x0313", "pink": "\x0313",
    "gris": "\x0314", "grey": "\x0314", "gray": "\x0314"
};

// Estilos de texto
var ESTILOS = {
    "1": "\x06",        // Negrita
    "2": "\x07",        // Subrayado
    "3": "\x06\x07"     // Negrita + Subrayado
};

// Inicialización de usuarios
Users.local(function(userobj) {
    userobj.paint = true;
    userobj.cletra = Registry.exists(userobj.guid + "2") ? 
        Registry.getValue(userobj.guid + "2") : 
        generarColorAleatorio();
});

function onCommand(userobj, command, target, args) {
    var cmd = command.toLowerCase();
    
    // Comando principal de cambio de colores
    if (cmd.substr(0, 7) === "cambiar" || cmd.substr(0, 7) === "colores") {
        cambiarColor(userobj, cmd.length > 7 ? command.substr(8) : "");
        return;
    }
    
    // Comando de caracteres especiales
    if (cmd === "caracteres") {
        mostrarCaracteres(userobj);
        return;
    }
    
    // Comando de letras estilizadas
    if (cmd.substr(0, 6) === "letras") {
        var texto = command.substr(7);
        if (texto) {
            mostrarLetrasEstilizadas(userobj, texto);
        } else {
            print(userobj, "Uso: letras <texto>");
        }
        return;
    }
    
    // Comandos de colores específicos
    if (COLORES[cmd]) {
        aplicarColor(userobj, COLORES[cmd]);
        return;
    }
    
    // Comandos de estilo
    if (cmd.substr(0, 6) === "estilo") {
        var estilo = command.substr(7);
        aplicarEstilo(userobj, estilo);
        return;
    }
    
    // Comando para resetear colores
    if (cmd === "resetcolor" || cmd === "sincolor") {
        resetearColor(userobj);
        return;
    }
    
    // Comando para mostrar colores disponibles
    if (cmd === "coloreshelp" || cmd === "ayudacolores") {
        mostrarAyudaColores(userobj);
        return;
    }
}

function cambiarColor(userobj, argumento) {
    userobj.paint = true;
    limpiarColores(userobj);
    
    if (argumento && COLORES[argumento.toLowerCase()]) {
        userobj.cletra = COLORES[argumento.toLowerCase()];
        print(userobj, "Color cambiado a: " + argumento);
    } else {
        userobj.cletra = generarColorAleatorio();
        print(userobj, "Color aleatorio aplicado");
    }
    
    Registry.setValue(userobj.guid + "2", userobj.cletra);
}

function aplicarColor(userobj, codigoColor) {
    limpiarColores(userobj);
    userobj.cletra += codigoColor;
    Registry.setValue(userobj.guid + "2", userobj.cletra);
    print(userobj, "Color aplicado correctamente");
}

function aplicarEstilo(userobj, numeroEstilo) {
    // Remover estilos anteriores
    userobj.cletra = userobj.cletra.replace(/\x06/gi, "").replace(/\x07/gi, "");
    
    if (ESTILOS[numeroEstilo]) {
        userobj.cletra += ESTILOS[numeroEstilo];
        Registry.setValue(userobj.guid + "2", userobj.cletra);
        print(userobj, "Estilo " + numeroEstilo + " aplicado");
    } else {
        print(userobj, "Estilos disponibles: 1 (negrita), 2 (subrayado), 3 (ambos)");
    }
}

function resetearColor(userobj) {
    userobj.cletra = "";
    userobj.paint = false;
    Registry.setValue(userobj.guid + "2", userobj.cletra);
    print(userobj, "Colores reseteados");
}

function mostrarAyudaColores(userobj) {
    print(userobj, "\x0314=== AYUDA DE COLORES ===");
    print(userobj, "Comandos principales:");
    print(userobj, "  #cambiar / #colores - Color aleatorio");
    print(userobj, "  #cambiar <color> - Color específico");
    print(userobj, "");
    print(userobj, "Colores disponibles:");
    var coloresDisponibles = [];
    for (var color in COLORES) {
        if (coloresDisponibles.indexOf(COLORES[color]) === -1) {
            coloresDisponibles.push(color);
        }
    }
    print(userobj, "  " + coloresDisponibles.join(", "));
    print(userobj, "");
    print(userobj, "Otros comandos:");
    print(userobj, "  #estilo <1-3> - Aplicar estilos");
    print(userobj, "  #letras <texto> - Texto estilizado");
    print(userobj, "  #caracteres - Ver símbolos especiales");
    print(userobj, "  #resetcolor - Quitar colores");
}

function mostrarCaracteres(userobj) {
    var simbolos = [
        "=== SIMBOLOS ESPECIALES ===",
        "",
        "Símbolos básicos:",
        "٭ ٪ ۝ ۞ ۩ ₪ ℅ Ω ← ↑ → ↓ ↔ ↕",
        "− ∕ ∞ ∙ ∟ ∩ ∫ ≈ ≠ ≡ ≤ ≥ ⌐ ¬",
        "",
        "Marcos y líneas:",
        "┌ ┐ └ ┘ ┬ ┴ ┼ ═ ║ ╔ ╗ ╚ ╝ ╠ ╣ ╦ ╩ ╬",
        "",
        "Bloques y formas:",
        "▀ ▄ █ ▌ ▐ ░ ▒ ▓ ■ □ ▪ ▫ ▲ ► ▼ ◄ ◊ ○ ●",
        "",
        "Emojis y símbolos:",
        "☺ ☻ ☼ ♀ ♂ ♠ ♣ ♥ ♦ ♪ ♫ ツ ❤ ❥",
        "☀ ☁ ☂ ☎ ☢ ☣ ☪ ☮ ☯ ★ ☆ ✓ ✔ ✕ ✖",
        ""
    ];
    
    for (var i = 0; i < simbolos.length; i++) {
        sendPM(userobj, bot, simbolos[i]);
    }
}

function mostrarLetrasEstilizadas(userobj, texto) {
    var estilos = [
        { nombre: "Leet", funcion: leet },
        { nombre: "Kode", funcion: kode },
        { nombre: "Bonita", funcion: bonita },
        { nombre: "Italic", funcion: talic },
        { nombre: "Yayas", funcion: yayas },
        { nombre: "Kuulx", funcion: kuulx },
        { nombre: "Rever", funcion: rever },
        { nombre: "AhLeet", funcion: ahleet },
        { nombre: "NewLet", funcion: newlet }
    ];
    
    if (userobj.canHTML && userobj.version.toLowerCase().indexOf("ares") > -1) {
        // Enviar por PM si es compatible
        for (var i = 0; i < estilos.length; i++) {
            var resultado = estilos[i].funcion(texto);
            sendPM(userobj, userobj.name, "\x0301" + estilos[i].nombre + ": " + resultado);
        }
    } else {
        // Mostrar en chat público
        print(userobj, "\x0314=== TEXTO ESTILIZADO ===");
        for (var i = 0; i < estilos.length; i++) {
            var resultado = estilos[i].funcion(texto);
            print(userobj, "\x03" + (i + 1) + estilos[i].nombre + ": " + resultado);
        }
    }
}

function onTextBefore(userobj, text) {
    if (userobj.paint && userobj.customName === "") {
        text = userobj.cletra + text;
    }
    return text;
}

function onPart(userobj) {
    if (userobj.paint) {
        userobj.paint = false;
    }
}

function onJoin(userobj) {
    userobj.paint = true;
    userobj.cletra = Registry.exists(userobj.guid + "2") ?
        Registry.getValue(userobj.guid + "2") :
        generarColorAleatorio();
}

function onHelp(userobj) {
    print(userobj, "\x0314Para cambiar tu color escribe: #cambiar o #colores");
    print(userobj, "\x0314Para ayuda detallada: #coloreshelp");
}

// Funciones auxiliares mejoradas
function generarColorAleatorio() {
    var color;
    do {
        color = Math.floor(Math.random() * 14 + 1);
    } while (COLORES_EVITADOS.indexOf(color) !== -1);
    
    return (color < 10 ? "\x030" : "\x03") + color;
}

function limpiarColores(userobj) {
    // Limpiar todos los códigos de color de una vez
    userobj.cletra = userobj.cletra.replace(/\x03\d{1,2}/gi, "");
}

// Funciones de transformación de texto (optimizadas)
function kode(texto) {
    var transformaciones = {
        'a': 'ä', 'b': 'Ь', 'c': 'ċ', 'd': 'đ', 'e': 'ë',
        'f': 'f', 'g': 'ģ', 'h': 'ђ', 'i': 'ı', 'j': 'ĵ',
        'k': 'κ', 'l': 'ﺎ', 'm': 'м', 'n': 'и', 'o': 'ö',
        'p': 'ק', 'q': "'ף", 'r': 'г', 's': 'ร', 't': 'ţ',
        'u': 'ụ', 'v': 'v', 'w': 'ẅ', 'x': 'ẋ', 'y': 'ץ', 'z': 'ż'
    };
    return transformarTexto(texto, transformaciones);
}

function leet(texto) {
    var transformaciones = {
        'a': 'ɒ', 'b': 'Ь', 'c': '¢', 'd': 'ძ', 'e': 'ẹ',
        'f': '╒', 'g': 'ġ', 'h': 'ħ', 'i': 'ì', 'j': 'j',
        'k': 'ĸ', 'l': 'ŀ', 'm': 'ʍ', 'n': 'ח', 'o': 'ợ',
        'p': 'ῥ', 'q': 'q', 'r': 'ŗ', 's': 'ຣ', 't': '†',
        'u': 'ụ', 'v': 'ﬠ', 'w': '௰', 'x': 'ჯ', 'y': 'ყ', 'z': 'ʐ'
    };
    return transformarTexto(texto, transformaciones);
}

function bonita(texto) {
    var transformaciones = {
        'a': 'ɑ', 'b': 'ɓ', 'c': 'ɔ', 'd': 'ɖ', 'e': 'ɘ',
        'f': 'ɟ', 'g': 'ɠ', 'h': 'ɧ', 'i': 'ו', 'j': 'ʝ',
        'k': 'ʞ', 'l': 'ʟ', 'm': 'ɱ', 'n': 'ɳ', 'o': 'ọ',
        'p': 'ƥ', 'q': 'ʠ', 'r': 'ɾ', 's': 'ʂ', 't': 'ʈ',
        'u': 'ʋ', 'v': 'ง', 'w': 'ɯ', 'x': 'ϰ', 'y': 'צ', 'z': 'ʑ'
    };
    return transformarTexto(texto, transformaciones);
}

function talic(texto) {
    var transformaciones = {
        'a': 'ą', 'b': 'ḃ', 'c': '⊂', 'd': 'ḑ', 'e': 'ę',
        'f': 'Բ', 'g': 'ğ', 'h': 'Һ', 'i': 'ו.', 'j': 'ਹ',
        'k': 'ƙ', 'l': 'ĺ', 'm': 'ṃ', 'n': '∩', 'o': 'ό',
        'p': 'ṗ', 'q': 'q', 'r': 'ṙ', 's': 'ƨ', 't': 'ṫ',
        'u': '⊍', 'v': 'ṿ', 'w': 'ẉ', 'x': 'ẍ', 'y': 'у', 'z': 'ż'
    };
    return transformarTexto(texto, transformaciones);
}

function yayas(texto) {
    var transformaciones = {
        'a': 'ﺔ', 'b': 'ظ', 'c': 'ﻏ', 'd': '∂', 'e': '٤',
        'f': 'f', 'g': 'و', 'h': 'अ', 'i': 'ﻨ', 'j': 'ﺬ',
        'k': 'ĸ', 'l': 'ℓ', 'm': 'ᆻ', 'n': 'ท', 'o': 'ﺓ',
        'p': 'ƿ', 'q': 'ף', 'r': 'ภ', 's': 'ﮐ', 't': "'ד.",
        'u': 'ﭖ', 'v': 'ง', 'w': 'ﺴ', 'x': 'א', 'y': 'ﻷ', 'z': 'ﺡ'
    };
    return transformarTexto(texto, transformaciones);
}

function kuulx(texto) {
    var transformaciones = {
        'a': 'ạ', 'b': 'ḃ', 'c': 'ɕ', 'd': 'ḋ', 'e': 'ɚ',
        'f': 'ך', 'g': 'ɢ', 'h': 'ɦ', 'i': 'ı', 'j': 'j',
        'k': 'ƙ', 'l': 'ا', 'm': 'ʍ', 'n': 'ṅ', 'o': 'ơ',
        'p': 'ṗ', 'q': 'q', 'r': 'ɾ', 's': 'ṩ', 't': 'ṫ',
        'u': '⋃', 'v': 'ṿ', 'w': 'ẉ', 'x': 'ẍ', 'y': 'ỵ', 'z': 'ƶ'
    };
    return transformarTexto(texto, transformaciones);
}

function rever(texto) {
    var transformaciones = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ',
        'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ɾ',
        'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o',
        'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
        'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z'
    };
    return transformarTexto(texto, transformaciones);
}

function ahleet(texto) {
    var transformaciones = {
        'a': 'Λ', 'b': 'ɮ', 'c': 'Ⴀ', 'd': 'Đ', 'e': 'Σ',
        'f': 'Ḟ', 'g': 'Ġ', 'h': 'Ή', 'i': 'ƪ', 'j': 'ป',
        'k': 'Ƙ', 'l': 'Ŀ', 'm': 'Ṃ', 'n': 'Ɲ', 'o': 'Ọ',
        'p': 'Ṗ', 'q': 'Q', 'r': 'Ʀ', 's': 'Ş', 't': 'Ʈ',
        'u': 'Ų', 'v': 'V', 'w': 'Щ', 'x': '乂', 'y': 'Ύ', 'z': 'Ƶ'
    };
    return transformarTexto(texto, transformaciones);
}

function newlet(texto) {
    var transformaciones = {
        'a': 'ৰ', 'b': '৮', 'c': 'ς', 'd': 'ḑ', 'e': 'ҿ',
        'f': 'ғ', 'g': 'ǥ', 'h': 'ￃ', 'i': 'ΐ', 'j': 'ਹ',
        'k': 'қ', 'l': 'ﺎ', 'm': '₥', 'n': '৸', 'o': 'ό',
        'p': 'ƿ', 'q': 'q', 'r': 'ṙ', 's': '§', 't': '৳',
        'u': 'ũ', 'v': '۷', 'w': 'ŵ', 'x': 'ẋ', 'y': 'ỵ', 'z': 'ż'
    };
    return transformarTexto(texto, transformaciones);
}

// Función auxiliar para transformar texto
function transformarTexto(texto, transformaciones) {
    var resultado = "";
    for (var i = 0; i < texto.length; i++) {
        var char = texto.charAt(i).toLowerCase();
        resultado += transformaciones[char] || texto.charAt(i);
    }
    return resultado;
}

// Made by lexicon06 for sb0t5 - Mejorado y optimizado
