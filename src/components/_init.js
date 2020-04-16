	SimplePopup.prototype.init = function() {
		let _ = this,
			opt = _.options,
			elements = ['popup', 'overlay', 'closeBtn'];

		for (let i = 0; i < elements.length; i++) {

			// get elements
			let el = '$' + elements[i];
			if (_[el] !== false && opt[elements[i]] !== '') {
				_[el] = document['querySelector' + (i === 2 ? 'All' : '')](opt[elements[i]]);
				if (elements[i] === 'popup' && !_[el]) {
					return;
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

		_.$popup.openPopup = _.openPopup;
		_.$popup.closePopup = _.closePopup;

		_.initEvents();
		_.initOpenBtns();
	};