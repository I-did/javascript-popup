;(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.SimplePopup = factory();
	}
})(function() {

	//=require _utils.js
	//=require _init.js
	//=require _initEvents.js
	//=require _initAnimationEvents.js
	//=require _initOpenBtns.js
	//=require _playAnimation.js
	//=require _openPopup.js
	//=require _closePopup.js
	//=require _iosFix.js

	return SimplePopup;
});