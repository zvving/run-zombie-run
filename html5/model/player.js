var Player = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = 20;
		this.x = 200;
		this.y = 200;
    },
	eventLoop: function( time ) {
		this._super(time);
	},

	drawLoop: function () {
		
		cx.beginPath();
		cx.strokeStyle = "hsla(60, 50%, 50%, 1)";
		cx.fillStyle = "hsla(180, 50%, 50%, 0.4)";
		cx.arc(this.x, this.y,
			 this.radius, this.dir/10000, this.dir/10000+Math.PI*2);
		cx.lineTo(this.x, this.y);
		cx.stroke();
		cx.fill();
		cx.closePath();
	}
});

document.onkeydown = function( event ) {
	
	switch ( event.keyCode ) {
		case 37://left
			gm.player.dirState = DIR_STATE_LEFT;
			break;
		case 38://up
			break;
		case 39://right
			gm.player.dirState = DIR_STATE_RIGHT;
			break;
		case 40://down
			break;
		default:
			break;
	}

}

document.onkeyup = function( event ) {
	
	switch ( event.keyCode ) {
		case 37://left
			if (gm.player.dirState == DIR_STATE_LEFT) {
				gm.player.dirState = DIR_STATE_NONE;
			}
			break;
		case 38://up
			break;
		case 39://right
			if (gm.player.dirState == DIR_STATE_RIGHT) {
				gm.player.dirState = DIR_STATE_NONE;
			}
			break;
		case 40://down
			break;
		default:
			break;
	}

}