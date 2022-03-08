function getJson(url, callback) {
	const request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null)
	request.onreadystatechange = function() {
	  if ( request.readyState === 4 && request.status === 200 ) {
		var jsonObject = JSON.parse(request.responseText);
		callback(jsonObject);
	  }
	}
}