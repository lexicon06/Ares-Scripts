print("script cargado horoscopo");


var signos = new Array();
signos.push("Aries (21 de marzo — 19 de abril)");
signos.push("Tauro (20 de abril — 21 de mayo)");
signos.push("Geminis (21 de mayo — 20 de junio)");
signos.push("Cancer (21 de junio — 22 de julio)");
signos.push("Leo (23 de julio — 22 de agosto)");
signos.push("Virgo (23 de agosto — 22 de septiembre)");
signos.push("Libra (23 de septiembre — 22 de octubre)");
signos.push("Escorpio (23 de octubre — 21 de noviembre)");
signos.push("Sagitario (22 de noviembre — 21 de diciembre)");
signos.push("Capricornio (22 de diciembre — 19 de enero)");
signos.push("Acuario (20 de enero — 18 de febrero)");
signos.push("Piscis (19 de febrero — 20 de marzo)");

function onCommand(userobj, command, target, args) {
    if (command.substr(0, 10) == "horoscopo ") {
        ho = new HttpRequest();
        ho.utf = true;
        ho.src = "http://www.horoscopodehoy.com/horoscopo-de-hoy-" + command.substr(10);
        ho.oncomplete = function(e) {
            if (e) {
                resultado = this.page.split('<img class="img_signo" ')[1].split(' <div class="extras">')[0].replace(/\x3Cstrong\x3E/gi, "\x06").replace(/\x3C\x2Fstrong\x3E/gi, "\x06").replace(/\x3Cbr\x2F\x3E/gi, "\r\n").replace(/\x20\x20/gi, "").split("\x3C\x2Fdiv\x3E")[0].replace("Amor.", "Amor:").replace("Dinero y trabajo.", "Dinero y trabajo:").replace("Salud.", "Salud:");
                imagen = "https://www.horoscopodehoy.com" + resultado.split("\x22\x2F\x3E")[0].substr(5);
                display = new Scribble();
                display.src = imagen;
                display.oncomplete = function(e) {
                    if (e) print(user(this.arg.split("###")[0]), "\x0314HOROSCOPO @ " + ho.src.split("de-hoy-")[1].toUpperCase());
                    user(this.arg.split("###")[0]).scribble(this);
                    //print(user(this.arg.split("###")[0]), "\x0314" + this.arg.split("###")[1])
                    for (var i = 0; i < this.arg.split("###")[1].split(". ").length; i++) {
                        print(user(this.arg.split("###")[0]), "\x0314" + this.arg.split("###")[1].split(". ")[i] + ".");
                    }
                };
                display.download(this.arg + "###" + resultado.split("\x22\x2F\x3E")[1]);
            }
        }
        ho.download(userobj.name);
    }


    for (var o = 0; o < signos.length; o++) {
        if (command.toLowerCase() == signos[o].split(" (")[0].toLowerCase()) {
        	print(userobj, "\x0314\x09"+signos[o]);
            ho = new HttpRequest();
            ho.utf = true;
            ho.src = "http://www.horoscopodehoy.com/horoscopo-de-hoy-" + signos[o].split(" (")[0].toLowerCase();
            ho.oncomplete = function(e) {
                if (e) {
                    resultado = this.page.split('<img class="img_signo" ')[1].split(' <div class="extras">')[0].replace(/\x3Cstrong\x3E/gi, "\x06").replace(/\x3C\x2Fstrong\x3E/gi, "\x06").replace(/\x3Cbr\x2F\x3E/gi, "\r\n").replace(/\x20\x20/gi, "").split("\x3C\x2Fdiv\x3E")[0].replace("Amor.", "Amor:").replace("Dinero y trabajo.", "Dinero y trabajo:").replace("Salud.", "Salud:");
                    imagen = "https://www.horoscopodehoy.com" + resultado.split("\x22\x2F\x3E")[0].substr(5);
                    display = new Scribble();
                    display.src = imagen;
                    display.oncomplete = function(e) {
                        if (e) print(user(this.arg.split("###")[0]), "\x0314HOROSCOPO @ " + ho.src.split("de-hoy-")[1].toUpperCase());
                        user(this.arg.split("###")[0]).scribble(this);
                        //print(user(this.arg.split("###")[0]), "\x0314" + this.arg.split("###")[1])
                        for (var i = 0; i < this.arg.split("###")[1].split(". ").length; i++) {
                            print(user(this.arg.split("###")[0]), "\x0314" + this.arg.split("###")[1].split(". ")[i] + ".");
                        }
                    };
                    display.download(this.arg + "###" + resultado.split("\x22\x2F\x3E")[1]);
                }
            }
            ho.download(userobj.name);
        }
    }
}



function onHelp(u) {
    print(u, "#horoscopo <signo> ej #horoscopo geminis o tu signo como comando ej #geminis, #aries")
}

