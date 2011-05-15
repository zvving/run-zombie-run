var MsgStruct = Class.extend({
    init: function( msg ) {
		this.id		= msg.substring(0,1)
		this.kind	= msg.substring(1,4)
		this.content = msg.substring(4)
    }
});