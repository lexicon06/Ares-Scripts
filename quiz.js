print(0, "quiz.js has been loaded correctly");

// Configuración del juego
var QuizConfig = {
    QUIZ_FILE: "quiz.txt",
    TEMPLATE_FILE: "quiz_template.ini",
    QUESTION_TIMEOUT: 20,
    MAX_PLAYERS: 100,
    DEFAULT_POINTS: 3,
    POINTS_STRUCTURE: {
        FIRST: 3,
        SECOND: 2,
        OTHER: 1
    }
};

// Estado del juego
var QuizState = {
    questions: [],
    template: [],
    totalQuestions: 0,
    currentQuestion: 1,
    waitingForAnswer: true,
    currentPoints: QuizConfig.DEFAULT_POINTS,
    timer: 0,
    gameActive: false,
    currentQuestionIndex: 0,
    winnerName: "",
    drawNames: "",
    playersWithPoints: 0,
    playerPoints: [],
    correctAnswers: [],
    showPlayers: true
};

// Utilidades
var QuizUtils = {
    /**
     * Limpia texto removiendo colores y caracteres especiales
     * @param {string} text - Texto a limpiar
     * @return {string} Texto limpio
     */
    cleanText: function(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }
        
        text = text.toLowerCase();
        text = stripColors(text);
        
        // Mantener letras, números, espacios y caracteres acentuados
        return text.replace(/[^a-zA-ZáàéèíìóòúùáàÁÀñÑ0-9 ]+/g, '');
    },

    /**
     * Corrige formato de plantilla
     * @param {string} templateLine - Línea de plantilla
     * @return {string} Línea corregida
     */
    fixTemplate: function(templateLine) {
        if (!templateLine) return '';
        
        return templateLine
            .replace(/\xEF\xBB\xBF/gi, "")
            .replace(/\x02\x39/gi, "\x09")
            .replace(/\x02\x36/gi, "\x06")
            .replace(/\x02\x37/gi, "\x07")
            .replace(/\x02\x33/gi, "\x03")
            .replace(/\x02\x35/gi, "\x05");
    },

    /**
     * Encuentra el valor máximo en un array
     * @param {Array} arr - Array de números
     * @return {number} Valor máximo
     */
    findMaxValue: function(arr) {
        if (!arr || !Array.isArray(arr) || arr.length === 0) {
            return -1;
        }
        
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    },

    /**
     * Reemplaza placeholders en plantilla
     * @param {string} template - Plantilla con placeholders
     * @param {Object} replacements - Objeto con reemplazos
     * @return {string} Texto con reemplazos aplicados
     */
    replaceTemplateVars: function(template, replacements) {
        if (!template || !replacements) return template || '';
        
        var result = template;
        for (var key in replacements) {
            if (replacements.hasOwnProperty(key)) {
                var regex = new RegExp('\\x2B' + key, 'gi');
                result = result.replace(regex, replacements[key]);
            }
        }
        return result;
    }
};

// Manejo de archivos
var QuizFileManager = {
    /**
     * Carga preguntas desde archivo
     */
    loadQuestions: function() {
        try {
            QuizState.questions = File.load(QuizConfig.QUIZ_FILE).split("\n");
        } catch (e) {
            QuizState.questions = [];
            print(0, "Error loading quiz file: " + e.message);
        }

        if (QuizState.questions.length < 1) {
            this.createDefaultQuestions();
        }
    },

    /**
     * Crea preguntas por defecto
     */
    createDefaultQuestions: function() {
        QuizState.questions = [
            "Q:Example question",
            "A:Example answer[or]Answer Example"
        ];

        try {
            File.save(QuizConfig.QUIZ_FILE, QuizState.questions.join("\r\n"));
            print(0, "quiz.txt has been created at: \\Scripting\\" + scriptName() + "\\Data\\quiz.txt");
        } catch (e) {
            print(0, "Error creating quiz file: " + e.message);
        }
    },

    /**
     * Carga plantillas desde archivo
     */
    loadTemplate: function() {
        try {
            QuizState.template = File.load(QuizConfig.TEMPLATE_FILE).split("\n");
        } catch (e) {
            QuizState.template = [];
            print(0, "Error loading template file: " + e.message);
        }

        if (QuizState.template.length < 1) {
            this.createDefaultTemplate();
        }

        // Procesar plantillas
        for (var i = 0; i < QuizState.template.length; i++) {
            QuizState.template[i] = QuizUtils.fixTemplate(QuizState.template[i]);
        }
    },

    /**
     * Crea plantilla por defecto
     */
    createDefaultTemplate: function() {
        QuizState.template = [
            "███████",
            "[QUIZ]█",
            "███████",
            "string=\x0314Por favor primero cargue algunas preguntas",
            "string=\x0314Trivia ha sido iniciada por \x0310+n\x0314 - buena suerte!! :P",
            "string=\x0314Trivia detenida por \x0310+n",
            "string=\x0301Ó",
            "string=\x0314Pregunta \x0310+x \x0314de \x0310+y",
            "string=\x0301(I) +q",
            "string=\x0314Tiempo fuera!!",
            "string=\x0314La Respuesta era: \x0310+a",
            "string=\x0314Estas personas contestaron bien:",
            "string=\x0314(N) Nadie ha respondido correctamente (N)",
            "string=(H)\x0310 +n \x0315[\x0301+p \x0314points\x0315]",
            "string=\x0314Bien hecho \x0310+n\x0314, has contestado primero!! :)",
            "string=\x0314Bien hecho \x0310+n\x0314, has contestado segundo!! :)",
            "string=\x0314Bien hecho \x0310+n\x0314, has contestado correctamente!! :)",
            "string=\x0314La trivia ha finalizado - aquí están los resultados finales!!",
            "string=\x0314(N) Nadie ha contestado ninguna pregunta correctamente (N)",
            "string=\x0310+n \x0314recibió \x0301+p \x0314puntos",
            "string=(H) (H) (H) \x0310+n \x0314ha ganado el juego con \x0301+p \x0314puntos!! (H) (H) (H)"
        ];

        try {
            File.save(QuizConfig.TEMPLATE_FILE, QuizState.template.join("\r\n"));
            print(0, "quiz_template.ini template has been created successfully");
        } catch (e) {
            print(0, "Error creating template file: " + e.message);
        }
    }
};

