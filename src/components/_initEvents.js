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