"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.withGlobalTheme = exports.withContentTheme = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _emotionTheming = require("emotion-theming");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _modes = require("./modes");

var withTheme = function withTheme(defaultTheme) {
  return function (WrappedComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(WithTheme, _Component);

      function WithTheme() {
        var _getPrototypeOf2;

        var _this;

        (0, _classCallCheck2.default)(this, WithTheme);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(WithTheme)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _this.state = {
          theme: undefined
        };
        _this.unsubscribeId = void 0;
        return _this;
      }

      (0, _createClass2.default)(WithTheme, [{
        key: "subscribeToContext",
        value: function subscribeToContext() {
          var _this2 = this;

          if (this.unsubscribeId && this.unsubscribeId !== -1) {
            return;
          }

          var themeContext = this.context[_emotionTheming.channel];

          if (themeContext !== undefined) {
            this.unsubscribeId = themeContext.subscribe(function (theme) {
              _this2.setState({
                theme: theme
              });
            });
          }
        }
      }, {
        key: "componentWillMount",
        value: function componentWillMount() {
          this.subscribeToContext();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.subscribeToContext();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.unsubscribeId && this.unsubscribeId !== -1) {
            this.context[_emotionTheming.channel].unsubscribe(this.unsubscribeId);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var theme = this.state.theme || defaultTheme;
          return _react.default.createElement(WrappedComponent, (0, _extends2.default)({
            theme: theme
          }, this.props));
        }
      }]);
      return WithTheme;
    }(_react.Component), _class.contextTypes = (0, _defineProperty2.default)({}, _emotionTheming.channel, _propTypes.default.object), _class.displayName = "WithTheme(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"), _temp;
  };
};

var defaultContentTheme = {
  mode: _modes.light,
  context: 'container'
};
var defaultGlobalTheme = {
  mode: _modes.light
};
var withContentTheme = withTheme(defaultContentTheme);
exports.withContentTheme = withContentTheme;
var withGlobalTheme = withTheme(defaultGlobalTheme);
exports.withGlobalTheme = withGlobalTheme;
var _default = withTheme;
exports.default = _default;