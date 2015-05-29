var MsgStruct = Class.extend({
    init: function( msg ) {
		this.kind	= msg.substring(0,3)
		this.content = msg.substring(3)
    }
});