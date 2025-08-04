print(0, "slowmode.js - Sistema de Slowmode Cargado con SQL Y lockdown");
lateLoad();

// Configuración
var waitDelay = 10 * 1000; // 10 segundos de espera por defecto
var whiteList = []; // Lista blanca manual (por GUID)
var slowMode = false; // Interruptor global
var lockdownMode = false; // Modo lockdown (solo whitelist puede unirse)
var DEBUG = false;
var blockList = []; // Lista negra manual (por GUID)
var ipBlockList = {}; // Lista para bloquear IPs temporalmente
var dbName = "slowmode.db";
var REJOIN_COOLDOWN = 5 * 60 * 1000; // 5 minutos de cooldown para reconexión

// Initialize database
function initDatabase() {
    var queryString = "CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT)";
    var query = new Query(queryString);
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        
        // Create whitelist table if it doesn't exist
        queryString = "CREATE TABLE IF NOT EXISTS whitelist (guid TEXT PRIMARY KEY NOT NULL)";
        query = new Query(queryString);
        sql.query(query);
        
        // Create blocklist table if it doesn't exist
        queryString = "CREATE TABLE IF NOT EXISTS blocklist (guid TEXT PRIMARY KEY NOT NULL, timestamp INTEGER)";
        query = new Query(queryString);
        sql.query(query);
        
        // Create ipblocklist table if it doesn't exist
        queryString = "CREATE TABLE IF NOT EXISTS ipblocklist (ip TEXT PRIMARY KEY NOT NULL, timestamp INTEGER)";
        query = new Query(queryString);
        sql.query(query);
        
        sql.close();
        return true;
    }
    return false;
}

// Load settings from database
function loadSettings() {
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        // Load waitDelay
        var query = new Query("SELECT value FROM settings WHERE key = 'waitDelay'");
        sql.query(query);
        if (sql.read) {
            waitDelay = parseInt(sql.value("value")) || waitDelay;
        }
        
        // Load slowMode
        query = new Query("SELECT value FROM settings WHERE key = 'slowMode'");
        sql.query(query);
        if (sql.read) {
            slowMode = sql.value("value") === "true";
        }
        
        // Load lockdownMode
        query = new Query("SELECT value FROM settings WHERE key = 'lockdownMode'");
        sql.query(query);
        if (sql.read) {
            lockdownMode = sql.value("value") === "true";
        }
        
        // Load DEBUG
        query = new Query("SELECT value FROM settings WHERE key = 'DEBUG'");
        sql.query(query);
        if (sql.read) {
            DEBUG = sql.value("value") === "true";
        }
        
        // Load whitelist
        query = new Query("SELECT guid FROM whitelist");
        sql.query(query);
        whiteList = [];
        while (sql.read) {
            whiteList.push(sql.value("guid"));
        }
        
        // Load blocklist
        query = new Query("SELECT guid, timestamp FROM blocklist");
        sql.query(query);
        blockList = [];
        while (sql.read) {
            blockList.push(sql.value("guid") + "###" + sql.value("timestamp"));
        }
        
        // Load ipblocklist
        query = new Query("SELECT ip, timestamp FROM ipblocklist");
        sql.query(query);
        ipBlockList = {};
        while (sql.read) {
            ipBlockList[sql.value("ip")] = parseInt(sql.value("timestamp"));
        }
        
        sql.close();
    }
}

// Save setting to database
function saveSetting(key, value) {
    var queryString = "INSERT OR REPLACE INTO settings (key, value) VALUES ({0}, {1})";
    var query = new Query(queryString, key, value.toString());
    var sql = new Sql();
    sql.open(dbName);
    if (sql.connected) {
        sql.query(query);
        sql.close();
        return true;
    }
    return false;
}

// Initialize database and load settings
if (initDatabase()) {
    loadSettings();
    print(0, "Slowmode DB cargado correctamente");
} else {
    print(0, "Error al cargar Slowmode DB");
}

