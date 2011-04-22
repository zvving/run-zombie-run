//日志类， 为log添加时间戳
var Log = Class.extend({
    // init是构造函数
    init: function() {

    },
    log: function( str ) {
		str = this.addTime(str);
		console.log(str);
    },

	warn: function ( str ) {
		str = this.addTime(str);
		console.warn(str);
	},

	err: function( str ) {
		str = this.addTime(str);
		console.error(str);
	},
	
	addTime: function ( str ) {
		return "[" + new Date().toLocaleTimeString() + "]" + str +"|";
	}
	
	
});

var log = new Log();