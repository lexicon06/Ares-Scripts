// JavaScript Document

print(0, "images.js has been loaded correctly");
//set value of images to display
var MaxImages = 4;

function onHelp(u) {

    print(u, "#images <text>");

}

function onCommand(u, cmd) {
  if (cmd.toLowerCase().search("images") == 0) {
    var imgquery = cmd.substr(7);
    var showme = u.name;
    var looking_for_images = new HttpRequest();
    looking_for_images.src =
      "http://ar.images.search.yahoo.com/search/images;_ylt=A2KI9kIOZ6RSak0A8ISt9Qt.?p=" +
      escape(imgquery) +
      "&fr=sfp&ei=utf-8&n=60&x=wrt&y=Buscar";
    looking_for_images.oncomplete = search_images;
    looking_for_images.download(showme + "*#*" + imgquery);
  }
}

function search_images(e) {
  if (e) {
    var lines = this.page.split("</noscript></a>");
    var name = this.arg.split("*#*")[0];
    var textquery = this.arg.split("*#*")[1];
    var found = 0;

    print(user(name), "\x06\x0301Image results for:\x0310 " + textquery + "\r");
  }

  for (var i = 0; i < lines.length; i++)
    if (lines[i].indexOf("OIP.") != -1) {
      var imgs = lines[i].split("<img src='")[1].split("' style")[0];
      var ready2show = new Scribble();
      ready2show.src = imgs;
      ready2show.oncomplete = show_pictures;
      ready2show.download(name + "*#*" + imgs);
      found++;

      if (found >= MaxImages) {
        lines = null;
      }
    }

  if (found < 1) {
    print(user(name), "\x06\x0314Unable to show images with " + textquery);
  }
}

function show_pictures(e) {
  if (e) {
    var showthis = this;
    var name = this.arg.split("*#*")[0];
    var link = this.arg.split("*#*")[1];

    if(user(name).version.toLowerCase() == "ares" || user(name).version.toLowerCase() == "cb0t") {

      user(name).scribble(showthis);

      print(user(name), "\r\x0314Link: " + link + "\r");
      
    }else{

      print(user(name), "\r\x0314Link: " + link + ".jpg \r");

    }

  
  }
}


//made by lexicon06 for sb0t5 powered by yahoo images
