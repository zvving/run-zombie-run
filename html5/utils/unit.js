var isNeighbor = function ( z1, z2 ) {
	tmp_unit_zx = z1.x-z2.x;
	tmp_unit_zy = z1.y-z2.y;
	return EYESHOT_RANGE*EYESHOT_RANGE > 
		( tmp_unit_zx*tmp_unit_zx + tmp_unit_zy*tmp_unit_zy );
}

var Point = Class.extend({
    init: function() {
		this.x = 0;
		this.y = 0;
	}
});

var tmp_unit_zx;
var tmp_unit_zy;