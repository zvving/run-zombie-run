var ws;


$(function() {
	var host = location.host;
	var hostIp = host.split(":")[0];
	ws = new WebSocket("ws://" + hostIp + ":3101/");
    ws.onmessage = function(evt) {
		handleWsMsg( evt.data )
    };
    ws.onclose = function() {
        log.log("socket closed");
    };
    ws.onopen = function() {
        log.log("ws onopen...");
    };
});

function handleWsMsg( msg ) {
	var msgS = new MsgStruct( msg )
	switch(msgS.kind) {
		case "lik":
			handleLikMsg(msgS)
			break;
		case "ctl":
			handleCtlMsg(msgS)
			break;
		case "msg":
			handleMsgMsg(msgS)
			break;
		default:
			alert("unkonw msg kind!");
			break;
	}
	
	log.log("handle-id:"+ msgS.id + "|kind:" + msgS.kind 
		+ "|content:" + msgS.content)
}

function handleLikMsg( msgS ) {
	switch(msgS.content) {
		case "ConnectOk":
			tryFlyInit();
			break;
		case "IComeIn":
			windComeIn();
			break;
		case "WindLeave":
			windLeave();
			break;
		default:
			alert("unkonw msg kind!");
			break;
	}
}

function handleCtlMsg( msgS ) {
	if (gm.wPlayer == null ) {
		return;
	}
	
	switch( msgS.content ) {
		case "UpV":
			gm.wPlayer.aState	= SPEED_UP;
		break;
		case "KeepV":
			gm.wPlayer.aState = SPEED_KEEP;
		break;
		case "DownV":
			gm.wPlayer.aState	= SPEED_DOWN;
		break;
		case "DirLeft":
			gm.wPlayer.dirState = DIR_STATE_LEFT;
		break;
		case "DirRight":
			gm.wPlayer.dirState = DIR_STATE_RIGHT;
		break;
		case "DirNone":
			gm.wPlayer.dirState = DIR_STATE_NONE;
		break;
		case "X":
		case "Y":
		case "A":
		case "B":
			gm.wPlayer.onFire();
		break;
		case "Xend":
		case "Yend":
		case "Aend":
		case "Bend":
		break;
		case "F1":
			$("#btn_add_zombie").trigger('click')
			gm.pause()
		break;
		case "F2":
			gm.wRestart()
		break;
		case "F3":
			gm.addZombie()
		break;
		case "F4":
			gm.clearZombie()
		break;
		case "F5":
			gm.toggleDebug()
		break;
		case "F6":
		break;
		default:
			alert("unkonw msg contend! in ctl handle:" + msgS);
		break;

	}
}


function tryFlyInit() {
	ws.send("zlikFlyInit");
}

function windComeIn(){
	$("#w_player_bar").show(3000);
	gm.newWPlayer();
}

function windLeave(){
	$("#w_player_bar").hide(1000);
	gm.wPlayer = null;
}