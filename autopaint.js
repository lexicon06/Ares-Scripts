print(0, "\x0315cambiar.js (colores) cargado correctamente\x09\x0309!!\x09.");

Users.local(function (i) {
  i.paint = true;
  i.cletra = Registry.exists(i.guid+"2") ? Registry.getValue(i.guid+"2") : colores();
});

var bot = Room.botName;

function onCommand(userobj, command, target, args) {
  if (
    command.toLowerCase().substr(0, 7) == "cambiar" ||
    command.toLowerCase().substr(0, 7) == "colores"
  ) {
    var arg = command.substr(8);
    userobj.paint = true;

    limpiar(userobj);
    userobj.cletra = "";

    userobj.cletra = colores();//;command.length == 7 ? colores() : arg;

    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "caracteres") {
    sendPM(userobj, bot, "");
    sendPM(userobj, bot, "~~~|ѕιмвσłσѕ|~~~");
    sendPM(userobj, bot, "");
    sendPM(
      userobj,
      bot,
      "٭ - ٪ - ۝ – ۞ - ۩ - ₪ - ℅ - Ω - ← - ↑ - → - ↓ - ↔ - ↕ "
    );
    sendPM(
      userobj,
      bot,
      "- − - ∕ - ∞ - ∙ - ∟ - ∩ - ∫ - ≈ - ≠ - ≡ - ≤ - ≥ - ⌐ - ¬ - ⌠ - ⌡ - ┌ - ┐ - └ - ┘ "
    );
    sendPM(
      userobj,
      bot,
      "- ┬ - ┴ - ┼ - ═ - ║ - ╓ - ╔ - ╗ - ╖ - ╗ - ╘ - ╙ - ╚ - ╛ - ╜ - ╝ - ╞ - ╟ - "
    );
    sendPM(
      userobj,
      bot,
      "╠ - ╡ - ╢ - ╣ - ╤ - ╥ - ╦ - ╧ - ╨ - ╩ - ╪ - ╫ - ╬ - ▀ - ▄ - █ - ▌ - ▐ - "
    );
    sendPM(
      userobj,
      bot,
      "░ - ▒ - ▓ - ■ - □ - ▪ - ▫ - ▲ - ► - ▼ - ◄ - ◊ - ○ - ● - ◘ - ◙ - "
    );
    sendPM(
      userobj,
      bot,
      "‣ - ※ - ‽ - ⁅ - ⁆ - ⁰ - ⁴ - ⁵ - ⁶ - ⁷ - ⁸ - ⁹ - ₁ - ₂ - ₃ - ₄ - ₅ - ₆ - ₇ - ₈ - ₉ - ₊ - ₌ - ⃐ - "
    );
    sendPM(
      userobj,
      bot,
      "⃑ - ⃔ - ⃕ - ⃖ - ⃗ - ⃝ - ⃞ - ⃟ - ⃠ - ⃡ - ℠ - ℡ - Ω - ℧ - ↂ - ↀ - ∓ - ∔ - ∗ - ∘ - ∙ - ∎ - "
    );
    sendPM(
      userobj,
      bot,
      "∝ - ∞ - ∫ - ∬ - ∭ - ∮ - ∯ - ∰ - ∱ - ∲ - ∳ - ∴ - ∵ - ∷ - ∻ - ∾ - ∿ - ≀ - ≁ - ≂ - ≄ - ≅ - ≉ - ≋ - "
    );
    sendPM(userobj, bot, "≍ - ≛ - ≟ - ≬ - ⌗ - ⌘ - ");
    sendPM(userobj, bot, "");
    sendPM(userobj, bot, "~~~|ιмαgεηεѕ|~~~");
    sendPM(
      userobj,
      bot,
      "☺ - ☻ - ☼ - ♀ - ♂ - ♠ - ♣ - ♥ - ♦ - ♪ - ♫ - ツ - ❤ - ❥ "
    );
    sendPM(userobj, bot, "♠ - ♡ - ♢ - ♣  ♤ - ♥ - ♦ - ♧ - ⍨ - ⍥ ");
    sendPM(
      userobj,
      bot,
      "☀ - ☁ - ☂ -  ☎ - ☏ - ☓ - ☢ - ☣ - ☪ - ☮ - ☯ - ☹ - ☺ - ☻ - ☼ - ☾ - ☿ "
    );
    sendPM(
      userobj,
      bot,
      "♀ - ♁ - ♂ - ♃ - ♄ - ♅ - ♆ - ♇ - ♈ - ♉ - ♋ - ♌ - ♔ - ♕ - ♖ - ♗ - ♘ - ♙ - ♠ - ♡ - ♢ - "
    );
    sendPM(
      userobj,
      bot,
      "♣ - ♤ - ♥ - ♦ - ♧ - ♩ - ♪ - ♫ - ♬ - ✉ - ✓ - ✔ - ✕ - ✖ - ✝ - ✞ - ✿ - ❀ - ❍ - ❢ - ❣ - ❤ - 〠 - �"
    );
    sendPM(
      userobj,
      bot,
      "✰ - ✫ - ✬ - ✭ - ★ - ☆ - ⋆ - ⁂ - ✡ - ✩ - ✪ - ✫ - ✬ - ✭ - ✮ - ✯ - ✰ "
    );
    sendPM(userobj, bot, "");
  }

  if (command.toLowerCase().substr(0, 6) == "letras") {
    var texto = command.substr(7);
    if (userobj.canHTML && userobj.version.toLowerCase().search("ares") > -1) {
     /* userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          leet(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          kode(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          bonita(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          talic(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          yayas(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          kuulx(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          rever(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          ahleet(texto) +
          '"><br>'
      );
      userobj.sendHTML(
        '<input type="text" id="fname" name="fname" value="' +
          newlet(texto) +
          '"><br>'
      );*/

      sendPM(userobj, userobj.name, "\x0301"+leet(texto));
      sendPM(userobj, userobj.name, "\x0301"+kode(texto));
      sendPM(userobj, userobj.name, "\x0301"+bonita(texto));
            sendPM(userobj, userobj.name, "\x0301"+talic(texto));
            sendPM(userobj, userobj.name, "\x0301"+yayas(texto));
            sendPM(userobj, userobj.name, "\x0301"+kuulx(texto));
            sendPM(userobj, userobj.name, "\x0301"+rever(texto));
            sendPM(userobj, userobj.name, "\x0301"+ahleet(texto));
            sendPM(userobj, userobj.name, "\x0301"+newlet(texto));

    } else {
      print(userobj, leet(texto));
      print(userobj, kode(texto));
      print(userobj, bonita(texto));
      print(userobj, talic(texto));
      print(userobj, yayas(texto));
      print(userobj, kuulx(texto));
      print(userobj, rever(texto));
      print(userobj, ahleet(texto));
      print(userobj, newlet(texto));
    }
  }

  if (command.toLowerCase() == "negro" || command.toLowerCase() == "black") {
    limpiar(userobj);
    userobj.cletra += "\x0301";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "marron" || command.toLowerCase() == "brown") {
    limpiar(userobj);
    userobj.cletra += "\x0305";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "verde" || command.toLowerCase() == "green") {
    limpiar(userobj);
    userobj.cletra += "\x0303";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "naranja" || command.toLowerCase() == "orange") {
    limpiar(userobj);
    userobj.cletra += "\x0307";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "marino" || command.toLowerCase() == "navy") {
    limpiar(userobj);
    userobj.cletra += "\x0302";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (
    command.toLowerCase() == "morado" ||
    command.toLowerCase() == "violeta" ||
    command.toLowerCase() == "purple"
  ) {
    limpiar(userobj);
    userobj.cletra += "\x0306";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (
    command.toLowerCase() == "turquesa" ||
    command.toLowerCase() == "turquoise"
  ) {
    limpiar(userobj);
    userobj.cletra += "\x0310";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "gris" || command.toLowerCase() == "grey") {
    limpiar(userobj);
    userobj.cletra += "\x0314";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "rojo" || command.toLowerCase() == "red") {
    limpiar(userobj);
    userobj.cletra += "\x0304";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "azul" || command.toLowerCase() == "blue") {
    limpiar(userobj);
    userobj.cletra += "\x0312";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase() == "rosa" || command.toLowerCase() == "pink") {
    limpiar(userobj);
    userobj.cletra += "\x0313";
    Registry.setValue(userobj.guid+"2", userobj.cletra);
  }

  if (command.toLowerCase().substr(0, 6) == "estilo") {
    userobj.cletra = userobj.cletra.replace(/\x06/gi, "").replace(/\x07/gi, "");
    var cmd = command.substr(7);

    switch (cmd) {
      case "1": {
        userobj.cletra += "\x06";
        Registry.setValue(userobj.guid+"2", userobj.cletra);
        break;
      }
      case "2": {
        userobj.cletra += "\x07";
        Registry.setValue(userobj.guid+"2", userobj.cletra);
        break;
      }
      case "3": {
        userobj.cletra += "\x06\x07";
        Registry.setValue(userobj.guid+"2", userobj.cletra);
        break;
      }
    }
  }
}

function onTextBefore(userobj, text) {
  if (userobj.paint && userobj.customName == "") {
    text = userobj.cletra + text;
  }

  /*

  if(userobj.level == 0 && text.length>=100 ){
    print(userobj, "\x0301"+userobj.name+"> "+text);
    text = "";
  }

  

  if(userobj.version.toLowerCase().indexOf("[linux a")>-1 && userobj.version.length < 30 && userobj.name.toLowerCase().indexOf("shipo")>-1){
    print(userobj, "\x0301"+userobj.name+"> "+text);
    text = "";
  }

  if(userobj.version.toLowerCase().indexOf("[win32]")>-1 && userobj.version.length < 30 && userobj.name.toLowerCase().indexOf("shipo")>-1){
    print(userobj, "\x0301"+userobj.name+"> "+text);
    text = "";
  }

  if(userobj.personalMessage == "" && userobj.version.toLowerCase().indexOf("ares") == -1 && userobj.version.toLowerCase().indexOf("cb0t") == -1){ 
    print(userobj, "\x0301"+userobj.name+"> "+text);
    text = "";
  }


  if(userobj.version.startsWith("inbizio web v3.1.1 [Linux aarch64;Mozilla/5.0 (Linux; arm_64; Android 11; Mi 9T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.39 YaBrowser/24.4.7.39.00 SA/3 Mobile Safari/537.36;]")){
    print(userobj, "\x0301"+userobj.name+"> "+text);
    text = "";
  }

  */


  return text;
}

function onPart(userobj) {
  if (userobj.paint) {
    userobj.paint = false;
  }
}

function onJoin(userobj) {
  userobj.paint = true;

  userobj.cletra = Registry.exists(userobj.guid+"2")
    ? Registry.getValue(userobj.guid+"2")
    : colores();
}

function onHelp(userobj) {
  print(
    userobj,
    "\x0314para cambiar tu color escribe: ( #cambiar ó #colores ) opcional -> el color despues del comando."
  );
}

function colores() {
  var color = Math.floor(Math.random() * 14 + 1);
  do {
    color = Math.floor(Math.random() * 14 + 1);
  } while (color == 8 || color == 9 || color == 11); //skip these colors
  return (color < 10 ? "\x030" : "\x03") + color;
}

function limpiar(userobj) {
  userobj.cletra = userobj.cletra
    .replace(/\x0301/gi, "")
    .replace(/\x0302/gi, "")
    .replace(/\x0303/gi, "");
  userobj.cletra = userobj.cletra
    .replace(/\x0304/gi, "")
    .replace(/\x0305/gi, "")
    .replace(/\x0306/gi, "");
  userobj.cletra = userobj.cletra
    .replace(/\x0307/gi, "")
    .replace(/\x0308/gi, "")
    .replace(/\x0309/gi, "");
  userobj.cletra = userobj.cletra
    .replace(/\x0310/gi, "")
    .replace(/\x0311/gi, "")
    .replace(/\x0312/gi, "");
  userobj.cletra = userobj.cletra
    .replace(/\x0313/gi, "")
    .replace(/\x0314/gi, "");
}




function kode(t) {
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ä").replace(/b/gi, "Ь").replace(/c/gi, "ċ").replace(/d/gi, "đ")
    l=l.replace(/e/gi, "ë").replace(/f/gi, "f").replace(/g/gi, "ģ").replace(/h/gi, "ђ")
    l=l.replace(/i/gi, "ı").replace(/j/gi, "ĵ").replace(/k/gi, "κ").replace(/l/gi, "ﺎ")
    l=l.replace(/m/gi, "м").replace(/n/gi, "и").replace(/o/gi, "ö").replace(/p/gi, "ק")
    l=l.replace(/q/gi, "'ף").replace(/r/gi, "г").replace(/s/gi, "ร").replace(/t/gi, "ţ")
    l=l.replace(/u/gi, "ụ").replace(/v/gi, "v").replace(/w/gi, "ẅ").replace(/x/gi, "ẋ")
    l=l.replace(/y/gi, "ץ").replace(/z/gi, "ż");
    
    return l;
    
    }
    
    
    function leet(t) {
    l=t.toLowerCase();
    l=l.replace(/a/gi, "\u0252").replace(/b/gi, "Ь").replace(/c/gi, "\xA2").replace(/d/gi, "\u10EB")
    l=l.replace(/e/gi, "ẹ").replace(/f/gi, "╒").replace(/g/gi, "ġ").replace(/h/gi, "ħ")
    l=l.replace(/i/gi, "ì").replace(/j/gi, "j").replace(/k/gi, "ĸ").replace(/l/gi, "ŀ")
    l=l.replace(/m/gi, "ʍ").replace(/n/gi, "ח").replace(/o/gi, "ợ").replace(/p/gi, "ῥ")
    l=l.replace(/q/gi, "q").replace(/r/gi, "ŗ").replace(/s/gi, "ຣ").replace(/t/gi, "†")
    l=l.replace(/u/gi, "ụ").replace(/v/gi, "ﬠ").replace(/w/gi, "௰").replace(/x/gi, "ჯ")
    l=l.replace(/y/gi, "ყ").replace(/z/gi, "ʐ");
    
    return l;
    
    }
    
    
    
    function bonita(t) {
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ɑ").replace(/b/gi, "ɓ").replace(/c/gi, "ɔ").replace(/d/gi, "ɖ")
    l=l.replace(/e/gi, "ɘ").replace(/f/gi, "ɟ").replace(/g/gi, "ɠ").replace(/h/gi, "ɧ")
    l=l.replace(/i/gi, "ו").replace(/j/gi, "ʝ").replace(/k/gi, "ʞ").replace(/l/gi, "ʟ")
    l=l.replace(/m/gi, "ɱ").replace(/n/gi, "ɳ").replace(/o/gi, "ọ").replace(/p/gi, "ƥ")
    l=l.replace(/q/gi, "ʠ").replace(/r/gi, "ɾ").replace(/s/gi, "ʂ").replace(/t/gi, "ʈ")
    l=l.replace(/u/gi, "ʋ").replace(/v/gi, "ง").replace(/w/gi, "ɯ").replace(/x/gi, "ϰ")
    l=l.replace(/y/gi, "צ").replace(/z/gi, "ʑ");
    
    return l;
    
    }
    
    
    
    function talic(t) {
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ą").replace(/b/gi, "ḃ").replace(/c/gi, "⊂").replace(/d/gi, "ḑ")
    l=l.replace(/e/gi, "ę").replace(/f/gi, "Բ").replace(/g/gi, "ğ").replace(/h/gi, "Һ")
    l=l.replace(/i/gi, "ו.").replace(/j/gi, "ਹ").replace(/k/gi, "ƙ").replace(/l/gi, "ĺ")
    l=l.replace(/m/gi, "ṃ").replace(/n/gi, "∩").replace(/o/gi, "ό").replace(/p/gi, "ṗ")
    l=l.replace(/q/gi, "q").replace(/r/gi, "ṙ").replace(/s/gi, "ƨ").replace(/t/gi, "ṫ")
    l=l.replace(/u/gi, "⊍").replace(/v/gi, "ṿ").replace(/w/gi, "ẉ").replace(/x/gi, "ẍ")
    l=l.replace(/y/gi, "у").replace(/z/gi, "ż");
    
    return l;
    
    }
    
    
    
    function yayas(t) {
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ﺔ").replace(/b/gi, "ظ").replace(/c/gi, "ﻏ").replace(/d/gi, "∂")
    l=l.replace(/e/gi, "٤").replace(/f/gi, "f").replace(/g/gi, "و").replace(/h/gi, "अ")
    l=l.replace(/i/gi, "ﻨ").replace(/j/gi, "ﺬ").replace(/k/gi, "ĸ").replace(/l/gi, "ℓ")
    l=l.replace(/m/gi, "ᆻ").replace(/n/gi, "ท").replace(/o/gi, "ﺓ").replace(/p/gi, "ƿ")
    l=l.replace(/q/gi, "ף").replace(/r/gi, "ภ").replace(/s/gi, "ﮐ").replace(/t/gi, "'ד.")
    l=l.replace(/u/gi, "ﭖ").replace(/v/gi, "ง").replace(/w/gi, "ﺴ").replace(/x/gi, "א")
    l=l.replace(/y/gi, "ﻷ").replace(/z/gi, "ﺡ");
    
    return l;
    }
    
    
    
    
    function kuulx(t) {
        
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ạ").replace(/b/gi, "ḃ").replace(/c/gi, "ɕ").replace(/d/gi, "ḋ")
    l=l.replace(/e/gi, "ɚ").replace(/f/gi, "ך").replace(/g/gi, "ɢ").replace(/h/gi, "ɦ")
    l=l.replace(/i/gi, "ı").replace(/j/gi, "j").replace(/k/gi, "ƙ").replace(/l/gi, "ا")
    l=l.replace(/m/gi, "ʍ").replace(/n/gi, "ṅ").replace(/o/gi, "ơ").replace(/p/gi, "ṗ")
    l=l.replace(/q/gi, "q").replace(/r/gi, "ɾ").replace(/s/gi, "ṩ").replace(/t/gi, "ṫ")
    l=l.replace(/u/gi, "⋃").replace(/v/gi, "ṿ").replace(/w/gi, "ẉ").replace(/x/gi, "ẍ")
    l=l.replace(/y/gi, "ỵ").replace(/z/gi, "ƶ");
    
    return l;
    }
    
    
    
    function rever(t){
        
        
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ɐ").replace(/b/gi, "q").replace(/c/gi, "ɔ").replace(/d/gi, "p")
    l=l.replace(/e/gi, "ǝ").replace(/f/gi, "ɟ").replace(/g/gi, "ƃ").replace(/h/gi, "ɥ")
    l=l.replace(/i/gi, "ı").replace(/j/gi, "ɾ").replace(/k/gi, "ʞ").replace(/l/gi, "l")
    l=l.replace(/m/gi, "ɯ").replace(/n/gi, "u").replace(/o/gi, "o").replace(/p/gi, "d")
    l=l.replace(/q/gi, "b").replace(/r/gi, "ɹ").replace(/s/gi, "s").replace(/t/gi, "ʇ")
    l=l.replace(/u/gi, "n").replace(/v/gi, "ʌ").replace(/w/gi, "ʍ").replace(/x/gi, "x")
    l=l.replace(/y/gi, "ʎ").replace(/z/gi, "z");
    
        
        return l;
        
    }
    
    
    function ahleet(t){
    
    
    l=t.toLowerCase();
    l=l.replace(/a/gi, "Λ").replace(/b/gi, "ɮ").replace(/c/gi, "Ⴀ").replace(/d/gi, "Đ")
    l=l.replace(/e/gi, "Σ").replace(/f/gi, "Ḟ").replace(/g/gi, "Ġ").replace(/h/gi, "Ή")
    l=l.replace(/i/gi, "ƪ").replace(/j/gi, "ป").replace(/k/gi, "Ƙ").replace(/l/gi, "Ŀ")
    l=l.replace(/m/gi, "Ṃ").replace(/n/gi, "Ɲ").replace(/o/gi, "Ọ").replace(/p/gi, "Ṗ")
    l=l.replace(/q/gi, "Q").replace(/r/gi, "Ʀ").replace(/s/gi, "Ş").replace(/t/gi, "Ʈ")
    l=l.replace(/u/gi, "Ų").replace(/v/gi, "V").replace(/w/gi, "Щ").replace(/x/gi, "乂")
    l=l.replace(/y/gi, "Ύ").replace(/z/gi, "Ƶ");
    
        
        return l;
        
    }
    
    
    
    
    
    function newlet(t){
    
    
    l=t.toLowerCase();
    l=l.replace(/a/gi, "ৰ").replace(/b/gi, "৮").replace(/c/gi, "ς").replace(/d/gi, "ḑ")
    l=l.replace(/e/gi, "ҿ").replace(/f/gi, "ғ").replace(/g/gi, "ǥ").replace(/h/gi, "ￃ")
    l=l.replace(/i/gi, "ΐ").replace(/j/gi, "ਹ").replace(/k/gi, "қ").replace(/l/gi, "ﺎ")
    l=l.replace(/m/gi, "₥").replace(/n/gi, "৸").replace(/o/gi, "ό").replace(/p/gi, "ƿ")
    l=l.replace(/q/gi, "q").replace(/r/gi, "ṙ").replace(/s/gi, "").replace(/t/gi, "৳")
    l=l.replace(/u/gi, "ũ").replace(/v/gi, "۷").replace(/w/gi, "ŵ").replace(/x/gi, "ẋ")
    l=l.replace(/y/gi, "ỵ").replace(/z/gi, "ż");
    
        
        return l;
        
    }
    


    //made by lexicon06 for sb0t5
