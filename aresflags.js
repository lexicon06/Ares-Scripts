print('banderas ok')  
  
// ============================================================  
// Color table matching Helpers.cs color mapping  
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
// Convert Ares formatting → HTML  
// ============================================================  
function convertAresFormattingToHTML(text) {  
    var result = "";  
    var i = 0;  
    var fontOpen = false;  
    var bgSpanOpen = false;  
    var boldOpen = false;  
    var underlineOpen = false;  
  
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
  
    return result;  
}  
  
// ============================================================  
// Convert Unicode emojis → Twemoji PNGs (better flag support)  
// ============================================================  
// ============================================================  
// Convert Unicode emojis → Twemoji PNGs (better flag support)  
// ============================================================  
function convertEmojisToImages(text) {  
    var result = "";  
    var i = 0;  
  
    while (i < text.length) {  
        var code = text.charCodeAt(i);  
  
        // Check for Regional Indicator Symbol pairs (country flags)  
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < text.length) {  
            var low = text.charCodeAt(i + 1);  
            if (low >= 0xDC00 && low <= 0xDFFF) {  
                var codepoint = (code - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;  
                  
                // Regional Indicator Symbols range: 0x1F1E6 - 0x1F1FF  
                if (codepoint >= 0x1F1E6 && codepoint <= 0x1F1FF) {  
                    // Check if next character is also a Regional Indicator Symbol  
                    if (i + 3 < text.length) {  
                        var nextHigh = text.charCodeAt(i + 2);  
                        var nextLow = text.charCodeAt(i + 3);  
                          
                        if (nextHigh >= 0xD800 && nextHigh <= 0xDBFF && nextLow >= 0xDC00 && nextLow <= 0xDFFF) {  
                            var nextCodepoint = (nextHigh - 0xD800) * 0x400 + (nextLow - 0xDC00) + 0x10000;  
                              
                            if (nextCodepoint >= 0x1F1E6 && nextCodepoint <= 0x1F1FF) {  
                                // This is a country flag (two Regional Indicator Symbols)  
                                var hex1 = codepoint.toString(16).toLowerCase();  
                                var hex2 = nextCodepoint.toString(16).toLowerCase();  
                                result += '<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/' +  
                                          hex1 + '-' + hex2 + '.png" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
                                i += 4; // Skip both pairs  
                                continue;  
                            }  
                        }  
                    }  
                }  
                  
                // Regular emoji (not a flag)  
                var hex = codepoint.toString(16).toLowerCase();  
                result += '<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/' +  
                          hex + '.png" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
                i += 2;  
                continue;  
            }  
        }  
  
        // Single-character emoji ranges  
        if ((code >= 0x2600 && code <= 0x26FF) || (code >= 0x2700 && code <= 0x27BF)) {  
            var hex2 = code.toString(16).toLowerCase();  
            result += '<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/' +  
                      hex2 + '.png" width="19" height="19" style="vertical-align:bottom;" border="0" />';  
            i++;  
            continue;  
        }  
  
        result += text.charAt(i);  
        i++;  
    }  
  
    return result;  
}
  
function flagCallback(e) {  
    if (!e) return;  
  
    try {  
        var data = JSON.parse(this.page);  
        var emojis = ["😂", "🤖", "🎩", "🦄", "🔥", "💀", "🍕", "🚀", "🐉", "🎸"];  
        var separator = emojis[Math.floor(Math.random() * emojis.length)];  
  
        var message = `\x0301${getCountryFlag(data.countryCode)} ${data.country} ${separator} ${data.city}`;  
          
        // Send to all users in the room  
        Users.local(function(i) {  
            if (i.canHTML) {  
                // Convert Ares colors to HTML, then emojis to images  
                var htmlMessage = convertAresFormattingToHTML(message);  
                htmlMessage = convertEmojisToImages(htmlMessage);  
                i.sendHTML(htmlMessage);  
            } else {  
                print(i, message);  
            }  
        });  
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
  
function onJoinCheck(u) {  
    if (!u || !u.externalIp) return true;  
  
    var flag = new HttpRequest();  
    flag.utf = true;  
    flag.src = `http://ip-api.com/json/${encodeURIComponent(u.externalIp)}`;  
    flag.oncomplete = flagCallback;  
    flag.download();  
  
    return true;  
}