// Manejo de jugadores
var QuizPlayerManager = {
    /**
     * Obtiene puntuaciones de jugadores
     */
    getScores: function() {
        QuizState.playersWithPoints = 0;
        QuizState.playerPoints = [];
        
        for (var i = 0; i < QuizConfig.MAX_PLAYERS; i++) {
            QuizState.playerPoints[i] = 0;
        }

        Users.local(function(player) {
            if (player.pts != null && player.pts > 0) {
                QuizState.playerPoints[QuizState.playersWithPoints] = player.pts;
                QuizState.playersWithPoints++;
            }
        });
    },

    /**
     * Reinicia puntuaciones
     */
    resetScores: function() {
        Users.local(function(player) {
            player.pts = 0;
            player.tstr = false;
        });
    },

    /**
     * Otorga puntos a un jugador
     * @param {Object} user - Usuario
     * @param {number} points - Puntos a otorgar
     */
    awardPoints: function(user, points) {
        if (!user.pts) {
            user.pts = 0;
        }
        user.pts += points;
        user.tstr = true;
        QuizState.correctAnswers.push(user.name);
    },

    /**
     * Verifica si la respuesta es correcta
     * @param {string} userAnswer - Respuesta del usuario
     * @param {Array} correctAnswers - Respuestas correctas
     * @return {boolean} Verdadero si es correcta
     */
    isAnswerCorrect: function(userAnswer, correctAnswers) {
        var cleanUserAnswer = QuizUtils.cleanText(userAnswer);
        
        for (var i = 0; i < correctAnswers.length; i++) {
            var cleanCorrectAnswer = QuizUtils.cleanText(correctAnswers[i]);
            if (cleanUserAnswer.indexOf(cleanCorrectAnswer) !== -1) {
                return true;
            }
        }
        return false;
    }
};

