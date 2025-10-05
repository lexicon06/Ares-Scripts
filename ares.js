// TODO
/*
FIX THE BACKGROUND COLORS
SOME ICONS DOES NOT SHOW CORRECTLY EG :s
FORMAT SPACES WITH &NBSP; FOR SPACES.
*/


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

    Users.local(function(i) {
        if (i.canHTML && i.vroom === userobj.vroom) {
            hasHTMLClients = true;
        }
    });

    if (!hasHTMLClients) {
        return text; // normal if no HTML clients
    }

    var htmlContent = "";
    var plainContent = "";

    if (userobj.customName && userobj.customName !== "") {
        htmlContent = convertAresFormattingToHTML(userobj.customName + text);
        htmlContent = convertEmoticonsToImages(htmlContent);
        htmlContent = convertEmojisToImages(htmlContent);
        plainContent = userobj.customName + text;
    } else {
        // Default prefix in black
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
        ":)", ":D", ";)", ":O", ":P", ":(", ":S", ":|", ":[", ":$",
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

    // Map canonical emoticons to indices (normalize by removing '-' and uppercasing)
    for (var idx = 0; idx < canonicalCount && idx < ems.length; idx++) {
        var key = ems[idx].replace(/-/g, '').toUpperCase();
        normMap[key] = idx;
    }

    // Sort patterns by length descending to avoid partial replacements (e.g. ":-)" before ":)")
    var sortedEms = ems.slice();
    sortedEms.sort(function(a, b) { return b.length - a.length; });

    // Replace standard emoticons; use exact string matches to avoid regex pitfalls in old IE
    for (var j = 0; j < sortedEms.length; j++) {
        var pattern = sortedEms[j];
        var normalizedPattern = pattern.replace(/-/g, '').toUpperCase();
        var imageIndex = normMap[normalizedPattern];

        if (typeof imageIndex !== 'undefined') {
            var replacement = '<img src="https://cdn.jsdelivr.net/gh/Shipo-bit/assest@main/imagenes/org/' +
                              imageIndex + '.gif" width="19" height="19" style="vertical-align:bottom;" border="0" />';
            // replace all occurrences of the exact pattern
            result = result.split(pattern).join(replacement);
        }
    }

    // Replace GIF shortcuts: handle common casings (lower, UPPER, Capitalized)
    for (var k = 0; k < gifShortcuts.length; k++) {
        var word = gifShortcuts[k];
        var replacementGif = '<img src="https://cdn.jsdelivr.net/gh/Shipo-bit/assest@main/imagenes/gifs/' +
                             word + '.gif" width="19" height="19" style="vertical-align:bottom;" border="0" />';

        // (word)
        result = result.split('(' + word + ')').join(replacementGif);
        // (WORD)
        result = result.split('(' + word.toUpperCase() + ')').join(replacementGif);
        // (Word) capitalized
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

    while (i < text.length) {
        var c = text.charAt(i);

        if (c === '\x03' || c === '\x05') {
            if (i + 2 < text.length) {
                var colorStr = text.charAt(i + 1) + text.charAt(i + 2);
                var colorIndex = parseInt(colorStr, 10);

                if (!isNaN(colorIndex) && colorIndex >= 0 && colorIndex < colorTable.length) {
                    result += '<font color="' + colorTable[colorIndex] + '">';
                    i += 3;
                    continue;
                }
            }
        }

        if (c === '\x06') {
            boldOpen = !boldOpen;
            result += boldOpen ? '<b>' : '</b>';
            i++;
            continue;
        }

        if (c === '\x07') {
            underlineOpen = !underlineOpen;
            result += underlineOpen ? '<u>' : '</u>';
            i++;
            continue;
        }

        if (c === '\x09' || c === '\x02') {
            i++;
            continue;
        }

        result += c;
        i++;
    }

    if (boldOpen) result += '</b>';
    if (underlineOpen) result += '</u>';

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

        // Surrogate pair (multi-byte emoji)
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

        // Single-character emoji ranges
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
