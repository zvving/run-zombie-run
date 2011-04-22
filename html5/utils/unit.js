var distance = function ( z1, z2 ) {
	tmp_unit_zx = z1.x-z2.x;
	tmp_unit_zy = z1.y-z2.y;
	return Math.sqrt( tmp_unit_zx*tmp_unit_zx + tmp_unit_zy*tmp_unit_zy );
}

var dirTurnWhere = function ( dir, x1, y1, x2, y2 ) {
	//Flock Centering
	tmp_unit_zt = Math.round( Math.atan2(
		y2 - y1, x2 - x1 ) *10000 );
	return  ( dir - tmp_unit_zt + 62832 ) % 62832 < 31416 
		? DIR_STATE_LEFT : DIR_STATE_RIGHT;
}

var Point = Class.extend({
    init: function() {
		this.x = 0;
		this.y = 0;
	}
});

var tmp_unit_zx;
var tmp_unit_zy;
var tmp_unit_zt;