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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpinkit = _interopRequireDefault(require("react-spinkit"));

var Loader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Loader, _Component);

  function Loader() {
    (0, _classCallCheck2.default)(this, Loader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Loader).apply(this, arguments));
  }

  (0, _createClass2.default)(Loader, [{
    key: "render",
    value: function render() {
      if (this.props.loaded) {
        return this.props.children;
      }

      return _react.default.createElement("div", {
        className: this.props.wrapperClassName
      }, _react.default.createElement(_reactSpinkit.default, {
        name: this.props.name,
        color: this.props.color,
        className: this.props.className,
        fadeIn: "none"
      }));
    }
  }]);
  return Loader;
}(_react.Component);

exports.default = Loader;
Loader.propTypes = {
  loaded: _propTypes.default.bool,
  children: _propTypes.default.node,
  name: _propTypes.default.string,
  color: _propTypes.default.string,
  className: _propTypes.default.string,
  wrapperClassName: _propTypes.default.string
};
Loader.defaultProps = {
  loaded: false,
  children: null,
  name: 'wave',
  color: 'red',
  className: null,
  wrapperClassName: 'd-flex align-items-center justify-content-center h-100'
};
module.exports = exports.default;