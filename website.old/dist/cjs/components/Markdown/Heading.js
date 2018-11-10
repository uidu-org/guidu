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

var _reactAddonsTextContent = _interopRequireDefault(require("react-addons-text-content"));

var _reactHelmet = require("react-helmet");

var _snakeCase = _interopRequireDefault(require("snake-case"));

function dashcase(children) {
  return (0, _snakeCase.default)((0, _reactAddonsTextContent.default)(children)).replace(/_/g, '-');
}

var _default =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      shouldShowAnchor: false
    };

    _this.handleShowAnchor = function () {
      _this.setState({
        shouldShowAnchor: true
      });
    };

    _this.handleHideAnchor = function () {
      _this.setState({
        shouldShowAnchor: false
      });
    };

    return _this;
  }

  (0, _createClass2.default)(_default, [{
    key: "render",
    value: function render() {
      var handleHideAnchor = this.handleHideAnchor,
          handleShowAnchor = this.handleShowAnchor;
      var _this$props = this.props,
          children = _this$props.children,
          level = _this$props.level;
      var shouldShowAnchor = this.state.shouldShowAnchor;
      var Tag = "h".concat(level);
      var id = dashcase(children); // H1 on the documentation specifies the main page title
      // We should implement this using gray-matter to have meta data *title* in markdown
      // Currently gray-matter breaks in IE11, please see https://github.com/jonschlinkert/gray-matter/pull/76 for reference

      return _react.default.createElement(Tag, {
        id: id,
        onMouseEnter: handleShowAnchor,
        onMouseLeave: handleHideAnchor
      }, level === 1 ? _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, (0, _reactAddonsTextContent.default)(children))) : '', children, shouldShowAnchor ? ' ' : '', shouldShowAnchor ? _react.default.createElement("a", {
        href: "#".concat(id)
      }, "#") : '');
    }
  }]);
  return _default;
}(_react.Component);

exports.default = _default;
module.exports = exports.default;