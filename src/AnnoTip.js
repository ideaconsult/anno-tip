"use strict";

import $ from 'jquery';
import Tippy from 'tippy.js';
import TextSelection  from './TextSelection';

const NS_ANNO = 'annotip-main';
const DEF_SETTINGS = {
	subject: null,
	textSelection: true,
	elementSelection: true,
	tippySettings: {

	},
	// Handlers
	extractContext: (el$, subject) => null,
	prepareUI: (el$, context) => null,
	storeAnno: (el$, context, info) => null,
	applyAnno: (el$, anno) => null
};


/**
 * Initialize the annotation engine
 * @param {Object} settings Custom settings for the annotation engine. Refer 
 */
function AnnoTip(settings) {
	this.settings = $.extend(true, {}, DEF_SETTINGS, settings);
	this.textSel = new TextSelection();
	this.tp = new Tippy();
};

/**
 * Attach handlers - both element
 */
AnnoTip.prototype.attach = function (selector) {
	// TODO: List selected elements and attach the designated selectors to them.
};

/**
 * 
 */
AnnoTip.prototype.applyAnnos = function (annos) {

};

/**
 * 
 */
AnnoTip.prototype.detach = function (selector) {

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

};
/**
 * 
 */
AnnoTip.prototype.hideUI = function() {

};

export default AnnoTip;
