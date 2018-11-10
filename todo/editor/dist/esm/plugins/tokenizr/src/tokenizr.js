import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import TokenizrEditing from './tokenizrediting';
import TokenizrUI from './tokenizrui';

var Tokenizr =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Tokenizr, _Plugin);

  function Tokenizr() {
    _classCallCheck(this, Tokenizr);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tokenizr).apply(this, arguments));
  }

  _createClass(Tokenizr, null, [{
    key: "requires",
    get: function get() {
      return [TokenizrEditing, TokenizrUI];
    }
  }, {
    key: "pluginName",
    get: function get() {
      return 'Tokenizr';
    }
  }]);

  return Tokenizr;
}(Plugin);

export { Tokenizr as default };