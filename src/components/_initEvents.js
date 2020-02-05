	SimplePopup.prototype.initEvents = function() {
		let _ = this,
			arr = ['popup', 'overlay'];	
			
		if (_.$closeBtn) {
			for (let i = 0; i < _.$closeBtn.length; i++) {
				_.$closeBtn[i] && _.$closeBtn[i].addEventListener('click', _.closePopupHandler);
			}
		}
		
		// animationend events
		_.initAnimationEndEvents(_, 'popup');
		_.initAnimationEndEvents(_, 'overlay');

		let e = new CustomEvent('init');
		_.$popup.dispatchEvent(e);
	};