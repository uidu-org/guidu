import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import Page from '../components/Page';

var FourOhFour =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(FourOhFour, _React$PureComponent);

  function FourOhFour() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FourOhFour);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FourOhFour)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.props = void 0;
    return _this;
  }

  _createClass(FourOhFour, [{
    key: "render",
    value: function render() {
      return React.createElement(Page, null, React.createElement("h1", null, "Oops!"), React.createElement("p", null, "Couldn't find this page."));
    }
  }]);

  return FourOhFour;
}(React.PureComponent);

export { FourOhFour as default };