var GlobalManager = Class.extend({
    // init是构造函数
    init: function() {
		this.zombieList = new Array();
		z = new Zombie(11);
		this.zombieList[0] = z ;
		console.log("=== GlobalManager init..." + this.zombieList[0].x );

    },
    start: function() {
		console.log("=== game start..." );
		this.intervalId = setInterval( this.eventLoop , 1000);
    },

	eventLoop: function () {
		for ( i = 0; i<gm.zombieList.length; i++ ) {
			z.eventLoop();
		}
	},

	end: function() {
		console.log("=== game end...");
		window.clearInterval( this.intervalId );
	}
	
	
});

var gm = new GlobalManager();
gm.start();

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