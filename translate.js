langCodes = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "it",
  "ja",
  "ko",
  "nl",
  "pl",
  "pt",
  "ru",
  "sv",
  "bg",
  "tl",
  "tr",
  "pl",
];

//function onCommand(userobj, command, tUser, arguments) {
function onTextAfter(userobj, text){
  for (var i = 0; i < langCodes.length; i++) {
    for (var j = 0; j < langCodes.length; j++) {
      if (i == j) continue;

      if (
        stripColors(text).toLowerCase().startsWith(langCodes[i] + langCodes[j]+" ")
      ) {
        var text = stripColors(text).substring(5);
        var translate = new HttpRequest();
        var uri = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=${langCodes[i]}&tl=${langCodes[j]}&dt=t&q=${encodeURIComponent(text)}`;
        translate.src = uri;
        userobj.translate = langCodes[i] + langCodes[j];
        translate.method = 'get';
        translate.utf = true;
        translate.oncomplete = translationHandler;
        translate.download(userobj.id);
      }
    }
  }
}

function translationHandler(e){
    if(e){
        var data = JSON.parse(this.page);
        var outputTextTranslated = `\x0312G\x0304o\x0307o\x0312g\x0303l\x0304e\x0315\x20(${user(parseInt(this.arg)).translate})\x0301:\x20\x0314\x20${data[0][0][0]}`;

        print(user(parseInt(this.arg)).vroom, outputTextTranslated);
    }
}
