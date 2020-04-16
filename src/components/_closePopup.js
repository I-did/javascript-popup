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