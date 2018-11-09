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

var _reactLoadable = _interopRequireDefault(require("react-loadable"));

var _Loading = _interopRequireDefault(require("../Loading"));

var _Code = _interopRequireDefault(require("../Code"));

// we explicitly do not want to use our wrapped loadable here, as the modal being loaded should
// be handled by the iframe sendApdex
var ExampleDisplay =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ExampleDisplay, _Component);

  function ExampleDisplay(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, ExampleDisplay);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ExampleDisplay).call(this, _props));
    _this.iframeRef = void 0;

    _this.buildExampleComponents = function (props) {
      _this.ExampleCode = (0, _reactLoadable.default)({
        loader: function loader() {
          return props.example.contents();
        },
        loading: _Loading.default,
        render: function render(loaded) {
          return _react.default.createElement(_Code.default, {
            grammar: "jsx",
            content: loaded.default,
            name: props.name
          });
        }
      });

      _this.Example = function () {
        return _react.default.createElement("iframe", {
          ref: _this.getIframeRef,
          title: "example",
          style: {
            width: '100%',
            height: '100%',
            border: 'none'
          },
          src: props.src
        });
      };
    };

    _this.getIframeRef = function (ref) {
      return _this.iframeRef = ref;
    };

    _this.buildExampleComponents(_props);

    return _this;
  }

  (0, _createClass2.default)(ExampleDisplay, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        if (this.iframeRef && typeof this.iframeRef.contentWindow.unmountApp === 'function') {
          this.iframeRef.contentWindow.unmountApp();
        }

        this.buildExampleComponents(nextProps);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.iframeRef && this.iframeRef.contentWindow && typeof this.iframeRef.contentWindow.unmountApp === 'function') {
        this.iframeRef.contentWindow.unmountApp();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.src) {
        console.error('No source url provided for the examples iframe', this.props.src);
        return;
      }

      return this.props.children(this.ExampleCode, this.Example, this.props.displayCode);
    }
  }]);
  return ExampleDisplay;
}(_react.Component);

exports.default = ExampleDisplay;
module.exports = exports.default;