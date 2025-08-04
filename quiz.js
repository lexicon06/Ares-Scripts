print(0, "quiz.js has been loaded correctly");

try {
  quiztxt = File.load("quiz.txt").split("\n");
} catch (e) {
  quiztxt = new Array();
}

if (quiztxt.length < 1) {
  quiztxt.push("Q:Example question");
  quiztxt.push("A:Example answer[or]Answer Example");

  File.save("quiz.txt", quiztxt.join("\r\n"));
  print(
    0,
    "quiz.txt now has been created, place questions and answer in: \x5CScripting\x5Cquiz\x2Ejs\x5CData\x5Cquiz\x2Etxt"
  );
}



try {
  template = File.load("quiz_template.ini").split("\n");
} catch (e) {
  template = new Array();
}



if (template.length < 1) {





  template[0] = "\u2591\u2591\u2591\u2591\u2591\u2591\u2591";
  template[1] = "\x5BQUIZ\x5D\u2591";
  template[2] = "\u2591\u2591\u2591\u2591\u2591\u2591\u2591";
  template[3] = "string=\x0314Porfavor primero cargue algunas preguntas";
  template[4] =
    "string=\x0314Trivia ha sido iniciada por \x0310+n\x0314 - buena suerte!! :P";
  template[5] = "string=\x0314Trivia detenida por \x0310+n";
  template[6] = "string=\x0301Ó";
  template[7] = "string=\x0314Pregunta \x0310+x \x0314de \x0310+y";
  template[8] = "string=\x0301(I) +q";
  template[9] = "string=\x0314Tiempo fuera!!";
  template[10] = "string=\x0314La Respuesta era: \x0310+a";
  template[11] = "string=\x0314Estas personas contestaron bien:";
  template[12] = "string=\x0314(N) Nadie ha respondido correctamente (N)";
  template[13] = "string=(H)\x0310 +n \x0315[\x0301+p \x0314points\x0315]";
  template[14] =
    "string=\x0314Bien hecho \x0310+n\x0314, has contestado primero!! :)";
  template[15] =
    "string=\x0314Bien hecho \x0310+n\x0314, has contestado segundo!! :)";
  template[16] =
    "string=\x0314Bien hecho \x0310+n\x0314, has contestado correctamente!! :)";
  template[17] =
    "string=\x0314La trivia ha finalizado - aqui estan los resultados finales!!";
  template[18] =
    "string=\x0314(N) Nadie ha contestado ninguna de las preguntas correctamente (N)";
  template[19] = "string=\x0310+n \x0314recibió \x0301+p \x0314puntos";
  template[20] =
    "string=(H) (H) (H) \x0310+n \x0314ha ganado el juego con \x0301+p \x0314puntos!! (H) (H) (H)";

  File.save("quiz_template.ini", template.join("\r\n"));
  print(0, "quiz_template.ini template has been created successfully");
}

for (key in template) {
  template[key] = FixTemplate(template[key]);
}




var quizend = quiztxt.length;
var qcount = 1;
var restype = true;
var points = 3;
var quiztimer = 0;
var quizon = false;
var number = 0;
var dn = "";
var wn = "";
var PlayersOk = 0;
var cpts = new Array();
var splayers = true;

for (var calc = 0; calc < 100; calc++) {
  cpts[calc] = 0;
}


function cleanText(s) {

  s = s.toLowerCase();

  s = stripColors(s);

  return s.replace(/[^a-zA-ZáàéèíìóòúùáàÁÀñÑ0-9 ]+/g, '');
}


