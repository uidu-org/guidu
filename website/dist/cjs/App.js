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

var _checkbox = require("@uidu/checkbox");

var _form = require("@uidu/form");

var _logo = _interopRequireDefault(require("./logo.svg"));

require("./App.scss");

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement("header", {
        className: "App-header"
      }, _react.default.createElement("img", {
        src: _logo.default,
        className: "App-logo",
        alt: "logo"
      }), _react.default.createElement("p", null, "Guidu ", _react.default.createElement("code", null, "src/App.js"), " and save to reload."), _react.default.createElement(_form.Form, {
        handleSubmit: function handleSubmit() {},
        footerRenderer: function footerRenderer(_ref) {
          var canSubmit = _ref.canSubmit;
          return _react.default.createElement(_form.FormSubmit, {
            canSubmit: canSubmit
          });
        }
      }, _react.default.createElement(_checkbox.Checkbox, {
        layout: "elementOnly",
        name: "test",
        label: "test"
      })), _react.default.createElement("a", {
        className: "App-link",
        href: "https://reactjs.org",
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Learn React")));
    }
  }]);
  return App;
}(_react.Component);

var _default = App;
exports.default = _default;
module.exports = exports.default;