var ws;
var ctrlId = "0"


var dUpBtn;
var dDownBtn;
var currVBtn = null;
var changeVing = -1;


var dxBtn;
var dyBtn;
var daBtn;
var dbBtn;

var dF1Btn;
var dF2Btn;
var dF3Btn;
var dF4Btn;
var dF5Btn;
var dF6Btn;


// Acceleration
var ax = 0;
var ay = 0;
var az = 0;

var delay = 10;
var vMultiplier = 0.01;


var dir = 0;




$(function() {
	
	//控制按钮行为注册
	dUpBtn = document.getElementById("up_btn");
	dUpBtn.addEventListener("touchstart", upTouchStart, false);
	dUpBtn.addEventListener("touchmove", touchMove, false);
	dUpBtn.addEventListener("touchend", touchEnd, false);
	dUpBtn.addEventListener("touchcancel", touchCancel, false);
	dDownBtn = document.getElementById("down_btn");
	dDownBtn.addEventListener("touchstart", downTouchStrart, false);
	dDownBtn.addEventListener("touchmove", touchMove, false);
	dDownBtn.addEventListener("touchend", touchEnd, false);
	dDownBtn.addEventListener("touchcancel", touchCancel, false);
	
	dxBtn = document.getElementById("x_btn")
	dxBtn.addEventListener("touchstart", function(e) {
		e.preventDefault();
		wsend("ctlX");
		$(dxBtn).addClass("doWhite")
	}, false)
	dxBtn.addEventListener("touchchange", function(e) {
		e.preventDefault();
	}, false)
	dxBtn.addEventListener("touchend", function(e) {
		e.preventDefault();
		wsend("ctlXend");
		$(dxBtn).removeClass("doWhite")
	}, false)
	dyBtn = document.getElementById("y_btn")
	dyBtn.addEventListener("touchstart", function(e) {
		e.preventDefault();
		wsend("ctlY");
		$(dyBtn).addClass("doWhite")
	}, false)
	dyBtn.addEventListener("touchchange", function(e) {
		e.preventDefault();
	}, false)
	dyBtn.addEventListener("touchend", function(e) {
		e.preventDefault();
		wsend("ctlYend");
		$(dyBtn).removeClass("doWhite")
	}, false)
	daBtn = document.getElementById("a_btn")
	daBtn.addEventListener("touchstart", function(e) {
		wsend("ctlA");
		$(daBtn).addClass("doWhite")
	}, false)
	daBtn.addEventListener("touchend", function(e) {
		$(daBtn).removeClass("doWhite")
	}, false)
	dbBtn = document.getElementById("b_btn")
	dbBtn.addEventListener("touchstart", function(e) {
		wsend("ctlB");
		$(dbBtn).addClass("doWhite")
	}, false)
	dbBtn.addEventListener("touchend", function(e) {
		debug("be");
		$(dbBtn).removeClass("doWhite")
	}, false)
	
	//f1-f6行为注册
	dF1Btn = document.getElementById("f1_btn")
	dF1Btn.addEventListener("touchstart", function(e) {
		wsend("ctlF1");
	}, false)
	dF2Btn = document.getElementById("f2_btn")
	dF2Btn.addEventListener("touchstart", function(e) {
		wsend("ctlF2");
	}, false)
	dF3Btn = document.getElementById("f3_btn")
	dF3Btn.addEventListener("touchstart", function(e) {
		wsend("ctlF3");
	}, false)
	dF4Btn = document.getElementById("f4_btn")
	dF4Btn.addEventListener("touchstart", function(e) {
		wsend("ctlF4");
	}, false)
	dF5Btn = document.getElementById("f5_btn")
	dF5Btn.addEventListener("touchstart", function(e) {
		wsend("ctlF5");
	}, false)
	dF6Btn = document.getElementById("f6_btn")
	dF6Btn.addEventListener("touchstart", function(e) {
		wsend("ctlF6");
	}, false)
	
	
	//debug 按钮行为
	document.getElementById("debug_btn").addEventListener("touchstart", function(e) {
		toggleDebug();
	}, false)
	
	
	//屏蔽 mobile 默认行为
	document.addEventListener("touchstart", shieldDefault, false );
	document.addEventListener("touchmove", shieldDefault, false );
	document.addEventListener("touchend", shieldDefault, false );
	document.addEventListener("touchcancel", touchCancel, false );
	document.addEventListener("gesturestart", shieldDefault, false );
	document.addEventListener("gesturechange", shieldDefault, false );
	document.addEventListener("gestureend", shieldDefault, false );
	
	// dUpBtn.addEventListener("gesturestart", shieldDefault, false );
	// dUpBtn.addEventListener("gesturechange", shieldDefault, false );
	// dUpBtn.addEventListener("gestureend", shieldDefault, false );
	// 
	// dxBtn.addEventListener("gesturestart", shieldDefault, false );
	// dxBtn.addEventListener("gesturechange", shieldDefault, false );
	// dxBtn.addEventListener("gestureend", shieldDefault, false );
	
	
	if (window.DeviceMotionEvent==undefined) {
		document.getElementById("no").style.display="block";
		document.getElementById("yes").style.display="none";

	} else {
		window.ondevicemotion = function(event) {
			ax = event.accelerationIncludingGravity.x;
			ay = event.accelerationIncludingGravity.y;
			az = event.accelerationIncludingGravity.z;
		}

		setInterval(function() {
			if ( ax < -1 ) {
				if ( dir != -1 ) {
					dir = -1;
					wsend("ctlDirLeft")
				}
			}
			else if ( ax > 1 ) {
				if ( dir != 1 ) {
					dir = 1;
					wsend("ctlDirRight")
				}
			}
			else {
				if (dir != 0) {
					dir = 0;
					wsend("ctlDirNone")
				}
			}
			// debug("x:" + ax.toString().substr(0,4) + ",y:" + ay.toString().substr(0,4) 
			// 				+ ",z:" + az.toString().substr(0,4) );
		}, delay);
	}
});

