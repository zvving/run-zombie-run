var Zombie = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = 10;
		this.dir	= 1;
		
		this.neighborList = new Array();
    },
    getY: function() {
        return this.y;
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
		cx.strokeStyle = "hsla(0, 50%, 50%, 1)";
		cx.fillStyle = "hsla(0, 50%, 50%, 0.4)";
		cx.arc(this.x, this.y, this.radius, this.dir, this.dir+Math.PI*2);
		cx.lineTo(this.x, this.y);
		cx.stroke();
		cx.fill();
		cx.closePath();
	}
});

