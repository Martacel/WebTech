var chat = {}
var chatDiv = document.getElementById ("messages");
chat.fetchMessages = function () {
	$.ajax({ 
		url: 'ajax/chat.php', 
		type: 'post', 
		data: { method: 'fetch'},
		success: function(data){ 
			$('#messages').html(data);
			chatDiv.scrollTop = chatDiv.scrollHeight;
		}
	});
}

chat.throwMessage = function (message) {
	if($.trim(message).length != 0){
		$.ajax({ 
			url: 'ajax/chat.php',
			type: 'post', 
			data: {method: 'throw', message: message},
			success: function(data){
			chat.fetchMessages();
			chat.entry.val('');
			}
		});
	}
}
chat.entry = $('#entry');
chat.entry.bind('keydown', function(e){
	if (e.keyCode == 13 && e.shiftKey == false){
		chat.throwMessage($(this).val());
		e.preventDefault();
	}
});
chat.interval = setInterval(chat.fetchMessages, 8000);
chat.fetchMessages