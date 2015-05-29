function handleMsgMsg( msgS ) {
	var msgArray = msgS.content.split("|")
	var userName = msgArray[0];
	var chatContent = msgArray[1];
	
	IHandleMsgMsg ( userName, chatContent)
}


function chatSend( msg ) {
	wsend("msg" + chat_user + "|" + msg);
}