function onTextBefore(u, t) {
  if (restype === false) {
    var answers = quiztxt[number].substr(2).split("[or]");

    var answer = stripColors(t.toLowerCase());

    for (var o = 0; o < answers.length; o++) {
      if (answer.indexOf(cleanText(answers[o])) != -1) {
        if (!u.tstr) {
          if (points == 1) {
            print(u, template[16].substring(7).replace(/\x2Bn/gi, u.name));

            u.tstr = true;
            correct.push(u.name);

            if (u.pts == null) {
              u.pts = 0;
            }

            u.pts = u.pts + points;
          }

          if (points == 2) {
            print(u, template[15].substring(7).replace(/\x2Bn/gi, u.name));
            u.tstr = true;
            correct.push(u.name);

            if (u.pts == null) {
              u.pts = 0;
            }

            u.pts = u.pts + points;
            points = points - 1;
          }

          if (points == 3) {
            print(u, template[14].substring(7).replace(/\x2Bn/gi, u.name));
            u.tstr = true;
            correct.push(u.name);

            if (u.pts == null) {
              u.pts = 0;
            }

            u.pts = u.pts + points;
            points = points - 1;
          }
        }
      }
    }
  }

  return t;
}

function getScores() {
  Users.local(function (P) {
    if (P.pts != null) {
      PlayersOk++;
      cpts[PlayersOk - 1] = P.pts;
    }
  });
}

function resetScores() {
  Users.local(function (P) {
    if (P.pts != null) {
      P.pts = 0;
    }
  });
}

function FixTemplate(t) {
  t = t
    .replace(/\xEF\xBB\xBF/gi, "")
    .replace(/\x02\x39/gi, "\x09")
    .replace(/\x02\x36/gi, "\x06")
    .replace(/\x02\x37/gi, "\x07")
    .replace(/\x02\x33/gi, "\x03")
    .replace(/\x02\x35/gi, "\x05");
  return t;
}

function findMax(arr) {
  return !arr ? -1 : eval("Math.max(" + arr + ")");
}

function onTimer() {
  if (quizon) {
    if (quiztimer >= 20 && number >= quizend) {
      print(0, "");
      print(0, template[17].substring(7));
      print(0, "");
      quiztimer = 0;
      restype = true;
      number = 0;
      qcount = 1;
      quizon = false;
      getScores();
      /* latest fix..
var arr = [11,2,3,565,53,2,955,15846,9898568,184845]; Users.local(function(i){ if(i.pts == eval("Math.max("+arr+")")){ print(i.name+" winner");}});
*/
      //var ws = Math.max(cpts[0], cpts[1], cpts[2], cpts[3], cpts[4], cpts[5], cpts[6], cpts[7], cpts[8], cpts[9], cpts[10], cpts[11], cpts[12], cpts[13], cpts[14], cpts[15], cpts[16], cpts[17], cpts[18], cpts[19], cpts[20], cpts[21], cpts[22], cpts[23], cpts[24], cpts[25]); old
      var ws = findMax(cpts); //new

      if (PlayersOk < 1) {
        print(0, "");
        print(0, template[18].substring(7));
        print(0, "");

        splayers = false;
      }

      if (splayers) {
        print(0, "");

        Users.local(function (d) {
          if (d.pts > 0 && d.pts != null) {
            print(
              0,
              template[19]
                .substring(7)
                .replace(/\x2Bn/gi, d.name)
                .replace(/\x2Bp/gi, d.pts)
            );
          }
        });
        print(0, "");
      }

      Users.local(function (k) {
        //get the winner
        if (k.pts == ws) {
          wn = k.name;
          dn = wn;
        }
      });

      Users.local(function (x) {
        //if game is a draw
        if (x.pts == ws && x.name != wn) {
          dn = dn + " & " + x.name;
        }
      });

      if (splayers) {
        for (var fl = 0; fl < 5; fl++) {
          print(
            0,
            template[20].substring(7).replace(/\x2Bn/gi, dn).replace(/\x2Bp/gi, ws)
          );
        }
      }
    }

    if (quiztimer >= 20 && !restype) {
      var thisanswer = quiztxt[number]
        .substr(2)
        .replace(/\x5B\x6F\x72\x5D/gi, " " + template[6].substring(7) + " ");
      print(0, "");
      print(0, template[9].substring(7));
      print(0, "");
      print(0, template[10].substring(7).replace(/\x2Ba/gi, thisanswer));

      quiztimer = 0;
      restype = true;
      number++;
      qcount++;
      points = 3;

      if (correct.length > 0) {
        print(0, "");
        print(0, template[11].substring(7));
        print(0, "");
      }

      if (correct.length < 1) {
        print(0, "");
        print(0, template[12].substring(7));
        print(0, "");
      }

      for (var i = 0; i < correct.length; i++) {
        if (i == 0) {
          print(
            0,
            template[13]
              .substring(7)
              .replace(/\x2Bn/gi, correct[i])
              .replace(/\x2Bp/gi, "3")
          );
        }
        if (i == 1) {
          print(
            0,
            template[13]
              .substring(7)
              .replace(/\x2Bn/gi, correct[i])
              .replace(/\x2Bp/gi, "2")
          );
        }
        if (i > 1) {
          print(
            0,
            template[13]
              .substring(7)
              .replace(/\x2Bn/gi, correct[i])
              .replace(/\x2Bp/gi, "1")
          );
        }
      }
    }

    if (quiztimer >= 20 && restype) {
      if (quiztxt[number] != "") {
        print(0, "");
        print(
          0,
          template[7]
            .substring(7)
            .replace(/\x2Bx/gi, qcount)
            .replace(/\x2By/gi, quiztxt.length / 2)
        );
        print(0, "");
        var imgs = quiztxt[number].substring(2).split("###");
        if (imgs.length == 1) {
          print(
            0,
            template[8].substr(7).replace(/\x2Bq/gi, quiztxt[number].substr(2))
          );
          print(0, "");
        } else {
          var scribble = new Scribble();
          scribble.src = imgs[1];
          scribble.oncomplete = scribbleReceived;
          scribble.download(template[8].substr(7).replace(/\x2Bq/gi, imgs[0]));
        }
        quiztimer = 0;
        restype = false;
        number++;
        correct = new Array();

        Users.local(function (c) {
          c.tstr = false;
        });
      }

      if (quiztxt[number] == "") {
        quiztimer = 20;
        number = quizend + 1;
      }
    }
  }

  quiztimer++;
}

