"use strict";

import $ from 'jquery';

const SEL_NS = "annotip-text";

/*
 * IsAnnotator determines if the provided element is part of Annotator. Useful
 * for ignoring mouse actions on the annotator elements.
 * 
 * @param element - An Element or TextNode to check.
 * 
 * Returns true if the element is a child of an annotator element.
 */
function isAnnotator(element) {
    const elAndParents = $(element).parents().
    addBack();

    return elAndParents.filter('[class^=annotator-]').length !== 0;
}


/*
 * TextSelector monitors a document (or a specific element) for text selections
 * and can notify another object of a selection event
 */
function TextSelection(element, options) {
    this.element = element;
    this.options = $.extend(true, {}, TextSelection.options, options);
    this.onSelection = this.options.onSelection;

    if (typeof this.element.ownerDocument !== 'undefined' &&
        this.element.ownerDocument !== null) {
        this.document = this.element.ownerDocument;

        $(this.document.body).
        on(`mouseup.${SEL_NS}`, (e) => {
            this._checkForEndSelection(e);
        });
    } else {
        console.warn("You created an instance of the TextSelector on an " +
            "element that doesn't have an ownerDocument. This won't " +
            "work! Please ensure the element is added to the DOM " +
            "before the plugin is configured:", this.element);
    }
}

TextSelection.prototype.destroy = function () {
    if (this.document) {
        $(this.document.body).off(`.${SEL_NS}`);
    }
};

/*
 * Public: capture the current selection from the document, excluding any nodes
 * that fall outside of the adder's `element`.
 * 
 * Returns an Array of NormalizedRange instances.
 */
TextSelection.prototype.captureDocumentSelection = function () {
    let i = 0,
        len = 0;
    const ranges = [],
        rangesToIgnore = [],
        selection = window.getSelection();

    if (selection.isCollapsed) {
        return [];
    }

    for (i = 0; i < selection.rangeCount; i++) {
        const r = selection.getRangeAt(i),
            browserRange = r, // new xpathRange.Range.BrowserRange(r),
            normedRange = browserRange.normalize().limit(this.element);

        /*
         * If the new range falls fully outside our this.element, we should
         * add it back to the document but not return it from this method.
         */
        if (normedRange === null) {
            rangesToIgnore.push(r);
        } else {
            ranges.push(normedRange);
        }
    }

    /*
     * BrowserRange#normalize() modifies the DOM structure and deselects the
     * underlying text as a result. So here we remove the selected ranges and
     * reapply the new ones.
     */
    selection.removeAllRanges();

    for (i = 0, len = rangesToIgnore.length; i < len; i++) {
        selection.addRange(rangesToIgnore[i]);
    }

    // Add normed ranges back to the selection
    for (i = 0, len = ranges.length; i < len; i++) {
        const range = ranges[i],
            drange = this.document.createRange();

        drange.setStartBefore(range.start);
        drange.setEndAfter(range.end);
        selection.addRange(drange);
    }


    return ranges;
};

/*
 * Event callback: called when the mouse button is released. Checks to see if a
 * selection has been made and if so displays the adder.
 * 
 * event - A mouseup Event object.
 * 
 * Returns nothing.
 */
TextSelection.prototype._checkForEndSelection = function (event) {
    const _nullSelection = () => {
        if (typeof this.onSelection === 'function') {
            this.onSelection([], event);
        }
    };

    // Get the currently selected ranges.
    const selectedRanges = this.captureDocumentSelection();

    if (selectedRanges.length === 0) {
        _nullSelection();

        return;
    }

    // Don't show the adder if the selection was of a part of Annotator itself.
    for (let i = 0, len = selectedRanges.length; i < len; i++) {
        let container = selectedRanges[i].commonAncestor;

        if ($(container).hasClass('annotator-hl')) {
            container = $(container).parents('[class!=annotator-hl]')[0];
        }
        if (isAnnotator(container)) {
            _nullSelection();

            return;
        }
    }

    if (typeof this.onSelection === 'function') {
        this.onSelection(selectedRanges, event);
    }
};


// Configuration options
TextSelection.options = {
    /*
     * Callback, called when the user makes a selection.
     * Receives the list of selected ranges (may be empty) and  the DOM Event
     * that was detected as a selection.
     */
    onSelection: null
};

export default TextSelection;
