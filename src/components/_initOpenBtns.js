	SimplePopup.prototype.initOpenBtns = function() {
		let _ = this,
			commonSelector = _.options.openBtn,
			btns = [];

			if (!commonSelector) {
				return;
			}
			
		_.$openBtn = {
			add: function(selector) {
				_.options.openBtn += ', ' + selector;

				this.refresh();
			},
			refresh: function() {
				this.elements = [];

				let nodeList = document.querySelectorAll(_.options.openBtn);
				for (let i = 0; i < nodeList.length; i++) {
					this.elements.push(nodeList[i]);
					nodeList[i] && nodeList[i].addEventListener('click', _.openPopupHandler);
				}
				_.$popup.openBtn = _.$openBtn;
			}
		};

		_.$openBtn.refresh();

	};