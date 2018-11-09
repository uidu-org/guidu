"use strict";

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

var _react = _interopRequireDefault(require("react"));

var _Page = _interopRequireDefault(require("../components/Page"));

var FourOhFour =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(FourOhFour, _React$PureComponent);

  function FourOhFour() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FourOhFour);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FourOhFour)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.props = void 0;
    return _this;
  }

  (0, _createClass2.default)(FourOhFour, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_Page.default, null, _react.default.createElement("h1", null, "Oops!"), _react.default.createElement("p", null, "Couldn't find this page."));
    }
  }]);
  return FourOhFour;
}(_react.default.PureComponent);

exports.default = FourOhFour;
module.exports = exports.default;