var Role = Class.extend({
    init: function(id) {
		this.id	= id;
        this.x	= 100;
		this.y	= 200;
    },
    getX: function() {
        return this.x;
    }
});
