"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleTitle = exports.Toggle = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var _reactSyntaxHighlighter = require("react-syntax-highlighter");

var _reactstrap = require("reactstrap");

var _prism = require("react-syntax-highlighter/dist/styles/prism");

var _code = _interopRequireDefault(require("@atlaskit/icon/glyph/code"));

var _ErrorBoundary = _interopRequireDefault(require("./ErrorBoundary"));

var _replaceSrc = _interopRequireDefault(require("./replaceSrc"));

var Example =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Example, _React$Component);

  function Example() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Example)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isSourceVisible: false,
      isHover: false
    };

    _this.toggleSource = function () {
      _this.setState({
        isSourceVisible: !_this.state.isSourceVisible
      });
    };

    _this.onError = function (error, info) {
      console.error(error);
      console.error(info);
    };

    return _this;
  }

  (0, _createClass2.default)(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          Component = _this$props.Component,
          source = _this$props.source,
          language = _this$props.language,
          title = _this$props.title,
          packageName = _this$props.packageName;
      var _this$state = this.state,
          isHover = _this$state.isHover,
          isSourceVisible = _this$state.isSourceVisible;
      var toggleLabel = isSourceVisible ? 'Hide Code Snippet' : 'Show Code Snippet';
      var state = isHover ? 'hover' : 'normal';
      var mode = isSourceVisible ? 'open' : 'closed';
      return _react.default.createElement(Wrapper, {
        className: "card shadow border-0 mb-4",
        state: state,
        mode: mode
      }, _react.default.createElement(_reactstrap.CardHeader, null, _react.default.createElement(Toggle, {
        onClick: this.toggleSource,
        onMouseOver: function onMouseOver() {
          return _this2.setState({
            isHover: true
          });
        },
        onMouseOut: function onMouseOut() {
          return _this2.setState({
            isHover: false
          });
        },
        title: toggleLabel,
        mode: mode
      }, _react.default.createElement(_reactstrap.CardTitle, {
        mode: mode
      }, title), _react.default.createElement(_code.default, {
        label: toggleLabel
      }))), isSourceVisible && _react.default.createElement(_reactSyntaxHighlighter.Prism, {
        language: "javascript",
        style: _prism.tomorrow,
        customStyle: {
          marginTop: 0,
          padding: '1rem'
        }
      }, packageName ? (0, _replaceSrc.default)(source, packageName) : source), _react.default.createElement(_reactstrap.CardBody, null, _react.default.createElement(Showcase, null, _react.default.createElement(_ErrorBoundary.default, {
        onError: this.onError
      }, _react.default.createElement(Component, null)))));
    }
  }]);
  return Example;
}(_react.default.Component);

exports.default = Example;
Example.defaultProps = {
  language: 'javascript'
};
var TRANSITION_DURATION = '200ms';
var exampleBackgroundColor = {
  open: (0, _theme.themed)('state', {
    normal: {
      light: _theme.colors.N30,
      dark: _theme.colors.N700
    },
    hover: {
      light: _theme.colors.N40,
      dark: _theme.colors.N600
    }
  }),
  closed: (0, _theme.themed)('state', {
    normal: {
      light: _theme.colors.N20,
      dark: _theme.colors.DN50
    },
    hover: {
      light: _theme.colors.N40,
      dark: _theme.colors.DN60
    }
  })
};
var toggleColor = (0, _theme.themed)('mode', {
  closed: {
    light: _theme.colors.N600,
    dark: _theme.colors.DN100
  },
  open: {
    light: _theme.colors.N600,
    dark: _theme.colors.DN100
  }
});
var Wrapper = (0, _styledComponents.default)(_reactstrap.Card).withConfig({
  displayName: "Example__Wrapper",
  componentId: "sc-1536tc8-0"
})(["\n  color: ", ";\n  margin-top: 20px;\n  transition: background-color ", ";\n"], toggleColor, TRANSITION_DURATION);

var Toggle = _styledComponents.default.div.withConfig({
  displayName: "Example__Toggle",
  componentId: "sc-1536tc8-1"
})(["\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  transition: color ", ", fill ", ";\n"], TRANSITION_DURATION, TRANSITION_DURATION); // NOTE: use of important necessary to override element targeted headings


exports.Toggle = Toggle;

var ToggleTitle = _styledComponents.default.h4.withConfig({
  displayName: "Example__ToggleTitle",
  componentId: "sc-1536tc8-2"
})(["\n  color: ", " !important;\n  margin: 0;\n"], toggleColor);

exports.ToggleTitle = ToggleTitle;

var Showcase = _styledComponents.default.div.withConfig({
  displayName: "Example__Showcase",
  componentId: "sc-1536tc8-3"
})(["\n  // background-color: ", ";\n  // border-radius: 3px;\n  // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n"], _theme.colors.background);