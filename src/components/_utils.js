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
				esc: true
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
			
			return _.$popup;
		}
		return popup;
	})();

	SimplePopup.prototype.assign = function(obj1, obj2) {
		for (let key in obj1) {
			if (obj2[key] === undefined) {
				obj2[key] = obj1[key];
			}
		}
	};