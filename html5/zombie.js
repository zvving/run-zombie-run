var Zombie = Role.extend({
    // init是构造函数
    init: function(id) {
		this._super(id);
    },
    getY: function() {
        return this.y;
    }
});

