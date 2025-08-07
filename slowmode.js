print(0, "slowmode.js - Sistema de Slowmode Cargado con SQL Y lockdown");
lateLoad();

// ===== CONFIGURATION =====
var waitDelay = 10 * 1000; // 10 segundos de espera por defecto
var whiteList = []; // Lista blanca manual (por GUID)
var slowMode = false; // Interruptor global
var lockdownMode = false; // Modo lockdown (solo whitelist puede unirse)
var DEBUG = false;
var blockList = []; // Lista negra manual (por GUID)
var ipBlockList = {}; // Lista para bloquear IPs temporalmente
var dbName = "slowmode.db";
var REJOIN_COOLDOWN = 5 * 60 * 1000; // 5 minutos de cooldown para reconexión
var secondsPassed = 0;
var HELL = 666;

// ===== UTILITY FUNCTIONS =====

// Database connection wrapper to eliminate repetition
function withDatabase(callback) {
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        try {
            return callback(sql);
        } finally {
            sql.close();
        }
    }
    return false;
}

// User privilege checking functions
function isPrivilegedUser(userobj) {
    return whiteList.indexOf(userobj.guid) !== -1 || userobj.level > 0 || userobj.customName !== "";
}

function isRegularUser(userobj) {
    return userobj.level == 0 && userobj.customName === "";
}

function isAdmin(userobj) {
    return userobj.level > 0;
}

// Generic query execution
function executeQuery(queryString, params) {
    return withDatabase(function (sql) {
        var query = params && params.length > 0 ?
            new Query(queryString, params[0], params[1], params[2], params[3]) :
            new Query(queryString);
        return sql.query(query);
    });
}

// Settings management
function loadSetting(key, defaultValue, converter) {
    return withDatabase(function (sql) {
        var query = new Query("SELECT value FROM settings WHERE key = {0}", key);
        sql.query(query);
        if (sql.read) {
            var value = sql.value("value");
            return converter ? converter(value) : value;
        }
        return defaultValue;
    });
}

function saveSetting(key, value) {
    return executeQuery("INSERT OR REPLACE INTO settings (key, value) VALUES ({0}, {1})", [key, value.toString()]);
}

// Whitelist management
function addToWhitelist(guid) {
    if (whiteList.indexOf(guid) === -1) {
        whiteList.push(guid);
        executeQuery("INSERT OR IGNORE INTO whitelist (guid) VALUES ({0})", [guid]);
        return true;
    }
    return false;
}

function removeFromWhitelist(guid) {
    var index = whiteList.indexOf(guid);
    if (index !== -1) {
        whiteList.splice(index, 1);
        executeQuery("DELETE FROM whitelist WHERE guid = {0}", [guid]);
        return true;
    }
    return false;
}

// Blocklist management
function addToBlocklist(guid, timestamp) {
    var entry = guid + "###" + timestamp;
    if (blockList.indexOf(entry) === -1) {
        blockList.push(entry);
        executeQuery("INSERT OR REPLACE INTO blocklist (guid, timestamp) VALUES ({0}, {1})", [guid, timestamp]);
        return true;
    }
    return false;
}

function removeFromBlocklist(guid) {
    for (var i = 0; i < blockList.length; i++) {
        if (blockList[i].indexOf(guid + "###") === 0) {
            blockList.splice(i, 1);
            executeQuery("DELETE FROM blocklist WHERE guid = {0}", [guid]);
            return true;
        }
    }
    return false;
}

// IP blocking management
function addToIpBlocklist(ip, timestamp) {
    ipBlockList[ip] = timestamp;
    executeQuery("INSERT OR REPLACE INTO ipblocklist (ip, timestamp) VALUES ({0}, {1})", [ip, timestamp]);
}

function isIpBlocked(ip) {
    return ipBlockList[ip] && Date.now() - ipBlockList[ip] < REJOIN_COOLDOWN;
}

function getRemainingCooldown(ip) {
    if (!ipBlockList[ip]) return 0;
    return Math.ceil((REJOIN_COOLDOWN - (Date.now() - ipBlockList[ip])) / 1000 / 60);
}

// Admin messaging
function printAdmin(text) {
    Users.local(function (i) {
        if (i.level > 0) print(i, text);
    });
}

// Time formatting
function formatTime(seconds) {
    return seconds + " segundo" + (seconds === 1 ? "" : "s");
}

