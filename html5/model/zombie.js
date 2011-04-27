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
		this.matchDir		= 0;
		this.nearZombie		= null;
    },
    getY: function() {
        return this.y;
    },
	eventLoop: function( time ) {
		
		this.boids();
		
		this._super(time);
	},
	boids: function() {
		this.centerPoint.x	= this.x;
		this.centerPoint.y	= this.y;
		this.matchDir		= this.dir;
		
		if ( this.nearZombie != null ) {
			this.dirState = - dirTurnWhere (this.dir, this.x, this.y,
				this.nearZombie.x, this.nearZombie.y ) * DIR_STATE_K_NEAR;
			return;
		}
		
		
		if ( this.neighborList.length == 0 ) {

			this.dirState = DIR_STATE_NONE;
			return;
		}
		

		
		
		//轮询 zombie 计算累积量
		tmp_zombie_nx	= 0;
		tmp_zombie_ny	= 0;
		tmp_zombie_ndir	= 0;
		for (tzi = 0; tzi<this.neighborList.length; tzi++) {
			tmp_zombie_nx	+= this.neighborList[tzi].x;
			tmp_zombie_ny	+= this.neighborList[tzi].y;
			tmp_zombie_ndir	+= this.neighborList[tzi].dir;
		}
		
		//求平均量
		this.centerPoint.x	= tmp_zombie_nx / this.neighborList.length;
		this.centerPoint.y	= tmp_zombie_ny / this.neighborList.length;
		this.matchDir		= Math.round ( 
			tmp_zombie_ndir / this.neighborList.length );
		

		//Flock Centering
		// tmp_zombie_nk = Math.round( Math.atan2(
		// 	this.centerPoint.y - this.y,
		// 	this.centerPoint.x - this.x
		// 	) *10000 );
		//tmp_zombie_nk = ( tmp_zombie_nk + 62832 ) % 62832;
		
		tmp_zombie_nk = dirTurnWhere (this.dir, this.x, this.y,
			this.centerPoint.x, this.centerPoint.y );
		
		this.dirState = 0;
		this.dirState += tmp_zombie_nk*DIR_STATE_K_CENTER;

		this.dirState += ( this.dir - this.matchDir + 62832 ) % 62832 < 31416 
			? DIR_STATE_LEFT*DIR_STATE_K_MATCH 
			: DIR_STATE_RIGHT*DIR_STATE_K_MATCH;
		
		
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
		cx.lineTo( Math.cos(this.matchDir/10000)*50 + this.x,
			Math.sin(this.matchDir/10000)*50 + this.y );
	}
});

const HSLA_EYESHOT			= "hsla(0, 50%, 90%, 0.2)";
const HSLA_ZOMBIE_STROKE	= "hsla(0, 50%, 50%, 1)";
const HSLA_ZOMBIE_FILL		= "hsla(60, 90%, 50%, 1)";
const HSLA_DEBUG_CENTER_POINT	= "hsla(240, 50%, 50%, 0.5)";
const HSLA_DEBUG_MATCH_DIR	= "hsla(120, 50%, 50%, 0.5)";

var tmp_zombie_nx;
var tmp_zombie_ny;
var tmp_zombie_nk;
var tmp_zombie_ndir;
var tzi;

