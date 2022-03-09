const languages = {
	values: {},	
	init: function(callback) {
		getJson("db/languages.json", function(json) {
			for (const [key, value] of Object.entries(json)) {
				languages.values[key] = value;
			}
			if(callback !== null && callback !== undefined) {
				callback();
			}
		});
	}
};