// ===== DATABASE INITIALIZATION =====

function initDatabase() {
    return withDatabase(function (sql) {
        var tables = [
            "CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT)",
            "CREATE TABLE IF NOT EXISTS whitelist (guid TEXT PRIMARY KEY NOT NULL)",
            "CREATE TABLE IF NOT EXISTS blocklist (guid TEXT PRIMARY KEY NOT NULL, timestamp INTEGER)",
            "CREATE TABLE IF NOT EXISTS ipblocklist (ip TEXT PRIMARY KEY NOT NULL, timestamp INTEGER)"
        ];

        for (var i = 0; i < tables.length; i++) {
            var query = new Query(tables[i]);
            sql.query(query);
        }
        return true;
    });
}

function loadSettings() {
    // Load simple settings
    waitDelay = loadSetting("waitDelay", waitDelay, function (v) { return parseInt(v) || waitDelay; });
    slowMode = loadSetting("slowMode", slowMode, function (v) { return v === "true"; });
    lockdownMode = loadSetting("lockdownMode", lockdownMode, function (v) { return v === "true"; });
    DEBUG = loadSetting("DEBUG", DEBUG, function (v) { return v === "true"; });

    // Load whitelist
    whiteList = [];
    withDatabase(function (sql) {
        var query = new Query("SELECT guid FROM whitelist");
        sql.query(query);
        while (sql.read) {
            whiteList.push(sql.value("guid"));
        }
    });

    // Load blocklist
    blockList = [];
    withDatabase(function (sql) {
        var query = new Query("SELECT guid, timestamp FROM blocklist");
        sql.query(query);
        while (sql.read) {
            blockList.push(sql.value("guid") + "###" + sql.value("timestamp"));
        }
    });

    // Load IP blocklist
    ipBlockList = {};
    withDatabase(function (sql) {
        var query = new Query("SELECT ip, timestamp FROM ipblocklist");
        sql.query(query);
        while (sql.read) {
            ipBlockList[sql.value("ip")] = parseInt(sql.value("timestamp"));
        }
    });
}

// ===== USER MANAGEMENT =====

function initializeUser(userobj) {
    userobj.upTime = Date.now();
    userobj.lstMsg = 0;
    userobj.lastMsg = "";
}

function cleanupBannedUsersFromWhitelist() {
    Users.banned(function (bannedUser) {
        if (removeFromWhitelist(bannedUser.guid) && DEBUG) {
            printAdmin("Removed banned user " + bannedUser.name + " from whitelist");
        }
    });
}

function handleIpCooldown(userobj) {
    if (isIpBlocked(userobj.externalIp)) {
        userobj.vroom = HELL;
        var timeLeft = getRemainingCooldown(userobj.externalIp);
        printAdmin("Usuario " + userobj.name + " (" + userobj.externalIp + ") intentó unirse pero está en cooldown (" + timeLeft.toFixed(1) + " minutos restantes)");
        return true;
    }
    return false;
}

function applySlowmodeToUser(userobj) {
    if (!isPrivilegedUser(userobj)) {
        var now = Date.now();
        userobj.lstMsg = now + waitDelay;
        userobj.lastMsg = "";
        print(userobj, "Slowmode Activado: Espera " + formatTime(waitDelay / 1000));

        var msg = lockdownMode ?
            "sm.js  " + userobj.name + " > " + userobj.vroom + "\x06 :#, id \x06" + userobj.id :
            "sm.js " + userobj.name + " :#, id \x06" + userobj.id;
        printAdmin("\x0315" + msg);
    }
}

// ===== EVENT HANDLERS =====

function onJoin(userobj) {
    cleanupBannedUsersFromWhitelist();
    initializeUser(userobj);
    if (handleIpCooldown(userobj)) return;
    applySlowmodeToUser(userobj);

}

function onPart(userobj) {
    if (!isPrivilegedUser(userobj) && (Date.now() - userobj.upTime) < 2000) {
        var timestamp = Date.now();

        // Add to blocklist if not already there
        var found = false;
        for (var i = 0; i < blockList.length; i++) {
            if (blockList[i].indexOf(userobj.guid + "###") === 0) {
                found = true;
                break;
            }
        }

        if (!found) {
            addToBlocklist(userobj.guid, timestamp);
            addToIpBlocklist(userobj.externalIp, timestamp);
            printAdmin("Usuario " + userobj.name + " añadido a la lista negra (IP: " + userobj.externalIp + " bloqueada por 5 minutos)");
        }
    }
}

