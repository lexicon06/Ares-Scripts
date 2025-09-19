// CustomName Keeper Script with Auto-Detection
Array.prototype.includes = function (n) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == n) return true;
    }
    return false;
};

var dbName = "customnames.db";
var userCustomNamesCache = {};

function onHelp(userobj) {
    print(userobj, "#helpnames | CustomName Commands");
    help(userobj);
}

function onLoad() {
    if (initDatabaseQuery())
        print("\x0302CustomName Auto-Keeper - \x06v1.0");
    else
        print("\x0304\x06Error loading CustomName script v1.0");
}

function onCommand(userobj, cmd, target, args) {
    var command = cmd.split(" ")[0].toLowerCase();
    var commandArgs = cmd.substring(command.length).trim();

    // Handle commands
    switch (command) {
        case "listnames":
            showCustomNames(userobj);
            break;
            
        case "delname":
            if (userobj.level < 1) {
                log(userobj, "\x0304You don't have permission to use this command");
                return;
            }
            deleteCustomNameQuery(userobj, commandArgs);
            break;
            
        case "setactive":
            setActiveCustomName(userobj, commandArgs);
            break;
            
        case "myname":
            getActiveCustomName(userobj);
            break;
            
        case "clearnames":
            if (userobj.level < 1) {
                log(userobj, "\x0304You don't have permission to use this command");
                return;
            }
            deleteCustomNamesQuery(userobj);
            break;
            
        case "helpnames":
            onHelp(userobj);
            break;
    }
}

function onTextBefore(userobj, text) {
    // Auto-detect and save custom name from userobj.customName
    if (userobj.customName!="") {
        autoSaveCustomName(userobj, userobj.customName);
    }
    
    return text;
}

function onUserJoin(userobj) {
    // Pre-load custom name when user joins
    var activeName = getActiveCustomNameQuery(userobj.name);
    if (activeName) {
        userobj.customName = activeName;
        userCustomNamesCache[userobj.name] = activeName;
    }
}

function autoSaveCustomName(userobj, displayName) {
    // Check if display name is valid
    if (!isValidDisplayName(displayName)) {
        return false;
    }
    
    // Check if display name already exists globally
    if (isDisplayNameTaken(displayName)) {
        // If it's taken by someone else, don't auto-save
        if (!isDisplayNameOwnedByUser(userobj, displayName)) {
            return false;
        }
    }
    
    // Check if user already has this display name
    var userNames = getCustomNamesQuery(userobj.name);
    var namesKeys = Object.keys(userNames);
    
    for (var i = 0; i < namesKeys.length; i++) {
        var key = namesKeys[i];
        if (userNames[key].display_name.toLowerCase() === displayName.toLowerCase()) {
            // Name already exists for this user, just activate it
            setActiveCustomName(userobj, displayName);
            return true;
        }
    }
    
    // Ensure user exists in database
    ensureUserExists(userobj);
    
    // First, set all other names as inactive for this user
    var deactivateQueryString = "UPDATE custom_names SET is_active = 0 WHERE username = {0}";
    var deactivateQuery = new Query(deactivateQueryString, userobj.name);
    
    // Then add the new display name as active
    var queryString = "INSERT INTO custom_names (username, display_name, is_active) VALUES ({0}, {1}, 1)";
    var query = new Query(queryString, userobj.name, displayName.trim());
    
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        // Deactivate other names
        sql.query(deactivateQuery);
        // Add new name
        sql.query(query);
        sql.close();
        
        // Update cache
        userCustomNamesCache[userobj.name] = displayName;
        
        log(null, userobj.name + " auto-saved custom name: " + displayName);
        return true;
    }
    
    return false;
}

function isDisplayNameOwnedByUser(userobj, displayName) {
    var userNames = getCustomNamesQuery(userobj.name);
    var namesKeys = Object.keys(userNames);
    
    for (var i = 0; i < namesKeys.length; i++) {
        var key = namesKeys[i];
        if (userNames[key].display_name.toLowerCase() === displayName.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function showCustomNames(userobj) {
    var currentNames = getCustomNamesQuery(userobj.name);
    var namesKeys = Object.keys(currentNames);
    var namesLength = namesKeys.length;
    
    if (namesLength == 0) {
        log(userobj, "You don't have any custom names saved");
        return;
    }

    var activeName = getActiveCustomNameQuery(userobj.name);
    var response = "\x0302Your custom names: ";
    
    for (var i = 0; i < namesLength; i++) {
        var key = namesKeys[i];
        if (currentNames[key].is_active) {
            response += "\x02\x0312" + currentNames[key].display_name + "\x02\x0F (active)";
        } else {
            response += currentNames[key].display_name;
        }
        
        if (i < namesLength - 1) response += ", ";
    }
    
    print(userobj, response);
}

function getCustomNamesQuery(username) {
    var names = {};
    var queryString = "SELECT * FROM custom_names WHERE username = {0} ORDER BY is_active DESC, created_date DESC";
    
    var query = new Query(queryString, username);
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(query);
        while (sql.read) {
            var id = sql.value("custom_name_id");
            names[id] = {
                id: id,
                username: sql.value("username"),
                display_name: sql.value("display_name"),
                is_active: sql.value("is_active"),
                created_date: sql.value("created_date")
            };
        }
        sql.close();
    } else {
        log(null, "\x0304\x06Database connection error:\x06" + sql.lastError);
    }
    return names;
}

function getActiveCustomNameQuery(username) {
    var queryString = "SELECT display_name FROM custom_names WHERE is_active = 1 AND username = {0}";
    
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
    } else {
        log(null, "\x0304\x06Database connection error:\x06" + sql.lastError);
    }
    return null;
}

function deleteCustomNamesQuery(userobj) {
    if (resetDatabase()) {
        log(userobj, "\x0303\x06All custom names deleted successfully");
        // Clear cache
        userCustomNamesCache = {};
    } else {
        log(userobj, "\x0304\x06Error deleting custom names");
    }
}

function deleteCustomNameQuery(userobj, displayName) {
    var currentNames = getCustomNamesQuery(userobj.name);
    var namesKeys = Object.keys(currentNames);
    var namesLength = namesKeys.length;
    
    if (namesLength == 0) {
        log(userobj, "You don't have any custom names saved");
        return;
    }
    
    if (!displayName || displayName === "") {
        log(userobj, "\x0304You must specify a display name");
        return;
    }
    
    var nameExists = false;
    var nameId = null;
    var wasActive = false;
    
    for (var i = 0; i < namesLength; i++) {
        var key = namesKeys[i];
        if (currentNames[key].display_name.toLowerCase() === displayName.toLowerCase()) {
            nameExists = true;
            nameId = currentNames[key].id;
            wasActive = currentNames[key].is_active;
            break;
        }
    }
    
    if (!nameExists) {
        log(userobj, "\x0304You don't have a custom name with that display name");
        return;
    }
    
    var queryString = "DELETE FROM custom_names WHERE custom_name_id = {0}";
    var query = new Query(queryString, nameId);
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(query);
        sql.close();
        log(userobj, "\x0303\x06Custom name deleted successfully");
        
        // If the deleted name was active, clear the cache
        if (wasActive) {
            delete userCustomNamesCache[userobj.name];
            if (userobj.customName === displayName) {
                userobj.customName = "";
            }
            
            // Set a new active name if available
            var remainingNames = getCustomNamesQuery(userobj.name);
            var remainingKeys = Object.keys(remainingNames);
            if (remainingKeys.length > 0) {
                setActiveCustomName(userobj, remainingNames[remainingKeys[0]].display_name);
            }
        }
    } else {
        log(userobj, "\x0304\x06Error deleting custom name");
    }
}

