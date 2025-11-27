// ============================================================  
// Color table matching Helpers.cs color mapping (declare once)  
// ============================================================  
var colorTable = [  
    "#FFFFFF", "#000000", "#000080", "#008000", "#FF0000", "#800000",  
    "#800080", "#FFA500", "#FFFF00", "#00FF00", "#008080", "#00FFFF",  
    "#0000FF", "#FF00FF", "#808080", "#C0C0C0", "#FF4500", "#8B4513",  
    "#008B8B", "#4B0082", "#DC143C", "#228B22", "#9932CC", "#FF69B4",  
    "#2F4F4F", "#B0C4DE", "#7CFC00", "#20B2AA", "#DEB887", "#7FFF00",  
    "#B8860B", "#8B008B", "#00BFFF", "#FFD700", "#F08080", "#9370DB",  
    "#808000", "#DB7093", "#BC8F8F", "#2E8B57", "#6A5ACD", "#00FF7F",  
    "#FF6347", "#EE82EE", "#F5DEB3", "#9ACD32"  
];  
  
// ============================================================  
// Entry point: hook before sending user text  
// ============================================================  
function onTextBefore(userobj, text) {  
    var hasHTMLClients = false;  


    var clearText = stripColors(text);  
    var words = clearText.split(" ");  
      
    for (var i = 0; i < words.length; i++) {  
        var u = words[i];  
          
        if (/\.(jpe?g|png|gif)(\?.*)?$/i.test(u)) {  
            var imgHTML = "<img src='" + u + "' style='max-width:50%; height:auto; border:1px solid #ccc;'>";  
              
            // Create timer with 2 second delay (2000ms)  
            var timer = new Timer();  
            timer.interval = 2000; // 2 second delay  
            timer.oncomplete = function() {  
                Users.local(function(i) {  
                    if (i.canHTML && i.vroom === userobj.vroom) {  
                        print(i, "Image sent by "+userobj.name);
                        i.sendHTML(imgHTML);  
                    }  
                });  
                timer.stop(); // Clean up timer after execution  
            };  
            timer.start();  
        }  
    }  
  
    Users.local(function(i) {  
        if (i.canHTML && i.vroom === userobj.vroom) {  
            hasHTMLClients = true;  
        }  
    });  
  
    if (!hasHTMLClients) {  
        return text;  
    }  
  
    var htmlContent = "";  
    var plainContent = "";  
  
    if (userobj.customName && userobj.customName !== "") {  
        htmlContent = convertAresFormattingToHTML(userobj.customName + text);  
        htmlContent = convertEmoticonsToImages(htmlContent);  
        htmlContent = convertEmojisToImages(htmlContent);  
        plainContent = userobj.customName + text;  
    } else {  
        htmlContent = '<font color="#000000">' + userobj.name + '> </font>';  
        var htmlText = convertAresFormattingToHTML(text);  
        htmlText = convertEmoticonsToImages(htmlText);  
        htmlText = convertEmojisToImages(htmlText);  
        htmlContent += htmlText;  
  
        plainContent = "\x0301" + userobj.name + "> " + text;  
    }  
  
    Users.local(function(i) {  
        if (i.vroom === userobj.vroom) {  
            if (i.canHTML) {  
                i.sendHTML(htmlContent);  
            } else {  
                print(i, plainContent);  
            }  
        }  
    });  
  
    return "";  
}  
  
