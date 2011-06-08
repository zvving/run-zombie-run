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
	gm.fPlayer.showChat( chatContent )
}

document.onkeydown = function( event ) {
	
	switch ( event.keyCode ) {
		case 37://left
			gm.fPlayer.dirState = DIR_STATE_LEFT;
			break;
		case 38://up
			gm.fPlayer.aState	= SPEED_UP;
			break;
		case 39://right
			gm.fPlayer.dirState = DIR_STATE_RIGHT;
			break;
		case 40://down
			gm.fPlayer.aState	= SPEED_DOWN;
			break;
		case 32:
			gm.fPlayer.onFire();
		default:
			break;
	}

}

document.onkeyup = function( event ) {
	
	switch ( event.keyCode ) {
		case 37://left
			if (gm.fPlayer.dirState == DIR_STATE_LEFT) {
				gm.fPlayer.dirState = DIR_STATE_NONE;
			}
			break;
		case 38://up
			if (gm.fPlayer.aState == SPEED_UP) {
				gm.fPlayer.aState = SPEED_KEEP;
			}
			break;
		case 39://right
			if (gm.fPlayer.dirState == DIR_STATE_RIGHT) {
				gm.fPlayer.dirState = DIR_STATE_NONE;
			}
			break;
		case 40://down
			if (gm.fPlayer.aState == SPEED_DOWN) {
				gm.fPlayer.aState = SPEED_KEEP;
			}
			break;
		//control
		case 65://a
			gm.addZombie();
			break;
		case 67://c
			gm.clearZombie();
			break;
		case 68://d
			gm.toggleDebug();
			break;
		case 80://p
			gm.pause();
			break;
		case 82://r
			gm.fRestart();
			break;
		default:
			break;
	}

}