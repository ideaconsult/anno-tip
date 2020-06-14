"use strict";

import $ from 'jquery';

const NS_SEL = "annotip-text";

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
 * A wrapper of relevant selection data, to be passed to {@link AnnoTip}.
 * @param {String} content The plain text version of the selected content
 * @param {Event} event The event that triggered the selection (mouseup)
 * @param {Array<Range>} ranges The array of ranges, that this selection occupies
 * @private
 */
function TextSelection(selection, event, ranges) {
	this.selection = selection;
	this.content = selection.toString();
	this.event = event;
	this.range = mergeRanges(ranges);
}

/**
 * Returns the DOM element that wrapps the selection.
 * @returns {Element} The DOM element containing the entire selection.
 * @private
 */
TextSelection.prototype.getElement = function() {
	const parentEl = this.range.commonAncestorContainer;

	return parentEl instanceof Element ? parentEl : parentEl.parentElement;
};

/**
 * Returns the bounding box of the selection.
 * @returns {DOMRect} The rectangle containing all elements & nodes of the selection.
 * @private
 */
TextSelection.prototype.getBoundingRect = function () {
	return this.range.getBoundingClientRect();
};

/**
 * Discards the selection, i.e. - deselect.
 * @returns {TextSelection} For chaining calls.
 * @private
 */
TextSelection.prototype.discard = function () {
	this.selection.removeAllRanges();

	return this;
};


/**
 * Initializes a text selection monitoring mechanis.about-content
 * 
 * @param {Element} element The parent DOM element to attach the whole text selection monitoring mechanism to.
 * @param {Object} settings Settings for monitoring. Check {@link TextMonitor.defaults}.
 * @private
 */ 
function TextMonitor(selector, settings) {
	this.elements = selector;
	this.settings = $.extend(true, {}, TextMonitor.defaults, settings);

	const oneElement = $(selector)[0];

	if (!oneElement)
		console.log("AnnoTip: No elements found to attach using '" + selector + "'");
	else if (oneElement.ownerDocument) {
		this.document = oneElement.ownerDocument;
		
		$(this.document.body).on('mouseup.' + NS_SEL, (e) => this._handleSelection(e));
	} else {
		throw new Error(`Non-attached element(s) used for text selection: ${selector}`);
	}
}

/**
 * Detach the text selection monitoring mechanism.
 * @returns {TextMonitor} For chaining calls.
 * @private
 */
TextMonitor.prototype.detach = function () {
	if (this.document)
		$(this.document.body).off('.' + NS_SEL);

	return this;
};

/**
 * Handles the mouse-up event, supposedly after a selection is made.
 * @param event The actual mouse-up event.
 * @private
 */
TextMonitor.prototype._handleSelection = function (event) {
	const selection = this.document.getSelection();

	if (selection.isCollapsed) return;
	
	const myRanges = [];

	let mainRoot = null;

	for (let i = 0; i < selection.rangeCount; ++i) {
		const r = selection.getRangeAt(i),
			theRoot = $(r.commonAncestorContainer).parents().filter(this.elements)[0];

		if (!mainRoot)
			mainRoot = theRoot;
		if (!theRoot || mainRoot != theRoot)
			continue; // We don't allow multi-rooted selections.
		else if (this.multipleNodes || myRanges.length == 0 || !isMultiElement(myRanges[0], r))
			myRanges.push(normalizeRange(r));
	}

	if (myRanges.length > 0)
		this.settings.onSelection(mainRoot, new TextSelection(selection, event, myRanges));
};

/**
 * Default options.
 * @private
 */
TextMonitor.defaults = {
	multipleNodes: false,
	onSelection: null
};

export default TextMonitor;
