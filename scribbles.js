print("scribble script");

var admins_only = true;

function onLoad()
{
    if (Registry.exists("admin"))
        admins_only = Registry.getValue("admin") == "on";
    else
        Registry.setValue("admin", "on");
}

function onCommand(userobj, command, target, args)
{
    if (userobj.level > 0)
    {
        if (command == "scribbleall on")
        {
            Registry.setValue("admin", "off");
            admins_only = false;
            print(userobj.name + " sets scribble command for all users");
        }
        else if (command == "scribbleall off")
        {
            Registry.setValue("admin", "on");
            admins_only = true;
            print(userobj.name + " sets scribble command for admins only");
        }
    }

    if (userobj.level > 0 || !admins_only)
        if (command.indexOf("scribble ") == 0)
        {
            var scribble = new Scribble();
            scribble.src = command.substr(9);
            scribble.oncomplete = scribbleReceived;
            scribble.download(userobj.name);
        }
}

function onHelp(userobj)
{
    if (userobj.level > 0)
        print(userobj, "#scribbleall <on | off>  (sets scribble command to admin only)");

    if (userobj.level > 0 || !admins_only)
        print(userobj, "#scribble <url>  (send scribble to room)");
}

function scribbleReceived(e)
{
    if (e)
    {
        var scribble = this;
        var name = this.arg;

        Users.local(function (u)
        {
            print(u, "\x0314--- From " + name);
            u.scribble(scribble);
        });
    }
    else print("unable to download " + this.arg + "'s scribble - check link and try again!");
}