// Inicializar seguimiento de usuarios
function onJoin(userobj) {
    userobj.upTime = Date.now(); // Tiempo de conexión
    userobj.lstMsg = 0; // Cuando pueden enviar el próximo mensaje
    userobj.lastMsg = ""; // Último mensaje enviado
    
    // Verificar si la IP está bloqueada temporalmente
    if (ipBlockList[userobj.externalIp] && Date.now() - ipBlockList[userobj.externalIp] < REJOIN_COOLDOWN) {
        userobj.vroom = 666;
        var timeLeft = Math.ceil((REJOIN_COOLDOWN - (Date.now() - ipBlockList[userobj.externalIp])) / 1000 / 60);
        printAdmin("Usuario " + userobj.name + " (" + userobj.externalIp + ") intentó unirse pero está en cooldown (" + timeLeft.toFixed(1) + " minutos restantes)");
        return;
    }
    
    if(whiteList.indexOf(userobj.guid) === -1 && userobj.level == 0 && userobj.customName=="") {
        var now = Date.now();
        userobj.lstMsg = now + waitDelay;
        userobj.lastMsg = "";
        print(userobj, "Slowmode Activado: Espera " + (waitDelay / 1000) + " segundo" + (waitDelay === 1 ? "" : "s"));
        var msg = lockdownMode ? "sm.js  "+userobj.name+" > "+userobj.vroom+"\x06 :#, id \x06"+userobj.id:"sm.js "+ userobj.name + " :#, id \x06"+userobj.id;
        printAdmin("\x0315"+msg);
    }
}

function onPart(userobj) {
    if(whiteList.indexOf(userobj.guid) === -1 && (Date.now() - userobj.upTime) < 2000 && userobj.level == 0 && userobj.customName=="") {
        // Si el usuario se desconecta rápidamente, lo añadimos a la lista negra
        if(blockList.indexOf(userobj.guid) === -1) {
            blockList.push(userobj.guid+"###"+Date.now());
            
            // También bloqueamos la IP por 5 minutos
            ipBlockList[userobj.externalIp] = Date.now();
            
            // Save to database
            var sql = new Sql();
            sql.open(dbName);
            if (sql.connected) {
                // Save GUID block
                var queryString = "INSERT OR REPLACE INTO blocklist (guid, timestamp) VALUES ({0}, {1})";
                var query = new Query(queryString, userobj.guid, Date.now());
                sql.query(query);
                
                // Save IP block
                queryString = "INSERT OR REPLACE INTO ipblocklist (ip, timestamp) VALUES ({0}, {1})";
                query = new Query(queryString, userobj.externalIp, Date.now());
                sql.query(query);
                
                sql.close();
            }
            
            printAdmin("Usuario " + userobj.name + " añadido a la lista negra (IP: " + userobj.externalIp + " bloqueada por 5 minutos)");
        }
    }
}

function onJoinCheck(userobj) {
    // Verificar bloqueo por IP primero
    if (ipBlockList[userobj.externalIp] && Date.now() - ipBlockList[userobj.externalIp] < REJOIN_COOLDOWN) {
        userobj.vroom = 666;
        var timeLeft = Math.ceil((REJOIN_COOLDOWN - (Date.now() - ipBlockList[userobj.externalIp])) / 1000 / 60);
        printAdmin("Usuario " + userobj.name + " (" + userobj.externalIp + ") bloqueado por IP (" + timeLeft.toFixed(1) + " minutos restantes)");
        return false;
    }

    // Si el modo lockdown está activado, solo permitir usuarios en whitelist o con nivel > 0
    if (lockdownMode && whiteList.indexOf(userobj.guid) === -1 && userobj.level == 0 && userobj.customName === "") {
        userobj.vroom = 666;
        //printAdmin("slowmode.js lockdown - El usuario ha sido enviado a la vroom "+userobj.vroom);
    }

    if (userobj.level == 0 && userobj.customName === "") {
        var foundIndex = -1;
        
        // Loop through blockList manually
        for (var i = 0; i < blockList.length; i++) {
            if (blockList[i].indexOf(userobj.guid + "###") === 0) { // Check if entry starts with GUID
                foundIndex = i;
                break;
            }
        }

        if (foundIndex > -1) {
            var block = blockList[foundIndex];
            if (block) {
                var time = parseInt(block.split("###")[1], 10); // Ensure base 10 for parseInt

                if (Date.now() - time < 2000) {
                    userobj.vroom = 666;
                } else {
                    blockList.splice(foundIndex, 1);
                    
                    // Remove from database
                    var queryString = "DELETE FROM blocklist WHERE guid = {0}";
                    var query = new Query(queryString, userobj.guid);
                    var sql = new Sql();
                    sql.open(dbName);
                    if (sql.connected) {
                        sql.query(query);
                        sql.close();
                    }
                    
                    printAdmin("Usuario " + userobj.name + " eliminado de la lista negra");
                    userobj.vroom = 0;
                }
            }
        }
    }
    return true;
}