// ============================================================  
// Convert Ares emoticons → images  
// ============================================================  
function convertEmoticonsToImages(text) {  
var ems = [  
    // Canonical 46 (original hyphenated / uppercase where applicable)  
    ":-)", ":-D", ";-)", ":-O", ":-P", "(H)", ":@", ":-$",  
    ":-S", ":-(", ":'(", ":-|", "(6)", "(A)", "(L)", "(U)",  
    "(M)", "(@)", "(&)", "(S)", "(*)", "(~)", "(E)", "(8)",  
    "(F)", "(W)", "(O)", "(K)", "(G)", "(^)", "(P)", "(I)",  
    "(C)", "(T)", "({)", "(})", "(B)", "(D)", "(Z)", "(X)",  
    "(Y)", "(N)", ":-[", "(1)", "(2)", "(3)", "(4)",  
 // Common variants without hyphens / lowercase variants  
    ":)", ":D", ";)", ":O", ":o", ":P", ":p", ":(", ":S", ":s", ":-s", ":|", ":[", ":$",  
    "(x)", "(i)", "(a)", "(l)", "(u)", "(m)", "(s)", "(e)",  
    "(f)", "(w)", "(o)", "(k)", "(g)", "(p)", "(c)", "(t)",  
    "(b)", "(d)", "(z)", "(y)", "(n)", "(h)"  
];


    var gifShortcuts = [  
        "admin","alien","angel","angry","anyone","argh","arrow","awww","baby","badair","badday","baloon","ban","banned",  
        "bash","biggrin","bleh","blink","bop","bouncy","brainfart","bye","cake","cheekkiss","chin","cloud","clown",  
        "cold","confused","cook","cool","crash","crossbones","cry","cupid","cya","dog","drink","drinks",  
        "drool","dry","dunce","eat","eatarrow","err","excited","explode","fart","flamewar","flowers","gaga","geek",  
        "goodgrief","goodjob","goodone","gun","happy","happyno","happyyes","harhar","headphone","heart","hug","huglove",  
        "huh","idea","inlove","jump","kiss","lick","lol","love","mad","mmm","nerd","no","nod","nono","omg","oops",  
        "party","peace","poke","poop","puke","punch","question","rofl","rolleyes","run","sad","scared","scream","shake",  
        "shock","shrug","shy","sick","silly","sleep","sleepy","smile","smirk","smoke","sneaky","sniff","sorry","spin",  
        "spit","spock","stare","stop","surprised","sweat","talk","think","thumbsdown","thumbsup","tired","tongue","uhoh",  
        "wait","wave","wink","wonder","work","worry","wow","wtf","yawn","yay","yell","yes","zzz"  
    ];  
  
    var result = text;  
    var canonicalCount = 46;  
    var normMap = {};  
  
    for (var idx = 0; idx < canonicalCount && idx < ems.length; idx++) {  
        var key = ems[idx].replace(/-/g, '').toUpperCase();  
        normMap[key] = idx;  
    }  
  
    var sortedEms = ems.slice();  
    sortedEms.sort(function(a, b) { return b.length - a.length; });  
  
    for (var j = 0; j < sortedEms.length; j++) {  
        var pattern = sortedEms[j];  
        var normalizedPattern = pattern.replace(/-/g, '').toUpperCase();  
        var imageIndex = normMap[normalizedPattern];  
  
        if (typeof imageIndex !== 'undefined') {  
            var replacement = '<img src="https://cdn.jsdelivr.net/gh/Shipo-bit/assest@main/imagenes/org/' +  
                              imageIndex + '.gif" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
            result = result.split(pattern).join(replacement);  
        }  
    }  
  
    for (var k = 0; k < gifShortcuts.length; k++) {  
        var word = gifShortcuts[k];  
        var replacementGif = '<img src="https://cdn.jsdelivr.net/gh/Shipo-bit/assest@main/imagenes/gifs/' +  
                             word + '.gif" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
  
        result = result.split('(' + word + ')').join(replacementGif);  
        result = result.split('(' + word.toUpperCase() + ')').join(replacementGif);  
        var cap = word.charAt(0).toUpperCase() + word.slice(1);  
        result = result.split('(' + cap + ')').join(replacementGif);  
    }  
  
    return result;  
}  
  
