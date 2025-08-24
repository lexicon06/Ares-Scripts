// ========= TAROT ID COMPLETO PARA SB0T5 ========= //
// Comandos: !tarot [1/3] - !tarot amor - !tarot trabajo

print("tarot.js ha sido cargado correctamente");

var cartasTarot = [
    {
        nombre: "🃏 El Loco",
        significado: "Libertad, espontaneidad, nuevos comienzos",
        invertido: "Imprudencia, falta de dirección",
        amor: "❣️ Romance aventurero pero inestable. ¡Déjate llevar pero con cuidado!",
        trabajo: "💼 Oportunidad para empezar algo nuevo. Evalúa riesgos antes de actuar."
    },
    {
        nombre: "🎩 El Mago",
        significado: "Poder, manifestación, habilidad, recursos",
        invertido: "Manipulación, talento desperdiciado, egoísmo",
        amor: "✨ Atracción magnética. Usa tu carisma sabiamente.",
        trabajo: "🔮 Proyecto exitoso si aplicas tus habilidades."
    },
    {
        nombre: "🌙 La Sacerdotisa",
        significado: "Intuición, misterio, sabiduría interior",
        invertido: "Secretos ocultos, ignorancia voluntaria",
        amor: "🌹 Escucha tu intuición en el amor. Alguien guarda secretos.",
        trabajo: "📚 Momento para estudiar o desarrollar habilidades psíquicas."
    },
    {
        nombre: "👑 La Emperatriz",
        significado: "Abundancia, fertilidad, creatividad",
        invertido: "Dependencia emocional, creatividad bloqueada",
        amor: "💞 Relación fértil en todos los aspectos. Posible embarazo.",
        trabajo: "🎨 Éxito en proyectos creativos o maternales."
    },
    {
        nombre: "🏰 El Emperador",
        significado: "Autoridad, estructura, poder establecido",
        invertido: "Tiranía, rigidez, abuso de poder",
        amor: "💑 Relación estructurada pero puede faltar pasión.",
        trabajo: "👔 Liderazgo fuerte. Sigue las reglas para avanzar."
    },
    {
        nombre: "📿 El Hierofante",
        significado: "Tradición, espiritualidad, enseñanza",
        invertido: "Rebelión contra normas, falsos gurús",
        amor: "💒 Relación tradicional. Posible compromiso formal.",
        trabajo: "🧠 Aprendizaje importante. Sigue métodos probados."
    },
    {
        nombre: "💑 Los Enamorados",
        significado: "Amor, elección, armonía",
        invertido: "Desequilibrio, indecisión, conflicto",
        amor: "💘 Decisión importante en el amor. Elige con el corazón.",
        trabajo: "🤝 Colaboración exitosa. Elige socios sabiamente."
    },
    {
        nombre: "🏎️ El Carro",
        significado: "Victoria, determinación, progreso",
        invertido: "Falta de dirección, obstáculos",
        amor: "💨 Relación en movimiento. Viajes juntos.",
        trabajo: "⚡ Avance rápido. Controla tu ambición."
    },
    {
        nombre: "⚖️ La Justicia",
        significado: "Equilibrio, verdad, karma",
        invertido: "Injusticia, deshonestidad",
        amor: "💞 Relación equilibrada. Posible acuerdo legal.",
        trabajo: "📜 Situación se resolverá justamente. Contratos importantes."
    },
    {
        nombre: "🕯️ El Ermitaño",
        significado: "Reflexión, introspección, soledad",
        invertido: "Aislamiento no deseado",
        amor: "🚶‍♂️ Tiempo de soledad. El amor puede esperar.",
        trabajo: "🧘‍♂️ Pausa para reflexionar. No tomes decisiones apresuradas."
    },
    {
        nombre: "🎡 La Rueda de la Fortuna",
        significado: "Cambio, suerte, ciclos",
        invertido: "Mala suerte, resistencia al cambio",
        amor: "🔀 Cambio inesperado en relaciones. ¡Aprovéchalo!",
        trabajo: "🔄 Situación dará un giro. Prepárate."
    },
    {
        nombre: "🦁 La Fuerza",
        significado: "Coraje, paciencia, control emocional",
        invertido: "Debilidad, falta de voluntad",
        amor: "💪 Supera desafíos juntos. Pasión intensa.",
        trabajo: "🧗‍♂️ Proyecto difícil pero alcanzable con esfuerzo."
    },
    {
        nombre: "🙃 El Colgado",
        significado: "Sacrificio, nueva perspectiva",
        invertido: "Estancamiento, resistencia",
        amor: "💔 Sacrificio necesario. Mira la situación desde otro ángulo.",
        trabajo: "⏸️ Pausa obligada. Usa el tiempo sabiamente."
    },
    {
        nombre: "💀 La Muerte",
        significado: "Transformación, finales necesarios",
        invertido: "Miedo al cambio, estancamiento",
        amor: "🖤 Final doloroso pero necesario para renacer.",
        trabajo: "♻️ Cierre de ciclo. Prepárate para nuevos comienzos."
    },
    {
        nombre: "🥃 La Templanza",
        significado: "Balance, moderación, curación",
        invertido: "Desequilibrio, excesos",
        amor: "💞 Relación armoniosa. Cura heridas del pasado.",
        trabajo: "⚗️ Encuentra el punto medio. Equilibra vida laboral/personal."
    },
    {
        nombre: "👿 El Diablo",
        significado: "Tentación, adicción, ataduras",
        invertido: "Liberación de cadenas",
        amor: "🔥 Pasión tóxica. Cuidado con dependencias.",
        trabajo: "⛓️ Situación opresiva. Reconoce tus ataduras."
    },
    {
        nombre: "⚡ La Torre",
        significado: "Caos, revelación, cambio abrupto",
        invertido: "Evitar desastre temporalmente",
        amor: "💥 Crisis reveladora. Relación puede terminar bruscamente.",
        trabajo: "🏚️ Proyecto puede colapsar. Reconstruye desde cero."
    },
    {
        nombre: "🌟 La Estrella",
        significado: "Esperanza, inspiración, sanación",
        invertido: "Desesperanza, pesimismo",
        amor: "💫 Nueva esperanza en el amor. Tiempo de sanar.",
        trabajo: "🌠 Ideas brillantes. Sigue tu inspiración."
    },
    {
        nombre: "🌜 La Luna",
        significado: "Incertidumbre, ilusión, subconsciente",
        invertido: "Claridad, engaño revelado",
        amor: "🌙 Relación basada en fantasías. Verdad oculta.",
        trabajo: "🎭 Situación confusa. Confía en tu intuición."
    },
    {
        nombre: "☀️ El Sol",
        significado: "Alegría, éxito, vitalidad",
        invertido: "Éxito temporal, egoísmo",
        amor: "💛 Amor radiante. Felicidad y compromiso.",
        trabajo: "🏆 Gran éxito. Reconocimiento profesional."
    },
    {
        nombre: "🔄 El Juicio",
        significado: "Renacimiento, llamado interior",
        invertido: "Miedo al cambio, culpa",
        amor: "💞 Reencuentro o renovación de relación.",
        trabajo: "📣 Llamado a cambiar de rumbo. Sigue tu vocación."
    },
    {
        nombre: "🌍 El Mundo",
        significado: "Plenitud, logro, completitud",
        invertido: "Incompletitud, demoras",
        amor: "💑 Relación completa. Posible matrimonio.",
        trabajo: "🎉 Meta alcanzada. Ciclo que se cierra con éxito."
    }
];


