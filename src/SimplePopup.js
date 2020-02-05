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

					$inputs: null

				};







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
		SimplePopup.prototype.init = function() {
			let _ = this,
				opt = _.options,
				elements = ['popup', 'overlay', 'closeBtn'];

				for (let i = 0; i < elements.length; i++) {

				let el = '$' + elements[i];
				if (_[el] !== false && opt[elements[i]] !== '') {
					_[el] = document['querySelector' + (i === 2 ? 'All' : '')](opt[elements[i]]);
					if (elements[i] === 'popup' && !_[el]) {
						return;
					}
					if (i <= 1) {
						let elCloseAnim = getComputedStyle(_[el]).animation;
						if (elCloseAnim === '') {
							elCloseAnim = opt[elements[i] + 'CloseAnimation'];
						}
						if (!elCloseAnim) {
							console.error('Set the closing animation for ' + elements[i]);
							return;
						}
						_[elements[i] + 'CloseAnimation'] = elCloseAnim;
					}
				}
			}

				_.$popup.ctx = _;

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
			_.initOpenBtns();
		};
		SimplePopup.prototype.initEvents = function() {
			let _ = this,
				arr = ['popup', 'overlay'];	

							if (_.$closeBtn) {
				for (let i = 0; i < _.$closeBtn.length; i++) {
					_.$closeBtn[i] && _.$closeBtn[i].addEventListener('click', _.closePopupHandler);
				}
			}

			_.initAnimationEndEvents(_, 'popup');
			_.initAnimationEndEvents(_, 'overlay');

				let e = new CustomEvent('init');
			_.$popup.dispatchEvent(e);
		};
		SimplePopup.prototype.initAnimationEndEvents = function(_, elem) {
			let el = '$' + elem; 
			if (_[el]) {
				_[el].addEventListener('animationend', function() {
					let closeAnim = _[elem + 'CloseAnimation'].search(event.animationName);
					if (closeAnim !== -1) {
						this.style.animation = '';
						this.classList.remove('active');
						if (elem === 'popup') {
							let e = new CustomEvent('close');
							_[el].dispatchEvent(e);
						}
					} else if (closeAnim === -1 && elem === 'popup') {
						let e = new CustomEvent('open');
						_[el].dispatchEvent(e);
					}
				});
			}
		};
		SimplePopup.prototype.initOpenBtns = function() {
			let _ = this,
				commonSelector = _.options.openBtn,
				btns = [];

					if (!commonSelector) {
					return;
				}

							_.$openBtn = {
				add: function(selector) {
					_.options.openBtn += ', ' + selector;

						this.refresh();
				},
				refresh: function() {
					this.elements = [];

						let nodeList = document.querySelectorAll(_.options.openBtn);
					for (let i = 0; i < nodeList.length; i++) {
						this.elements.push(nodeList[i]);
						nodeList[i] && nodeList[i].addEventListener('click', _.openPopupHandler);
					}
					_.$popup.openBtn = _.$openBtn;
				}
			};

				_.$openBtn.refresh();

			};
		SimplePopup.prototype.openPopup = function() {
			let _ = this.ctx || this;
			_.iosFix();

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

				if (event && event.type === 'scroll' && Math.abs(pageYOffset - _.pageY) <= _.options.scrollThreshold) {
				return;
			}

				if (event && event.type === 'scroll' && _.$inputs.length > 0) {
				if (_.$inputs.some(function(el) {return el === document.activeElement;})) {
					return;
				}
			}

				if (_.$popup.classList.contains('active')) {
				_.$popup.style.animation = _.popupCloseAnimation;
				if (_.$overlay) {
					_.$overlay.style.animation = _.overlayCloseAnimation;
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
		SimplePopup.prototype.iosFix = function()  {
			let _ = this;
			_.$inputs = [];
			if (_.iosRegExp.test(navigator.userAgent)) {
				let nodeList = _.$popup.querySelectorAll('input, textarea');

					for (let i = 0; i < nodeList.length; i++) {
					_.$inputs.push(nodeList[i]);
				}
			}
		};

	return SimplePopup;
});