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