/** 玩家类，继承自 role */

var Player = Role.extend({
    // init是构造函数
    init: function(id, type) {
		this._super(id);
		this.type = type;
		this.radius = RADIUS_PLAYER;
		this.x = 200;
		this.y = 200;
		type == "w" ? this.x = 600 : null;
		this.isLive = true;
		this.dirStateK	= DIR_STATE_PLAYER_K;
		this.a	= 0;
		this.aState	= SPEED_KEEP;
		this.timeout = -1;
		this.superMan = false;
		this.fillSuper = 0;
		this.fireNum = 0;
		this.fill = id ? HSLA_WPLAYER_FILL:HSLA_FPLAYER_FILL;
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
		
		if ( this.fireNum > 0) {
			cx.beginPath();
			cx.fillStyle = "hsla(60, 50%, 50%, " + this.fireNum/100 + ")";
			this.fireNum -= 3;
			cx.moveTo(this.x, this.y);
			cx.arc(this.x, this.y, this.radius + EYESHOT_RANGE, this.dir/10000 + FIRE_ANGLE, this.dir/10000 - FIRE_ANGLE, true );
			cx.fill();
			cx.closePath();
		}
		
		cx.strokeStyle = HSLA_PLAYER_STROKE;
		cx.fillStyle = this.fill;
		
		if (this.superMan == true) {
			this.fillSuper = (this.fillSuper + 5)%50
			cx.fillStyle = "hsla(0, 50%, 50%, " + this.fillSuper/100 + ")";
		}
		
		cx.beginPath();
		cx.arc(this.x, this.y,
			 this.radius, this.dir/10000, this.dir/10000+Math.PI*2);
		cx.lineTo(this.x, this.y);
		cx.closePath();
		cx.fill();
		cx.stroke();
		
	},
	ohDie: function() {
        log.log("die");
        this.isLive = false;
		this.hideChat();
		var leaveLife = playerLifeDown(this.type);
		if ( leaveLife == "0px") {
			this.ohOver();
		}
		else {
			setTimeout("gm." + this.type + "Player.newLife()",2000);
		}
    },
	ohOver: function() {
		
	},
	newLife: function() {
		this.isLive = true;
		this.superMan = true;
		setTimeout("gm." + this.type + "Player.superMan = false;",5000);
	},
	onFire: function() {
		if (this.fireNum <= 0) {
			this.fireNum = 80;
			this.attackZombie();
		}
	},
	attackZombie: function() {
		for (var i in gm.zombieList ) {
			if(gm.zombieList[i].isLive == false ) {
				continue;
			}
			tmp_manager_distance = distance(gm.zombieList[i], this)
			if (tmp_manager_distance < FIRE_RANGE) {
				gm.zombieList[i].attacked(this)
			}
        }
	}
	
});

const HSLA_PLAYER_STROKE	= "hsla(60, 100%, 0%, 1)";
const HSLA_FPLAYER_FILL		= "hsla(180, 50%, 50%, 0.4)";
const HSLA_WPLAYER_FILL		= "hsla(240, 50%, 50%, 0.4)";
const HSLA_PLAYER_FIRE		= "hsla(60, 50%, 50%, 1)";

const SPEED_UP				= 1;
const SPEED_DOWN			= -1;
const SPEED_KEEP			= 0;

function playerLifeSet( type, num ) {
	$("#" + type + "_player_life").css("width", (num*50) + "px");
}

function playerLifeDown( type ) {
	var $playerLife = $("#" + type + "_player_life");
	$playerLife.css("width", "-=50")
	return $playerLife.css("width");
}

