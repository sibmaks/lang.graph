function getJson(url, callback, errorCallback = null) {
	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onload = function() {
		if (request.status !== 200) {
			if(errorCallback !== null) {
				errorCallback(request);
			}
		} else {
			callback(request.responseText);
		}
	};
	request.send();
}
