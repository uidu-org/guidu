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

var ErrorBoundary =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ErrorBoundary, _Component);

  function ErrorBoundary() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ErrorBoundary)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  (0, _createClass2.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;
      this.setState({
        hasError: true
      });

      if (onError) {
        onError(error, info);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return _react.default.createElement("h4", null, "Something went wrong loading this example.");
      }

      return this.props.children;
    }
  }]);
  return ErrorBoundary;
}(_react.Component);

exports.default = ErrorBoundary;
module.exports = exports.default;