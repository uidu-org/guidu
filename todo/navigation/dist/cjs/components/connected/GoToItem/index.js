"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GoToItemBase = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _arrowRightCircle = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-right-circle"));

var _spinner = _interopRequireDefault(require("@atlaskit/spinner"));

var _uiController = require("../../../ui-controller");

var _viewController = require("../../../view-controller");

var _ConnectedItem = _interopRequireDefault(require("../ConnectedItem"));

var generateAfterProp = function generateAfterProp(_ref) {
  var goTo = _ref.goTo,
      spinnerDelay = _ref.spinnerDelay,
      navigationViewController = _ref.navigationViewController;
  return function (_ref2) {
    var isActive = _ref2.isActive,
        isHover = _ref2.isHover,
        isFocused = _ref2.isFocused;
    var incomingView = navigationViewController.state.incomingView;

    if (incomingView && incomingView.id === goTo) {
      return _react.default.createElement(_spinner.default, {
        delay: spinnerDelay,
        invertColor: true,
        size: "small"
      });
    }

    if (isActive || isHover || isFocused) {
      return _react.default.createElement(_arrowRightCircle.default, {
        primaryColor: "currentColor",
        secondaryColor: "inherit"
      });
    }

    return null;
  };
};

var GoToItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GoToItem, _Component);

  function GoToItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GoToItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GoToItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          goTo = _this$props.goTo,
          navigationViewController = _this$props.navigationViewController,
          navigationUIController = _this$props.navigationUIController;
      var activeView = navigationViewController.state.activeView;
      e.preventDefault();

      if (typeof goTo !== 'string') {
        return;
      }

      if (navigationUIController.state.isPeeking) {
        if (activeView && goTo === activeView.id) {
          // If we're peeking and goTo points to the active view, unpeek.
          navigationUIController.unPeek();
        } else {
          // If we're peeking and goTo does not point to the active view, update
          // the peek view.
          navigationViewController.setPeekView(goTo);
        }
      } else {
        // If we're not peeking, update the active view.
        navigationViewController.setView(goTo);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(GoToItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          afterProp = _this$props2.after,
          goTo = _this$props2.goTo,
          navigationUIController = _this$props2.navigationUIController,
          navigationViewController = _this$props2.navigationViewController,
          spinnerDelay = _this$props2.spinnerDelay,
          rest = (0, _objectWithoutProperties2.default)(_this$props2, ["after", "goTo", "navigationUIController", "navigationViewController", "spinnerDelay"]);
      var after = typeof afterProp === 'undefined' ? generateAfterProp({
        goTo: goTo,
        spinnerDelay: spinnerDelay,
        navigationViewController: navigationViewController
      }) : afterProp;
      var props = (0, _objectSpread2.default)({}, rest, {
        after: after
      });
      return _react.default.createElement(_ConnectedItem.default, (0, _extends2.default)({
        onClick: this.handleClick
      }, props));
    }
  }]);
  return GoToItem;
}(_react.Component);

exports.GoToItemBase = GoToItem;
GoToItem.defaultProps = {
  spinnerDelay: 200
};

var _default = (0, _uiController.withNavigationUI)((0, _viewController.withNavigationViewController)(GoToItem));

exports.default = _default;