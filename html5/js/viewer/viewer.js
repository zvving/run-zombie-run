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

var $user1;


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
	
	$user1 = $("#user1")
	
	cx = fCanvas.getContext("2d");
	
	gm.start();
	
	for (i=0; i<20; i++) {
		gm.addZombie();
	}
});


function IHandleMsgMsg ( userName, chatContent) {
	gm.player.showChat( chatContent )
}