// Inicializar usuarios existentes
function lateLoad() {
    Users.local(function(i) {
        onJoin(i);
    });
}

// Manejador de comandos
function onCommand(userobj, command, target, arguments) {
    if(command == "slow" && userobj.level > 0) {
        sendPM(userobj, Room.botName, "Información del Sistema Slowmode");
        sendPM(userobj, Room.botName, "Estado: " + (slowMode ? "ACTIVADO" : "DESACTIVADO"));
        sendPM(userobj, Room.botName, "Modo Lockdown: " + (lockdownMode ? "ACTIVADO" : "DESACTIVADO"));
        sendPM(userobj, Room.botName, "Retraso: " + (waitDelay / 1000) + " segundos");
        sendPM(userobj, Room.botName, "Usuarios en lista blanca: " + whiteList.length);
        return;
    }

    if(command == "debug" && userobj.level > 0) {
        DEBUG = !DEBUG;
        saveSetting("DEBUG", DEBUG);
        print(0, DEBUG ? "Modo depuración ACTIVADO" : "Modo depuración DESACTIVADO");
        return;
    }

    if(command.substr(0, 6) == "delay " && userobj.level > 0) {
        var time = parseInt(command.substr(6));
        if(!isNaN(time) && time > 0 && time <= 1200) {
            waitDelay = time * 1000;
            saveSetting("waitDelay", waitDelay);
            printAdmin("El retraso se ha establecido en " + time + " segundos");
        } else {
            printAdmin("El retraso debe estar entre 1-1200 segundos");
        }
        return;
    }

    if(command == "slowmode" && userobj.level > 0) {
        slowMode = !slowMode;
        saveSetting("slowMode", slowMode);
        printAdmin("Slowmode " + (slowMode ? "ACTIVADO" : "DESACTIVADO"));
        return;
    }

    if(command == "lockdown" && userobj.level > 0) {
        lockdownMode = !lockdownMode;
        saveSetting("lockdownMode", lockdownMode);
        printAdmin("Modo Lockdown " + (lockdownMode ? "ACTIVADO - Solo usuarios en whitelist pueden unirse" : "DESACTIVADO"));
        return;
    }

    if(command == "clearwl" && userobj.level > 0) {
        whiteList = [];
        var queryString = "DELETE FROM whitelist";
        var query = new Query(queryString);
        var sql = new Sql();
        sql.open(dbName);
        if (sql.connected) {
            sql.query(query);
            sql.close();
        }
        printAdmin("Lista blanca borrada");
        return;
    }

    if(command == "wlistall" && userobj.level > 0) {
        var count = 0;
        Users.local(function(i) {
            if(whiteList.indexOf(i.guid) === -1) {
                whiteList.push(i.guid);
                count++;
                
                // Add to database
                var queryString = "INSERT OR IGNORE INTO whitelist (guid) VALUES ({0})";
                var query = new Query(queryString, i.guid);
                var sql = new Sql();
                sql.open(dbName);
                if (sql.connected) {
                    sql.query(query);
                    sql.close();
                }
            }
        });
        printAdmin("Se han añadido " + count + " usuarios a la lista blanca");
        return;
    }

    if(command.substr(0, 8) == "unwlist " && userobj.level > 0) {
        var name = command.substr(8).trim();
        var found = false;
        var removed = false;
        
        Users.local(function(i) {
            if(i.name.toLowerCase() == name.toLowerCase() || i.id == parseInt(name)) {
                found = true;
                var index = whiteList.indexOf(i.guid);
                if(index !== -1) {
                    whiteList.splice(index, 1);
                    removed = true;
                    
                    // Remove from database
                    var queryString = "DELETE FROM whitelist WHERE guid = {0}";
                    var query = new Query(queryString, i.guid);
                    var sql = new Sql();
                    sql.open(dbName);
                    if (sql.connected) {
                        sql.query(query);
                        sql.close();
                    }
                    
                    print(userobj, i.name + " eliminado de la lista blanca");
                }
            }
        });

        if(!found) {
            print(userobj, "Usuario no encontrado");
        } else if(!removed) {
            print(userobj, "El usuario no estaba en la lista blanca");
        }
        return;
    }

    if(command.substr(0, 6) == "wlist " && userobj.level > 0) {
        var name = command.substr(6).trim();
        var found = false;
        
        Users.local(function(i) {
            if(i.name.toLowerCase() == name.toLowerCase() || i.id == parseInt(name)) {
                found = true;
                if(whiteList.indexOf(i.guid) === -1) {
                    whiteList.push(i.guid);
                    
                    // Add to database
                    var queryString = "INSERT OR IGNORE INTO whitelist (guid) VALUES ({0})";
                    var query = new Query(queryString, i.guid);
                    var sql = new Sql();
                    sql.open(dbName);
                    if (sql.connected) {
                        sql.query(query);
                        sql.close();
                    }
                    
                    if(i.vroom==666){
                        i.vroom = 0;
                    }
                    
                    print(userobj, i.name + " añadido a la lista blanca");
                } else {
                    print(userobj, i.name + " ya está en la lista blanca");
                }
            }
        });

        if(!found) print(userobj, "Usuario no encontrado");
        return;
    }

    if(command == "wlist" && userobj.level > 0) {
        if(whiteList.length === 0) {
            print(userobj, "La lista blanca está vacía");
            return;
        }
        
        Users.local(function(i) {
            if(whiteList.indexOf(i.guid) !== -1) {
                print(userobj, i.name + " (" + i.id + ")");
            }
        });
    }
}

