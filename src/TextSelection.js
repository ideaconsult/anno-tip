"use strict";

import $ from 'jquery';

const SEL_NS = "annotip-text";

function isMultiElement(range1, range2) {
	return $.unique([
		range1.startContainer, range1.endContainer, 
		range2.startContainer, range2.endContainer
	]).length > 0;
}

function normalizeRange(range) {
	const startNode = range.startContainer,
		endNode = range.endContainer;

	if (startNode == endNode) {
		if (range.startOffset > range.endOffset) {
			const _t = range.startOffset;

			range.setStartOffset(range.endOffset);
			range.setEndOffset(_t);
		}
	}

	return range;
}

function mergeRanges(ranges) {
	if (ranges.length == 0)
		return null;
	if (ranges.length == 1)
		return ranges[0];
	
	// TODO: Make sure the ranges are properly ordered.
	const lastR = ranges[ranges.length - 1],
		unitedR = document.createRange();

	unitedR.setStart(ranges[0].startContainer, ranges[0].startOffset);
	unitedR.setEnd(lastR.endContainer, lastR.endOffset);

	return unitedR;
}

/**
 * Initializes a text selection monitoring mechanis.about-content
 * 
 * @param {Element} element The parent DOM element to attach the whole text selection monitoring mechanism to.
 * @param {Object} settings Settings for monitoring. Check @see TextSelection.defaults.
 */ 
function TextSelection(element, settings) {
	this.element = element;
	this.settings = $.extend(true, {}, TextSelection.defaults, settings);

	if (this.element.ownerDocument) {
		this.document = this.element.ownerDocument;
		
		$(this.document.body).on(`mouseup.${SEL_NS}`, (e) => {
			this._handleSelection(e);
		});
	} else {
		throw new Error(`Non-attached element used for text selection: ${element}`);
	}
}

/**
 * Detach the text selection monitoring mechanism.
 */
TextSelection.prototype.detach = function () {
	if (this.document)
		$(this.document.body).off(`.${SEL_NS}`);
};


/**
 * Handles the mouse-up event, supposedly after a selection is made.
 * @param event The actual mouse-up event.
 */
TextSelection.prototype._handleSelection = function (event) {
	const selection = this.document.getSelection(); // TODO: Check with defaultView

	if (selection.isCollapsed)
		return;
	
	const myRanges = [];

	for (let i = 0; i < selection.rangeCount; ++i) {
		const r = selection.getRangeAt(i);

		if (!$.contains(this.element, r.commonAncestorContainer))
			continue;
		else if (this.multipleNodes || myRanges.length == 0 || !isMultiElement(myRanges[0], r))
			myRanges.push(normalizeRange(r));
	}

	if (myRanges.length > 0)
		this.settings.onSelection(selection.toString(), event, mergeRanges(myRanges));
};

/**
 * Default options.
 */
TextSelection.defaults = {
	// Whether selections over more than one element are allowed.
	multipleNodes: false,
	// function (content, event, ranges)
	onSelection: null
};

export default TextSelection;
