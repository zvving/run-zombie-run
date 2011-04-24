var Player = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = RADIUS_PLAYER;
		this.x = 200;
		this.y = 200;
		this.isLive = true;
    },
	eventLoop: function( time ) {
		this._super(time);
	},

	drawLoop: function () {
		cx.strokeStyle = HSLA_PLAYER_STROKE;
		cx.fillStyle = HSLA_PLAYER_FILL;
		
		cx.beginPath();
		cx.arc(this.x, this.y,
			 this.radius, this.dir/10000, this.dir/10000+Math.PI*2);
		cx.lineTo(this.x, this.y);
		cx.closePath();
		
		cx.fill();
		cx.stroke();
	}
});

const HSLA_PLAYER_STROKE	= "hsla(60, 50%, 50%, 1)";
const HSLA_PLAYER_FILL		= "hsla(180, 50%, 50%, 0.4)";


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
		//control
		case 65://a
			gm.addZombie();
			break;
		case 67://c
			gm.clearZombie();
			break;
		case 68://d
			gm.toggleDebug();
			break;
		case 80://p
			gm.pause();
			break;
		case 82://r
			gm.restart();
			break;
		default:
			break;
	}

}