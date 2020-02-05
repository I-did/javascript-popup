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
				// get 'close' animation
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
		_.initOpenBtns();
	};