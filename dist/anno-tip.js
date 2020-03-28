var AnnoTip = (function ($, tippy) {
	'use strict';

	$ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
	tippy = tippy && Object.prototype.hasOwnProperty.call(tippy, 'default') ? tippy['default'] : tippy;

	var SEL_NS = "annotip-text";

	function isMultiElement(range1, range2) {
	  return $.unique([range1.startContainer, range1.endContainer, range2.startContainer, range2.endContainer]).length > 0;
	}

	function normalizeRange(range) {
	  var startNode = range.startContainer,
	      endNode = range.endContainer;

	  if (startNode == endNode) {
	    if (range.startOffset > range.endOffset) {
	      var _t = range.startOffset;
	      range.setStartOffset(range.endOffset);
	      range.setEndOffset(_t);
	    }
	  }

	  return range;
	}

	function mergeRanges(ranges) {
	  if (ranges.length == 0) return null;
	  if (ranges.length == 1) return ranges[0]; // TODO: Make sure the ranges are properly ordered.

	  var lastR = ranges[ranges.length - 1],
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
	  var _this = this;

	  this.element = element;
	  this.settings = $.extend(true, {}, TextSelection.defaults, settings);

	  if (this.element.ownerDocument) {
	    this.document = this.element.ownerDocument;
	    $(this.document.body).on("mouseup.".concat(SEL_NS), function (e) {
	      _this._handleSelection(e);
	    });
	  } else {
	    throw new Error("Non-attached element used for text selection: ".concat(element));
	  }
	}
	/**
	 * Detach the text selection monitoring mechanism.
	 */


	TextSelection.prototype.detach = function () {
	  if (this.document) $(this.document.body).off(".".concat(SEL_NS));
	};
	/**
	 * Handles the mouse-up event, supposedly after a selection is made.
	 * @param event The actual mouse-up event.
	 */


	TextSelection.prototype._handleSelection = function (event) {
	  var selection = this.document.getSelection(); // TODO: Check with defaultView

	  if (selection.isCollapsed) return;
	  var myRanges = [];

	  for (var i = 0; i < selection.rangeCount; ++i) {
	    var r = selection.getRangeAt(i);
	    if (!$.contains(this.element, r.commonAncestorContainer)) continue;else if (this.multipleNodes || myRanges.length == 0 || !isMultiElement(myRanges[0], r)) myRanges.push(normalizeRange(r));
	  }

	  if (myRanges.length > 0) this.settings.onSelection(selection.toString(), event, mergeRanges(myRanges));
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

	function Anno(obj) {
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) this[k] = obj[k];
	  }
	}

	Anno.prototype.setContent = function (html) {
	  // TODO: Placeholder!
	  document.getElementById(html);
	};

	Anno.prototype.getResponse = function () {};

	Anno.prototype.getManager = function () {
	  return this.manager;
	};

	Anno.prototype.getElement = function () {
	  var parentEl = this.range.commonAncestorContainer;
	  return parentEl instanceof Element ? parentEl : parentEl.parentElement;
	};

	Anno.prototype.getBoundingRect = function () {
	  return this.range.getBoundingClientRect();
	};

	function isSelf(element) {
	  var elAndParents = $(element).parents().addBack();
	  return elAndParents.filter('[class=tippy-box]').length !== 0;
	}
	/**
	 * Initialize the annotation engine
	 * @param {Object} settings Custom settings for the annotation engine.
	 */


	function AnnoTip(settings) {
	  this.settings = $.extend(true, {}, AnnoTip.defaults, settings); // Normalize the settings

	  if (typeof this.settings.textSelection === 'string') this.settings.textSelection = this.settings.textSelection.toLowerCase();
	  tippy.setDefaultProps(this.settings.tippySettings);
	  this.selections = [];
	}
	/**
	 * Attach handlers - both element
	 */


	AnnoTip.prototype.attach = function (selector) {
	  var _this = this;

	  $(selector).each(function (i, el) {
	    if (_this.settings.textSelection && _this.settings.textSelection !== 'none') {
	      _this.selections.push(new TextSelection(el, {
	        multipleNodes: _this.settings.textSelection === 'multi',
	        onSelection: function onSelection(content, event, range) {
	          return _this._handleSelection(content, event, range);
	        }
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
	  if (this.tp != null) this.tp.destroy(); // Go, and detach all selection monitors.

	  $.each(this.selections, function (i, s) {
	    s.detach();
	  });
	};

	AnnoTip.prototype._handleSelection = function (content, event, range) {
	  var anno = new Anno({
	    manager: this,
	    content: content,
	    range: range,
	    event: event
	  });
	  var domEl = anno.getElement();
	  if (isSelf(domEl) || this._call('afterSelection', anno) === false) return; // Cleanup the previous instance, if such was created.

	  if (this.tp != null) this.tp.destroy(); // Go, and create a new one.

	  this.tp = new tippy(domEl, {
	    content: content,
	    appendTo: document.body,
	    getReferenceClientRect: function getReferenceClientRect() {
	      return anno.getBoundingRect();
	    }
	  });
	};

	AnnoTip.prototype._call = function (hnd) {
	  if (typeof hnd === 'string') hnd = this.settings[hnd];

	  for (var _len = arguments.length, moreArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    moreArgs[_key - 1] = arguments[_key];
	  }

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

	return AnnoTip;

}($, tippy));
//# sourceMappingURL=anno-tip.js.map
