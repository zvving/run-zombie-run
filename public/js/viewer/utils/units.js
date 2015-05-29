/** 常用函数类 */

// count two points distance
var distance = function ( z1, z2 ) {
	tmp_unit_zx = z1.x-z2.x;
	tmp_unit_zy = z1.y-z2.y;
	return Math.sqrt( tmp_unit_zx*tmp_unit_zx + tmp_unit_zy*tmp_unit_zy );
}

var slopeRoles = function ( r1, r2 ) {
	tmp_unit_zx = r2.x-r1.x;
	tmp_unit_zy = r2.y-r1.y;
	var at = Math.atan2(tmp_unit_zy,tmp_unit_zx);
	var z = 3.1416 + at;
	
	return Math.round(z*10000);
}

/** 给定 role 方向,坐标 以及目标 point, 求转向方向, 顺时针 1, 逆时针 -1 */
var dirTurnToPoint = function ( dir, x1, y1, x2, y2 ) {
	//Flock Centering
	tmp_unit_zt = Math.round( Math.atan2(
		y2 - y1, x2 - x1 ) *10000 );
	return  ( dir - tmp_unit_zt + 62832 ) % 62832 < 31416 
		? DIR_STATE_LEFT : DIR_STATE_RIGHT;
}

/** 给定 point list 求 中心点 point */
var getPointListCenter = function ( list ) {
		//轮询 zombie 计算累积量
		tmp_unit_nx	= 0;
		tmp_unit_ny	= 0;
		tmp_unit_ndir	= 0;
		for (tzi = 0; tzi<list.length; tzi++) {
			tmp_unit_nx	+= list[tzi].x;
			tmp_unit_ny	+= list[tzi].y;
			tmp_unit_ndir	+= list[tzi].dir;
		}
		
		var result = new Point();
		
		//求平均量
		result.x	= tmp_unit_nx / list.length;
		result.y	= tmp_unit_ny / list.length;
		result.dir	= Math.round ( 
			tmp_unit_ndir / list.length );
			
		return result;
}

var Point = Class.extend({
    init: function() {
		this.x	= 0;
		this.y	= 0;
		this.dir	= 0;
		}
});

var removeDom = function (domId) {
	$("#domId").remove();
}

var tmp_unit_zx;
var tmp_unit_zy;
var tmp_unit_zt;

var tmp_unit_nx;
var tmp_unit_ny;
var tmp_unit_ndir;