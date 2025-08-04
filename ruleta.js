print("Ruleta.js has been loaded correctly, command #ruleta");

onCommand=function(yo,cmd,tu,ex){ if(cmd == "ruleta"){ bala = Math.floor(Math.random() * 7); sera_muerte = Math.floor(Math.random() * 7); if(bala == sera_muerte){ print("💀🔫"+yo.name+" bang bang, estas liquidado ⚰️");yo.disconnect();}else{ print(yo.name+" Sigues vivo, respira");}}}
