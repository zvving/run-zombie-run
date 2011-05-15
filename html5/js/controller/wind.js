

function init() {
    

    ws = new WebSocket("ws://huihui:3102/");
    ws.onmessage = function(evt) {
        debug("Message: " + evt.data);
    };
    ws.onclose = function() {
        debug("socket closed");
    };
    ws.onopen = function() {
        debug("connected...");
        ws.send("sysSubController");
    };


	

	
	
	
	
	
};




function wsend( msg ) {
	ws.send( ctrlId + msg)
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




