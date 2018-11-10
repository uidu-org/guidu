"use strict";

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

var _plugin = _interopRequireDefault(require("@ckeditor/ckeditor5-core/src/plugin"));

var _tokenizrediting = _interopRequireDefault(require("./tokenizrediting"));

var _tokenizrui = _interopRequireDefault(require("./tokenizrui"));

var Tokenizr =
/*#__PURE__*/
function (_Plugin) {
  (0, _inherits2.default)(Tokenizr, _Plugin);

  function Tokenizr() {
    (0, _classCallCheck2.default)(this, Tokenizr);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tokenizr).apply(this, arguments));
  }

  (0, _createClass2.default)(Tokenizr, null, [{
    key: "requires",
    get: function get() {
      return [_tokenizrediting.default, _tokenizrui.default];
    }
  }, {
    key: "pluginName",
    get: function get() {
      return 'Tokenizr';
    }
  }]);
  return Tokenizr;
}(_plugin.default);

exports.default = Tokenizr;
module.exports = exports.default;