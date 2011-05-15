var gm = new GlobalManager();
var cx;

var infoFps;
var infoFTime;
var infoCps;
var infoCTime;
var infoZombieList;
var audioRestart;
var audioDie;
var audioPu;


$(function() {
	var fCanvas = document.getElementById("f_canvas");
	globalCompositeOperation = "copy";
	
	infoFps		= document.getElementById("fps");
	infoFTime	= document.getElementById("fps_time");
	infoCps		= document.getElementById("cps");
	infoCTime	= document.getElementById("cps_time");
	infoZombieList	= document.getElementById("zombie_list_number");
	
	audioRestart = document.getElementById("audio_restart");
	audioDie = document.getElementById("audio_die");
	audioPu = document.getElementById("audio_pu");
	
	cx = fCanvas.getContext("2d");
	
	gm.start();
	
	for (i=0; i<20; i++) {
		gm.addZombie();
	}
});