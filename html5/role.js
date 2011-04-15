var Role = Class.extend({
    init: function(id) {
		this.id	= id;
        this.x	= 100;
		this.y	= 200;
    },
    eventLoop: function() {
        console.log("=== z:" + z.x + "|" + z.y + "|" + z.id);
    }
});
