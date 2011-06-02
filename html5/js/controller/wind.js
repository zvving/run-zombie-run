var ws = null;
var ctrlId = "0"


$(function() {
    
	var hostIp = location.host
	ws = new WebSocket("ws://" + hostIp + ":3102/");
    ws.onmessage = function(evt) {
		var msgS = new MsgStruct( evt.data );
		switch(msgS.kind) {
			case "sys":
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
        debug("connected...");
        ws.send("sysSubController");
		chatSend("Hello, everyone~");
    };


	

	
	
	
	
	
});




function wsend( msg ) {

	ws.send( ctrlId + msg);
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




