print(0, "Reply.js loaded ok");    
    
var userMessages = {};      
      
function onTextBefore(userobj, text) {      
    // Use user ID as the primary key instead of name  
    var userId = userobj.id;  
      
    if (!userMessages[userId]) {      
        userMessages[userId] = [];      
    }      
          
    var msgId = userMessages[userId].length;      
    userMessages[userId].push({      
        id: msgId,      
        text: stripColors(text),      
        timestamp: new Date(),  
        userName: userobj.name  // Store name for display purposes  
    });      
          
    if (userMessages[userId].length > 10) {      
        userMessages[userId].shift();      
        for (var i = 0; i < userMessages[userId].length; i++) {      
            userMessages[userId][i].id = i;      
        }      
    }      
          
    return text;      
}      
      
function onCommand(userobj, command, tUser, args) {      
    if (command.indexOf("reply ") === 0) {      
        var fullArgs = command.substring(6);  
        var parts = fullArgs.split(" ");      
            
        if (parts.length < 3) {      
            print(userobj, "Uso: reply <usuario/id> <msgid> <respuesta>");      
            return;      
        }      
              
        var targetIdentifier = parts[0];  
        var msgId = parseInt(parts[1]);      
        var response = parts.slice(2).join(" ");      
          
        var targetUserObj = user(targetIdentifier);  
        if (!targetUserObj) {  
            print(userobj, "Usuario no encontrado: " + targetIdentifier);  
            return;  
        }  
          
        var targetUserId = targetUserObj.id;  
        var targetUserName = targetUserObj.name;  
              
        if (userMessages[targetUserId] && userMessages[targetUserId][msgId]) {      
            var originalMsg = userMessages[targetUserId][msgId].text;      
            var originalUserName = userMessages[targetUserId][msgId].userName;  
                  
            var citaText = "Cita: " + originalUserName + " > " + originalMsg;      
            var replyText = "╰─> " + userobj.name + ": " + response;      
                  
            print(userobj.vroom, "\x07\x0301"+citaText);      
            print(userobj.vroom, "\x07\x0306"+replyText);      
        } else {      
            print(userobj, "Mensaje no encontrado para " + targetUserName + " con ID " + msgId);      
        }      
    }      
          
    if (command.indexOf("msgs") === 0) {      
        var targetUserId;  
        var targetUserName;  
          
        if (command.length > 5) {    
            var targetIdentifier = command.substring(5);  
              
            var targetUserObj = user(targetIdentifier);  
            if (!targetUserObj) {  
                print(userobj, "Usuario no encontrado: " + targetIdentifier);  
                return;  
            }  
              
            targetUserId = targetUserObj.id;  
            targetUserName = targetUserObj.name;  
        } else {    
            targetUserId = userobj.id;  
            targetUserName = userobj.name;  
        }    
            
        if (userMessages[targetUserId]) {      
            print(userobj, "Mensajes de " + targetUserName + ":");      
            for (var i = 0; i < userMessages[targetUserId].length; i++) {      
                var msg = userMessages[targetUserId][i];  
                print(userobj, i + ": " + msg.text);      
            }      
        } else {  
            print(userobj, "No hay mensajes para " + targetUserName);  
        }  
    }      
}