function scribbleReceived(e) {
  if (e) {
    var scribble = this;
    var name = this.arg;

    Users.local(function (u) {
      u.scribble(scribble);

      print(u, name);

      print(u, "");
    });
  }
}

function onCommand(u, cmd, tu, ex) {
  //if (cmd == "xd") {

  //for (var w = 0; w < template.length; w++) {
  // print(template[w]);

  //}

  //}

  if (cmd.toLowerCase().search("game quiz") == 0 && u.level > 0) {
    if (cmd.toLowerCase().substring(10) == "start") {
      if (quizon) {
        // game in progress
      }
      if (!quizon) {
        try {
          quiztxt = File.load("quiz.txt").split("\n");
        } catch (e) {
          quiztxt = new Array();
        }
        if (quiztxt[0] != null) {
          print(0, template[4].substring(7).replace(/\x2Bn/gi, u.name));
          quiztimer = 0;
          number = 0;
          quizend = quiztxt.length;
          qcount = 1;
          restype = true;
          correct = new Array();
          points = 3;
          quizon = true;
          splayers = true;
          wn = "";
          dn = "";
          PlayersOk = 0;
          cpts = new Array();
          for (var calc = 0; calc < 100; calc++) {
            cpts[calc] = 0;
          }
          resetScores(); //clear past scores
        } else {
          print(
            0,
            template[3].substring(7).replace(/\x2Bn/gi, u.name) +
              " - \x5CScripting\x5C" +
              scriptName() +
              "\x5CData\x5Cquiz.txt"
          );
        }
        Users.local(function (m) {
          if (m.tstr) {
            m.pts = 0;
            m.tstr = false;
          }
        });
      }
    }
    if (cmd.toLowerCase().substring(10) == "stop") {
      if (!quizon) {
        // no game in progress
      } else {
        print(0, template[5].substring(7).replace(/\x2Bn/gi, u.name));
        quizon = false;
      }
    }
  }
}

function onHelp(u) {
  if (u.level > 0) {
    print(u, "#game quiz <start | stop>");
  }
}
