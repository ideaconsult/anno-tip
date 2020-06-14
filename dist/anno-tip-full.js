(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, global.AnnoTip = factory(global.$));
}(this, (function ($) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      y: rect.top
    };
  }

  /*:: import type { Window } from '../types'; */

  /*:: declare function getWindow(node: Node | Window): Window; */
  function getWindow(node) {
    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView : window;
    }

    return node;
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  /*:: declare function isElement(node: mixed): boolean %checks(node instanceof
    Element); */

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  /*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
    HTMLElement); */


  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getDocumentElement(element) {
    // $FlowFixMe: assume body is always available
    return (isElement(element) ? element.ownerDocument : element.document).documentElement;
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  // Composite means it takes into account transforms as well as layout.

  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (!isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  // Returns the layout rect of an element relative to its offsetParent. Layout
  // means it doesn't take into account transforms.
  function getLayoutRect(element) {
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      // $FlowFixMe: need a better way to handle this...
      element.host || // ShadowRoot detected
      // $FlowFixMe: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  function listScrollParents(element, list) {
    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = getNodeName(scrollParent) === 'body';
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  }

  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

    while (offsetParent && isTableElement(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
      return window;
    }

    return offsetParent || window;
  }

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
        options: Object.assign({}, existing.options, {}, current.options),
        data: Object.assign({}, existing.data, {}, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(options) {
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name; // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step

    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsets(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: Math.round(x * dpr) / dpr || 0,
      y: Math.round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive;

    var _roundOffsets = roundOffsets(offsets),
        x = _roundOffsets.x,
        y = _roundOffsets.y;

    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);
      } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

      /*:: offsetParent = (offsetParent: Element); */


      if (placement === top) {
        sideY = bottom;
        y -= offsetParent.clientHeight - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left) {
        sideX = right;
        x -= offsetParent.clientWidth - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref3) {
    var state = _ref3.state,
        options = _ref3.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$1,
    requires: ['computeStyles']
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  var hash$1 = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash$1[matched];
    });
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var visualViewport = win.visualViewport;
    var width = win.innerWidth;
    var height = win.innerHeight; // We don't know which browsers have buggy or odd implementations of this, so
    // for now we're only applying it to iOS to fix the keyboard issue.
    // Investigation required

    if (visualViewport && /iPhone|iPod|iPad/.test(navigator.platform)) {
      width = visualViewport.width;
      height = visualViewport.height;
    }

    return {
      width: width,
      height: height,
      x: 0,
      y: 0
    };
  }

  function getDocumentRect(element) {
    var win = getWindow(element);
    var winScroll = getWindowScroll(element);
    var documentRect = getCompositeRect(getDocumentElement(element), win);
    documentRect.height = Math.max(documentRect.height, win.innerHeight);
    documentRect.width = Math.max(documentRect.width, win.innerWidth);
    documentRect.x = -winScroll.scrollLeft;
    documentRect.y = -winScroll.scrollTop;
    return documentRect;
  }

  function toNumber(cssValue) {
    return parseFloat(cssValue) || 0;
  }

  function getBorders(element) {
    var computedStyle = isHTMLElement(element) ? getComputedStyle(element) : {};
    return {
      top: toNumber(computedStyle.borderTopWidth),
      right: toNumber(computedStyle.borderRightWidth),
      bottom: toNumber(computedStyle.borderBottomWidth),
      left: toNumber(computedStyle.borderLeftWidth)
    };
  }

  function getDecorations(element) {
    var win = getWindow(element);
    var borders = getBorders(element);
    var isHTML = getNodeName(element) === 'html';
    var winScrollBarX = getWindowScrollBarX(element);
    var x = element.clientWidth + borders.right;
    var y = element.clientHeight + borders.bottom; // HACK:
    // document.documentElement.clientHeight on iOS reports the height of the
    // viewport including the bottom bar, even if the bottom bar isn't visible.
    // If the difference between window innerHeight and html clientHeight is more
    // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
    // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
    //   is about 17px)
    // * The mobile bar is 114px tall

    if (isHTML && win.innerHeight - element.clientHeight > 50) {
      y = win.innerHeight - borders.bottom;
    }

    return {
      top: isHTML ? 0 : element.clientTop,
      right: // RTL scrollbar (scrolling containers only)
      element.clientLeft > borders.left ? borders.right : // LTR scrollbar
      isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
      bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
      left: isHTML ? winScrollBarX : element.clientLeft
    };
  }

  function contains(parent, child) {
    // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
    var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (isShadow) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(element);
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement);
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      var decorations = getDecorations(isHTMLElement(clippingParent) ? clippingParent : getDocumentElement(element));
      accRect.top = Math.max(rect.top + decorations.top, accRect.top);
      accRect.right = Math.min(rect.right - decorations.right, accRect.right);
      accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
      accRect.left = Math.max(rect.left + decorations.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), {}, paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var referenceElement = state.elements.reference;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(referenceElement);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  /*:: type OverflowsMap = { [ComputedPlacement]: number }; */

  /*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = (variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements).filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    }); // $FlowFixMe: Flow seems to have problems with two array unions...

    var overflows = placements$1.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function within(min, value, max) {
    return Math.max(min, Math.min(value, max));
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min = popperOffsets[mainAxis] + overflow[mainSide];
      var max = popperOffsets[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(_min, _offset, _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = state.modifiersData[name + "#persistent"].padding;
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$2(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
        _options$padding = options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {

      return;
    }

    state.elements.arrow = arrowElement;
    state.modifiersData[name + "#persistent"] = {
      padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
    };
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$2,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  /**!
  * tippy.js v6.2.3
  * (c) 2017-2020 atomiks
  * MIT License
  */
  var BOX_CLASS = "tippy-box";
  var CONTENT_CLASS = "tippy-content";
  var BACKDROP_CLASS = "tippy-backdrop";
  var ARROW_CLASS = "tippy-arrow";
  var SVG_ARROW_CLASS = "tippy-svg-arrow";
  var TOUCH_OPTIONS = {
    passive: true,
    capture: true
  };

  function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
    }

    return value;
  }

  function isType(value, type) {
    var str = {}.toString.call(value);
    return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
  }

  function invokeWithArgsOrReturn(value, args) {
    return typeof value === 'function' ? value.apply(void 0, args) : value;
  }

  function debounce$1(fn, ms) {
    // Avoid wrapping in `setTimeout` if ms is 0 anyway
    if (ms === 0) {
      return fn;
    }

    var timeout;
    return function (arg) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn(arg);
      }, ms);
    };
  }

  function splitBySpaces(value) {
    return value.split(/\s+/).filter(Boolean);
  }

  function normalizeToArray(value) {
    return [].concat(value);
  }

  function pushIfUnique(arr, value) {
    if (arr.indexOf(value) === -1) {
      arr.push(value);
    }
  }

  function unique(arr) {
    return arr.filter(function (item, index) {
      return arr.indexOf(item) === index;
    });
  }

  function getBasePlacement$1(placement) {
    return placement.split('-')[0];
  }

  function arrayFrom(value) {
    return [].slice.call(value);
  }

  function div() {
    return document.createElement('div');
  }

  function isElement$1(value) {
    return ['Element', 'Fragment'].some(function (type) {
      return isType(value, type);
    });
  }

  function isNodeList(value) {
    return isType(value, 'NodeList');
  }

  function isMouseEvent(value) {
    return isType(value, 'MouseEvent');
  }

  function isReferenceElement(value) {
    return !!(value && value._tippy && value._tippy.reference === value);
  }

  function getArrayOfElements(value) {
    if (isElement$1(value)) {
      return [value];
    }

    if (isNodeList(value)) {
      return arrayFrom(value);
    }

    if (Array.isArray(value)) {
      return value;
    }

    return arrayFrom(document.querySelectorAll(value));
  }

  function setTransitionDuration(els, value) {
    els.forEach(function (el) {
      if (el) {
        el.style.transitionDuration = value + "ms";
      }
    });
  }

  function setVisibilityState(els, state) {
    els.forEach(function (el) {
      if (el) {
        el.setAttribute('data-state', state);
      }
    });
  }

  function getOwnerDocument(elementOrElements) {
    var _normalizeToArray = normalizeToArray(elementOrElements),
        element = _normalizeToArray[0];

    return element ? element.ownerDocument || document : document;
  }

  function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX,
        clientY = event.clientY;
    return popperTreeData.every(function (_ref) {
      var popperRect = _ref.popperRect,
          popperState = _ref.popperState,
          props = _ref.props;
      var interactiveBorder = props.interactiveBorder;
      var basePlacement = getBasePlacement$1(popperState.placement);
      var offsetData = popperState.modifiersData.offset;

      if (!offsetData) {
        return true;
      }

      var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
      var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
      var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
      var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
      var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
      var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
      var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
      var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
      return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
  }

  function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
    // `webkitTransitionEnd`...

    ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
      box[method](event, listener);
    });
  }

  var currentInput = {
    isTouch: false
  };
  var lastMouseMoveTime = 0;
  /**
   * When a `touchstart` event is fired, it's assumed the user is using touch
   * input. We'll bind a `mousemove` event listener to listen for mouse input in
   * the future. This way, the `isTouch` property is fully dynamic and will handle
   * hybrid devices that use a mix of touch + mouse input.
   */

  function onDocumentTouchStart() {
    if (currentInput.isTouch) {
      return;
    }

    currentInput.isTouch = true;

    if (window.performance) {
      document.addEventListener('mousemove', onDocumentMouseMove);
    }
  }
  /**
   * When two `mousemove` event are fired consecutively within 20ms, it's assumed
   * the user is using mouse input again. `mousemove` can fire on touch devices as
   * well, but very rarely that quickly.
   */


  function onDocumentMouseMove() {
    var now = performance.now();

    if (now - lastMouseMoveTime < 20) {
      currentInput.isTouch = false;
      document.removeEventListener('mousemove', onDocumentMouseMove);
    }

    lastMouseMoveTime = now;
  }
  /**
   * When an element is in focus and has a tippy, leaving the tab/window and
   * returning causes it to show again. For mouse users this is unexpected, but
   * for keyboard use it makes sense.
   * TODO: find a better technique to solve this problem
   */


  function onWindowBlur() {
    var activeElement = document.activeElement;

    if (isReferenceElement(activeElement)) {
      var instance = activeElement._tippy;

      if (activeElement.blur && !instance.state.isVisible) {
        activeElement.blur();
      }
    }
  }

  function bindGlobalEventListeners() {
    document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
    window.addEventListener('blur', onWindowBlur);
  }

  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  var ua = isBrowser ? navigator.userAgent : '';
  var isIE = /MSIE |Trident\//.test(ua);

  var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false
  };
  var renderProps = {
    allowHTML: false,
    animation: 'fade',
    arrow: true,
    content: '',
    inertia: false,
    maxWidth: 350,
    role: 'tooltip',
    theme: '',
    zIndex: 9999
  };
  var defaultProps = Object.assign({
    appendTo: function appendTo() {
      return document.body;
    },
    aria: {
      content: 'auto',
      expanded: 'auto'
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: true,
    ignoreAttributes: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: '',
    offset: [0, 10],
    onAfterUpdate: function onAfterUpdate() {},
    onBeforeUpdate: function onBeforeUpdate() {},
    onCreate: function onCreate() {},
    onDestroy: function onDestroy() {},
    onHidden: function onHidden() {},
    onHide: function onHide() {},
    onMount: function onMount() {},
    onShow: function onShow() {},
    onShown: function onShown() {},
    onTrigger: function onTrigger() {},
    onUntrigger: function onUntrigger() {},
    onClickOutside: function onClickOutside() {},
    placement: 'top',
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: false,
    touch: true,
    trigger: 'mouseenter focus',
    triggerTarget: null
  }, pluginProps, {}, renderProps);
  var defaultKeys = Object.keys(defaultProps);

  var setDefaultProps = function setDefaultProps(partialProps) {

    var keys = Object.keys(partialProps);
    keys.forEach(function (key) {
      defaultProps[key] = partialProps[key];
    });
  };

  function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps = plugins.reduce(function (acc, plugin) {
      var name = plugin.name,
          defaultValue = plugin.defaultValue;

      if (name) {
        acc[name] = passedProps[name] !== undefined ? passedProps[name] : defaultValue;
      }

      return acc;
    }, {});
    return Object.assign({}, passedProps, {}, pluginProps);
  }

  function getDataAttributeProps(reference, plugins) {
    var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
      plugins: plugins
    }))) : defaultKeys;
    var props = propKeys.reduce(function (acc, key) {
      var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

      if (!valueAsString) {
        return acc;
      }

      if (key === 'content') {
        acc[key] = valueAsString;
      } else {
        try {
          acc[key] = JSON.parse(valueAsString);
        } catch (e) {
          acc[key] = valueAsString;
        }
      }

      return acc;
    }, {});
    return props;
  }

  function evaluateProps(reference, props) {
    var out = Object.assign({}, props, {
      content: invokeWithArgsOrReturn(props.content, [reference])
    }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
    out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
    out.aria = {
      expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
      content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
    };
    return out;
  }

  var innerHTML = function innerHTML() {
    return 'innerHTML';
  };

  function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
  }

  function createArrowElement(value) {
    var arrow = div();

    if (value === true) {
      arrow.className = ARROW_CLASS;
    } else {
      arrow.className = SVG_ARROW_CLASS;

      if (isElement$1(value)) {
        arrow.appendChild(value);
      } else {
        dangerouslySetInnerHTML(arrow, value);
      }
    }

    return arrow;
  }

  function setContent(content, props) {
    if (isElement$1(props.content)) {
      dangerouslySetInnerHTML(content, '');
      content.appendChild(props.content);
    } else if (typeof props.content !== 'function') {
      if (props.allowHTML) {
        dangerouslySetInnerHTML(content, props.content);
      } else {
        content.textContent = props.content;
      }
    }
  }

  function getChildren(popper) {
    var box = popper.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
      box: box,
      content: boxChildren.find(function (node) {
        return node.classList.contains(CONTENT_CLASS);
      }),
      arrow: boxChildren.find(function (node) {
        return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
      }),
      backdrop: boxChildren.find(function (node) {
        return node.classList.contains(BACKDROP_CLASS);
      })
    };
  }

  function render(instance) {
    var popper = div();
    var box = div();
    box.className = BOX_CLASS;
    box.setAttribute('data-state', 'hidden');
    box.setAttribute('tabindex', '-1');
    var content = div();
    content.className = CONTENT_CLASS;
    content.setAttribute('data-state', 'hidden');
    setContent(content, instance.props);
    popper.appendChild(box);
    box.appendChild(content);
    onUpdate(instance.props, instance.props);

    function onUpdate(prevProps, nextProps) {
      var _getChildren = getChildren(popper),
          box = _getChildren.box,
          content = _getChildren.content,
          arrow = _getChildren.arrow;

      if (nextProps.theme) {
        box.setAttribute('data-theme', nextProps.theme);
      } else {
        box.removeAttribute('data-theme');
      }

      if (typeof nextProps.animation === 'string') {
        box.setAttribute('data-animation', nextProps.animation);
      } else {
        box.removeAttribute('data-animation');
      }

      if (nextProps.inertia) {
        box.setAttribute('data-inertia', '');
      } else {
        box.removeAttribute('data-inertia');
      }

      box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

      if (nextProps.role) {
        box.setAttribute('role', nextProps.role);
      } else {
        box.removeAttribute('role');
      }

      if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
        setContent(content, instance.props);
      }

      if (nextProps.arrow) {
        if (!arrow) {
          box.appendChild(createArrowElement(nextProps.arrow));
        } else if (prevProps.arrow !== nextProps.arrow) {
          box.removeChild(arrow);
          box.appendChild(createArrowElement(nextProps.arrow));
        }
      } else if (arrow) {
        box.removeChild(arrow);
      }
    }

    return {
      popper: popper,
      onUpdate: onUpdate
    };
  } // Runtime check to identify if the render function is the default one; this
  // way we can apply default CSS transitions logic and it can be tree-shaken away


  render.$$tippy = true;
  var idCounter = 1;
  var mouseMoveListeners = []; // Used by `hideAll()`

  var mountedInstances = [];

  function createTippy(reference, passedProps) {
    var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(passedProps))); // ===========================================================================
    // 🔒 Private members
    // ===========================================================================

    var showTimeout;
    var hideTimeout;
    var scheduleHideAnimationFrame;
    var isVisibleFromClick = false;
    var didHideDueToDocumentMouseDown = false;
    var didTouchMove = false;
    var ignoreOnFirstUpdate = false;
    var lastTriggerEvent;
    var currentTransitionEndListener;
    var onFirstUpdate;
    var listeners = [];
    var debouncedOnMouseMove = debounce$1(onMouseMove, props.interactiveDebounce);
    var currentTarget;
    var doc = getOwnerDocument(props.triggerTarget || reference); // ===========================================================================
    // 🔑 Public members
    // ===========================================================================

    var id = idCounter++;
    var popperInstance = null;
    var plugins = unique(props.plugins);
    var state = {
      // Is the instance currently enabled?
      isEnabled: true,
      // Is the tippy currently showing and not transitioning out?
      isVisible: false,
      // Has the instance been destroyed?
      isDestroyed: false,
      // Is the tippy currently mounted to the DOM?
      isMounted: false,
      // Has the tippy finished transitioning in?
      isShown: false
    };
    var instance = {
      // properties
      id: id,
      reference: reference,
      popper: div(),
      popperInstance: popperInstance,
      props: props,
      state: state,
      plugins: plugins,
      // methods
      clearDelayTimeouts: clearDelayTimeouts,
      setProps: setProps,
      setContent: setContent,
      show: show,
      hide: hide,
      hideWithInteractivity: hideWithInteractivity,
      enable: enable,
      disable: disable,
      unmount: unmount,
      destroy: destroy
    }; // TODO: Investigate why this early return causes a TDZ error in the tests —
    // it doesn't seem to happen in the browser

    /* istanbul ignore if */

    if (!props.render) {

      return instance;
    } // ===========================================================================
    // Initial mutations
    // ===========================================================================


    var _props$render = props.render(instance),
        popper = _props$render.popper,
        onUpdate = _props$render.onUpdate;

    popper.setAttribute('data-tippy-root', '');
    popper.id = "tippy-" + instance.id;
    instance.popper = popper;
    reference._tippy = instance;
    popper._tippy = instance;
    var pluginsHooks = plugins.map(function (plugin) {
      return plugin.fn(instance);
    });
    var hasAriaExpanded = reference.hasAttribute('aria-expanded');
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook('onCreate', [instance]);

    if (props.showOnCreate) {
      scheduleShow();
    } // Prevent a tippy with a delay from hiding if the cursor left then returned
    // before it started hiding


    popper.addEventListener('mouseenter', function () {
      if (instance.props.interactive && instance.state.isVisible) {
        instance.clearDelayTimeouts();
      }
    });
    popper.addEventListener('mouseleave', function (event) {
      if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
        doc.addEventListener('mousemove', debouncedOnMouseMove);
        debouncedOnMouseMove(event);
      }
    });
    return instance; // ===========================================================================
    // 🔒 Private methods
    // ===========================================================================

    function getNormalizedTouchSettings() {
      var touch = instance.props.touch;
      return Array.isArray(touch) ? touch : [touch, 0];
    }

    function getIsCustomTouchBehavior() {
      return getNormalizedTouchSettings()[0] === 'hold';
    }

    function getIsDefaultRenderFn() {
      var _instance$props$rende; // @ts-ignore


      return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
    }

    function getCurrentTarget() {
      return currentTarget || reference;
    }

    function getDefaultTemplateChildren() {
      return getChildren(popper);
    }

    function getDelay(isShow) {
      // For touch or keyboard input, force `0` delay for UX reasons
      // Also if the instance is mounted but not visible (transitioning out),
      // ignore delay
      if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
        return 0;
      }

      return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
    }

    function handleStyles() {
      popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
      popper.style.zIndex = "" + instance.props.zIndex;
    }

    function invokeHook(hook, args, shouldInvokePropsHook) {
      if (shouldInvokePropsHook === void 0) {
        shouldInvokePropsHook = true;
      }

      pluginsHooks.forEach(function (pluginHooks) {
        if (pluginHooks[hook]) {
          pluginHooks[hook].apply(void 0, args);
        }
      });

      if (shouldInvokePropsHook) {
        var _instance$props;

        (_instance$props = instance.props)[hook].apply(_instance$props, args);
      }
    }

    function handleAriaContentAttribute() {
      var aria = instance.props.aria;

      if (!aria.content) {
        return;
      }

      var attr = "aria-" + aria.content;
      var id = popper.id;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        var currentValue = node.getAttribute(attr);

        if (instance.state.isVisible) {
          node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
        } else {
          var nextValue = currentValue && currentValue.replace(id, '').trim();

          if (nextValue) {
            node.setAttribute(attr, nextValue);
          } else {
            node.removeAttribute(attr);
          }
        }
      });
    }

    function handleAriaExpandedAttribute() {
      if (hasAriaExpanded || !instance.props.aria.expanded) {
        return;
      }

      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        if (instance.props.interactive) {
          node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
        } else {
          node.removeAttribute('aria-expanded');
        }
      });
    }

    function cleanupInteractiveMouseListeners() {
      doc.body.removeEventListener('mouseleave', scheduleHide);
      doc.removeEventListener('mousemove', debouncedOnMouseMove);
      mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
        return listener !== debouncedOnMouseMove;
      });
    }

    function onDocumentPress(event) {
      // Moved finger to scroll instead of an intentional tap outside
      if (currentInput.isTouch) {
        if (didTouchMove || event.type === 'mousedown') {
          return;
        }
      } // Clicked on interactive popper


      if (instance.props.interactive && popper.contains(event.target)) {
        return;
      } // Clicked on the event listeners target


      if (getCurrentTarget().contains(event.target)) {
        if (currentInput.isTouch) {
          return;
        }

        if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
          return;
        }
      } else {
        invokeHook('onClickOutside', [instance, event]);
      }

      if (instance.props.hideOnClick === true) {
        isVisibleFromClick = false;
        instance.clearDelayTimeouts();
        instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
        // currentTarget. This lets a tippy with `focus` trigger know that it
        // should not show

        didHideDueToDocumentMouseDown = true;
        setTimeout(function () {
          didHideDueToDocumentMouseDown = false;
        }); // The listener gets added in `scheduleShow()`, but this may be hiding it
        // before it shows, and hide()'s early bail-out behavior can prevent it
        // from being cleaned up

        if (!instance.state.isMounted) {
          removeDocumentPress();
        }
      }
    }

    function onTouchMove() {
      didTouchMove = true;
    }

    function onTouchStart() {
      didTouchMove = false;
    }

    function addDocumentPress() {
      doc.addEventListener('mousedown', onDocumentPress, true);
      doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
      doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
      doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }

    function removeDocumentPress() {
      doc.removeEventListener('mousedown', onDocumentPress, true);
      doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
      doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
      doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }

    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function () {
        if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
          callback();
        }
      });
    }

    function onTransitionedIn(duration, callback) {
      onTransitionEnd(duration, callback);
    }

    function onTransitionEnd(duration, callback) {
      var box = getDefaultTemplateChildren().box;

      function listener(event) {
        if (event.target === box) {
          updateTransitionEndListener(box, 'remove', listener);
          callback();
        }
      } // Make callback synchronous if duration is 0
      // `transitionend` won't fire otherwise


      if (duration === 0) {
        return callback();
      }

      updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
      updateTransitionEndListener(box, 'add', listener);
      currentTransitionEndListener = listener;
    }

    function on(eventType, handler, options) {
      if (options === void 0) {
        options = false;
      }

      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        node.addEventListener(eventType, handler, options);
        listeners.push({
          node: node,
          eventType: eventType,
          handler: handler,
          options: options
        });
      });
    }

    function addListeners() {
      if (getIsCustomTouchBehavior()) {
        on('touchstart', onTrigger, {
          passive: true
        });
        on('touchend', onMouseLeave, {
          passive: true
        });
      }

      splitBySpaces(instance.props.trigger).forEach(function (eventType) {
        if (eventType === 'manual') {
          return;
        }

        on(eventType, onTrigger);

        switch (eventType) {
          case 'mouseenter':
            on('mouseleave', onMouseLeave);
            break;

          case 'focus':
            on(isIE ? 'focusout' : 'blur', onBlurOrFocusOut);
            break;

          case 'focusin':
            on('focusout', onBlurOrFocusOut);
            break;
        }
      });
    }

    function removeListeners() {
      listeners.forEach(function (_ref) {
        var node = _ref.node,
            eventType = _ref.eventType,
            handler = _ref.handler,
            options = _ref.options;
        node.removeEventListener(eventType, handler, options);
      });
      listeners = [];
    }

    function onTrigger(event) {
      var _lastTriggerEvent;

      var shouldScheduleClickHide = false;

      if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
        return;
      }

      var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
      lastTriggerEvent = event;
      currentTarget = event.currentTarget;
      handleAriaExpandedAttribute();

      if (!instance.state.isVisible && isMouseEvent(event)) {
        // If scrolling, `mouseenter` events can be fired if the cursor lands
        // over a new target, but `mousemove` events don't get fired. This
        // causes interactive tooltips to get stuck open until the cursor is
        // moved
        mouseMoveListeners.forEach(function (listener) {
          return listener(event);
        });
      } // Toggle show/hide when clicking click-triggered tooltips


      if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
        shouldScheduleClickHide = true;
      } else {
        scheduleShow(event);
      }

      if (event.type === 'click') {
        isVisibleFromClick = !shouldScheduleClickHide;
      }

      if (shouldScheduleClickHide && !wasFocused) {
        scheduleHide(event);
      }
    }

    function onMouseMove(event) {
      var target = event.target;
      var isCursorOverReferenceOrPopper = reference.contains(target) || popper.contains(target);

      if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
        return;
      }

      var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
        var _instance$popperInsta;

        var instance = popper._tippy;
        var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

        if (state) {
          return {
            popperRect: popper.getBoundingClientRect(),
            popperState: state,
            props: props
          };
        }

        return null;
      }).filter(Boolean);

      if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
        cleanupInteractiveMouseListeners();
        scheduleHide(event);
      }
    }

    function onMouseLeave(event) {
      var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

      if (shouldBail) {
        return;
      }

      if (instance.props.interactive) {
        instance.hideWithInteractivity(event);
        return;
      }

      scheduleHide(event);
    }

    function onBlurOrFocusOut(event) {
      if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
        return;
      } // If focus was moved to within the popper


      if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
        return;
      }

      scheduleHide(event);
    }

    function isEventListenerStopped(event) {
      return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
    }

    function createPopperInstance() {
      destroyPopperInstance();
      var _instance$props2 = instance.props,
          popperOptions = _instance$props2.popperOptions,
          placement = _instance$props2.placement,
          offset = _instance$props2.offset,
          getReferenceClientRect = _instance$props2.getReferenceClientRect,
          moveTransition = _instance$props2.moveTransition;
      var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
      var computedReference = getReferenceClientRect ? {
        getBoundingClientRect: getReferenceClientRect,
        contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
      } : reference;
      var tippyModifier = {
        name: '$$tippy',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: function fn(_ref2) {
          var state = _ref2.state;

          if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh = getDefaultTemplateChildren(),
                box = _getDefaultTemplateCh.box;

            ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
              if (attr === 'placement') {
                box.setAttribute('data-placement', state.placement);
              } else {
                if (state.attributes.popper["data-popper-" + attr]) {
                  box.setAttribute("data-" + attr, '');
                } else {
                  box.removeAttribute("data-" + attr);
                }
              }
            });
            state.attributes.popper = {};
          }
        }
      };
      var modifiers = [{
        name: 'offset',
        options: {
          offset: offset
        }
      }, {
        name: 'preventOverflow',
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: 'flip',
        options: {
          padding: 5
        }
      }, {
        name: 'computeStyles',
        options: {
          adaptive: !moveTransition
        }
      }, tippyModifier];

      if (getIsDefaultRenderFn() && arrow) {
        modifiers.push({
          name: 'arrow',
          options: {
            element: arrow,
            padding: 3
          }
        });
      }

      modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
      instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
        placement: placement,
        onFirstUpdate: onFirstUpdate,
        modifiers: modifiers
      }));
    }

    function destroyPopperInstance() {
      if (instance.popperInstance) {
        instance.popperInstance.destroy();
        instance.popperInstance = null;
      }
    }

    function mount() {
      var appendTo = instance.props.appendTo;
      var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
      // it's directly after the reference element so the elements inside the
      // tippy can be tabbed to
      // If there are clipping issues, the user can specify a different appendTo
      // and ensure focus management is handled correctly manually

      var node = getCurrentTarget();

      if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === 'parent') {
        parentNode = node.parentNode;
      } else {
        parentNode = invokeWithArgsOrReturn(appendTo, [node]);
      } // The popper element needs to exist on the DOM before its position can be
      // updated as Popper needs to read its dimensions


      if (!parentNode.contains(popper)) {
        parentNode.appendChild(popper);
      }

      createPopperInstance();
    }

    function getNestedPopperTree() {
      return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
    }

    function scheduleShow(event) {
      instance.clearDelayTimeouts();

      if (event) {
        invokeHook('onTrigger', [instance, event]);
      }

      addDocumentPress();
      var delay = getDelay(true);

      var _getNormalizedTouchSe = getNormalizedTouchSettings(),
          touchValue = _getNormalizedTouchSe[0],
          touchDelay = _getNormalizedTouchSe[1];

      if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
        delay = touchDelay;
      }

      if (delay) {
        showTimeout = setTimeout(function () {
          instance.show();
        }, delay);
      } else {
        instance.show();
      }
    }

    function scheduleHide(event) {
      instance.clearDelayTimeouts();
      invokeHook('onUntrigger', [instance, event]);

      if (!instance.state.isVisible) {
        removeDocumentPress();
        return;
      } // For interactive tippies, scheduleHide is added to a document.body handler
      // from onMouseLeave so must intercept scheduled hides from mousemove/leave
      // events when trigger contains mouseenter and click, and the tip is
      // currently shown as a result of a click.


      if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
        return;
      }

      var delay = getDelay(false);

      if (delay) {
        hideTimeout = setTimeout(function () {
          if (instance.state.isVisible) {
            instance.hide();
          }
        }, delay);
      } else {
        // Fixes a `transitionend` problem when it fires 1 frame too
        // late sometimes, we don't want hide() to be called.
        scheduleHideAnimationFrame = requestAnimationFrame(function () {
          instance.hide();
        });
      }
    } // ===========================================================================
    // 🔑 Public methods
    // ===========================================================================


    function enable() {
      instance.state.isEnabled = true;
    }

    function disable() {
      // Disabling the instance should also hide it
      // https://github.com/atomiks/tippy.js-react/issues/106
      instance.hide();
      instance.state.isEnabled = false;
    }

    function clearDelayTimeouts() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(scheduleHideAnimationFrame);
    }

    function setProps(partialProps) {

      if (instance.state.isDestroyed) {
        return;
      }

      invokeHook('onBeforeUpdate', [instance, partialProps]);
      removeListeners();
      var prevProps = instance.props;
      var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
        ignoreAttributes: true
      }));
      instance.props = nextProps;
      addListeners();

      if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
        cleanupInteractiveMouseListeners();
        debouncedOnMouseMove = debounce$1(onMouseMove, nextProps.interactiveDebounce);
      } // Ensure stale aria-expanded attributes are removed


      if (prevProps.triggerTarget && !nextProps.triggerTarget) {
        normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
          node.removeAttribute('aria-expanded');
        });
      } else if (nextProps.triggerTarget) {
        reference.removeAttribute('aria-expanded');
      }

      handleAriaExpandedAttribute();
      handleStyles();

      if (onUpdate) {
        onUpdate(prevProps, nextProps);
      }

      if (instance.popperInstance) {
        createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
        // and the nested ones get re-rendered first.
        // https://github.com/atomiks/tippyjs-react/issues/177
        // TODO: find a cleaner / more efficient solution(!)

        getNestedPopperTree().forEach(function (nestedPopper) {
          // React (and other UI libs likely) requires a rAF wrapper as it flushes
          // its work in one
          requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
        });
      }

      invokeHook('onAfterUpdate', [instance, partialProps]);
    }

    function setContent(content) {
      instance.setProps({
        content: content
      });
    }

    function show() {


      var isAlreadyVisible = instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

      if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
        return;
      } // Normalize `disabled` behavior across browsers.
      // Firefox allows events on disabled elements, but Chrome doesn't.
      // Using a wrapper element (i.e. <span>) is recommended.


      if (getCurrentTarget().hasAttribute('disabled')) {
        return;
      }

      invokeHook('onShow', [instance], false);

      if (instance.props.onShow(instance) === false) {
        return;
      }

      instance.state.isVisible = true;

      if (getIsDefaultRenderFn()) {
        popper.style.visibility = 'visible';
      }

      handleStyles();
      addDocumentPress();

      if (!instance.state.isMounted) {
        popper.style.transition = 'none';
      } // If flipping to the opposite side after hiding at least once, the
      // animation will use the wrong placement without resetting the duration


      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
            box = _getDefaultTemplateCh2.box,
            content = _getDefaultTemplateCh2.content;

        setTransitionDuration([box, content], 0);
      }

      onFirstUpdate = function onFirstUpdate() {
        if (!instance.state.isVisible || ignoreOnFirstUpdate) {
          return;
        }

        ignoreOnFirstUpdate = true; // reflow

        void popper.offsetHeight;
        popper.style.transition = instance.props.moveTransition;

        if (getIsDefaultRenderFn() && instance.props.animation) {
          var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
              _box = _getDefaultTemplateCh3.box,
              _content = _getDefaultTemplateCh3.content;

          setTransitionDuration([_box, _content], duration);
          setVisibilityState([_box, _content], 'visible');
        }

        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        pushIfUnique(mountedInstances, instance);
        instance.state.isMounted = true;
        invokeHook('onMount', [instance]);

        if (instance.props.animation && getIsDefaultRenderFn()) {
          onTransitionedIn(duration, function () {
            instance.state.isShown = true;
            invokeHook('onShown', [instance]);
          });
        }
      };

      mount();
    }

    function hide() {


      var isAlreadyHidden = !instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

      if (isAlreadyHidden || isDestroyed || isDisabled) {
        return;
      }

      invokeHook('onHide', [instance], false);

      if (instance.props.onHide(instance) === false) {
        return;
      }

      instance.state.isVisible = false;
      instance.state.isShown = false;
      ignoreOnFirstUpdate = false;

      if (getIsDefaultRenderFn()) {
        popper.style.visibility = 'hidden';
      }

      cleanupInteractiveMouseListeners();
      removeDocumentPress();
      handleStyles();

      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
            box = _getDefaultTemplateCh4.box,
            content = _getDefaultTemplateCh4.content;

        if (instance.props.animation) {
          setTransitionDuration([box, content], duration);
          setVisibilityState([box, content], 'hidden');
        }
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();

      if (instance.props.animation) {
        if (getIsDefaultRenderFn()) {
          onTransitionedOut(duration, instance.unmount);
        }
      } else {
        instance.unmount();
      }
    }

    function hideWithInteractivity(event) {

      doc.body.addEventListener('mouseleave', scheduleHide);
      doc.addEventListener('mousemove', debouncedOnMouseMove);
      pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }

    function unmount() {

      if (instance.state.isVisible) {
        instance.hide();
      }

      if (!instance.state.isMounted) {
        return;
      }

      destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
      // tree by default. This seems mainly for interactive tippies, but we should
      // find a workaround if possible

      getNestedPopperTree().forEach(function (nestedPopper) {
        nestedPopper._tippy.unmount();
      });

      if (popper.parentNode) {
        popper.parentNode.removeChild(popper);
      }

      mountedInstances = mountedInstances.filter(function (i) {
        return i !== instance;
      });
      instance.state.isMounted = false;
      invokeHook('onHidden', [instance]);
    }

    function destroy() {

      if (instance.state.isDestroyed) {
        return;
      }

      instance.clearDelayTimeouts();
      instance.unmount();
      removeListeners();
      delete reference._tippy;
      instance.state.isDestroyed = true;
      invokeHook('onDestroy', [instance]);
    }
  }

  function tippy(targets, optionalProps) {
    if (optionalProps === void 0) {
      optionalProps = {};
    }

    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);

    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
      plugins: plugins
    });
    var elements = getArrayOfElements(targets);

    var instances = elements.reduce(function (acc, reference) {
      var instance = reference && createTippy(reference, passedProps);

      if (instance) {
        acc.push(instance);
      }

      return acc;
    }, []);
    return isElement$1(targets) ? instances[0] : instances;
  }

  tippy.defaultProps = defaultProps;
  tippy.setDefaultProps = setDefaultProps;
  tippy.currentInput = currentInput;

  tippy.setDefaultProps({
    render: render
  });

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

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var build = createCommonjsModule(function (module, exports) {
    !function (t, r) {
       module.exports = r() ;
    }(window, function () {
      return function (t) {
        var r = {};

        function n(e) {
          if (r[e]) return r[e].exports;
          var o = r[e] = {
            i: e,
            l: !1,
            exports: {}
          };
          return t[e].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
        }

        return n.m = t, n.c = r, n.d = function (t, r, e) {
          n.o(t, r) || Object.defineProperty(t, r, {
            enumerable: !0,
            get: e
          });
        }, n.r = function (t) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(t, "__esModule", {
            value: !0
          });
        }, n.t = function (t, r) {
          if (1 & r && (t = n(t)), 8 & r) return t;
          if (4 & r && "object" == _typeof(t) && t && t.__esModule) return t;
          var e = Object.create(null);
          if (n.r(e), Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
          }), 2 & r && "string" != typeof t) for (var o in t) {
            n.d(e, o, function (r) {
              return t[r];
            }.bind(null, o));
          }
          return e;
        }, n.n = function (t) {
          var r = t && t.__esModule ? function () {
            return t["default"];
          } : function () {
            return t;
          };
          return n.d(r, "a", r), r;
        }, n.o = function (t, r) {
          return Object.prototype.hasOwnProperty.call(t, r);
        }, n.p = "", n(n.s = 2);
      }([function (t, r, n) {
        var e = n(1);

        function o(t, r, n) {
          Array.isArray(t) ? t.push(r) : t[n] = r;
        }

        t.exports = function (t) {
          var r,
              n,
              i,
              u = [];
          if (Array.isArray(t)) n = [], r = t.length - 1;else {
            if ("object" != _typeof(t) || null === t) throw new TypeError("Expecting an Array or an Object, but `" + (null === t ? "null" : _typeof(t)) + "` provided.");
            n = {}, i = Object.keys(t), r = i.length - 1;
          }
          return function n(c, a) {
            var f, l, s;

            for (l = i ? i[a] : a, Array.isArray(t[l]) || (void 0 === t[l] ? t[l] = [] : t[l] = [t[l]]), f = 0; f < t[l].length; f++) {
              p = c, o(s = Array.isArray(p) ? [].concat(p) : e(p), t[l][f], l), a >= r ? u.push(s) : n(s, a + 1);
            }

            var p;
          }(n, 0), u;
        };
      }, function (t, r) {
        t.exports = function () {
          for (var t = {}, r = 0; r < arguments.length; r++) {
            var e = arguments[r];

            for (var o in e) {
              n.call(e, o) && (t[o] = e[o]);
            }
          }

          return t;
        };

        var n = Object.prototype.hasOwnProperty;
      }, function (t, r, n) {

        n.r(r), n.d(r, "getCssSelector", function () {
          return k;
        });

        var e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : _typeof(t);
        },
            o = function o(t) {
          return null != t && "object" === (void 0 === t ? "undefined" : e(t)) && 1 === t.nodeType && "object" === e(t.style) && "object" === e(t.ownerDocument);
        };

        function i(t) {
          var r = t.parentNode;
          if (r) for (var n = 0, e = r.childNodes, i = 0; i < e.length; i++) {
            if (o(e[i]) && (n += 1, e[i] === t)) return [":nth-child(".concat(n, ")")];
          }
          return [];
        }

        function u(t) {
          return Object.assign({}, c, {
            root: t.ownerDocument.querySelector(":root")
          });
        }

        var c = {
          selectors: ["id", "class", "tag", "attribute"],
          includeTag: !1,
          whitelist: [],
          blacklist: [],
          combineWithinSelector: !0,
          combineBetweenSelectors: !0
        },
            a = new RegExp(["^$", "\\s", "^\\d"].join("|")),
            f = new RegExp(["^$", "^\\d"].join("|")),
            l = ["nthoftype", "tag", "id", "class", "attribute", "nthchild"],
            s = n(0),
            p = n.n(s);

        function y(t) {
          return function (t) {
            if (Array.isArray(t)) return d(t);
          }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
          }(t) || function (t, r) {
            if (!t) return;
            if ("string" == typeof t) return d(t, r);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return d(t, r);
          }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }

        function d(t, r) {
          (null == r || r > t.length) && (r = t.length);

          for (var n = 0, e = new Array(r); n < r; n++) {
            e[n] = t[n];
          }

          return e;
        }

        function v() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
              r = [[]];
          return t.forEach(function (t) {
            r.forEach(function (n) {
              r.push(n.concat(t));
            });
          }), r.shift(), r.sort(function (t, r) {
            return t.length - r.length;
          });
        }

        function g(t) {
          return t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".+");
        }

        function b() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          if (0 === t.length) return new RegExp(".^");
          var r = t.map(function (t) {
            return "string" == typeof t ? g(t) : t.source;
          }).join("|");
          return new RegExp(r);
        }

        function m(t, r) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
              e = n.querySelectorAll(r);
          return 1 === e.length && e[0] === t;
        }

        function h(t) {
          for (var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : j(t), n = [], e = t; o(e) && e !== r;) {
            n.push(e), e = e.parentElement;
          }

          return n;
        }

        function j(t) {
          return t.ownerDocument.querySelector(":root");
        }

        function S(t) {
          return [M(t.tagName.toLowerCase())];
        }

        function A(t) {
          return function (t) {
            if (Array.isArray(t)) return w(t);
          }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
          }(t) || function (t, r) {
            if (!t) return;
            if ("string" == typeof t) return w(t, r);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return w(t, r);
          }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }

        function w(t, r) {
          (null == r || r > t.length) && (r = t.length);

          for (var n = 0, e = new Array(r); n < r; n++) {
            e[n] = t[n];
          }

          return e;
        }

        var O = b(["class", "id", "ng-*"]);

        function x(t) {
          var r = t.nodeName,
              n = t.nodeValue;
          return "[".concat(r, "='").concat(M(n), "']");
        }

        function E(t) {
          var r = t.nodeName;
          return !O.test(r);
        }

        function T(t) {
          return function (t) {
            if (Array.isArray(t)) return C(t);
          }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
          }(t) || function (t, r) {
            if (!t) return;
            if ("string" == typeof t) return C(t, r);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return C(t, r);
          }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }

        function C(t, r) {
          (null == r || r > t.length) && (r = t.length);

          for (var n = 0, e = new Array(r); n < r; n++) {
            e[n] = t[n];
          }

          return e;
        }

        var I = ":".charCodeAt(0).toString(16).toUpperCase(),
            $ = /[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;

        function M() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return t.split("").map(function (t) {
            return ":" === t ? "\\".concat(I, " ") : $.test(t) ? "\\".concat(t) : escape(t).replace(/%/g, "\\");
          }).join("");
        }

        var N = {
          tag: S,
          id: function id(t) {
            var r = t.getAttribute("id") || "",
                n = "#".concat(M(r));
            return !a.test(r) && m(t, n, t.ownerDocument) ? [n] : [];
          },
          "class": function _class(t) {
            return (t.getAttribute("class") || "").trim().split(/\s+/).filter(function (t) {
              return !f.test(t);
            }).map(function (t) {
              return ".".concat(M(t));
            });
          },
          attribute: function attribute(t) {
            return A(t.attributes).filter(E).map(x);
          },
          nthchild: i,
          nthoftype: function nthoftype(t) {
            for (var r = S(t)[0], n = t.parentElement.querySelectorAll(r), e = 0; e < n.length; e++) {
              if (n[e] === t) return ["".concat(r, ":nth-of-type(").concat(e + 1, ")")];
            }

            return [];
          }
        };

        function P(t, r) {
          for (var n, e, o = function (t, r) {
            return function (t) {
              var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  n = r.selectors,
                  e = r.combineBetweenSelectors,
                  o = r.includeTag,
                  i = e ? v(n) : n.map(function (t) {
                return [t];
              });
              return o ? i.map(_) : i;
            }(t, r).map(function (r) {
              return n = t, e = {}, r.forEach(function (t) {
                var r = n[t];
                r.length > 0 && (e[t] = r);
              }), p()(e).map(D);
              var n, e;
            }).filter(function (t) {
              return "" !== t;
            });
          }(function (t, r) {
            var n = r.blacklist,
                e = r.whitelist,
                o = r.combineWithinSelector,
                i = b(n),
                u = b(e);
            return function (t) {
              var r = t.selectors,
                  n = t.includeTag,
                  e = [].concat(r);
              n && !e.includes("tag") && e.push("tag");
              return e;
            }(r).reduce(function (r, n) {
              var e = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    r = arguments.length > 1 ? arguments[1] : void 0;
                return t.sort(function (t, n) {
                  var e = r.test(t),
                      o = r.test(n);
                  return e && !o ? -1 : !e && o ? 1 : 0;
                });
              }(function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                    r = arguments.length > 1 ? arguments[1] : void 0,
                    n = arguments.length > 2 ? arguments[2] : void 0;
                return t.filter(function (t) {
                  return n.test(t) || !r.test(t);
                });
              }(function (t, r) {
                return (N[r] || function () {
                  return [];
                })(t);
              }(t, n), i, u), u);

              return r[n] = o ? v(e) : e.map(function (t) {
                return [t];
              }), r;
            }, {});
          }(t, r), r), i = (n = o, (e = []).concat.apply(e, y(n))), u = 0; u < i.length; u++) {
            var c = i[u];
            if (m(t, c, t.parentNode)) return c;
          }

          return "*";
        }

        function _(t) {
          return t.includes("tag") || t.includes("nthoftype") ? T(t) : [].concat(T(t), ["tag"]);
        }

        function q(t, r) {
          return r[t] ? r[t].join("") : "";
        }

        function D() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return l.map(function (r) {
            return q(r, t);
          }).join("");
        }

        function R(t, r) {
          return h(t, r).map(function (t) {
            return i(t)[0];
          }).reverse().join(" > ");
        }

        function U(t) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return Object.assign({}, u(t), r);
        }

        function k(t) {
          for (var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = U(t, r), e = h(t, n.root), o = [], i = 0; i < e.length; i++) {
            o.unshift(P(e[i], n));
            var u = o.join(" > ");
            if (m(t, u, n.root)) return u;
          }

          return R(t, n.root);
        }

        r["default"] = k;
      }]);
    });
  });
  var CssSelectorGenerator = unwrapExports(build);
  var build_1 = build.CssSelectorGenerator;

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

})));
