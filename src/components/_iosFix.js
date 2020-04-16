	SimplePopup.prototype.iosFix = function()  {
		let _ = this;
		_.$inputs = [];
		if (_.iosRegExp.test(navigator.userAgent)) {
			let nodeList = _.$popup.querySelectorAll('input, textarea');

			for (let i = 0; i < nodeList.length; i++) {
				_.$inputs.push(nodeList[i]);
			}
		}
	};