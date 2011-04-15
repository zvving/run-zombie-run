var GlobalManager = Class.extend({
    // init是构造函数
    init: function() {
		this.lo = 0;
		console.log("=== GlobalManager init..." + this.lo);
		
    },
    start: function() {
		console.log("=== game start..." + this.lo);
		this.intervalId = setInterval( this.eventLoop , 1000);
    },

	eventLoop: function () {
		console.log("=== in eventLoop:" + gm.lo);
		gm.lo ++;
		if ( gm.lo == 10 ) {
			gm.end();
		}
	},

	end: function() {
		console.log("=== game end...");
		window.clearInterval( this.intervalId );
	}
	
	
});

var gm = new GlobalManager();
gm.start();

// var eventLoop = function () {
// 	console.log("=== in eventLoop:" + gm.lo);
// 	gm.lo ++;
// 	if ( gm.lo == 10 ) {
// 		gm.end();
// 	}
// }