function shieldDefault( e ) {
	e.preventDefault();
}


function upTouchStart(e) {
	e.preventDefault();
	if ( currVBtn != null ) {
		return;
	}
	upV();
}

function downTouchStrart(e) {
	if ( currVBtn != null ) {
		return;
	}
	downV();
}

function touchMove(e) {
	if (currVBtn == null) {
		return;
	}
	
	var el= document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
	// debug("move" + e.touches.length);
	if ( el != currVBtn ) {
		if ( el == dUpBtn ) {
			upV()
		}
		else if ( el == dDownBtn ) {
			downV()
		}
		else {
			keepV()
		}
	}

}

function touchEnd(e) {
	keepV();
}

function keepV() {
	wsend("ctlKeepV");
	$(currVBtn).removeClass("doWhite")
	currVBtn = null;
}

function upV() {
	wsend("ctlUpV");
	currVBtn = dUpBtn;
	$(currVBtn).addClass("doWhite")
	$(dDownBtn).removeClass("doWhite")
}

function downV() {
	wsend("ctlDownV")
	currVBtn = dDownBtn
	$(currVBtn).addClass("doWhite")
	
	$(dUpBtn).removeClass("doWhite")
}

function touchCancel(e) {
	debug("cancel");
}


function debug(str) {
    var $debug = $("#debug");
    var nowDate = new Date;
    var formatDate = "[" + nowDate.getHours() + ":"
    	+ nowDate.getMinutes() + ":" + nowDate.getSeconds() + "]";
    $debug.prepend("<li>" + formatDate + "\t" + str +"</li>");
}

function sendMsg(msg) {
    ws.send(msg);
}


var debugDisplaying = 0;
function toggleDebug () {
	if ( debugDisplaying ) {
		$("#debug").hide(200);
		debugDisplaying = 0;
	}
	else {
		$("#debug").show(200)
		debugDisplaying = 1;
	}
}








