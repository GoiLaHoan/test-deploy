/* eslint-disable  */

$(function() {
	var channelID = 22; //VaultChain Channel
	
	function ajaxCall(url, callback){
		if (typeof callback == 'undefined'){
			callback = function(data){};
		}
		
		if (typeof errorcallback == 'undefined'){
			callback = function(data){};
		}

		if (window.XDomainRequest) { //IE9-10 implements crossdomain AJAX this way only
			var xhr = new window.XDomainRequest();
			xhr.open('GET', url, true);
			xhr.onload = function() {
				callback(xhr.responseText);
			};
			xhr.send();
		} else {
			$.ajax({
				url: url,
				success: callback,
				cache: true
			});
		}
	}
	
   
})