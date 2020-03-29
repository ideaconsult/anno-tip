"use strict";

/**
 * AnnoTip library main source.
 * Author: Ivan (Jonan) Georgiev, 2020
 */
import './AnnoTip.css';

import $ from 'jquery';
import tippy from 'tippy.js';
import TextMonitor  from './TextMonitor';

const NS_ANNO = 'annotip-main';
const DEF_CONTENT = `<textarea placeholder="Enter your comment..."></textarea>`;
const DEF_ACTIONS = [ "cancel", "edit" ];
const EXPANDED_ACTIONS = [ "cancel", "ok" ];

/**
 * The wrapper of annotation object being passed around during the whole process.
 * @param {Object} context The context, as being passed to AnnoTip with the settings
 * @param {String} selection The content (text) that is selected
 * @param {Range} range The DOM nodes range, that this selection occupies
 * @param {Event} event The DOM Event that triggered the annotation mechanism
 * @param {Element} element The DOM element, holding the selection
 * @description The `element` represents the closest common ancesstor of the nodes
 * in `range`, which - in most cases - is limited to one element, anyways.
*/
function Anno(base) {
	$.extend(true, this, base);
}

/**
 * Some AnnoTip helpers
 */
const prepareButton = (action) => `<button data-annotip-action="${action}" class="annotip-action-${action}" />`;

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
 * @param {Array<Object>} annos List of annotations in the same format, as they were created.
 * @returns {AnnoTip} A self instance for chaining invocations.
 */
AnnoTip.prototype.applyAnnos = function (annos) {
	annos.test = "";
	// TODO: Make sure there is something meaningful to be done here!
	
	return this;
};

/**
 * Close the annotation box, if it is openned at all.
 * @returns {AnnoTip} A self instance for chaining invocations.
 */
AnnoTip.prototype.discard = function () {
	if (this.tp != null)
		this.tp.destroy();

	this.tp = null;

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

	this._tippyBox$ = null;
	
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

AnnoTip.prototype._handleSelection = function (selection) {
	const anno = new Anno({
		context: this.settings.context,
		selection: selection.content,
		range: selection.range,
		event: selection.event,
		element: selection.getElement()
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
			// Quite a complex expression. But works! Relies on jQuery .chaining
			anno.element = this._getTippyBox().on('click.' + NS_ANNO, 'div.annotip-actions button', (e) => {
				this._call('onAction', $(e.currentTarget).data('annotipAction'), anno, e);
			})[0];
		},
		onClickOutside: (tp) => tp.destroy(),
		onHide: () => this._call('onClose', anno) !== false,
		onDestroy: () => { this.tp = null; selection.discard(); },
		getReferenceClientRect: () => selection.getBoundingRect()
	});
};

AnnoTip.prototype._call = function (hnd, ...moreArgs) {
	if (typeof hnd === 'string')
		hnd = this.settings[hnd];

	return typeof hnd === 'function' ? hnd.apply(this, moreArgs) : undefined;
};

AnnoTip.defaults = {
	context: null,
	textSelection: true,
	elementSelection: true,
	actionsHtml: null,
	classNames: null,
	tippySettings: {
		placement: 'auto',
		hideOnClick: false,
		trigger: 'manual',
		allowHTML: true,
		interactive: true,
		showOnCreate: true
	},
	// Handlers. All accept @see {Anno} as an argument.
	onSelection: null,
	onAction: null,
	onClose: null
};

export default AnnoTip;
