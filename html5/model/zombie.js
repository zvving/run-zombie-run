/** 僵尸类，继承自 Role */

var Zombie = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = RADIUS_ZOMBIE;
		this.v		= SPEED_ZOMBIE_DEFAULT;
		this.dirStateK	= DIR_STATE_ZOMBIE_K;
		
		this.neighborList	= new Array();
		this.centerPoint	= new Point();
		this.centerPoint.x	= this.x;
		this.centerPoint.y	= this.y;
		this.centerPoint.dir = this.dir;
		this.nearZombie		= null;
		this.emotion		= EMO_SEARCH;
		this.aim			= null;
		
    },
    getY: function() {
        return this.y;
    },
	eventLoop: function( time ) {
		
		this.boids();
		
		this._super(time);
	},
	/** 柏兹理论 */
	boids: function() {
		//初始化 
		this.centerPoint.x	= this.x;
		this.centerPoint.y	= this.y;
		this.centerPoint.dir	= this.dir;
		
		if ( this.aim != null ) {
			this.thisTurnToRole(this.aim, 1, DIR_STATE_K_NEAR);
			return;
		}
		
		//避免拥挤 boids 1
		if ( this.nearZombie != null ) {
			this.thisTurnToRole(this.nearZombie, -1, DIR_STATE_K_NEAR);
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
	findingAim: function ( player ) {
		this.aim = player;
		this.emotion = EMO_FOUND;
	}
});

const HSLA_EYESHOT			= "hsla(0, 50%, 90%, 0.2)";
const HSLA_ZOMBIE_STROKE	= "hsla(0, 50%, 50%, 1)";
const HSLA_ZOMBIE_FILL		= "hsla(60, 90%, 50%, 1)";
const HSLA_DEBUG_CENTER_POINT	= "hsla(240, 50%, 50%, 0.5)";
const HSLA_DEBUG_MATCH_DIR	= "hsla(120, 50%, 50%, 0.5)";


var tmp_zombie_nk;

var tzi;

