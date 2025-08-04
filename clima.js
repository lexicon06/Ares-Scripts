var url1 = "http://api.weatherapi.com/v1/forecast.json?key=API_KEY&q=";
var url2 = "&days=1&aqi=no&alerts=no";
var busy = false;
var current_user = "";
var img = null;
var w_describe = "";
var w_temp = "";
var w_hum = "";
var w_wind = "";
var w_time = "";

function onLoad()
{
    print("\x0314script de clima cargado..");
}

function onCommand(userobj, cmd, target, args)
{
    if (cmd.substr(0,6) == "clima "){
            if (busy){
                print("\x0314"+userobj.name + ", intenta mas tarde..");
            }
            else
            {
                busy = true;
                current_user = ((target == null) ? userobj.name:target.name);
                var url = url1 + ((target == null) ? escape(cmd.substr(6)):target.externalIp) + url2;
                //print(url);
                var req = new HttpRequest();
                req.src = url;
                req.oncomplete = onJSONReceived;
                req.download();
            }
        }
}

function onHelp(userobj)
{
    print(userobj, "\x0314/clima <user_id>/<city>");
}

function onJSONReceived(args)
{
    if (args)
    {
        var json = JSON.parse(this.page);

        if (json.current.condition.text == null)
        {
            print("\x0314imposible encontrar el clima para " + current_user);
            resetScript();
        }
        else
        {
            
            if (json.current.condition.text != null)
                if (json.current.condition.text.length > 0)
                    w_describe = json.current.condition.text;

            w_temp = json.current.temp_c + "\u00b0C / " + json.current.temp_f + "\u00b0F";
            w_hum = json.current.humidity + "%";
            w_wind = json.current.wind_degree + "\u00b0 a " + json.current.wind_mph + "mph";

            w_time = json.location.localtime.split(" ")[1];

            pmoram = parseInt(w_time.split(":")[0]) >= 12 ? "p.m." : "a.m.";
            w_time = w_time + " " + pmoram;

            if (json.current.condition.icon != null)
                if (json.current.condition.icon.length > 0)
                {
                    var scr = new Scribble();
                    scr.src = "http:"+json.current.condition.icon;
                    scr.oncomplete = onImgReceived;
                    scr.download(json.location.name+", "+json.location.region+", "+json.location.country);
                    return;
                }

            showResult(json.location.name+", "+json.location.region+", "+json.location.country);
            resetScript();
        }
    }
    else
    {
        print("\x0314imposible encontrar el clima para " + current_user);
        resetScript();
    }
}

function onImgReceived(args)
{
    if (args)
        img = this;

    showResult(this.arg);
}

function resetScript()
{
    busy = false;
    current_user = "";
    img = null;
    w_describe = "";
    w_hum = "";
    w_temp = "";
    w_wind = "";
}

function showResult(tx)
{
    if (img != null)
    	print("\x06\x0314Solicitado por: \x06" + current_user);
        Users.local(function (u) { u.scribble(img); });
    print("\x06\x0314Clima para: \x06" + tx);
    print("\x06\x0314Estado: \x06" + w_describe);
    print("\x06\x0314Temperatura: \x06" + w_temp);
    print("\x06\x0314Humedad: \x06" + w_hum);
    print("\x06\x0314Viento: \x06" + w_wind);
    print("\x06\x0314Hora: \x06" + w_time);
    resetScript();
}

