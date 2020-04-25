"use strict";

/**
 * AnnoTip library main source.
 * Author: Ivan (Jonan) Georgiev, 2020
 */
import './AnnoTip.css';

import $ from 'jquery';
import tippy from 'tippy.js';
import TextMonitor from './TextMonitor';
import CssSelectorGenerator from 'css-selector-generator';

const NS_ANNO = 'annotip-main';
const DEF_CONTENT = `<textarea placeholder="Enter your comment..."></textarea>`;
const DEF_ACTIONS = [
	{
		action: "cancel",
		help: "Cancel the annotation"
	}, {
		action: "edit",
		help: "Make the annotation"
	}
];
const EXPANDED_ACTIONS = [
	{
		action: "cancel",
		help: "Discard the annotation"
	}, {
		action: "ok",
		help: "Confirm the annotation"
	}
];


/**
 * The wrapper of annotation object being passed around during the whole process.
 * @param {Object} context The context, as being passed to AnnoTip with the settings
 * @param {String} selection The content (text) that is selected
 * @param {Range} range The DOM nodes range, that this selection occupies
 * @param {Event} event The DOM Event that triggered the annotation mechanism
 * @param {Element} element The DOM element, holding the selection
 * @param {String} reverseSelector The CSS selector string pointing the the exact element.
 * @description The `element` represents the closest common ancesstor of the nodes
 * in `range`, which - in most cases - is limited to one element, anyways.
*/
function Anno(base) {
	$.extend(true, this, base);
}

/**
 * Some AnnoTip helpers
 * @ignore
 */
const prepareButton = (info) => `
	<button data-annotip-action="${info.action}"
			class="annotip-action-${info.action}"
			title="${info.help || ""}"
	/>`;

/**
 * Initialize the annotation engine
 * @param {Object} settings Custom settings for the annotation engine.
 * @returns {AnnoTip} The instance just created.
 */
function AnnoTip(settings) {
	this.settings = $.extend(true, {}, AnnoTip.defaults, settings);
	
	// Normalize the settings
	if (typeof this.settings.textSelection === 'string')
		this.settings.textSelection = this.settings.textSelection.toLowerCase();
	if (this.settings.actionsHtml === null)
		this.settings.actionsHtml = $.map(DEF_ACTIONS, (a) => prepareButton(a)).join('');

	tippy.setDefaultProps(this.settings.tippySettings);
	
	this.monitors = [];
	this.tp = null;
}

/**
 * Attach handlers on the selected elements, both with text and element monitoring
 * 
 * @param {String} selector The jQuery selector to use for listing all elements to monitor.
 * @returns {AnnoTip} A self instance for chaining invocations.
 * @description This method can be invoked many times, with difference selectors.
 */
AnnoTip.prototype.attach = function (selector) {
	if (this.settings.textSelection && this.settings.textSelection !== 'none') {
		this.monitors.push(new TextMonitor(selector, {
			multipleNodes: this.settings.textSelection === 'multi',
			onSelection: (content, event, range) => this._handleSelection(content, event, range)
		}));
	}

	return this;
};

/**
 * Apply the list of annotatons to the page, so that they can be edited later.
 * 
 * @param {Element} root The base to be used for relative DOM paths stored in the annotations.
 * @param {Array<Anno>} annos List of annotations in the same format, as they were created.
 * @param {Function} handler The handler to be invoked for each annotation and located element.
 * The expected format is: `function (anno)`.
 * @returns {AnnoTip} A self instance for chaining invocations.
 * @description The routine initially fills the `element` property of each annotation object, based
 * on the stored `reverseSelector` and then, if a handler is passed, invokes it with the anno object.
 */
AnnoTip.prototype.applyAnnos = function (root, annos, handler) {
	for (let i = 0; i < annos.length; ++i) {
		const oneAnno = annos[i];
	
		oneAnno.element = $(oneAnno.reverseSelector, root)[0];
		this._call(handler, oneAnno);
	}
	
	return this;
};

/**
 * Close the annotation box, if it is openned at all.
 * @returns {AnnoTip} A self instance for chaining invocations.
 */
AnnoTip.prototype.discard = function () {
	if (this.tp != null) {
		this.tp.destroy();
		this.tp = null;
	}

	this._tippyBox$ = null;

	return this;
};

/**
 * Update the content and actions lines of the annotation box,
 * based on the newly provided object.
 * 
 * @param {Object} anno The annotation object to be used for content resetting
 * @returns {AnnoTip} A self instance for chaining invocations.
 */
AnnoTip.prototype.update = function (anno) {
	this.tp.setContent(this._prepareFrame({ 
		actions: anno.actionsHtml || $.map(EXPANDED_ACTIONS, (a) => prepareButton(a)).join(''),
		content: anno.content || DEF_CONTENT
	}));

	return this;
};

