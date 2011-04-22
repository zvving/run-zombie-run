var Role = Class.extend({
    init: function(id) {
		this.id	= id;
        this.x	= 100;
		this.y	= 200;
		this.dir = 1.0;
		this.dirState = -0.01;
		this.v	= 0.05;
		this.a	= 5;
    },
    eventLoop: function( time ) {
		
		//调整方向
		this.dir += this.dirState;
		
		//方向越界
		this.dir = (
			Math.round( this.dir*10000 + 6.2832 ) % 62832
			) / 10000;
		
		//调整速度
		
		//调整位置
		tmp_role_v = this.v * time;
		this.x += tmp_role_v * Math.cos( this.dir );
		this.y += tmp_role_v * Math.sin( this.dir );
		
		//位置越界
		this.x = ( this.x + VIEW_WIDTH ) % VIEW_WIDTH;
		this.y = ( this.y + VIEW_HEIGHT ) % VIEW_HEIGHT;
    },
	drawLoop: function () {
		
	}
});


var tmp_role_v = 0.0;