var GlobalManager = Class.extend({
    // init是构造函数
    init: function() {
		this.zombieList = new Array();
		z = new Zombie(11);
		this.zombieList[0] = z ;
		log.log("=== GlobalManager init..." + this.zombieList[0].x );

    },
    start: function() {
		log.log("=== game start..." );
		this.eventIntervalId = setInterval( this.eventLoop , 20);
		this.drawIntervalId = setInterval( this.drawLoop , 20);
		
		
    },

	eventLoop: function () {
		cpsNewTime = new Date().getTime();
		
		for ( i = 0; i<gm.zombieList.length; i++ ) {
			z.eventLoop(cpsNewTime - cpsLastTime);
		}
		
		//计算绘图循环帧率
		if ( cpsNewTime - cpsSecondTime >= 1000 ) {
			infoCps.innerText = fps ;
			cpsSecondTime = cpsNewTime;
			cps = 0;
		}
		cps ++;
		
		infoCTime.innerText = new Date().getTime() - cpsNewTime;
		cpsLastTime = cpsNewTime;
	},
	drawLoop: function () {
		fpsNewTime = new Date().getTime();
		
		cx.clearRect(0, 0, 960, 640);
		cx.save();
		for ( i = 0; i<gm.zombieList.length; i++ ) {
			z.drawLoop();
		}
		cx.restore();
		
		//计算绘图循环帧率
		if ( fpsNewTime - fpsSecondTime >= 1000 ) {
			infoFps.innerText = fps ;
			fpsSecondTime = fpsNewTime;
			fps = 0;
		}
		fps ++;
		
		infoFTime.innerText = new Date().getTime() - fpsNewTime;
		fpsLastTime = fpsNewTime;
	},

	end: function() {
		log.log("=== game end...");
		window.clearInterval( this.intervalId );
	}
	
	
});

var fps				= 0;
var fpsNewTime		= 0;
var fpsLastTime		= 0;
var fpsSecondTime	= 0;
var fTime			= 0;

var cps				= 0;
var cpsNewTime		= 0;
var cpsLastTime		= 0;
var cpsSecondTime	= 0;

var infoFps;
var infoFTime;
var infoCps;
var infoCTime;




document.onkeydown = function( event ) {
	
	switch ( event.keyCode ) {
		case 65:
			alert('a');
			break;
		default:
			break;
	}

}

// var eventLoop = function () {
// 	console.log("=== in eventLoop:" + gm.lo);
// 	gm.lo ++;
// 	if ( gm.lo == 10 ) {
// 		gm.end();
// 	}
// }