function setActiveCustomName(userobj, displayName) {
    if (!displayName || displayName.trim() === "") {
        log(userobj, "\x0304You must specify a display name");
        return;
    }
    
    var userNames = getCustomNamesQuery(userobj.name);
    var namesKeys = Object.keys(userNames);
    var namesLength = namesKeys.length;
    
    if (namesLength == 0) {
        log(userobj, "You don't have any custom names saved");
        return;
    }
    
    var nameExists = false;
    var nameId = null;
    
    for (var i = 0; i < namesLength; i++) {
        var key = namesKeys[i];
        if (userNames[key].display_name.toLowerCase() === displayName.toLowerCase()) {
            nameExists = true;
            nameId = userNames[key].id;
            break;
        }
    }
    
    if (!nameExists) {
        log(userobj, "\x0304You don't have a custom name with that display name");
        return;
    }
    
    // First, set all names as inactive for this user
    var deactivateQueryString = "UPDATE custom_names SET is_active = 0 WHERE username = {0}";
    var deactivateQuery = new Query(deactivateQueryString, userobj.name);
    
    // Then set the selected name as active
    var activateQueryString = "UPDATE custom_names SET is_active = 1 WHERE custom_name_id = {0}";
    var activateQuery = new Query(activateQueryString, nameId);
    
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(deactivateQuery);
        sql.query(activateQuery);
        sql.close();
        
        // Update cache and userobj
        userobj.customName = displayName;
        userCustomNamesCache[userobj.name] = displayName;
        
        log(userobj, "\x0303\x06Custom name activated successfully: " + displayName);
    } else {
        log(userobj, "\x0304\x06Error activating custom name");
    }
}

function getActiveCustomName(userobj) {
    var activeName = getActiveCustomNameQuery(userobj.name);
    
    if (activeName) {
        log(userobj, "\x0303Your active custom name is: " + activeName);
    } else {
        log(userobj, "You don't have an active custom name");
    }
}

function ensureUserExists(userobj) {
    // Users are automatically handled by the custom_names table now
    // No separate users table needed
    return true;
}

function isDisplayNameTaken(displayName) {
    var queryString = "SELECT COUNT(*) as count FROM custom_names WHERE display_name = {0}";
    var query = new Query(queryString, displayName);
    var sql = new Sql();
    sql.open(dbName);
    
    if (sql.connected) {
        sql.query(query);
        if (sql.read) {
            var count = sql.value("count");
            sql.close();
            return count > 0;
        }
        sql.close();
    }
    return false;
}

function isValidDisplayName(name) {
    // Basic validation - allow letters, numbers, spaces, and common punctuation
    var regex = /^[a-zA-Z0-9\s\-\_\.\,]+$/;
    return regex.test(name) && name.length >= 2 && name.length <= 30;
}

function help(userobj) {
    print(userobj, "#listnames | List all your custom names");
    print(userobj, "#setactive <name> | Activate a custom name");
    print(userobj, "#myname | Show your active custom name");
    print(userobj, "#helpnames | Show available commands");

    if (userobj.level >= 1) {
        print(userobj, "#delname <name> | Delete a custom name");
        print(userobj, "#clearnames | Delete all custom names");
    }
}

function log(userobj, text) {
    if (!userobj)
        print("\x0302\x06CustomName\x06 |\x0304 " + text);
    else
        print(userobj, "\x0302\x06CustomName\x06 |\x0304 " + text);
}

function dropDatabaseQuery() {
    var query = "DROP TABLE IF EXISTS custom_names";
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
    var query = 
    `CREATE TABLE IF NOT EXISTS custom_names (
    custom_name_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username NVARCHAR(255) NOT NULL, 
    display_name NVARCHAR(255) NOT NULL, 
    is_active BOOLEAN DEFAULT 1, 
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP, 
    UNIQUE (display_name)
    )`;
    
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
