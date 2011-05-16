/** 玩家类，继承自 role */

var Player = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = RADIUS_PLAYER;
		this.x = 200;
		this.y = 200;
		this.isLive = true;
		this.dirStateK	= DIR_STATE_PLAYER_K;
		this.a	= 0;
		this.aState	= SPEED_KEEP;
		this.timeout = -1;
		
    },
	eventLoop: function( time ) {
		
		if (this.aState != SPEED_KEEP) {
			this.a = this.aState;
			this.v += this.a * time/10000;
			this.v = this.v<0 ? 0 : this.v;
			this.v = this.v>SPEED_PLAYER_MAX ?
				SPEED_PLAYER_MAX : this.v;
		}
		
		this._super(time);
		
		//更新 bub
		$user1.css("top", this.y - 60)
		$user1.css("left", this.x - 22)
	},
	showChat: function ( msg ) {
		if (this.isLive == false) {
			return;
		}
		clearTimeout(this.timeout)
		this.timeout = setTimeout("gm.player.hideChat()",5000);
		$user1.text(msg)
		$user1.show(500);
		audioPu.load();
        audioPu.play();
	},
	hideChat: function() {
		$user1.hide(1000);
		$user1.text("")
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

const SPEED_UP				= 1;
const SPEED_DOWN			= -1;
const SPEED_KEEP			= 0;


document.onkeydown = function( event ) {
	
	switch ( event.keyCode ) {
		case 37://left
			gm.player.dirState = DIR_STATE_LEFT;
			break;
		case 38://up
			gm.player.aState	= SPEED_UP;
			break;
		case 39://right
			gm.player.dirState = DIR_STATE_RIGHT;
			break;
		case 40://down
			gm.player.aState	= SPEED_DOWN;
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
			if (gm.player.aState == SPEED_UP) {
				gm.player.aState = SPEED_KEEP;
			}
			break;
		case 39://right
			if (gm.player.dirState == DIR_STATE_RIGHT) {
				gm.player.dirState = DIR_STATE_NONE;
			}
			break;
		case 40://down
			if (gm.player.aState == SPEED_DOWN) {
				gm.player.aState = SPEED_KEEP;
			}
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