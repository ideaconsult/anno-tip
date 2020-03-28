"use strict";

import $ from 'jquery';
import tippy from 'tippy.js';
import TextSelection  from './TextSelection';
import Anno from './Anno';

// const NS_ANNO = 'annotip-main';

function isSelf(element) {
    const elAndParents = $(element).parents().addBack();
	
	return elAndParents.filter('[class=tippy-box]').length !== 0;
}

/**
 * Initialize the annotation engine
 * @param {Object} settings Custom settings for the annotation engine.
 */
function AnnoTip(settings) {
	this.settings = $.extend(true, {}, AnnoTip.defaults, settings);
	
	// Normalize the settings
	if (typeof this.settings.textSelection === 'string')
		this.settings.textSelection = this.settings.textSelection.toLowerCase();

	tippy.setDefaultProps(this.settings.tippySettings);
	
	this.selections = [];
}

/**
 * Attach handlers - both element
 */
AnnoTip.prototype.attach = function (selector) {
	$(selector).each((i, el) => {
		if (this.settings.textSelection && this.settings.textSelection !== 'none') {
			this.selections.push(new TextSelection(el, {
				multipleNodes: this.settings.textSelection === 'multi',
				onSelection: (content, event, range) => this._handleSelection(content, event, range)
			}));
		}
	});
};

/**
 * 
 */
AnnoTip.prototype.applyAnnos = function (annos) {
	annos.test = "";
};

/**
 * Detach the AnnoTip from the page.
 */
AnnoTip.prototype.detach = function () {
	// Destroy the Tippy instance, if such exists.
	if (this.tp != null)
		this.tp.destroy();

	// Go, and detach all selection monitors.
	$.each(this.selections, (i, s) => {
		s.detach();
	});
};

AnnoTip.prototype._handleSelection = function (content, event, range) {
	const anno = new Anno({
		manager: this,
		content: content,
		range: range,
		event: event
	});
	const domEl = anno.getElement();

	if (isSelf(domEl) || this._call('afterSelection', anno) === false)
		return;
	
	// Cleanup the previous instance, if such was created.
	if (this.tp != null)
		this.tp.destroy();

	// Go, and create a new one.
	this.tp = new tippy(domEl, {
		content: content,
		appendTo: document.body,
		getReferenceClientRect: () => anno.getBoundingRect()
	});
};

AnnoTip.prototype._call = function (hnd, ...moreArgs) {
	if (typeof hnd === 'string')
		hnd = this.settings[hnd];

	return typeof hnd === 'function' ? hnd.apply(this, moreArgs) : undefined;
};

AnnoTip.defaults = {
	subject: null,
	textSelection: true,
	elementSelection: true,
	tippySettings: {
		placement: 'auto',
		hideOnClick: true,
		trigger: 'manual',
		allowHTML: true,
		interactive: true,
		showOnCreate: true
	},
	// Handlers. All accept @see {Anno} as an argument.
	afterSelection: null,
	beforeAnno: null,
	afterAnno: null
};

export default AnnoTip;