function onJoinCheck(userobj) {
    // Check IP block first
    if (isIpBlocked(userobj.externalIp)) {
        userobj.vroom = HELL;
        var timeLeft = getRemainingCooldown(userobj.externalIp);
        printAdmin("Usuario " + userobj.name + " (" + userobj.externalIp + ") bloqueado por IP (" + timeLeft.toFixed(1) + " minutos restantes)");
        return false;
    }

    // Lockdown mode check
    if (lockdownMode && !isPrivilegedUser(userobj)) {
        userobj.vroom = HELL;
    }

    // Check blocklist for regular users
    if (isRegularUser(userobj)) {
        for (var i = 0; i < blockList.length; i++) {
            if (blockList[i].indexOf(userobj.guid + "###") === 0) {
                var time = parseInt(blockList[i].split("###")[1], 10);

                if (Date.now() - time < 2000) {
                    userobj.vroom = HELL;
                } else {
                    removeFromBlocklist(userobj.guid);
                    printAdmin("Usuario " + userobj.name + " eliminado de la lista negra");
                    userobj.vroom = 0;
                }
                break;
            }
        }
    }
    return true;
}

function lateLoad() {
    Users.local(function (i) {
        onJoin(i);
    });
}

// ===== COMMAND SYSTEM =====

function requireAdmin(userobj, callback) {
    if (isAdmin(userobj)) {
        return callback();
    }
    return false;
}

function handleSimpleCommands(userobj, command) {
    var commands = {
        "slow": function () {
            sendPM(userobj, Room.botName, "Información del Sistema Slowmode");
            sendPM(userobj, Room.botName, "Estado: " + (slowMode ? "ACTIVADO" : "DESACTIVADO"));
            sendPM(userobj, Room.botName, "Modo Lockdown: " + (lockdownMode ? "ACTIVADO" : "DESACTIVADO"));
            sendPM(userobj, Room.botName, "Retraso: " + (waitDelay / 1000) + " segundos");
            sendPM(userobj, Room.botName, "Usuarios en lista blanca: " + whiteList.length);
        },
        "debug": function () {
            DEBUG = !DEBUG;
            saveSetting("DEBUG", DEBUG);
            print(0, DEBUG ? "Modo depuración ACTIVADO" : "Modo depuración DESACTIVADO");
        },
        "slowmode": function () {
            slowMode = !slowMode;
            saveSetting("slowMode", slowMode);
            printAdmin("Slowmode " + (slowMode ? "ACTIVADO" : "DESACTIVADO"));
        },
        "lockdown": function () {
            lockdownMode = !lockdownMode;
            saveSetting("lockdownMode", lockdownMode);
            printAdmin("Modo Lockdown " + (lockdownMode ? "ACTIVADO - Solo usuarios en whitelist pueden unirse" : "DESACTIVADO"));
        },
        "clearwl": function () {
            whiteList = [];
            executeQuery("DELETE FROM whitelist");
            printAdmin("Lista blanca borrada");
        },
        "wlistall": function () {
            var count = 0;
            Users.local(function (i) {
                if (addToWhitelist(i.guid)) {
                    count++;
                }
            });
            printAdmin("Se han añadido " + count + " usuarios a la lista blanca");
        },
        "wlist": function () {
            if (whiteList.length === 0) {
                print(userobj, "La lista blanca está vacía");
                return;
            }

            Users.local(function (i) {
                if (whiteList.indexOf(i.guid) !== -1) {
                    print(userobj, i.name + " (" + i.id + ")");
                }
            });
        }
    };

    return commands[command];
}

