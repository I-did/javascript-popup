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