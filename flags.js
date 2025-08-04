print('banderas ok')

function flagCallback(e) {
    if (!e) return;

    try {
        var data = JSON.parse(this.page);
        var emojis = ["😂", "🤖", "🎩", "🦄", "🔥", "💀", "🍕", "🚀", "🐉", "🎸"];
        var userId = parseInt(this.arg);
        user(userId).pais = data.country;
        var separator = "\x0304♥\x0301";
		if(user(userId).vroom!=0){ return ""; }
        
        var message = `\x0301${getCountryFlag(data.countryCode)} ${data.country} ${separator} ${data.city}`;

        print(0, message);
    } catch (err) {
        console.error("Failed to parse IP data:", err);
    }
}

function getCountryFlag(countryCode) {
    if (!countryCode) return "";

    countryCode = countryCode.toUpperCase();
    var flag = "";

    for (var i = 0; i < countryCode.length; i++) {
        flag += String.fromCodePoint(127397 + countryCode.charCodeAt(i));
    }

    return flag;
}

function onCommand(userobj, command) {
    if (command == "ids" && userobj.level > 0) {
        // First collect all users into an array
        var users = [];
        Users.local(function(i) {
            users.push(i);
        });
        
        // Sort all users by ID (ascending)
        users.sort(function(a, b) {
            return a.id - b.id;
        });
        
        // Send the information
        users.forEach(function(i) {
            var pais = i.pais == null ? "Desconocido" : i.pais;
            var adminIndicator = i.level > 0 ? " ( ADMIN )" : "";
            var msg = `ID: \x06${i.id}\x06, \x06${adminIndicator}\x06 Nick: \x06${i.name}`;//, ASN: \x06${i.getASN()}\x06, PAIS: \x06${pais}\x06
            sendPM(userobj, Room.botName, msg);
        });
    }
	
	
	
	    if (command == "adm" && userobj.level > 0) {  // Changed command to "adm"
        var admins = [];
        Users.local(function(i) {
            if (i.level > 0) {  // Only include users with level > 0
                admins.push(i);
            }
        });
        
        // Sort admins by ID (ascending)
        admins.sort(function(a, b) {
            return a.id - b.id;
        });
        
        // Send the information
        if (admins.length === 0) {
            sendPM(userobj, Room.botName, "No hay administradores conectados.");
            return;
        }
        
        admins.forEach(function(i) {
            var msg = `ID: \x06${i.id}\x06, Nick: \x06${i.name}\x06 ( ADMIN )`;
            sendPM(userobj, Room.botName, msg);
        });
    }
	
	
	    if (command == "users" && userobj.level > 0) {  // Command changed to "users"
        var regularUsers = [];
        Users.local(function(i) {
            if (i.level === 0) {  // Only include users with level 0
                regularUsers.push(i);
            }
        });
        
        // Sort regular users by ID (ascending)
        regularUsers.sort(function(a, b) {
            return a.id - b.id;
        });
        
        // Send the information
        if (regularUsers.length === 0) {
            sendPM(userobj, Room.botName, "No hay usuarios regulares conectados.");
            return;
        }
        
        regularUsers.forEach(function(i) {
            var pais = i.pais == null ? "Desconocido" : i.pais;
            var msg = `ID: \x06${i.id}\x06, Nick: \x06${i.name}\x06, PAIS: \x06${pais}\x06`;
            sendPM(userobj, Room.botName, msg);
        });
    }
}

function onJoinCheck(u) {
    if (!u || !u.externalIp) return true;

    var flag = new HttpRequest();
    flag.utf = true;
    flag.src = `http://ip-api.com/json/${encodeURIComponent(u.externalIp)}`;
    flag.oncomplete = flagCallback;
    flag.download(u.id);
    u.pais = null;

    return true;
};
