var Role = Class.extend({
    init: function(id) {
		this.id	= id;
        this.x	= 480;
		this.y	= 320;
		this.dir = 10000;
		this.dirState = DIR_STATE_NONE;
		this.v	= 0.05;
		this.a	= 5;
    },
    eventLoop: function( time ) {
		
		//调整方向
		if ( this.dirState != DIR_STATE_NONE ) {
			this.dir += this.dirState * DIR_STATE_K;

			//方向越界
			this.dir = ( this.dir + 62832 ) % 62832;
		}
		
		
		//调整速度
		
		//调整位置
		tmp_role_v = this.v * time;
		this.x += tmp_role_v * Math.cos( this.dir/10000 );
		this.y += tmp_role_v * Math.sin( this.dir/10000 );
		
		//位置越界
		this.x = ( this.x + VIEW_WIDTH ) % VIEW_WIDTH;
		this.y = ( this.y + VIEW_HEIGHT ) % VIEW_HEIGHT;
    },
	drawLoop: function () {
		
	}
});


var tmp_role_v = 0.0;