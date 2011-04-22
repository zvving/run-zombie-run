var Role = Class.extend({
    init: function(id) {
		this.id	= id;
        this.x	= 100;
		this.y	= 200;
		this.dir = 1.0;
		this.dirState = -0.1;
		this.v	= 2;
		this.a	= 5;
    },
    eventLoop: function( time ) {
		
		
		
		this.x += this.v * Math.cos( this.dir );
		this.y += this.v * Math.sin( this.dir );
    },
	drawLoop: function () {
		
	}
});
