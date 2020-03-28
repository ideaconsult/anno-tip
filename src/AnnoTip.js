"use strict";

import $ from 'jquery';
import tippy from 'tippy.js';
import TextMonitor  from './TextMonitor';

const NS_ANNO = 'annotip-main';
const FRAME_HTML = `
<div class="annotip-frame">
	<div class="annotip-dlg" style="display: none">{{content}}</div>
	<div class="annotip-actions">{{actions}}</div>
</div>`;

const DEF_ACTIONS = `
	<button data-annotip-action="cancel">Cancel</button>
	<button data-annotip-action="ok">OK</button>
`;

function fillTemplate(html, obj) {
	for (const prop in obj) {
		if (!obj.hasOwnProperty(prop))
			continue;
		html = html.replace(`{{${prop}}}`, obj[prop]);
	}

	return html;
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
	this.tp = null;
}

/**
 * Attach handlers - both element
 */
AnnoTip.prototype.attach = function (selector) {
	$(selector).each((i, el) => {
		if (!el.ownerDocument)
			throw new Error(`Non-attached element used for anno-tip: ${el}`);

		if (this.settings.textSelection && this.settings.textSelection !== 'none') {
			this.selections.push(new TextMonitor(el, {
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

AnnoTip.prototype.discard = function () {
	this.tp.destroy();
	this.tp = null;
};

/**
 * Detach the AnnoTip from the page.
 */
AnnoTip.prototype.detach = function () {
	// Destroy the Tippy instance, if such exists.
	if (this.tp != null)
		this.tp.destroy();
};

AnnoTip.prototype._getTippyBox = function () {
	return $("[class=tippy-box]");
};

AnnoTip.prototype._handleSelection = function (selection) {
	const anno = {
		selection: selection.content,
		range: selection.range,
		event: selection.event
	};

	if (this.tp != null || this._call('onSelection', anno) === false)
		return;
	
	// Cleanup the previous instance, if such was created.
	if (this.tp != null)
		this.tp.destroy();

	// Go, and create a new one.
	this.tp = new tippy(selection.getElement(), {
		content: fillTemplate(FRAME_HTML, { 
			actions: anno.actionsHtml || this.settings.actionsHtml, 
			content: anno.content || anno.selection  // TODO: Fix this!
		}),
		appendTo: document.body,
		onShown: () => {
			const tpBox$ = this._getTippyBox();
			
			anno.element = tpBox$[0];
			tpBox$.on('click.' + NS_ANNO, 'div.annotip-actions button', (e) => {
				this._call('onAction', $(e.currentTarget).data('annotipAction'), anno, e);
			});
		},
		onClickOutside: (tp) => tp.destroy(),
		onHide: () => this._call('onClose', anno) !== false,
		onDestroy: () => { this.tp = null; },
		getReferenceClientRect: () => selection.getBoundingRect()
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
	actionsHtml: DEF_ACTIONS,
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
