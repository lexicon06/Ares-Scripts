// ============================================================
//  Auto-Translator v1.0
//  Description: Detects messages starting with a language pair
//  (e.g., "esen Hola") and translates them using Google Translate.
//
//  Example usage:
//    esen Hola -> translates from Spanish (es) to English (en)
//
//  Dependencies: HttpRequest, stripColors, user(), print()
//  Compatibility: ES5 / Ares Script Engine
// ============================================================

// Supported ISO language codes
var langCodes = [
  "ar", "de", "en", "es", "fr", "it",
  "ja", "ko", "nl", "pl", "pt", "ru",
  "sv", "bg", "tl", "tr", "pl"
];

/**
 * Called after a user sends a message.
 * Detects translation prefixes like "esen" and initiates a translation request.
 */
function onTextAfter(userobj, text) {
  var cleanText = stripColors(text).toLowerCase();

  for (var i = 0; i < langCodes.length; i++) {
    for (var j = 0; j < langCodes.length; j++) {
      if (i == j) continue; // skip same-language pairs

      var prefix = langCodes[i] + langCodes[j] + " ";
      if (cleanText.indexOf(prefix) === 0) {
        // Extract the message after the prefix
        var message = stripColors(text).substring(5);

        // Build Google Translate API request
        var translate = new HttpRequest();
        var uri = "http://translate.googleapis.com/translate_a/single" +
          "?client=gtx&sl=" + langCodes[i] +
          "&tl=" + langCodes[j] +
          "&dt=t&q=" + encodeURIComponent(message);

        translate.src = uri;
        translate.method = "get";
        translate.utf = true;
        translate.oncomplete = translationHandler;

        // Store translation pair for callback use
        userobj.translate = langCodes[i] + langCodes[j];
        translate.download(userobj.id);

        return; // stop after first match
      }
    }
  }
}

/**
 * Handles the HTTP response from Google Translate.
 * Displays the translated text to the same room where it was sent.
 */
function translationHandler(e) {
  if (!e) return;

  try {
    var data = JSON.parse(this.page);
    var targetUser = user(parseInt(this.arg));
    var translation = data[0][0][0];

    var output = "\x0312G\x0304o\x0307o\x0312g\x0303l\x0304e\x0315 (" +
      targetUser.translate +
      ")\x0301:\x20\x0314 " + translation;

    print(targetUser.vroom, output);
  } catch (err) {
    print("Translation error: " + err);
  }
}
