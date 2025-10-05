// =============================================
// Local MOTD Script Installation Instructions
// =============================================

// INSTALLATION STEPS:
// 1. Create a folder named 'localmotd.js' in your scripts directory
// 2. Place this script file inside the folder, naming it 'localmotd.js'
// 3. Create a 'Data' subfolder inside 'localmotd.js'
// 4. Place your 'motd.jpg' image file inside the Data folder
//
// USAGE:
// Load the script in your room using: /loadscript localmotd.js
//
// FEATURES:
// - Displays welcome message when script loads
// - Automatically shows MOTD image to joining users
// =============================================

var bienvenida;

iniciarPrograma();

function iniciarPrograma() {
    presentacion();
    cargarMotd();
}

function cargarMotd() {
    var motd = new Scribble();
    bienvenida = motd.load("motd.jpg");
    print(0, "✓ MOTD loaded successfully");
}

function presentacion() {
    print(0, "🎯 MOTD.js activated");
}

function onJoin(usuario) {
    usuario.scribble(bienvenida);
}