// ============================================================  
// Convert Ares formatting → old-school HTML  
// ============================================================  
function convertAresFormattingToHTML(text) {  
    var result = "";  
    var i = 0;  
    var boldOpen = false;  
    var underlineOpen = false;  
    var fontOpen = false;  
    var bgSpanOpen = false;  
  
    while (i < text.length) {  
        var c = text.charAt(i);  
  
        // Foreground color code (\x03)  
        if (c === '\x03') {  
            if (i + 2 < text.length) {  
                var colorStr = text.charAt(i + 1) + text.charAt(i + 2);  
                var colorIndex = parseInt(colorStr, 10);  
  
                if (!isNaN(colorIndex) && colorIndex >= 0 && colorIndex < colorTable.length) {  
                    if (fontOpen) result += '</font>';  
                    result += '<font color="' + colorTable[colorIndex] + '">';  
                    fontOpen = true;  
                    i += 3;  
                    continue;  
                }  
            }  
        }  
  
        // Background color code (\x05)  
        if (c === '\x05') {  
            if (i + 2 < text.length) {  
                var bgColorStr = text.charAt(i + 1) + text.charAt(i + 2);  
                var bgColorIndex = parseInt(bgColorStr, 10);  
                  
                if (!isNaN(bgColorIndex) && bgColorIndex >= 0 && bgColorIndex < colorTable.length) {  
                    if (bgSpanOpen) result += '</span>';  
                    result += '<span style="background-color:' + colorTable[bgColorIndex] + '">';  
                    bgSpanOpen = true;  
                    i += 3;  
                    continue;  
                }  
            }  
        }  
  
        // Bold toggle  
        if (c === '\x06') {  
            boldOpen = !boldOpen;  
            result += boldOpen ? '<b>' : '</b>';  
            i++;  
            continue;  
        }  
  
        // Underline toggle  
        if (c === '\x07') {  
            underlineOpen = !underlineOpen;  
            result += underlineOpen ? '<u>' : '</u>';  
            i++;  
            continue;  
        }  
  
        // Formatting reset codes  
        if (c === '\x09' || c === '\x02') {  
            if (fontOpen) { result += '</font>'; fontOpen = false; }  
            if (bgSpanOpen) { result += '</span>'; bgSpanOpen = false; }  
            if (boldOpen) { result += '</b>'; boldOpen = false; }  
            if (underlineOpen) { result += '</u>'; underlineOpen = false; }  
            i++;  
            continue;  
        }  
  
        result += c;  
        i++;  
    }  
  
    // Close any open tags  
    if (boldOpen) result += '</b>';  
    if (underlineOpen) result += '</u>';  
    if (fontOpen) result += '</font>';  
    if (bgSpanOpen) result += '</span>';  
  
    // Replace multiple consecutive spaces with &nbsp;  
    result = result.replace(/  +/g, function(match) {  
        var nbsps = '';  
        for (var n = 0; n < match.length; n++) {  
            nbsps += '&nbsp;';  
        }  
        return nbsps;  
    });  
  
    return result;  
}  
  
// ============================================================  
// Convert Unicode emojis → google PNGs (old-IE friendly)  
// ============================================================  
function convertEmojisToImages(text) {  
    var result = "";  
    var i = 0;  
  
    while (i < text.length) {  
        var code = text.charCodeAt(i);  
  
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < text.length) {  
            var low = text.charCodeAt(i + 1);  
            if (low >= 0xDC00 && low <= 0xDFFF) {  
                var codepoint = (code - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;  
                var hex = codepoint.toString(16).toLowerCase();  
                result += '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/' +  
                          hex + '.png" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
                i += 2;  
                continue;  
            }  
        }  
  
        if ((code >= 0x2600 && code <= 0x26FF) || (code >= 0x2700 && code <= 0x27BF)) {  
            var hex2 = code.toString(16).toLowerCase();  
            result += '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/' +  
                      hex2 + '.png" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
            i++;  
            continue;  
        }  
  
        result += text.charAt(i);  
        i++;  
    }  
  
    return result;  
}