// Controlador principal del juego
var QuizGameController = {
    /**
     * Inicia el juego
     * @param {Object} user - Usuario que inicia el juego
     */
    startGame: function(user) {
        if (QuizState.gameActive) {
            print(0, "El juego ya está en progreso");
            return;
        }

        QuizFileManager.loadQuestions();
        
        if (!QuizState.questions[0]) {
            var message = QuizUtils.replaceTemplateVars(
                QuizState.template[3].substring(7), 
                {n: user.name}
            );
            print(0, message + " - \\Scripting\\" + scriptName() + "\\Data\\quiz.txt");
            return;
        }

        // Inicializar estado del juego
        this.initializeGameState();
        
        var startMessage = QuizUtils.replaceTemplateVars(
            QuizState.template[4].substring(7),
            {n: user.name}
        );
        print(0, startMessage);
        
        QuizPlayerManager.resetScores();
    },

    /**
     * Detiene el juego
     * @param {Object} user - Usuario que detiene el juego
     */
    stopGame: function(user) {
        if (!QuizState.gameActive) {
            print(0, "No hay juego en progreso");
            return;
        }

        var stopMessage = QuizUtils.replaceTemplateVars(
            QuizState.template[5].substring(7),
            {n: user.name}
        );
        print(0, stopMessage);
        
        QuizState.gameActive = false;
    },

    /**
     * Inicializa el estado del juego
     */
    initializeGameState: function() {
        QuizState.timer = 0;
        QuizState.currentQuestionIndex = 0;
        QuizState.totalQuestions = QuizState.questions.length;
        QuizState.currentQuestion = 1;
        QuizState.waitingForAnswer = true;
        QuizState.correctAnswers = [];
        QuizState.currentPoints = QuizConfig.DEFAULT_POINTS;
        QuizState.gameActive = true;
        QuizState.showPlayers = true;
        QuizState.winnerName = "";
        QuizState.drawNames = "";
        QuizState.playersWithPoints = 0;
        QuizState.playerPoints = [];
        
        for (var i = 0; i < QuizConfig.MAX_PLAYERS; i++) {
            QuizState.playerPoints[i] = 0;
        }
    },

    /**
     * Procesa el final del juego
     */
    processGameEnd: function() {
        print(0, "");
        print(0, QuizState.template[17].substring(7));
        print(0, "");
        
        this.resetGameState();
        QuizPlayerManager.getScores();
        
        var maxScore = QuizUtils.findMaxValue(QuizState.playerPoints);
        
        if (QuizState.playersWithPoints < 1) {
            print(0, "");
            print(0, QuizState.template[18].substring(7));
            print(0, "");
            QuizState.showPlayers = false;
        }

        if (QuizState.showPlayers) {
            this.displayFinalScores();
            this.displayWinners(maxScore);
        }
    },

    /**
     * Muestra puntuaciones finales
     */
    displayFinalScores: function() {
        print(0, "");
        
        Users.local(function(player) {
            if (player.pts > 0) {
                var scoreMessage = QuizUtils.replaceTemplateVars(
                    QuizState.template[19].substring(7),
                    {n: player.name, p: player.pts}
                );
                print(0, scoreMessage);
            }
        });
        
        print(0, "");
    },

    /**
     * Muestra ganadores
     * @param {number} maxScore - Puntuación máxima
     */
    displayWinners: function(maxScore) {
        var winners = [];
        
        Users.local(function(player) {
            if (player.pts === maxScore) {
                winners.push(player.name);
            }
        });

        if (winners.length > 0) {
            var winnerText = winners.join(" & ");
            var winMessage = QuizUtils.replaceTemplateVars(
                QuizState.template[20].substring(7),
                {n: winnerText, p: maxScore}
            );
            
            for (var i = 0; i < 5; i++) {
                print(0, winMessage);
            }
        }
    },

    /**
     * Reinicia estado del juego
     */
    resetGameState: function() {
        QuizState.timer = 0;
        QuizState.waitingForAnswer = true;
        QuizState.currentQuestionIndex = 0;
        QuizState.currentQuestion = 1;
        QuizState.gameActive = false;
    },

    /**
     * Procesa timeout de pregunta
     */
    processQuestionTimeout: function() {
        var currentAnswer = QuizState.questions[QuizState.currentQuestionIndex]
            .substr(2)
            .replace(/\[or\]/gi, " " + QuizState.template[6].substring(7) + " ");
        
        print(0, "");
        print(0, QuizState.template[9].substring(7)); // Tiempo fuera
        print(0, "");
        
        var answerMessage = QuizUtils.replaceTemplateVars(
            QuizState.template[10].substring(7),
            {a: currentAnswer}
        );
        print(0, answerMessage);

        this.displayCorrectAnswers();
        this.prepareNextQuestion();
    },

    /**
     * Muestra respuestas correctas
     */
    displayCorrectAnswers: function() {
        print(0, "");
        
        if (QuizState.correctAnswers.length > 0) {
            print(0, QuizState.template[11].substring(7));
            print(0, "");
            
            for (var i = 0; i < QuizState.correctAnswers.length; i++) {
                var points = i === 0 ? "3" : (i === 1 ? "2" : "1");
                var playerMessage = QuizUtils.replaceTemplateVars(
                    QuizState.template[13].substring(7),
                    {n: QuizState.correctAnswers[i], p: points}
                );
                print(0, playerMessage);
            }
        } else {
            print(0, QuizState.template[12].substring(7));
            print(0, "");
        }
    },

    /**
     * Prepara siguiente pregunta
     */
    prepareNextQuestion: function() {
        QuizState.timer = 0;
        QuizState.waitingForAnswer = true;
        QuizState.currentQuestionIndex++;
        QuizState.currentQuestion++;
        QuizState.currentPoints = QuizConfig.DEFAULT_POINTS;
    },

    /**
     * Muestra pregunta actual
     */
    displayCurrentQuestion: function() {
        if (QuizState.questions[QuizState.currentQuestionIndex] === "") {
            QuizState.timer = QuizConfig.QUESTION_TIMEOUT;
            QuizState.currentQuestionIndex = QuizState.totalQuestions + 1;
            return;
        }

        print(0, "");
        
        var questionHeader = QuizUtils.replaceTemplateVars(
            QuizState.template[7].substring(7),
            {x: QuizState.currentQuestion, y: Math.floor(QuizState.questions.length / 2)}
        );
        print(0, questionHeader);
        print(0, "");

        var questionParts = QuizState.questions[QuizState.currentQuestionIndex].substring(2).split("###");
        
        if (questionParts.length === 1) {
            var questionText = QuizUtils.replaceTemplateVars(
                QuizState.template[8].substr(7),
                {q: QuizState.questions[QuizState.currentQuestionIndex].substr(2)}
            );
            print(0, questionText);
            print(0, "");
        } else {
            this.handleImageQuestion(questionParts);
        }

        this.prepareForAnswers();
    },

    /**
     * Maneja preguntas con imágenes
     * @param {Array} questionParts - Partes de la pregunta
     */
    handleImageQuestion: function(questionParts) {
        var scribble = new Scribble();
        scribble.src = questionParts[1];
        scribble.oncomplete = scribbleReceived;
        
        var questionText = QuizUtils.replaceTemplateVars(
            QuizState.template[8].substr(7),
            {q: questionParts[0]}
        );
        scribble.download(questionText);
    },

    /**
     * Prepara para recibir respuestas
     */
    prepareForAnswers: function() {
        QuizState.timer = 0;
        QuizState.waitingForAnswer = false;
        QuizState.currentQuestionIndex++;
        QuizState.correctAnswers = [];

        Users.local(function(player) {
            player.tstr = false;
        });
    }
};