function onPMBefore(userobj, target, pm) { 
    if(whiteList.indexOf(userobj.guid) !== -1 || userobj.level > 0 || userobj.customName!="") {
        return true;
    }

    // Solo aplicar slowmode cuando está activado
    if(slowMode) {
        sendPM(userobj, target.name, "slowmode.js: Solo los usuarios registrados pueden enviar privado");
        return true;
    }

    return true;
}

// Manejador de mensajes
function onMethodBefore(userobj, text) {
    // Usuarios en lista blanca y admins no tienen restricciones
    if(whiteList.indexOf(userobj.guid) !== -1 || userobj.level > 0 || userobj.customName!="") {
        return text;
    }

    // Solo aplicar slowmode cuando está activado
    if(slowMode) {
        var now = Date.now();
        var timeLeft = Math.ceil((userobj.lstMsg - now) / 1000);
        
        // Si el período de espera no ha expirado
        if(timeLeft > 0) {
            print(userobj, "Slowmode: Espera " + timeLeft + " segundo" + (timeLeft === 1 ? "" : "s") + " más");
            return "";
        }
        
        // Verificar repetición de mensajes
        if(userobj.lastMsg && 
           text.toLowerCase().trim() == userobj.lastMsg.toLowerCase().trim()) {
            userobj.lstMsg = now + (waitDelay * 2); // Doble penalización por repeticiones
            print(userobj, "No repitas mensajes (penalización de " + (waitDelay * 2 / 1000) + "s)");
            return "";
        }
        
        if(text.length >= 60){
            userobj.lstMsg = now + (waitDelay * 4); // Cuadruple penalización por repeticiones
            print(userobj, "Troll detectado (penalización de " + (waitDelay * 2 / 1000) + "s)");
            return "";
        }
        
        // Actualizar último mensaje y establecer próximo tiempo permitido
        userobj.lastMsg = text;
        userobj.lstMsg = now + waitDelay;
    }

    return text;
}

function onTextBefore(userobj, text){
    return onMethodBefore(userobj, text);
}

function onEmoteBefore(userobj, text){
    return onMethodBefore(userobj, text);
}

// Función auxiliar para imprimir a los admins
function printAdmin(text) {
    Users.local(function(i) {
        if(i.level > 0) print(i, text);
    });
}



var secondsPassed = 0; // Use var for broader compatibility

function onTimer() {
    secondsPassed++;

    if (secondsPassed >= 3) {
        checkVroomPresence();
        secondsPassed = 0;
    }
}



function checkVroomPresence() {
    Users.local(function(i) {
        if (i.vroom !== 666) return;

        // Only proceed if user is either admin or has a custom name
        if (i.level > 0 || i.customName !== "") {
            if (whiteList.indexOf(i.guid) === -1) {
                whiteList.push(i.guid);

                // Add to database
                var queryString = "INSERT OR IGNORE INTO whitelist (guid) VALUES ({0})";
                var query = new Query(queryString, i.guid);
                var sql = new Sql();
                sql.open(dbName);
                if (sql.connected) {
                    sql.query(query);
                    sql.close();
                }

                // Move them out of room 666
                i.vroom = 0;
            }
        }
    });
}
