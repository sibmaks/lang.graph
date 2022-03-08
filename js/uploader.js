function getJson(url, callback) {
	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onload = callback;
	request.send();
}
