var AnnoTip = (function ($, tippy) {
	'use strict';

	$ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
	tippy = tippy && Object.prototype.hasOwnProperty.call(tippy, 'default') ? tippy['default'] : tippy;

	var NS_SEL = "annotip-text";

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
	 * A wrapper of relevant selection data, to be passed to @see {AnnoTip}.
	 * @param {String} content The plain text version of the selected content
	 * @param {Event} event The event that triggered the selection (mouseup)
	 * @param {Array<Range>} ranges The array of ranges, that this selection occupies
	 */


	function TextSelection(content, event, ranges) {
	  this.content = content;
	  this.event = event;
	  this.range = mergeRanges(ranges);
	}

	TextSelection.prototype.getElement = function () {
	  var parentEl = this.range.commonAncestorContainer;
	  return parentEl instanceof Element ? parentEl : parentEl.parentElement;
	};

	TextSelection.prototype.getBoundingRect = function () {
	  return this.range.getBoundingClientRect();
	};
	/**
	 * Initializes a text selection monitoring mechanis.about-content
	 * 
	 * @param {Element} element The parent DOM element to attach the whole text selection monitoring mechanism to.
	 * @param {Object} settings Settings for monitoring. Check @see TextSelection.defaults.
	 */


	function TextMonitor(element, settings) {
	  var _this = this;

	  this.element = element;
	  this.settings = $.extend(true, {}, TextMonitor.defaults, settings);

	  if (this.element.ownerDocument) {
	    this.document = this.element.ownerDocument;
	    $(this.document.body).on('mouseup.' + NS_SEL, function (e) {
	      return _this._handleSelection(e);
	    });
	  } else {
	    throw new Error("Non-attached element used for text selection: ".concat(element));
	  }
	}
	/**
	 * Detach the text selection monitoring mechanism.
	 */


	TextMonitor.prototype.detach = function () {
	  if (this.document) $(this.document.body).off('.' + NS_SEL);
	};
	/**
	 * Handles the mouse-up event, supposedly after a selection is made.
	 * @param event The actual mouse-up event.
	 */


	TextMonitor.prototype._handleSelection = function (event) {
	  var selection = this.document.getSelection(); // TODO: Check with defaultView

	  if (selection.isCollapsed) return;
	  var myRanges = [];

	  for (var i = 0; i < selection.rangeCount; ++i) {
	    var r = selection.getRangeAt(i);
	    if (!$.contains(this.element, r.commonAncestorContainer)) continue;else if (this.multipleNodes || myRanges.length == 0 || !isMultiElement(myRanges[0], r)) myRanges.push(normalizeRange(r));
	  }

	  if (myRanges.length > 0) this.settings.onSelection(new TextSelection(selection.toString(), event, myRanges));
	};
	/**
	 * Default options.
	 */


	TextMonitor.defaults = {
	  // Whether selections over more than one element are allowed.
	  multipleNodes: false,
	  // function (content, event, ranges)
	  onSelection: null
	};

	var NS_ANNO = 'annotip-main';
	var FRAME_HTML = "\n<div class=\"annotip-frame\">\n\t<div class=\"annotip-dlg\" style=\"display: none\">{{content}}</div>\n\t<div class=\"annotip-actions\">{{actions}}</div>\n</div>";
	var DEF_ACTIONS = "\n\t<button data-annotip-action=\"cancel\">Cancel</button>\n\t<button data-annotip-action=\"ok\">OK</button>\n";

	function fillTemplate(html, obj) {
	  for (var prop in obj) {
	    if (!obj.hasOwnProperty(prop)) continue;
	    html = html.replace("{{".concat(prop, "}}"), obj[prop]);
	  }

	  return html;
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
	  this.tp = null;
	}
	/**
	 * Attach handlers - both element
	 */


	AnnoTip.prototype.attach = function (selector) {
	  var _this = this;

	  $(selector).each(function (i, el) {
	    if (!el.ownerDocument) throw new Error("Non-attached element used for anno-tip: ".concat(el));

	    if (_this.settings.textSelection && _this.settings.textSelection !== 'none') {
	      _this.selections.push(new TextMonitor(el, {
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

	AnnoTip.prototype.discard = function () {
	  this.tp.destroy();
	  this.tp = null;
	};
	/**
	 * Detach the AnnoTip from the page.
	 */


	AnnoTip.prototype.detach = function () {
	  // Destroy the Tippy instance, if such exists.
	  if (this.tp != null) this.tp.destroy();
	};

	AnnoTip.prototype._getTippyBox = function () {
	  return $("[class=tippy-box]");
	};

	AnnoTip.prototype._handleSelection = function (selection) {
	  var _this2 = this;

	  var anno = {
	    selection: selection.content,
	    range: selection.range,
	    event: selection.event
	  };
	  if (this.tp != null || this._call('onSelection', anno) === false) return; // Cleanup the previous instance, if such was created.

	  if (this.tp != null) this.tp.destroy(); // Go, and create a new one.

	  this.tp = new tippy(selection.getElement(), {
	    content: fillTemplate(FRAME_HTML, {
	      actions: anno.actionsHtml || this.settings.actionsHtml,
	      content: anno.content || anno.selection // TODO: Fix this!

	    }),
	    appendTo: document.body,
	    onShown: function onShown() {
	      var tpBox$ = _this2._getTippyBox();

	      anno.element = tpBox$[0];
	      tpBox$.on('click.' + NS_ANNO, 'div.annotip-actions button', function (e) {
	        _this2._call('onAction', $(e.currentTarget).data('annotipAction'), anno, e);
	      });
	    },
	    onClickOutside: function onClickOutside(tp) {
	      return tp.destroy();
	    },
	    onHide: function onHide() {
	      return _this2._call('onClose', anno) !== false;
	    },
	    onDestroy: function onDestroy() {
	      _this2.tp = null;
	    },
	    getReferenceClientRect: function getReferenceClientRect() {
	      return selection.getBoundingRect();
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

	return AnnoTip;

}($, tippy));
//# sourceMappingURL=anno-tip.js.map
