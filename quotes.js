Array.prototype.includes = function (n) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == n) return true;
    }
    return false;
};

var dbName = "quotes.db";
var lastCommandTime = {}; // Independent timer per user

function onHelp(userobj) {
    print(userobj, "#helpquotes | Comandos Quotes Script");
    help(userobj);
}

function onLoad() {
    if (initDatabaseQuery())
        print("\x0302Quotes by nokia / Mayday(Tweaks) - \x06v1.2.5");
    else
        print("\x0304\x06Error al cargar script Quotes v1.2.5");
}

function onCommand(userobj, cmd, target, args) {
    var currentTime = Date.now();
    var command = cmd.split(" ")[0].toLowerCase();
    var commandArgs = cmd.substring(command.length).trim();

    // Handle quotes command with individual cooldown
    if (command === "quotes") {
        if (!lastCommandTime[userobj.name]) {
            lastCommandTime[userobj.name] = 0;
        }

        if (currentTime - lastCommandTime[userobj.name] < 10000) {
            var remainingTime = Math.ceil((10000 - (currentTime - lastCommandTime[userobj.name])) / 1000);
            print(userobj, `Espera ${remainingTime} segundos antes de usar el comando quotes, ${userobj.name}.`);
            return;
        }

        lastCommandTime[userobj.name] = currentTime;
        showQuote(userobj);
        return;
    }

    // Handle other commands
    switch (command) {
        case "addquote":
            if (userobj.level < 1) {
                log(userobj, "\x0304No tienes permisos para usar este comando");
                return;
            }
            addQuoteQuery(userobj, commandArgs);
            break;
            
        case "listquotes":
            showQuotes(userobj);
            break;
            
        case "delquote":
            if (userobj.level < 1) {
                log(userobj, "\x0304No tienes permisos para usar este comando");
                return;
            }
            deleteQuoteQuery(userobj, commandArgs);
            break;
            
        case "quote":
            if (userobj.level < 1) {
                log(userobj, "\x0304No tienes permisos para usar este comando");
                return;
            }
            getQuoteById(parseInt(commandArgs), userobj);
            break;
            
        case "remquotes":
            if (userobj.level < 1) {
                log(userobj, "\x0304No tienes permisos para usar este comando");
                return;
            }
            deleteQuotesQuery(userobj);
            break;
            
        case "helpquotes":
            onHelp(userobj);
            break;
    }
}

function showQuote(userobj) {
    var currentQuotes = getQuotesQuery();
    var quotesKeys = Object.keys(currentQuotes);
    var quotesLength = quotesKeys.length;
    if (quotesLength == 0) {
        log(userobj, "No hay frases guardadas");
        return;
    }

    var key = quotesKeys[Math.floor(Math.random() * quotesLength)];
    print(userobj.vroom, "\x0314[Quotes.js, Request by: " + userobj.name + "] " + currentQuotes[key].user + ": " + currentQuotes[key].quote);
}

function getQuotesQuery() {
    var quotes = new Object();
    var queryString = "SELECT * FROM quotes";
    var query = new Query(queryString);
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        while (sql.read) {
            var id = sql.value("id");
            var user = sql.value("user");
            var quote = sql.value("quote");
            quotes[id] = new Object();
            quotes[id].id = id;
            quotes[id].user = user;
            quotes[id].quote = quote;
        }
        sql.close();
    } else {
        log(null, "\x0304\x06Error al conectar con la base de datos:\x06" + sql.lastError);
    }
    return quotes;
}

function deleteQuotesQuery(userobj) {
    if (resetDatabase()) {
        log(userobj, "\x0303\x06Frases borradas correctamente");
    } else {
        log(userobj, "\x0304\x06Error al borrar las frases");
    }
}

