"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _analyticsNamespacedContext = require("@atlaskit/analytics-namespaced-context");

var _constants = require("../../../../common/constants");

var _primitives = require("./primitives");

var ContentNavigation =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ContentNavigation, _Component);

  function ContentNavigation() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ContentNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ContentNavigation)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.isMounted = false;
    return _this;
  }

  (0, _createClass2.default)(ContentNavigation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Container = _this$props.container,
          isPeekHinting = _this$props.isPeekHinting,
          isPeeking = _this$props.isPeeking,
          isVisible = _this$props.isVisible,
          Product = _this$props.product;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_primitives.ProductNavigation, null, isVisible ? _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationLayer: 'product'
          }
        }
      }, _react.default.createElement(Product, null)) : null), _react.default.createElement(_Transition.default, {
        in: !!Container,
        timeout: this.isMounted ? _constants.transitionDurationMs : 0,
        mountOnEnter: true,
        unmountOnExit: true
      }, function (state) {
        return _react.default.createElement(_primitives.ContainerNavigation, {
          isEntering: state === 'entering',
          isExiting: state === 'exiting',
          isPeekHinting: isPeekHinting,
          isPeeking: isPeeking
        }, _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
          data: {
            attributes: {
              navigationLayer: 'container'
            }
          }
        }, _react.default.createElement(_react.Fragment, null, isVisible && Container ? _react.default.createElement(Container, null) : null)));
      }), _react.default.createElement(_primitives.InnerShadow, {
        isVisible: isPeeking
      }));
    }
  }]);
  return ContentNavigation;
}(_react.Component);

exports.default = ContentNavigation;
module.exports = exports.default;