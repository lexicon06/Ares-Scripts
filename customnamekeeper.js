var dbName = "cn.db";

function onJoin(userobj) {
    if (userobj.customName == "") {
        var savedName = getLastUsedCustomName(userobj.name);
        if (savedName) {
            userobj.customName = savedName;
        }
    } else {
        // User joins with a custom name - save it and mark as current
        saveCustomNameToWardrobe(userobj.name, userobj.customName);
    }
}

function onBotPM(userobj, text) {
    // Check if user has an active menu and if it's still valid
    if (userMenus[userobj.name]) {
        var menu = userMenus[userobj.name];
        var now = new Date().getTime();
        
        // Check if menu has expired
        if (now > menu.expires) {
            delete userMenus[userobj.name];
            return text; // Menu expired, process normally
        }
        
        var input = text.toLowerCase().trim();
        
        // Only accept single characters during menu mode
        if (input.length != 1) {
            return text;
        }
        
        if (menu.type == "wardrobe") {
            // Handle wardrobe selection
            var letterIndex = input.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
            
            if (letterIndex >= 0 && letterIndex < menu.names.length && letterIndex < 26) {
                var selectedName = menu.names[letterIndex].name;
                userobj.customName = selectedName;
                
                // Update the last_used timestamp
                saveCustomNameToWardrobe(userobj.name, selectedName);
                
                sendPM(userobj, Room.botName, "✓ Cambiado a: " + selectedName);
                delete userMenus[userobj.name];
                return ""; // Consume the input
            }
        }
        
        else if (menu.type == "delete") {
            // Handle deletion
            if (input == "cancelar") {
                sendPM(userobj, Room.botName, "✗ Eliminación cancelada");
                delete userMenus[userobj.name];
                return "";
            }
            
            var letterIndex = input.charCodeAt(0) - 97;
            
            if (letterIndex >= 0 && letterIndex < menu.names.length && letterIndex < 26) {
                var nameToDelete = menu.names[letterIndex].name;
                
                if (deleteCustomName(userobj.name, nameToDelete)) {
                    sendPM(userobj, Room.botName, "✓ Eliminado: " + nameToDelete);
                    
                    // If they deleted their active name, clear it
                    if (userobj.customName == nameToDelete) {
                        userobj.customName = "";
                        sendPM(userobj, Room.botName, "→ Tu nombre personalizado activo ha sido eliminado");
                    }
                } else {
                    sendPM(userobj, Room.botName, "✗ Error al eliminar: " + nameToDelete);
                }
                
                delete userMenus[userobj.name];
                return ""; // Consume the input
            }
        }
    }
    
    // Normal custom name saving (only if not in menu mode)
    if (!userMenus[userobj.name] && userobj.customName != "") {
        saveCustomNameToWardrobe(userobj.name, userobj.customName);
    }
    
    return text;
}

function getLastUsedCustomName(username) {
    var queryString = "SELECT display_name FROM custom_names WHERE username = {0} ORDER BY last_used DESC LIMIT 1";
    var query = new Query(queryString, username);
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(query);
        if (sql.read) {
            var result = sql.value("display_name");
            sql.close();
            return result;
        }
        sql.close();
    }
    return null;
}

function saveCustomNameToWardrobe(username, displayName) {
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        // Check if this name already exists for this user
        var checkQuery = new Query("SELECT custom_name_id FROM custom_names WHERE username = {0} AND display_name = {1}", username, displayName);
        sql.query(checkQuery);
        
        if (sql.read) {
            // Name exists, just update the last_used timestamp
            var updateQuery = new Query("UPDATE custom_names SET last_used = CURRENT_TIMESTAMP WHERE username = {0} AND display_name = {1}", username, displayName);
            sql.query(updateQuery);
        } else {
            // New name, add it to wardrobe
            var insertQuery = new Query("INSERT INTO custom_names (username, display_name, last_used) VALUES ({0}, {1}, CURRENT_TIMESTAMP)", username, displayName);
            sql.query(insertQuery);
        }
        sql.close();
        return true;
    }
    return false;
}

