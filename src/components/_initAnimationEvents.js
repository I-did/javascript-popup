	SimplePopup.prototype.initAnimationEndEvents = function(_, elem) {
		let el = '$' + elem; // _.$popup || _.$overlay
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