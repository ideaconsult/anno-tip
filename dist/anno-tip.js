var AnnoTip = (function ($, tippy, CssSelectorGenerator) {
  'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
  tippy = tippy && Object.prototype.hasOwnProperty.call(tippy, 'default') ? tippy['default'] : tippy;
  CssSelectorGenerator = CssSelectorGenerator && Object.prototype.hasOwnProperty.call(CssSelectorGenerator, 'default') ? CssSelectorGenerator['default'] : CssSelectorGenerator;

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "div.annotip-actions{text-align:right}div.annotip-frame>div.annotip-actions>button{width:16px;height:16px;background-color:transparent;background-image:url(\"data:image/png;base64,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\");background-repeat:no-repeat;background-size:48px 32px;margin:3px;border:0}div.annotip-frame.light>div.annotip-actions>button{background-image:url(\"data:image/png;base64,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\")}div.annotip-frame.big>div.annotip-actions>button{width:32px;height:32px;background-size:96px 64px;margin:5px}div.annotip-frame.big>div.annotip-actions>button.annotip-action-edit{background-position:0 0}div.annotip-frame.big>div.annotip-actions>button.annotip-action-edit:hover{background-position:0 -32px}div.annotip-frame.big>div.annotip-actions>button.annotip-action-cancel{background-position:-32px 0}div.annotip-frame.big>div.annotip-actions>button.annotip-action-cancel:hover{background-position:-32px -32px}div.annotip-frame.big>div.annotip-actions>button.annotip-action-ok{background-position:-64px 0}div.annotip-frame.big>div.annotip-actions>button.annotip-action-ok:hover{background-position:-64px -32px}div.annotip-actions>button.annotip-action-edit{background-position:0 0}div.annotip-actions>button.annotip-action-edit:hover{background-position:0 -16px}div.annotip-actions>button.annotip-action-cancel{background-position:-16px 0}div.annotip-actions>button.annotip-action-cancel:hover{background-position:-16px -16px}div.annotip-actions>button.annotip-action-ok{background-position:-32px 0}div.annotip-actions>button.annotip-action-ok:hover{background-position:-32px -16px}";
  styleInject(css_248z);

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


  TextSelection.prototype.getElement = function () {
    var parentEl = this.range.commonAncestorContainer;
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
    var _this = this;

    this.elements = selector;
    this.settings = $.extend(true, {}, TextMonitor.defaults, settings);
    var oneElement = $(selector)[0];
    if (!oneElement) console.log("AnnoTip: No elements found to attach using '" + selector + "'");else if (oneElement.ownerDocument) {
      this.document = oneElement.ownerDocument;
      $(this.document.body).on('mouseup.' + NS_SEL, function (e) {
        return _this._handleSelection(e);
      });
    } else {
      throw new Error("Non-attached element(s) used for text selection: ".concat(selector));
    }
  }
  /**
   * Detach the text selection monitoring mechanism.
   * @returns {TextMonitor} For chaining calls.
   * @private
   */


  TextMonitor.prototype.detach = function () {
    if (this.document) $(this.document.body).off('.' + NS_SEL);
    return this;
  };
  /**
   * Handles the mouse-up event, supposedly after a selection is made.
   * @param event The actual mouse-up event.
   * @private
   */


  TextMonitor.prototype._handleSelection = function (event) {
    var selection = this.document.getSelection();
    if (selection.isCollapsed) return;
    var myRanges = [];
    var mainRoot = null;

    for (var i = 0; i < selection.rangeCount; ++i) {
      var r = selection.getRangeAt(i),
          theRoot = $(r.commonAncestorContainer).parents().filter(this.elements)[0];
      if (!mainRoot) mainRoot = theRoot;
      if (!theRoot || mainRoot != theRoot) continue; // We don't allow multi-rooted selections.
      else if (this.multipleNodes || myRanges.length == 0 || !isMultiElement(myRanges[0], r)) myRanges.push(normalizeRange(r));
    }

    if (myRanges.length > 0) this.settings.onSelection(mainRoot, new TextSelection(selection, event, myRanges));
  };
  /**
   * Default options.
   * @private
   */


  TextMonitor.defaults = {
    multipleNodes: false,
    onSelection: null
  };

  var NS_ANNO = 'annotip-main';
  var DEF_CONTENT = "<textarea placeholder=\"Enter your comment...\"></textarea>";
  var DEF_ACTIONS = [{
    action: "cancel",
    help: "Cancel the annotation"
  }, {
    action: "edit",
    help: "Make the annotation"
  }];
  var EXPANDED_ACTIONS = [{
    action: "cancel",
    help: "Discard the annotation"
  }, {
    action: "ok",
    help: "Confirm the annotation"
  }];
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


  var prepareButton = function prepareButton(info) {
    return "\n\t<button data-annotip-action=\"".concat(info.action, "\"\n\t\t\tclass=\"annotip-action-").concat(info.action, "\"\n\t\t\ttitle=\"").concat(info.help || "", "\"\n\t/>");
  };
  /**
   * Initialize the annotation engine
   * @param {Object} settings Custom settings for the annotation engine.
   * @returns {AnnoTip} The instance just created.
   */


  function AnnoTip(settings) {
    this.settings = $.extend(true, {}, AnnoTip.defaults, settings); // Normalize the settings

    if (typeof this.settings.textSelection === 'string') this.settings.textSelection = this.settings.textSelection.toLowerCase();
    if (this.settings.actionsHtml === null) this.settings.actionsHtml = $.map(DEF_ACTIONS, function (a) {
      return prepareButton(a);
    }).join('');
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
    var _this = this;

    if (this.settings.textSelection && this.settings.textSelection !== 'none') {
      this.monitors.push(new TextMonitor(selector, {
        multipleNodes: this.settings.textSelection === 'multi',
        onSelection: function onSelection(content, event, range) {
          return _this._handleSelection(content, event, range);
        }
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
    for (var i = 0; i < annos.length; ++i) {
      var oneAnno = annos[i];
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
      actions: anno.actionsHtml || $.map(EXPANDED_ACTIONS, function (a) {
        return prepareButton(a);
      }).join(''),
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
    if (this.tp != null) this.tp.destroy(); // Detach all monitors

    $.each(this.monitors, function (i, s) {
      return s.detach();
    });
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
    if (!this._tippyBox$) this._tippyBox$ = $("div.tippy-box");
    return this._tippyBox$;
  };

  AnnoTip.prototype._prepareFrame = function (info) {
    var frameClasses = ['annotip-frame'];
    if (this.settings.tippySettings.theme) frameClasses.push(this.settings.tippySettings.theme);
    if (typeof this.settings.classNames === 'string') frameClasses.push(this.settings.classNames);else if (Array.isArray(this.settings.classNames)) frameClasses.push.apply(frameClasses, _toConsumableArray(this.settings.classNames));
    return "\n\t\t<div class=\"".concat(frameClasses.join(' '), "\">\n\t\t\t<div class=\"annotip-dlg\">").concat(info.content, "</div>\n\t\t\t<div class=\"annotip-actions\">").concat(info.actions, "</div>\n\t\t</div>");
  };

  AnnoTip.prototype._handleSelection = function (selRoot, selection) {
    var _this2 = this;

    var theEl = selection.getElement(),
        selReverse = CssSelectorGenerator(theEl, $.extend({
      root: selRoot
    }, this.settings.cssReverseOptions)),
        anno = new Anno({
      context: this.settings.context,
      selection: selection.content,
      range: selection.range,
      event: selection.event,
      element: theEl,
      root: selRoot,
      reverseSelector: selReverse
    });
    if (this.tp != null || this._call('onSelection', anno) === false) return; // Cleanup the previous instance, if such was created.

    if (this.tp != null) this.tp.destroy(); // Go, and create a new one.

    this.tp = new tippy(anno.element, {
      content: this._prepareFrame({
        actions: anno.actionsHtml || this.settings.actionsHtml,
        content: anno.content || ''
      }),
      appendTo: document.body,
      onShown: function onShown() {
        _this2._getTippyBox().on('click.' + NS_ANNO, 'div.annotip-actions button', function (e) {
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
        _this2.tp = null; // This prevents a loop.

        _this2.discard();

        selection.discard();
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

  return AnnoTip;

}($, tippy, CssSelectorGenerator));
//# sourceMappingURL=anno-tip.js.map