function deleteQuoteQuery(userobj, id) {
    var currentQuotes = getQuotesQuery();
    var quotesLength = Object.keys(currentQuotes).length;
    if (quotesLength == 0) {
        log(userobj, "No hay frases guardadas");
        return;
    }
    if (!id || id === "") {
        log(userobj, "\x0304Debes escribir una id");
        return;
    }
    if (isNaN(id)) {
        log(userobj, "\x0304La id debe ser un número");
        return;
    }
    if (currentQuotes[id] == null) {
        log(userobj, "\x0304La id no existe");
        return;
    }
    id = parseInt(id);
    var queryString = "DELETE FROM quotes WHERE id = {0}";
    var query = new Query(queryString, id);
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        sql.close();
        log(userobj, "\x0303\x06Frase borrada correctamente");
    } else {
        log(userobj, "\x0304\x06Error al borrar la frase");
    }
}

function addQuoteQuery(userobj, quoteText) {
    if (!quoteText || quoteText.trim() === "") {
        log(userobj, "\x0304Debes escribir una frase");
        return;
    }
    var queryString = "INSERT INTO quotes (user, quote) VALUES ({0},{1})";
    var query = new Query(queryString, userobj.name, quoteText.trim());
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        sql.close();
        log(userobj, "\x0303\x06Frase añadida correctamente");
        log(null, userobj.name + " ha añadido una frase");
    } else {
        log(userobj, "\x0304\x06Error al añadir la frase");
    }
}

function showQuotes(userobj) {
    var currentQuotes = getQuotesQuery();
    var quotesKeys = Object.keys(currentQuotes);
    var quotesLength = quotesKeys.length;
    if (quotesLength == 0) {
        log(userobj, "No hay frases guardadas");
        return;
    }
    for (var i = 0; i < quotesLength; i++) {
        var key = quotesKeys[i];
        log(userobj, "\x0302\x06[" + currentQuotes[key].id + "]\x06 " + currentQuotes[key].user + " (P) > \x03: " + currentQuotes[key].quote);
    }
}

function getQuoteById(id, userobj) {
    var currentQuotes = getQuotesQuery();
    var quotesKeys = Object.keys(currentQuotes);
    var quotesLength = quotesKeys.length;
    var found = false;
    if (quotesLength == 0) {
        log(userobj, "No hay frases guardadas");
        return;
    }
    for (var i = 0; i < quotesLength; i++) {
        var key = quotesKeys[i];
        if (currentQuotes[key].id.toString() == id.toString()) {
            found = true;
            log(null, "\x0314[Quotes.js, Request by: " + userobj.name + "] " + currentQuotes[key].user + ": " + currentQuotes[key].quote);
        }
    }

    if (!found) print(userobj, "\x0314[Quotes.js] Frase no encontrada");
}

function help(userobj) {
    print(userobj, "#addquote frase | Para añadir una frase");
    print(userobj, "#quotes | Para ver las frases guardadas");
    print(userobj, "#quote id | Para ver una frase específica");
    print(userobj, "#helpquotes | Para ver los comandos disponibles");

    if (userobj.level >= 1) {
        print(userobj, "#delquote id | Para borrar una frase");
        print(userobj, "#remquotes | Para borrar todas las frases");
        print(userobj, "#listquotes | Para ver todas las frases");
    }
}

function log(userobj, text) {
    if (!userobj)
        print("\x0302\x06Quotes\x06 |\x0304 " + text);
    else
        print(userobj, "\x0302\x06Quotes\x06 |\x0304 " + text);
}

function dropDatabaseQuery() {
    var queryString = "DROP TABLE IF EXISTS quotes";
    var query = new Query(queryString);
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        sql.close();
        return true;
    }
    return false;
}

function initDatabaseQuery() {
    var queryString = "CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user TEXT NOT NULL, quote TEXT NOT NULL)";
    var query = new Query(queryString);
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        sql.close();
        return true;
    }
    return false;
}

function resetDatabase() {
    var dropQueryResult = dropDatabaseQuery();
    var initQueryResult = initDatabaseQuery();
    return dropQueryResult && initQueryResult;
}
