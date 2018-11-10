"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResizeControlBase = exports.GrabArea = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _rafSchd = _interopRequireDefault(require("raf-schd"));

var _analyticsNext = require("@atlaskit/analytics-next");

var _theme = require("@atlaskit/theme");

var _chevronLeft = _interopRequireDefault(require("@atlaskit/icon/glyph/chevron-left"));

var _chevronRight = _interopRequireDefault(require("@atlaskit/icon/glyph/chevron-right"));

var _menu = _interopRequireDefault(require("@atlaskit/icon/glyph/menu"));

var _tooltip = _interopRequireDefault(require("@atlaskit/tooltip"));

var _analytics = require("../../../common/analytics");

var _constants = require("../../../common/constants");

var _primitives = require("../../../common/primitives");

var _PropertyToggle = _interopRequireDefault(require("./PropertyToggle"));

var HANDLE_OFFSET = 4;
var INNER_WIDTH = 20;
var OUTER_WIDTH = INNER_WIDTH + HANDLE_OFFSET;
var HANDLE_WIDTH = 2;

var shouldResetGrabArea = function shouldResetGrabArea(width) {
  return width >= _constants.GLOBAL_NAV_COLLAPSE_THRESHOLD && width < _constants.CONTENT_NAV_WIDTH;
};

var Outer = function Outer(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      position: 'relative',
      width: OUTER_WIDTH
    }
  }, props));
};

var GrabArea = function GrabArea(_ref) {
  var showHandle = _ref.showHandle,
      isBold = _ref.isBold,
      props = (0, _objectWithoutProperties2.default)(_ref, ["showHandle", "isBold"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      cursor: 'ew-resize',
      height: '100%',
      left: -HANDLE_OFFSET,
      position: 'relative',
      width: OUTER_WIDTH
    }
  }, props), _react.default.createElement("div", {
    css: {
      backgroundColor: isBold ? _theme.colors.B200 : _theme.colors.B100,
      opacity: showHandle ? 1 : 0,
      height: '100%',
      left: HANDLE_OFFSET - HANDLE_WIDTH / 2,
      // the handle should "straddle" the dividing line
      position: 'absolute',
      transition: 'opacity 200ms',
      width: HANDLE_WIDTH
    }
  }));
};

exports.GrabArea = GrabArea;

var Button = function Button(_ref2) {
  var children = _ref2.children,
      hasHighlight = _ref2.hasHighlight,
      innerRef = _ref2.innerRef,
      isVisible = _ref2.isVisible,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["children", "hasHighlight", "innerRef", "isVisible"]);
  return _react.default.createElement("button", (0, _extends2.default)({
    type: "button",
    ref: innerRef,
    css: {
      background: 0,
      backgroundColor: 'white',
      border: 0,
      borderRadius: '50%',
      boxShadow: "0 0 0 1px ".concat(_theme.colors.N30A, ", 0 2px 4px 1px ").concat(_theme.colors.N30A),
      color: hasHighlight ? _theme.colors.B100 : _theme.colors.N200,
      cursor: 'pointer',
      height: 24,
      opacity: isVisible ? 1 : 0,
      outline: 0,
      padding: 0,
      position: 'absolute',
      top: 32,
      transition: "\n        background-color 100ms linear,\n        color 100ms linear,\n        opacity 300ms cubic-bezier(0.2, 0, 0, 1),\n        transform 300ms cubic-bezier(0.2, 0, 0, 1)\n      ",
      transform: "translate(-50%)",
      width: 24,
      ':hover': {
        backgroundColor: _theme.colors.B100,
        color: 'white'
      },
      ':active': {
        backgroundColor: _theme.colors.B200,
        color: 'white'
      }
    }
  }, props), _react.default.createElement("div", {
    // increase hit-area
    css: {
      position: 'absolute',
      left: -4,
      right: -4,
      bottom: -4,
      top: -4
    }
  }), children);
}; // tinker with the DOM directly by setting style properties, updates the grab bar position by changing padding-left and width.


