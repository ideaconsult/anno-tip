"use strict";

import $ from 'jquery';
import tippy from 'tippy.js';
import TextSelection  from './TextSelection';

const NS_ANNO = 'annotip-main';
const DEF_SETTINGS = {
	subject: null,
	textSelection: true,
	elementSelection: true,
	tippySettings: {

	},
	// Handlers
	extractContext: null,  // (el$, subject) => null,
	prepareUI: null,       // (el$, context) => null,
	storeAnno: null,       // (el$, context, info) => null,
	applyAnno: null        // (el$, anno) => null
};


/**
 * Initialize the annotation engine
 * @param {Object} settings Custom settings for the annotation engine. Refer 
 */
function AnnoTip(settings) {
	this.settings = $.extend(true, {}, DEF_SETTINGS, settings);
	this.textSel = new TextSelection();
	this.tp = new tippy();
}

/**
 * Attach handlers - both element
 */
AnnoTip.prototype.attach = function (selector) {
	// TODO: List selected elements and attach the designated selectors to them.
	$(selector).val(NS_ANNO);
};

/**
 * 
 */
AnnoTip.prototype.applyAnnos = function (annos) {
	annos.test = "";
};

/**
 * 
 */
AnnoTip.prototype.detach = function (selector) {
	$(selector).val("");
};

/**
 *  
 */
AnnoTip.prototype.onTrigger = function () {

};

/**
 * 
 */
AnnoTip.prototype.showUI = function(el$) {
	el$.val("");
};
/**
 * 
 */
AnnoTip.prototype.hideUI = function() {

};

export default AnnoTip;
