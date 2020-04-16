SimplePopup.prototype.initAnimationEndEvents = function(_, elem) {
	let $elem = _['$' + elem];

	if ($elem) {
		let animation = _.options.animation[elem],
			transition = _.options.transition[elem];

		if (animation) {
			$elem.addEventListener('animationend', function() {
				if (event.animationName === animation.open.name) {
					_.dispatchEvent($elem, elem + 'open');
					// console.log(event, elem + 'open');
				} else {
					$elem.style.animation = '';
					$elem.classList.remove('active');
					_.dispatchEvent($elem, elem + 'close');
					// console.log(event, elem + 'close');
				}
			});
		} else if (transition) {

			$elem.style[transition.property] = transition.from;

			$elem.addEventListener('transitionend', function() {
				if ($elem.style[transition.property] == transition.to) {
					_.dispatchEvent($elem, elem + 'open');
					// console.log(event, elem + 'open');
				} else {
					$elem.style.transition = '';
					$elem.classList.remove('active');
					_.dispatchEvent($elem, elem + 'close');
					// console.log(event, elem + 'close');
				}
			});
		}

	}

};