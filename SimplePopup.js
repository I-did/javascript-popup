;(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.SimplePopup = factory();
	}
})(function() {

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
			};

			// assign defaults and options
			// assign initials and _

			_.assign(def, opt);
			_.assign(ini, _);
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

	SimplePopup.prototype.init = function() {
		let _ = this,
			opt = _.options,
			elements = ['popup', 'overlay', 'openBtn', 'closeBtn'];

		for (let i = 0; i < elements.length; i++) {

			// get elements
			let el = '$' + elements[i];
			if (_[el] !== false && opt[elements[i]] !== '') {
				_[el] = document['querySelector' + (i === 2 ? 'All' : '')](opt[elements[i]]);
				if (elements[i] === 'popup' && !_[el]) {
					return;
				}
				// get 'out' animation
				if (i <= 1) {
					_[elements[i] + 'Animation'] = window.getComputedStyle(_[el]).animation || opt[elements[i] + 'Animation'];
					_[elements[i] + 'AnimationName'] = window.getComputedStyle(_[el]).animationName || opt[elements[i] + 'AnimationName'];
				}
			}
		}

		_.$popup.ctx = _;

		// context events
		_.openPopupHandler = {
			handleEvent: _.openPopup,
			ctx: _
		};
		
		_.closePopupHandler = {
			handleEvent: _.closePopup,
			ctx: _
		};

		_.$popup.open = _.openPopup;
		_.$popup.close = _.closePopup;

		_.initEvents();
	};

	SimplePopup.prototype.initEvents = function() {
		let _ = this,
			arr = ['popup', 'overlay'];

		for (let i = 0; i < _.$openBtn.length; i++) {
			_.$openBtn[i] && _.$openBtn[i].addEventListener('click', _.openPopupHandler);
		}

		if (_.$closeBtn) {
			_.$closeBtn.addEventListener('click', _.closePopupHandler);
		}
		
		// animationend events
		_.initAnimationEndEvents(_, 'popup');
		_.initAnimationEndEvents(_, 'overlay');

		let e = new CustomEvent('init');
		_.$popup.dispatchEvent(e);
	};

	SimplePopup.prototype.initAnimationEndEvents = function(ctx, elem) {
		let str = '$' + elem; // _.$popup || _.$overlay
		if (ctx[str]) {
			ctx[str].addEventListener('animationend', function() {					
				if (event.animationName === ctx[elem + 'AnimationName']) {
					this.style.animation = '';
					this.classList.remove('active');
					if (elem === 'popup') {
						let e = new CustomEvent('close');
						ctx[str].dispatchEvent(e);
					}
				} else if (event.animationName !== ctx[elem+ 'AnimationName'] && elem === 'popup') {
					let e = new CustomEvent('open');
					ctx[str].dispatchEvent(e);
				}
			});
		}
	};

	SimplePopup.prototype.openPopup = function() {
		let _ = this.ctx || this;

		_.$popup.caller = event && event.currentTarget;

		if (!_.$popup.classList.contains('active')) {
			_.$popup.classList.add('active');

			_.pageY = pageYOffset;

			if (_.$overlay) {
				_.$overlay.classList.add('active');
				_.$overlay.addEventListener('click', _.closePopupHandler);
			}

			if (_.options.esc) {
				document.addEventListener('keyup', _.closePopupHandler);
			}
			document.addEventListener('scroll', _.closePopupHandler);

			let e = new CustomEvent('beforeopen');
			_.$popup.dispatchEvent(e);
		}
	};

	SimplePopup.prototype.closePopup = function() {
		if (event && event.type === 'keyup' && event.keyCode !== 27) {
			return;
		}

		let _ = this.ctx || this;

		if (event && event.type === 'scroll' && pageYOffset - _.pageY <= _.options.scrollThreshold) {
			return;
		}

		if (_.$popup.classList.contains('active')) {
			_.$popup.style.animation = _.popupAnimation;
			if (_.$overlay) {
				_.$overlay.style.animation = _.overlayAnimation;
			}
		}

		if (_.options.esc) {
			document.removeEventListener('keyup', _.closePopupHandler);
		}
		if (_.$overlay) {
			_.$overlay.removeEventListener('click', _.closePopupHandler);
		}
		document.removeEventListener('scroll', _.closePopupHandler);

		let e = new CustomEvent('beforeclose');
		_.$popup.dispatchEvent(e);
	};

	return SimplePopup;
});