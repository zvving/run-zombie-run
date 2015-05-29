var ws = null;
var ctrlId = "0"


$(function() {
    
	var host = location.host;
	var hostIp = host.split(":")[0];
	ws = new WebSocket("ws://" + hostIp + ":3102/");
    ws.onmessage = function(evt) {
		var msgS = new MsgStruct( evt.data );
		switch(msgS.kind) {
			case "lik":
				handleLikMsg(msgS)
				break;
			case "msg":
				handleMsgMsg(msgS)
				break;
			default:
				alert("unkonw msg kind!");
				break;
		}
    };
    ws.onclose = function() {
        debug("socket closed");
    };
    ws.onopen = function() {
        debug("ws open...");
		//         ws.send("sysSubController");
		// chatSend("Hello, everyone~");
    };
	
});

function handleLikMsg(msgS) {
	switch(msgS.content) {
		case "ConnectOk":
			debug("connected!")
			ws.send("zlikWidInit")
			break;
		case "Inited":
			ws.send("flikIComeIn")
			break;
		default:
			alert("unkonw msg :" + msgS);
			break;
	}
}




function wsend( msg ) {

	ws.send( "f" + msg);
	debug("ws send:" + ctrlId + msg )	
	
}















/*
	d.addEventListener("touchstart", function(e){
	  e.preventDefault();
	  startX = e.targetTouches[0].clientX;
	  startY = e.targetTouches[0].clientY;
	  touching = true;
		debug("ce");
	});
*/