function tirarCarta(tema) {
    tema = tema || "general";
    var carta = cartasTarot[Math.floor(Math.random() * cartasTarot.length)];
    var invertida = Math.random() < 0.3;
    var significado;
    
    if (tema === "amor") {
        significado = invertida ? "💔 " + carta.invertido : carta.amor;
    } else if (tema === "trabajo") {
        significado = invertida ? "⚠️ " + carta.invertido : carta.trabajo;
    } else {
        significado = invertida ? "↩️ " + carta.invertido : carta.significado;
    }
    
    return {
        nombre: carta.nombre,
        significado: significado,
        invertida: invertida,
        emoji: invertida ? "🔙" : "🔮"
    };
}

function onCommand(userobj, command, tUser) {
    var cmd = command.toLowerCase();
    
    if (cmd.indexOf("tarot") === 0) {
        var cantidad = cmd.indexOf("3") > -1 || cmd.indexOf("tres") > -1 ? 3 : 1;
        var tema = "general";
        
        if (cmd.indexOf("amor") > -1) {
            tema = "amor";
        } else if (cmd.indexOf("trabajo") > -1 || cmd.indexOf("laburo") > -1) {
            tema = "trabajo";
        }
        
        var respuesta = "";
        
        if (cantidad === 1) {
            var carta = tirarCarta(tema);
            respuesta = carta.emoji + " " + carta.nombre + (carta.invertida ? " (INVERTIDA)" : "") + 
                       "\n📖 " + carta.significado + 
                       "\n👤 " + userobj.name + ", esta carta habla de tu " + tema;
        } else {
            var temas = ["🕰️ Pasado", "💫 Presente", "🔮 Futuro"];
            respuesta = "✨ Tirada de Tarot para " + userobj.name + " (" + tema.toUpperCase() + ") ✨\n\n";
            
            for (var i = 0; i < 3; i++) {
                var carta = tirarCarta(tema);
                respuesta += temas[i] + ": " + carta.nombre + (carta.invertida ? " (INVERTIDA)" : "") + 
                            "\n" + carta.significado + "\n\n";
            }
            respuesta += "💫 El futuro depende de tus acciones presentes";
        }
        
        print(userobj.vroom, respuesta);
    }
}
