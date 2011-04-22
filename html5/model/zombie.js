var Zombie = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = 10;
		
		this.neighborList = new Array();
		this.centerPoint = new Point();
    },
    getY: function() {
        return this.y;
    },
	eventLoop: function( time ) {
		
		this.boids();
		
		this._super(time);
	},
	boids: function() {
		//Flock Centering
		if ( this.neighborList.length == 0 ) {
			return;
		}
		
		tmp_zombie_nx = 0;
		tmp_zombie_ny = 0;
		for (tzi = 0; tzi<this.neighborList.length; tzi++) {
			tmp_zombie_nx = tmp_zombie_nx + this.neighborList[tzi].x;
			tmp_zombie_ny = tmp_zombie_ny + this.neighborList[tzi].y;
		}
		this.centerPoint.x = tmp_zombie_nx / this.neighborList.length;
		this.centerPoint.y = tmp_zombie_ny / this.neighborList.length;
		//log.log(tmp_zombie_nx);
		//for ( i = 0; i<this.neighborList.length; i++ ) {
			//tmp_zombie_nx += this.neighborList[i].x;
			//log.log(i);
		//}
		//log.log(this.neighborList.length);
	},
	drawLoop: function () {
		//画视野
		
		cx.beginPath();
		cx.fillStyle = "hsla(0, 50%, 50%, 0.03)";
		cx.moveTo(this.x, this.y);
		cx.arc(this.x, this.y, this.radius + EYESHOT_RANGE, this.dir + EYESHOT_ANGLE, this.dir - EYESHOT_ANGLE, true );
		cx.fill();
		cx.closePath();
		
		cx.beginPath();
		cx.strokeStyle = "hsla(240, 50%, 50%, 1)";
		cx.moveTo(this.x, this.y);
		cx.lineTo(this.centerPoint.x,this.centerPoint.y);
		//log.log(this.centerPoint.x);
		//cx.lineTo(-10,0);
		cx.stroke();
		cx.closePath();
		
		
		
		cx.beginPath();
		cx.strokeStyle = "hsla(0, 50%, 50%, 1)";
		cx.fillStyle = "hsla(0, 50%, 50%, 0.4)";
		cx.arc(this.x, this.y, this.radius, this.dir, this.dir+Math.PI*2);
		cx.lineTo(this.x, this.y);
		cx.stroke();
		cx.fill();
		cx.closePath();
	}
});

var tmp_zombie_nx;
var tmp_zombie_ny;
var tzi;

