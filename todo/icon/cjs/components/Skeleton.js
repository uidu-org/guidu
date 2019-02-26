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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Skeleton = _interopRequireDefault(require("../styled/Skeleton"));

var Skeleton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Skeleton, _Component);

  function Skeleton() {
    (0, _classCallCheck2.default)(this, Skeleton);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Skeleton).apply(this, arguments));
  }

  (0, _createClass2.default)(Skeleton, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_Skeleton.default, this.props);
    }
  }]);
  return Skeleton;
}(_react.Component);

exports.default = Skeleton;
(0, _defineProperty2.default)(Skeleton, "defaultProps", {
  size: 'medium',
  weight: 'normal'
});