function deleteCustomName(username, displayName) {
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        var deleteQuery = new Query("DELETE FROM custom_names WHERE username = {0} AND display_name = {1}", username, displayName);
        sql.query(deleteQuery);
        sql.close();
        return true;
    }
    return false;
}

// Function to get all custom names for a user (for potential wardrobe commands)
function getUserCustomNames(username) {
    var names = [];
    var queryString = "SELECT display_name, last_used FROM custom_names WHERE username = {0} ORDER BY last_used DESC";
    var query = new Query(queryString, username);
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(query);
        while (sql.read) {
            names.push({
                name: sql.value("display_name"),
                lastUsed: sql.value("last_used")
            });
        }
        sql.close();
    }
    return names;
}

// Store active menu states
var userMenus = {};

// Command to show user's custom names wardrobe
function onCommand(userobj, command, tUser, args) {
    if (command == "nombres" || command == "nicks" || command == "guardarropas") {
        showWardrobeMenu(userobj);
        return true;
    }
    
    if (command == "borrar" || command == "eliminar") {
        showDeleteMenu(userobj);
        return true;
    }
    
    return false;
}

function showWardrobeMenu(userobj) {
    var names = getUserCustomNames(userobj.name);
    if (names.length > 0) {
        sendPM(userobj, Room.botName, "═══ Tus Nombres Personalizados ═══");
        
        var letters = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < names.length && i < 26; i++) {
            var letter = letters.charAt(i);
            var nameEntry = letter + ". " + names[i].name;
            if (i == 0) nameEntry += " (Activo)";
            sendPM(userobj, Room.botName, nameEntry);
        }
        
        sendPM(userobj, Room.botName, "═══════════════════════════════════");
        sendPM(userobj, Room.botName, "Escribe una letra para cambiar a ese nombre");
        sendPM(userobj, Room.botName, "Usa /borrar para eliminar nombres");
        
        // Store menu state with 30 second expiry
        userMenus[userobj.name] = {
            type: "wardrobe",
            names: names,
            expires: new Date().getTime() + 30000 // 30 seconds from now
        };
        
    } else {
        sendPM(userobj, Room.botName, "No tienes nombres personalizados guardados. ¡Empieza a chatear con un nombre personalizado para crear tu colección!");
    }
}

function showDeleteMenu(userobj) {
    var names = getUserCustomNames(userobj.name);
    if (names.length > 0) {
        sendPM(userobj, Room.botName, "═══ Eliminar Nombres Personalizados ═══");
        
        var letters = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < names.length && i < 26; i++) {
            var letter = letters.charAt(i);
            var nameEntry = letter + ". " + names[i].name;
            if (i == 0) nameEntry += " (Activo)";
            sendPM(userobj, Room.botName, nameEntry);
        }
        
        sendPM(userobj, Room.botName, "══════════════════════════════════");
        sendPM(userobj, Room.botName, "Escribe una letra para ELIMINAR ese nombre");
        sendPM(userobj, Room.botName, "Escribe 'cancelar' para cancelar");
        
        // Store menu state with 30 second expiry
        userMenus[userobj.name] = {
            type: "delete",
            names: names,
            expires: new Date().getTime() + 30000 // 30 seconds from now
        };
        
    } else {
        sendPM(userobj, Room.botName, "No tienes nombres personalizados para eliminar.");
    }
}

// Initialize database on script load
function initDatabase() {
    var queryString = "CREATE TABLE IF NOT EXISTS custom_names (custom_name_id INTEGER PRIMARY KEY AUTOINCREMENT, username NVARCHAR(255) NOT NULL, display_name NVARCHAR(255) NOT NULL, last_used DATETIME DEFAULT CURRENT_TIMESTAMP, created_date DATETIME DEFAULT CURRENT_TIMESTAMP)";
    var query = new Query(queryString);
    
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(query);
        sql.close();
        print("Sistema de Nombres Personalizados inicializado correctamente");
        return true;
    } else {
        print("Error al conectar con la base de datos");
    }
    return false;
}

// Run initialization when script loads
initDatabase();
