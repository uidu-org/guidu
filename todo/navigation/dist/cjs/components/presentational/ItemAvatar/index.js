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

var _theme = require("../../../theme");

var _ItemAvatar = _interopRequireDefault(require("./ItemAvatar"));

var ItemAvatarWithTheme = (0, _theme.withContentTheme)(_ItemAvatar.default);

var ConnectedItemAvatar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConnectedItemAvatar, _Component);

  function ConnectedItemAvatar() {
    (0, _classCallCheck2.default)(this, ConnectedItemAvatar);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConnectedItemAvatar).apply(this, arguments));
  }

  (0, _createClass2.default)(ConnectedItemAvatar, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(ItemAvatarWithTheme, this.props);
    }
  }]);
  return ConnectedItemAvatar;
}(_react.Component);

exports.default = ConnectedItemAvatar;
ConnectedItemAvatar.defaultProps = {
  styles: _theme.styleReducerNoOp
};
module.exports = exports.default;