/**
 * Detach the AnnoTip from the page.
 * @returns {AnnoTip} A self instance for chaining invocations.
*/
AnnoTip.prototype.detach = function () {
	// Destroy the Tippy instance, if such exists.
	if (this.tp != null)
		this.tp.destroy();

	// Detach all monitors
	$.each(this.monitors, (i, s) => s.detach());
	this.monitors = [];

	return this;
};

AnnoTip.prototype.getFrame = function () {
	return $('div.annotip-frame', this._getTippyBox()[0]);
};

/**
 * Private methods
 * @ignore
 */

AnnoTip.prototype._getTippyBox = function () {
	if (!this._tippyBox$)
		this._tippyBox$ = $("div.tippy-box");

	return this._tippyBox$;
};

AnnoTip.prototype._prepareFrame = function (info) {
	const frameClasses = ['annotip-frame'];

	if (this.settings.tippySettings.theme)
		frameClasses.push(this.settings.tippySettings.theme);
	if (typeof this.settings.classNames === 'string')
		frameClasses.push(this.settings.classNames);
	else if (Array.isArray(this.settings.classNames))
		frameClasses.push(...this.settings.classNames);
	
	return `
		<div class="${frameClasses.join(' ')}">
			<div class="annotip-dlg">${info.content}</div>
			<div class="annotip-actions">${info.actions}</div>
		</div>`;
};

AnnoTip.prototype._handleSelection = function (selRoot, selection) {
	const theEl = selection.getElement(),
		selReverse = CssSelectorGenerator(
			theEl, 
			$.extend({ root: selRoot }, this.settings.cssReverseOptions)
		),
		anno = new Anno({
			context: this.settings.context,
			selection: selection.content,
			range: selection.range,
			event: selection.event,
			element: theEl,
			root: selRoot,
			reverseSelector: selReverse
		});

	if (this.tp != null || this._call('onSelection', anno) === false)
		return;
	
	// Cleanup the previous instance, if such was created.
	if (this.tp != null)
		this.tp.destroy();

	// Go, and create a new one.
	this.tp = new tippy(anno.element, {
		content: this._prepareFrame({ 
			actions: anno.actionsHtml || this.settings.actionsHtml, 
			content: anno.content || ''
		}),
		appendTo: document.body,
		onShown: () => {
			this._getTippyBox().on('click.' + NS_ANNO, 'div.annotip-actions button', (e) => {
				this._call('onAction', $(e.currentTarget).data('annotipAction'), anno, e);
			});
		},
		onClickOutside: (tp) => tp.destroy(),
		onHide: () => this._call('onClose', anno) !== false,
		onDestroy: () => { 
			this.tp = null; // This prevents a loop.
			this.discard(); 
			selection.discard(); 
		},
		getReferenceClientRect: () => selection.getBoundingRect()
	});
};

AnnoTip.prototype._call = function (hnd, ...moreArgs) {
	if (typeof hnd === 'string')
		hnd = this.settings[hnd];

	return typeof hnd === 'function' ? hnd.apply(this, moreArgs) : undefined;
};

/**
 * Default settings.
 */
AnnoTip.defaults = {
	/**
	 * The user-provided context to be added to each {@link Anno} created.
	 */
	context: null,

	/**
	 * Whether to install text selection monitoring. {@link TextMonitor}.
	 * Currently this is the only supported mode.
	 */
	textSelection: true,

	/**
	 * Whether to install element click/handling mointoring. Not supported.
	 */
	elementSelection: true,

	/**
	 * A custom-provided HTML for action buttons, which are openned when a
	 * selection is recognized.
	 */
	actionsHtml: null,

	/**
	 * Additional class-names to be applied to the annotation frame DOM element. 
	 * Can be both array and string (with one or more class names).
	 */
	classNames: null,

	/**
	 * Options for css reverse selector, builder, used to construct the {@link Anno}
	 * `reverseSelector` property. Check {@link https://www.npmjs.com/package/css-selector-generator}.
	 */
	cssReverseOptions: null,

	/**
	 * The settings to be passed to the underlying Tippy.js box engine.
	 * {@link https://atomiks.github.io/tippyjs/}.
	 */
	tippySettings: {
		placement: 'auto',
		hideOnClick: false,
		trigger: 'manual',
		allowHTML: true,
		interactive: true,
		showOnCreate: true
	},

	/**
	 * Handler to be invoked when a selection is made. The constructed {@link Anno} object
	 * is passed.
	 */
	onSelection: null,

	/**
	 * Handler to be invoked on user action. The default actions are `edit`, `ok` and `cancel`.
	 * The constructed {@link Anno} object is passed.
	 */
	onAction: null,

	/**
	 * Handler to be invoked when the annotation box is about to be closed.
	 * The constructed {@link Anno} object is passed.
	 */
	onClose: null
};

export default AnnoTip;