// Eventos del juego

/**
 * Procesa texto antes de mostrarlo (para respuestas)
 */
function onTextBefore(user, text) {
    if (QuizState.waitingForAnswer || !QuizState.gameActive) {
        return text;
    }

    var answers = QuizState.questions[QuizState.currentQuestionIndex - 1].substr(2).split("[or]");
    
    if (QuizPlayerManager.isAnswerCorrect(text, answers) && !user.tstr) {
        var messageIndex;
        
        if (QuizState.currentPoints === QuizConfig.POINTS_STRUCTURE.FIRST) {
            messageIndex = 14;
        } else if (QuizState.currentPoints === QuizConfig.POINTS_STRUCTURE.SECOND) {
            messageIndex = 15;
        } else {
            messageIndex = 16;
        }
        
        var congratsMessage = QuizUtils.replaceTemplateVars(
            QuizState.template[messageIndex].substring(7),
            {n: user.name}
        );
        print(user, congratsMessage);
        
        QuizPlayerManager.awardPoints(user, QuizState.currentPoints);
        
        if (QuizState.currentPoints > 1) {
            QuizState.currentPoints--;
        }
    }

    return text;
}

/**
 * Timer principal del juego
 */
function onTimer() {
    if (!QuizState.gameActive) {
        return;
    }

    // Fin del juego
    if (QuizState.timer >= QuizConfig.QUESTION_TIMEOUT && 
        QuizState.currentQuestionIndex >= QuizState.totalQuestions) {
        QuizGameController.processGameEnd();
        return;
    }

    // Timeout de pregunta
    if (QuizState.timer >= QuizConfig.QUESTION_TIMEOUT && !QuizState.waitingForAnswer) {
        QuizGameController.processQuestionTimeout();
        return;
    }

    // Mostrar nueva pregunta
    if (QuizState.timer >= QuizConfig.QUESTION_TIMEOUT && QuizState.waitingForAnswer) {
        QuizGameController.displayCurrentQuestion();
        return;
    }

    QuizState.timer++;
}

/**
 * Maneja imágenes recibidas
 */
function scribbleReceived(success) {
    if (success) {
        var scribble = this;
        var questionName = this.arg;

        Users.local(function(user) {
            user.scribble(scribble);
            print(user, questionName);
            print(user, "");
        });
    }
}

/**
 * Maneja comandos del juego
 */
function onCommand(user, command, targetUser, extra) {
    var cmd = command.toLowerCase();
    
    if (cmd.indexOf("game quiz") === 0 && user.level > 0) {
        var action = cmd.substring(10);
        
        if (action === "start") {
            QuizGameController.startGame(user);
        } else if (action === "stop") {
            QuizGameController.stopGame(user);
        }
    }
}

/**
 * Muestra ayuda del comando
 */
function onHelp(user) {
    if (user.level > 0) {
        print(user, "#game quiz <start | stop>");
    }
}

// Inicialización
QuizFileManager.loadQuestions();
QuizFileManager.loadTemplate();
