var Zombie = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
		this.radius = 10;
		this.dir	= 1;
    },
    getY: function() {
        return this.y;
    },
	drawLoop: function () {
		
		cx.moveTo(this.x, this.y);
		cx.arc(this.x, this.y, this.radius, this.dir, this.dir+Math.PI*2);
		
	}
});

