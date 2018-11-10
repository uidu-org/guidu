"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _menu = _interopRequireDefault(require("@atlaskit/icon/glyph/menu"));

var _arrowLeft = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-left"));

var _ = require("../../../");

var _InteractionStateManager = _interopRequireDefault(require("../InteractionStateManager"));

var _uiController = require("../../../ui-controller");

var _viewController = require("../../../view-controller");

var PeekToggle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PeekToggle, _Component);

  function PeekToggle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, PeekToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PeekToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function () {
      var _this$props = _this.props,
          isPeeking = _this$props.isPeeking,
          navigationUIController = _this$props.navigationUIController,
          navigationViewController = _this$props.navigationViewController;

      if (!isPeeking && navigationViewController.initialPeekViewId) {
        navigationViewController.setPeekView(navigationViewController.initialPeekViewId);
      }

      navigationUIController.togglePeek();
    };

    _this.renderIcon = function () {
      return _this.props.isPeeking ? _arrowLeft.default : _menu.default;
    };

    _this.renderComponent = function (_ref) {
      var className = _ref.className,
          children = _ref.children;

      var isHomeViewActive = _this.getIsHomeViewActive();

      var _this$props2 = _this.props,
          isPeeking = _this$props2.isPeeking,
          navigationUIController = _this$props2.navigationUIController;
      return _react.default.createElement("button", {
        className: className,
        onClick: isHomeViewActive && !isPeeking ? null : _this.handleClick,
        onMouseEnter: navigationUIController.peekHint,
        onMouseLeave: navigationUIController.unPeekHint
      }, children);
    };

    return _this;
  }

  (0, _createClass2.default)(PeekToggle, [{
    key: "getIsHomeViewActive",
    value: function getIsHomeViewActive() {
      var _this$props$navigatio = this.props.navigationViewController.state,
          activeView = _this$props$navigatio.activeView,
          activePeekView = _this$props$navigatio.activePeekView;

      if (!activeView || !activePeekView) {
        return false;
      }

      return activeView.id === activePeekView.id;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          label = _this$props3.label,
          tooltip = _this$props3.tooltip;
      var isPeeking = this.props.isPeeking;
      var isHomeViewActive = this.getIsHomeViewActive();
      return _react.default.createElement(_InteractionStateManager.default, null, function (_ref2) {
        var isActive = _ref2.isActive,
            isHover = _ref2.isHover;
        return _react.default.createElement(_.GlobalItemPrimitive, {
          isActive: isActive,
          component: _this2.renderComponent,
          icon: _this2.renderIcon(),
          isHover: isHover || isHomeViewActive || isPeeking,
          label: label,
          tooltip: !isHomeViewActive && !isPeeking && tooltip
        });
      });
    }
  }]);
  return PeekToggle;
}(_react.Component);

PeekToggle.defaultProps = {
  label: 'Main menu',
  tooltip: 'Main menu'
};

var PeekToggleWithUIController = function PeekToggleWithUIController(props) {
  return _react.default.createElement(_uiController.UIControllerSubscriber, null, function (navigationUIController) {
    return _react.default.createElement(PeekToggle, (0, _extends2.default)({
      isPeeking: navigationUIController.state.isPeeking,
      navigationUIController: navigationUIController
    }, props));
  });
};

var _default = (0, _viewController.withNavigationViewController)(PeekToggleWithUIController);

exports.default = _default;
module.exports = exports.default;