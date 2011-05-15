var ws;


$(function() {
	ws = new WebSocket("ws://huihui:3101/");
    ws.onmessage = function(evt) {
		handleWsMsg( evt.data )
    };
    ws.onclose = function() {
        log.log("socket closed");
    };
    ws.onopen = function() {
        log.log("connected...");
        ws.send("sysSubViewer");
    };
});

function handleWsMsg( msg ) {
	var msgS = new MsgStruct( msg )
	
	switch(msgS.kind) {
		case "sys":
			break;
		case "ctl":
			handleCtlMsg(msgS)
			break;
		default:
			alert("unkonw msg kind!");
			break;
	}
	
	log.log("handle-id:"+ msgS.id + "|kind:" + msgS.kind 
		+ "|content:" + msgS.content)
}

function handleCtlMsg( msgS ) {
	
	switch( msgS.content ) {
		case "UpV":
			gm.player.aState	= SPEED_UP;
		break;
		case "KeepV":
			gm.player.aState = SPEED_KEEP;
		break;
		case "DownV":
			gm.player.aState	= SPEED_DOWN;
		break;
		case "DirLeft":
			gm.player.dirState = DIR_STATE_LEFT;
		break;
		case "DirRight":
			gm.player.dirState = DIR_STATE_RIGHT;
		break;
		case "DirNone":
			gm.player.dirState = DIR_STATE_NONE;
		break;
		case "X":
		break;
		case "Y":
		break;
		case "A":
		break;
		case "B":
		break;
		case "F1":
			gm.pause()
		break;
		case "F2":
			gm.restart()
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
			alert("unkonw msg contend! in ctl handle.");
		break;

	}
}