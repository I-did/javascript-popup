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

				_.$popup.openPopup = _.openPopup;
			_.$popup.closePopup = _.closePopup;

				_.initEvents();
			_.initOpenBtns();
		};
	SimplePopup.prototype.initEvents = function() {

			let _ = this;

					if (_.$closeBtn) {
			for (let i = 0; i < _.$closeBtn.length; i++) {
				_.$closeBtn[i] && _.$closeBtn[i].addEventListener('click', _.closePopupHandler);
			}
		}

				_.initAnimationEndEvents(_, 'popup');
		_.initAnimationEndEvents(_, 'overlay');

				_.dispatchEvent(_.$popup, 'popupinit');

		};
	SimplePopup.prototype.initAnimationEndEvents = function(_, elem) {
		let $elem = _['$' + elem];

			if ($elem) {
			let animation = _.options.animation[elem],
				transition = _.options.transition[elem];

				if (animation) {
				$elem.addEventListener('animationend', function() {
					if (event.animationName === animation.open.name) {
						_.dispatchEvent($elem, elem + 'open');
					} else {
						$elem.style.animation = '';
						$elem.classList.remove('active');
						_.dispatchEvent($elem, elem + 'close');
					}
				});
			} else if (transition) {

					$elem.style[transition.property] = transition.from;

					$elem.addEventListener('transitionend', function() {
					if ($elem.style[transition.property] == transition.to) {
						_.dispatchEvent($elem, elem + 'open');
					} else {
						$elem.style.transition = '';
						$elem.classList.remove('active');
						_.dispatchEvent($elem, elem + 'close');
					}
				});
			}

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
	SimplePopup.prototype.playAnimation = function(element, direction) {

		  let _ = this,
	    $element = _['$' + element],
	    animation = _.options.animation[element] && _.options.animation[element][direction],
	    transition = _.options.transition[element];

		    setTransition = function(position) {
	      position = position || 'to';

		      let property = transition.property,
	        timigFunction = transition.timigFunction,
	        delay = transition.delay + 's',
	        duration = transition.duration + 's';

		      if (!$element.style.transition) {
	        $element.style.transition = property + ' ' + timigFunction + ' ' + duration + ' ' + delay;
	      }
	      $element.style[property] = transition[position];
	    };

		  if (animation) {

		    let name = animation.name,
	      duration = (animation.duration || 0.5) + 's',
	      delay = (animation.delay || 0) + 's',
	      timigFunction = animation.timigFunction || 'ease';

		    $element.style.animation = name + ' ' + timigFunction + ' ' + duration + ' ' + delay;

		  } else if (transition) {

		    if (direction === 'open') {
	      setTimeout(setTransition, 1);
	    } else {
	      setTransition('from');
	    }

	    	  }

		};
	SimplePopup.prototype.openPopup = function() {
		let _ = this.ctx || this,
			overlay = _.$overlay,
			popup = _.$popup;

			_.iosFix();

			popup.caller = event && event.currentTarget;

			if (!popup.classList.contains('active')) {

				_.pageY = pageYOffset;

				popup.classList.add('active');
			_.playAnimation('popup', 'open');

				if (overlay) {
				overlay.classList.add('active');
				_.playAnimation('overlay', 'open');

					overlay.addEventListener('click', _.closePopupHandler);
			}

				if (_.options.escToClose) {
				document.addEventListener('keyup', _.closePopupHandler);
			}
			document.addEventListener('scroll', _.closePopupHandler);

		  	_.dispatchEvent(popup, 'popupbeforeopen');

			}
	};
	SimplePopup.prototype.closePopup = function() {
		if (event && event.type === 'keyup' && event.keyCode !== 27) {
			return;
		}

			let _ = this.ctx || this,
			popup = _.$popup,
			overlay = _.$overlay;

			if (event && event.type === 'scroll' && Math.abs(pageYOffset - _.pageY) <= _.options.scrollThreshold) {
			return;
		}

			if (event && event.type === 'scroll' && _.$inputs.length > 0) {
			if (_.$inputs.some(function(el) {return el === document.activeElement})) {
				return;
			}
		}

			if (popup.classList.contains('active')) {
			_.playAnimation('popup', 'close');

				if (overlay) {
				_.playAnimation('overlay', 'close');
			}
		}

			if (_.options.escToClose) {
			document.removeEventListener('keyup', _.closePopupHandler);
		}
		if (overlay) {
			overlay.removeEventListener('click', _.closePopupHandler);
		}
		document.removeEventListener('scroll', _.closePopupHandler);

			_.dispatchEvent(popup, 'popupbeforeclose');

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