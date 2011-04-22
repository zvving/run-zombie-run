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
		this.eventIntervalId = setInterval( this.eventLoop , 1000);
		this.drawIntervalId = setInterval( this.drawLoop , 40);
    },

	eventLoop: function () {
		for ( i = 0; i<gm.zombieList.length; i++ ) {
			z.eventLoop();
		}
	},
	drawLoop: function () {
		cx.clearRect(0, 0, 960, 480);
		cx.save();
		for ( i = 0; i<gm.zombieList.length; i++ ) {
			z.drawLoop();
		}
		cx.restore();
	},

	end: function() {
		log.log("=== game end...");
		window.clearInterval( this.intervalId );
	}
	
	
});



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