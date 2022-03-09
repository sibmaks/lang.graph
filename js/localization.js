const localizations = {
	language: "eng",
	values: {},
	listeners: [],
	onLoad: function() {
		localizations._localize();
	},
	_localize: function() {
		const tags = document.querySelectorAll('[data-localization]');
		for(let i in tags) if(tags.hasOwnProperty(i)) {
			const tag = tags[i];
			const code = tag.getAttribute('data-localization');
			tag.innerText = localizations.get(code);
		}
	},
	init: function(callback) {
		getJson("db/localizations.json", function(json) {
			for (const [key, value] of Object.entries(json)) {
				localizations.values[key] = value;
			}
			localizations.onLoad();
			if(callback !== null && callback !== undefined) {
				callback();
			}
		});
	},
	setLanguage: function(lang) {
		localizations.language = lang;
		localizations._localize();
		for(const listener of localizations.listeners) {
			listener();
		}
	},
	addListener: function(listener) {
		localizations.listeners.push(listener);
	},
	get: function(code) {
		const values = localizations.values[code];
		if(values !== null && values !== undefined) {
			const value = values[localizations.language];
			if(value !== null && value !== undefined) {
				return value;
			}
		}
		return "*** Not localized! ***";
	}
};