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

var InteractionStateManager =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InteractionStateManager, _Component);

  function InteractionStateManager() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, InteractionStateManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(InteractionStateManager)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isActive: false,
      isHover: false,
      isFocused: false
    };

    _this.onMouseDown = function (e) {
      e.preventDefault();

      _this.setState({
        isActive: true
      });
    };

    _this.onMouseUp = function (e) {
      e.preventDefault();

      _this.setState({
        isActive: false,
        isHover: true
      });
    };

    _this.onMouseEnter = function () {
      if (!_this.state.isHover) {
        _this.setState({
          isHover: true
        });
      }
    };

    _this.onMouseLeave = function () {
      _this.setState({
        isActive: false,
        isHover: false
      });
    };

    _this.onFocus = function () {
      return _this.setState({
        isFocused: true
      });
    };

    _this.onBlur = function () {
      return _this.setState({
        isFocused: false
      });
    };

    return _this;
  }

  (0, _createClass2.default)(InteractionStateManager, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        onMouseDown: this.onMouseDown,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onMouseUp: this.onMouseUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        role: "presentation",
        css: {
          width: '100%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }, this.props.children(this.state));
    }
  }]);
  return InteractionStateManager;
}(_react.Component);

exports.default = InteractionStateManager;
module.exports = exports.default;