function updateResizeAreaPosition(elements, width) {
  elements.forEach(function (_ref3) {
    var property = _ref3.property,
        ref = _ref3.ref;
    var newValue = "".concat(width, "px");
    var oldValue = ref.style.getPropertyValue(property); // avoid thrashing

    if (oldValue === newValue) return; // direct attribute manipulation

    ref.style.setProperty(property, newValue);
  });
} // helper for tooltip content keyboard shortcut highlight


function makeTooltipNode(_ref4) {
  var text = _ref4.text,
      char = _ref4.char;
  return _react.default.createElement("div", {
    css: {
      alignItems: 'baseline',
      display: 'flex',
      lineHeight: 1.3,
      paddingBottom: 1,
      paddingTop: 1
    }
  }, _react.default.createElement("span", null, text), _react.default.createElement("div", {
    css: {
      backgroundColor: _theme.colors.N400,
      borderRadius: 2,
      lineHeight: 1.2,
      marginLeft: 4,
      padding: '1px 8px'
    }
  }, char));
}

/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */
var ResizeControl =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ResizeControl, _PureComponent);

  function ResizeControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ResizeControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ResizeControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.invalidDragAttempted = false;
    _this.lastWidth = void 0;
    _this.wrapper = void 0;
    _this.state = {
      delta: 0,
      didDragOpen: false,
      isDragging: false,
      initialWidth: 0,
      initialX: 0,
      mouseIsDown: false,
      mouseIsOverGrabArea: false,
      showGrabArea: true,
      width: _this.props.navigation.state.productNavWidth
    };

    _this.onResizerChevronClick = function () {
      var trigger = _this.props.flyoutIsOpen ? 'chevronHover' : 'chevron';

      _this.toggleCollapse(trigger);
    };

    _this.mouseEnterGrabArea = function () {
      _this.setState({
        mouseIsOverGrabArea: true
      });
    };

    _this.mouseLeaveGrabArea = function () {
      _this.setState({
        mouseIsOverGrabArea: false
      });
    };

    _this.toggleCollapse = function (trigger) {
      var _this$props = _this.props,
          navigation = _this$props.navigation,
          createAnalyticsEvent = _this$props.createAnalyticsEvent;
      var newCollapsedState = !navigation.state.isCollapsed;
      navigation.toggleCollapse();
      (0, _analytics.navigationExpandedCollapsed)(createAnalyticsEvent, {
        trigger: trigger,
        isCollapsed: newCollapsedState
      });
    };

    _this.handleResizeStart = function (event) {
      var initialX = event.pageX;

      _this.setState({
        initialX: initialX,
        mouseIsDown: true
      }); // attach handlers (handleResizeStart is a bound to onMouseDown)


      window.addEventListener('mousemove', _this.handleResize);
      window.addEventListener('mouseup', _this.handleResizeEnd);
    };

    _this.initializeDrag = function (event) {
      var navigation = _this.props.navigation;
      var delta = event.pageX - _this.state.initialX;
      var isCollapsed = navigation.state.isCollapsed; // only initialize when drag intention is "expand"

      if (isCollapsed && delta <= 0) {
        _this.invalidDragAttempted = true;
        return;
      }

      var initialWidth = navigation.state.productNavWidth;
      var didDragOpen = false; // NOTE
      // if the product nav is collapsed and the consumer starts dragging it open
      // we must expand it and drag should start from 0.

      if (isCollapsed) {
        initialWidth = _constants.CONTENT_NAV_WIDTH_COLLAPSED;
        didDragOpen = true;
        navigation.manualResizeStart({
          productNavWidth: _constants.CONTENT_NAV_WIDTH_COLLAPSED,
          isCollapsed: false
        });
      } else {
        navigation.manualResizeStart(navigation.state);
      }

      _this.setState({
        didDragOpen: didDragOpen,
        initialWidth: initialWidth,
        isDragging: true
      });
    };

    _this.handleResize = (0, _rafSchd.default)(function (event) {
      var mutationRefs = _this.props.mutationRefs;
      var _this$state = _this.state,
          initialX = _this$state.initialX,
          initialWidth = _this$state.initialWidth,
          isDragging = _this$state.isDragging,
          mouseIsDown = _this$state.mouseIsDown; // on occasion a mouse move event occurs before the event listeners
      // have a chance to detach

      if (!mouseIsDown) return; // initialize dragging

      if (!isDragging) {
        _this.initializeDrag(event);

        return;
      } // allow the product nav to be 75% of the available page width


      var maxWidth = Math.round(window.innerWidth / 4 * 3);
      var minWidth = _constants.CONTENT_NAV_WIDTH_COLLAPSED;
      var adjustedMax = maxWidth - initialWidth - _constants.GLOBAL_NAV_WIDTH;
      var adjustedMin = minWidth - initialWidth;
      var delta = Math.max(Math.min(event.pageX - initialX, adjustedMax), adjustedMin);
      var width = initialWidth + delta; // apply updated styles to the applicable DOM nodes

      updateResizeAreaPosition(mutationRefs, width); // NOTE: hijack the maual resize and force collapse, cancels mouse events

      if (event.screenX < window.screenX) {
        _this.setState({
          width: _constants.CONTENT_NAV_WIDTH_COLLAPSED
        });

        _this.handleResizeEnd();
      } else {
        // maintain internal width, applied to navigation state on resize end
        _this.setState({
          delta: delta,
          width: width
        });
      }
    });

    _this.handleResizeEnd = function () {
      var _this$props2 = _this.props,
          navigation = _this$props2.navigation,
          createAnalyticsEvent = _this$props2.createAnalyticsEvent;
      var _this$state2 = _this.state,
          delta = _this$state2.delta,
          didDragOpen = _this$state2.didDragOpen,
          isDragging = _this$state2.isDragging,
          currentWidth = _this$state2.width;
      var expandThreshold = 24;
      var resizerClicked = !isDragging && !_this.invalidDragAttempted;
      var publishWidth = currentWidth;
      var shouldCollapse = false; // check if the intention was just a click, and toggle

      if (resizerClicked) {
        publishWidth = Math.max(_constants.CONTENT_NAV_WIDTH, currentWidth);

        _this.toggleCollapse('resizerClick');
      } // prevent the user from creating an unusable width


      if (publishWidth < _constants.CONTENT_NAV_WIDTH) {
        publishWidth = _constants.CONTENT_NAV_WIDTH;

        if (didDragOpen && delta > expandThreshold) {
          shouldCollapse = false;
        } else if (currentWidth < _constants.GLOBAL_NAV_COLLAPSE_THRESHOLD) {
          shouldCollapse = true;
        }
      } else {
        shouldCollapse = navigation.state.isCollapsed;
      }

      if (!resizerClicked && (didDragOpen && !shouldCollapse || !didDragOpen && shouldCollapse)) {
        (0, _analytics.navigationExpandedCollapsed)(createAnalyticsEvent, {
          trigger: 'resizerDrag',
          isCollapsed: shouldCollapse
        });
      } // reset everything


      _this.invalidDragAttempted = false;

      _this.setState({
        didDragOpen: false,
        isDragging: false,
        mouseIsDown: false,
        width: publishWidth
      }); // publish the new width, once resizing completes


      navigation.manualResizeEnd({
        productNavWidth: publishWidth,
        isCollapsed: shouldCollapse
      });

      if (shouldResetGrabArea(currentWidth)) {
        updateResizeAreaPosition(_this.props.mutationRefs, _constants.CONTENT_NAV_WIDTH);
      } // cleanup


      window.removeEventListener('mousemove', _this.handleResize);
      window.removeEventListener('mouseup', _this.handleResizeEnd);
    };

    return _this;
  }

  (0, _createClass2.default)(ResizeControl, [{
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          didDragOpen = _this$state3.didDragOpen,
          isDragging = _this$state3.isDragging,
          mouseIsDown = _this$state3.mouseIsDown,
          mouseIsOverGrabArea = _this$state3.mouseIsOverGrabArea,
          showGrabArea = _this$state3.showGrabArea;
      var _this$props3 = this.props,
          children = _this$props3.children,
          collapseToggleTooltipContent = _this$props3.collapseToggleTooltipContent,
          expandCollapseAffordanceRef = _this$props3.expandCollapseAffordanceRef,
          flyoutIsOpen = _this$props3.flyoutIsOpen,
          isDisabled = _this$props3.isDisabled,
          isGrabAreaDisabled = _this$props3.isGrabAreaDisabled,
          mouseIsOverNavigation = _this$props3.mouseIsOverNavigation,
          navigation = _this$props3.navigation;
      var _navigation$state = navigation.state,
          isCollapsed = _navigation$state.isCollapsed,
          isPeeking = _navigation$state.isPeeking;
      var isResizeDisabled = isDisabled || isPeeking; // the button shouldn't "flip" until the drag is complete

      var ButtonIcon = _chevronLeft.default;
      if (isCollapsed || didDragOpen && isDragging) ButtonIcon = _menu.default;
      if (isCollapsed && flyoutIsOpen) ButtonIcon = _chevronRight.default;

      var button = _react.default.createElement(Button, {
        onClick: this.onResizerChevronClick // maintain styles when user is dragging
        ,
        isVisible: isCollapsed || mouseIsDown || mouseIsOverNavigation,
        hasHighlight: mouseIsDown || mouseIsOverGrabArea,
        innerRef: expandCollapseAffordanceRef
      }, _react.default.createElement(ButtonIcon, null));

      var shadowDirection = flyoutIsOpen ? 'to right' : 'to left';
      return _react.default.createElement(_react.Fragment, null, children(this.state), _react.default.createElement(Outer, null, _react.default.createElement(_primitives.Shadow, {
        direction: shadowDirection,
        isBold: mouseIsDown
      }), !isResizeDisabled && _react.default.createElement(_react.Fragment, null, !isGrabAreaDisabled && showGrabArea && _react.default.createElement(GrabArea, {
        isBold: mouseIsDown,
        showHandle: mouseIsDown || mouseIsOverGrabArea,
        onMouseEnter: this.mouseEnterGrabArea,
        onMouseLeave: this.mouseLeaveGrabArea,
        onMouseDown: this.handleResizeStart
      }), collapseToggleTooltipContent ? _react.default.createElement(_tooltip.default, {
        content: makeTooltipNode( // $FlowFixMe
        collapseToggleTooltipContent(isCollapsed)),
        delay: 600,
        hideTooltipOnClick: true,
        position: "right"
      }, button) : button)), _react.default.createElement(_PropertyToggle.default, {
        isActive: isDragging,
        styles: {
          cursor: 'ew-resize'
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var experimental_flyoutOnHover = props.experimental_flyoutOnHover,
          flyoutIsOpen = props.flyoutIsOpen,
          navigation = props.navigation;
      var isCollapsed = navigation.state.isCollapsed; // resolve "hover locking" issue with resize grab area

      if (experimental_flyoutOnHover) {
        var showGrabArea = !isCollapsed && !flyoutIsOpen;
        var mouseIsOverGrabArea = showGrabArea ? state.mouseIsOverGrabArea : false;
        return {
          mouseIsOverGrabArea: mouseIsOverGrabArea,
          showGrabArea: showGrabArea
        };
      }

      return null;
    }
  }]);
  return ResizeControl;
}(_react.PureComponent);

exports.ResizeControlBase = ResizeControl;
ResizeControl.defaultProps = {
  isGrabAreaDisabled: false
};

var _default = (0, _analyticsNext.withAnalyticsEvents)()(ResizeControl);

exports.default = _default;