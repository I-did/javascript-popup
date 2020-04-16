let	SimplePopup = (function() {
	function popup(options) {
		let _ = this,
		opt,
		def,
		ini;

		_.options = opt = options;

		_.defaults = def = {
			popup: '',
			overlay: '',
			openBtn: '',
			closeBtn: '',
			scrollThreshold: 100,
			escToClose: true,
			clickToClose: 'overlay',
			animation: '',
			transition: {
				popup: {
					property: 'opacity',
					from: 0,
					to: 1,
					timigFunction: 'ease',
					delay: 0,
					duration: 0.5
				},
				overlay: {
					property: 'opacity',
					from: 0,
					to: 1,
					timigFunction: 'ease',
					delay: 0,
					duration: 0.5
				}
			}
		};

		_.initials = ini = {
			$popup: null,
			$overlay: null,
			$closeBtn: null,
			$openBtn: null,
			$inputs: null
		};

		// assign defaults and options
		// assign initials and _

		_.assign(def, opt);
		_.assign(ini, _);
		_.iosRegExp = /iPhone|iPad|iPod/i;
		_.init();
		console.log(_);
		return _.$popup;
	}
	return popup;
})();

SimplePopup.prototype.assign = function(obj1, obj2) {
	for (let key in obj1) {
		if (obj2[key] === undefined) {
			obj2[key] = obj1[key];
		} else if (typeof obj2[key] === 'object') {
			this.assign(obj1[key], obj2[key]);
		}
	}
};

SimplePopup.prototype.dispatchEvent = function(element, eventName) {
	if (typeof window.CustomEvent === "function") {
  	let evt = new CustomEvent(eventName);
  	element.dispatchEvent(evt);
	}	
};