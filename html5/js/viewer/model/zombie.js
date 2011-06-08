/** 僵尸类，继承自 Role */

var Zombie = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = RADIUS_ZOMBIE;
		this.v		= SPEED_ZOMBIE_DEFAULT;
		this.dirStateK	= DIR_STATE_ZOMBIE_K;
		this.hp			= 1000;
		this.isLive		= false;
		
		this.neighborList	= new Array();
		this.centerPoint	= new Point();
		this.centerPoint.x	= this.x;
		this.centerPoint.y	= this.y;
		this.centerPoint.dir = this.dir;
		this.nearZombie		= null;
		this.emotion		= EMO_SEARCH;
		this.aim			= null;
		
		this.isNowAttacked	= false;
    },
	eventLoop: function( time ) {
		
		this.boids();
		
		this._super(time);
		
		if ( this.isNowAttacked == true) {
			this.moveFire();
			this.hp -= 100;
			if (this.hp<=0) {
				this.ohDie();
			}
		}
	},
	/** 柏兹理论 */
	boids: function() {
		//初始化 
		this.centerPoint.x	= this.x;
		this.centerPoint.y	= this.y;
		this.centerPoint.dir	= this.dir;
		
		
		//避免拥挤 boids 1
		if ( this.nearZombie != null ) {
			this.thisTurnToRole(this.nearZombie, -1, DIR_STATE_K_NEAR);
			return;
		}
		
		if ( this.aim != null ) {
			this.thisTurnToRole(this.aim, 1, DIR_STATE_K_NEAR*2);
			return;
		}
		

		
		//周围没有僵尸,继续前行~
		if ( this.neighborList.length == 0 ) {
			this.dirState = DIR_STATE_NONE;
			return;
		}
		
		//计算出中心点,包含中心坐标和方向
		this.centerPoint = getPointListCenter(this.neighborList);
		
		//趋向周围僵尸中心点坐标 boids 2 
		tmp_zombie_nk = dirTurnToPoint (this.dir, this.x, this.y,
			this.centerPoint.x, this.centerPoint.y );
		
		this.dirState = DIR_STATE_NONE;
		
		this.dirState += tmp_zombie_nk*DIR_STATE_K_CENTER;
		//方向趋同 boids 3 
		this.dirState += ( this.dir - this.centerPoint.dir + 62832 ) % 62832 < 31416 
			? DIR_STATE_LEFT*DIR_STATE_K_MATCH 
			: DIR_STATE_RIGHT*DIR_STATE_K_MATCH;
		
		
	},
	thisTurnToRole: function ( role, closeOrNo, k ) {
		this.dirState = closeOrNo * dirTurnToPoint (this.dir, this.x, this.y,
			role.x, role.y ) * k;
	},
	
	drawLoop: function () {
		//画视野
		cx.beginPath();
		cx.fillStyle = HSLA_EYESHOT;
		cx.moveTo(this.x, this.y);
		cx.arc(this.x, this.y, this.radius + EYESHOT_RANGE, this.dir/10000 + EYESHOT_ANGLE, this.dir/10000 - EYESHOT_ANGLE, true );
		cx.fill();
		cx.closePath();
		
		//连线中央聚集点
		
		
		cx.beginPath();
		
		cx.moveTo(this.x, this.y);
		cx.lineTo( Math.cos(this.matchDir/10000)*50 + this.x,
			Math.sin(this.matchDir/10000)*50 + this.y );
		cx.stroke();
		cx.closePath();
		
		

	},
	drawLoopEyeshot: function() {
		cx.beginPath();
		cx.fillStyle = HSLA_EYESHOT;
		cx.moveTo(this.x, this.y);
		cx.arc(this.x, this.y, this.radius + EYESHOT_RANGE, this.dir/10000 + EYESHOT_ANGLE, this.dir/10000 - EYESHOT_ANGLE, true );
		cx.fill();
		cx.closePath();
	},
	drawLoopBody: function() {
		cx.moveTo(this.x, this.y);
		cx.arc(this.x, this.y, this.radius, 
			this.dir/10000, this.dir/10000+Math.PI*2);
		cx.lineTo(this.x, this.y);
	},
	drawLoopDebugCenter: function() {
		//绘制 临近 zombie 中央点 连线
		cx.moveTo(this.x, this.y);
		cx.lineTo(this.centerPoint.x ,this.centerPoint.y);

	},
	drawLoopDebugDir: function() {
		//绘制 临近 zombie 方向匹配线
		cx.moveTo(this.x, this.y);
		cx.lineTo( Math.cos(this.centerPoint.dir/10000)*50 + this.x,
			Math.sin(this.centerPoint.dir/10000)*50 + this.y );
	},
	drawLoopDebugAim: function() {
		cx.moveTo(this.x, this.y);
		cx.lineTo( this.aim.x, this.aim.y );
	},
	findingAim: function ( player ) {
		this.aim = player;
		this.emotion = EMO_FOUND;
	},
	attacked: function ( player ) {
		log.log(player.type + "|" + this.id)
		this.isNowAttacked = true;
		$("#dom_list").append("<li class='zombie_fire' id='zombie_fire_" + this.id + "'></li>")
		this.moveFire();
		$("#zombie_fire_" + this.id).show();
		setTimeout( "attackedend(" + this.id + ")",5000);
	},
	moveFire: function() {
		var $fireDom = $("#zombie_fire_" + this.id);
		$fireDom.css("left", Math.round(this.x)-14);
		$fireDom.css("top", Math.round(this.y)-55);
	},
	ohDie: function() {
		$("#zombie_fire_" + this.id ).remove();
		gm.oneZombieDie(this.id);
	},
	findNeighborList: function() {
		for (var z in gm.zombieList ) {
            tmp_manager_distance = distance(this, gm.zombieList[z])
            if (tmp_manager_distance < EYESHOT_RANGE) {
                this.neighborList.push(gm.zombieList[z]);
                if (tmp_manager_distance < NEAR_RANGE) {
                    if (this.nearZombie == null || tmp_manager_distance < distance(gm.zombieList[z], this.nearZombie)) {
                        this.nearZombie = gm.zombieList[z];
                    }
                }
            }
       
        }
	}
});

function attackedend( id ) {
	gm.zombieList[id].isNowAttacked = false;
	$("#zombie_fire_" + id ).remove();
}




var tmp_zombie_nk;

var tzi;

