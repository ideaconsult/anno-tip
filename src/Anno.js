"use strict";

import $ from 'jquery';


function Anno(obj) {
	for (const k in obj)
		if (obj.hasOwnProperty(k))
			this[k] = obj[k];
}

Anno.prototype.setContent = function (html) {
	// TODO: Placeholder!
	document.getElementById(html);
};

Anno.prototype.getResponse = function () {

};

Anno.prototype.getManager = function () {
	return this.manager;
};


Anno.prototype.getElement = function () {
	const parentEl = this.range.commonAncestorContainer;

	return parentEl instanceof Element ? parentEl : parentEl.parentElement;
};

Anno.prototype.getBoundingRect = function() {
	return this.range.getBoundingClientRect();
};

export default Anno;