function handleParameterCommands(userobj, command) {
    // Handle delay command
    if (command.substr(0, 6) === "delay ") {
        var time = parseInt(command.substr(6));
        if (!isNaN(time) && time > 0 && time <= 1200) {
            waitDelay = time * 1000;
            saveSetting("waitDelay", waitDelay);
            printAdmin("El retraso se ha establecido en " + time + " segundos");
        } else {
            printAdmin("El retraso debe estar entre 1-1200 segundos");
        }
        return true;
    }

    // Handle whitelist commands
    if (command.substr(0, 6) === "wlist ") {
        var name = command.substr(6).trim();
        var found = false;

        Users.local(function (i) {
            if (i.name.toLowerCase() === name.toLowerCase() || i.id == parseInt(name)) {
                found = true;
                if (addToWhitelist(i.guid)) {
                    if (i.vroom === HELL) {
                        i.vroom = 0;
                    }
                    print(userobj, i.name + " añadido a la lista blanca");
                } else {
                    print(userobj, i.name + " ya está en la lista blanca");
                }
            }
        });

        if (!found) print(userobj, "Usuario no encontrado");
        return true;
    }


    // Handle unwlist command  
    if (command.substr(0, 8) === "unwlist ") {
        var name = command.substr(8).trim();
        var found = false;
        var removed = false;

        Users.local(function (i) {
            if (i.name.toLowerCase() === name.toLowerCase() || i.id == parseInt(name)) {
                found = true;
                if (removeFromWhitelist(i.guid)) {
                    removed = true;
                    print(userobj, i.name + " eliminado de la lista blanca");
                }
            }
        });

        if (!found) {
            print(userobj, "Usuario no encontrado");
        } else if (!removed) {
            print(userobj, "El usuario no estaba en la lista blanca");
        }
        return true;
    }

    return false;
}

function onCommand(userobj, command, target, arguments) {
    // Handle simple commands first  
    var simpleCommand = handleSimpleCommands(userobj, command);
    if (simpleCommand) {
        return requireAdmin(userobj, simpleCommand);
    }

    // Handle parameter commands  
    if (isAdmin(userobj) && handleParameterCommands(userobj, command)) {
        return;
    }
}

// ===== MESSAGE PROCESSING =====  

function processSlowmodeMessage(userobj, text) {
    if (!slowMode || isPrivilegedUser(userobj)) {
        return text;
    }

    var now = Date.now();
    var timeLeft = Math.ceil((userobj.lstMsg - now) / 1000);

    // Check if still in cooldown  
    if (timeLeft > 0) {
        print(userobj, "Slowmode: Espera " + formatTime(timeLeft) + " más");
        return "";
    }

    // Check for message repetition  
    if (userobj.lastMsg &&
        text.toLowerCase().trim() === userobj.lastMsg.toLowerCase().trim()) {
        userobj.lstMsg = now + (waitDelay * 2); // Double penalty  
        print(userobj, "No repitas mensajes (penalización de " + formatTime(waitDelay * 2 / 1000) + ")");
        return "";
    }

    // Check for potential trolling (long messages)  
    if (text.length >= 60) {
        userobj.lstMsg = now + (waitDelay * 4); // Quadruple penalty  
        print(userobj, "Troll detectado (penalización de " + formatTime(waitDelay * 4 / 1000) + ")");
        return "";
    }

    // Update user state  
    userobj.lastMsg = text;
    userobj.lstMsg = now + waitDelay;

    return text;
}

function onPMBefore(userobj, target, pm) {
    if (isPrivilegedUser(userobj)) {
        return true;
    }

    if (slowMode) {
        sendPM(userobj, target.name, "slowmode.js: Solo los usuarios registrados pueden enviar privado");
        return false;
    }

    return true;
}

function onTextBefore(userobj, text) {
    return processSlowmodeMessage(userobj, text);
}

function onEmoteBefore(userobj, text) {
    return processSlowmodeMessage(userobj, text);
}

// ===== TIMER SYSTEM =====  

function onTimer() {
    secondsPassed++;

    if (secondsPassed >= 3) {
        checkVroomPresence();
        secondsPassed = 0;
    }
}

function checkVroomPresence() {
    Users.local(function (i) {
        if (i.vroom !== HELL) return;

        // Auto-whitelist admins and users with custom names  
        if (i.level > 0 || i.customName !== "") {
            if (addToWhitelist(i.guid)) {
                i.vroom = 0; // Move them out of room HELL  
                if (DEBUG) {
                    printAdmin("Auto-whitelisted " + i.name + " (admin/custom name)");
                }
            }
        }
    });
}

// ===== INITIALIZATION =====  

// Initialize database and load settings  
if (initDatabase()) {
    loadSettings();
    print(0, "Slowmode DB cargado correctamente");
} else {
    print(0, "Error al cargar Slowmode DB");
}
