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