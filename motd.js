print(0, "Motd image script has been loaded successfully.");

var DEFAULT_IMG = 'http://54.37.13.174/motd.png';
var motdDisplay = "";

var motdImage = Registry.getValue("motd") == null ? saveAndReturnKv("motd", DEFAULT_IMG):Registry.getValue("motd");


function saveAndReturnKv(key, value){
    Registry.setValue(key, value);
    return Registry.getValue("motd");
}


function onCommand(userobj, command, target, extra){
    if(command.substring(0,5).toLowerCase() == "motd " && userobj.level == 3){
        var newMotd = command.substr(5).replace(/ /gi, "");
        motdImage = saveAndReturnKv("motd", newMotd);
        print(0, "The image motd has been replaced successfully to: "+motdImage);
    }
}



crearMotd();


function onJoin(userobj){
    if(motdDisplay!=""){
        userobj.scribble(motdDisplay);
    }
}


function crearMotd(){
    var motd=new Scribble();
    print(0, "Creating motd image with the given picture: "+motdImage);
    motd.src=motdImage;
    motd.oncomplete=function(e){motdDisplay=this;}
    motd.download();

}
