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

var _reactIs = require("react-is");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _analyticsListeners = _interopRequireDefault(require("@atlaskit/analytics-listeners"));

var _theme = require("@atlaskit/theme");

var _WrappedLoader = _interopRequireDefault(require("../../components/WrappedLoader"));

var _queryString = _interopRequireDefault(require("query-string"));

var _packageResolver2 = _interopRequireDefault(require("../../utils/packageResolver"));

var fs = _interopRequireWildcard(require("../../utils/fs"));

var _Loading = _interopRequireDefault(require("../../components/Loading"));

var _GoogleAnalyticsListener = require("../../components/Analytics/GoogleAnalyticsListener");

var ErrorMessage = _styledComponents.default.div.withConfig({
  displayName: "loader__ErrorMessage",
  componentId: "sc-5yt2o6-0"
})(["\n  background-color: ", ";\n  color: white;\n  font-size: 120%;\n  padding: 1em;\n"], _theme.colors.R400);

var ExamplesIFrame =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ExamplesIFrame, _Component);

  function ExamplesIFrame() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ExamplesIFrame);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ExamplesIFrame)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      packageId: '',
      groupId: '',
      exampleId: ''
    };
    return _this;
  }

  (0, _createClass2.default)(ExamplesIFrame, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (window) {
        var _qs$parse = _queryString.default.parse(window.location.search),
            packageId = _qs$parse.packageId,
            groupId = _qs$parse.groupId,
            exampleId = _qs$parse.exampleId;

        this.setState({
          packageId: packageId,
          groupId: groupId,
          exampleId: exampleId
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (window.self === window.top) {
        var location = window.location.pathname + window.location.search;
        window.addEventListener('load', function () {
          (0, _GoogleAnalyticsListener.sendInitialApdex)(location);
        }, {
          once: true
        });
        (0, _GoogleAnalyticsListener.observePerformanceMetrics)(location);
      }

      (0, _GoogleAnalyticsListener.initializeGA)();
    }
  }, {
    key: "render",
    value: function render() {
      var _packageResolver = (0, _packageResolver2.default)(this.state.groupId, this.state.packageId, this.state.exampleId),
          examples = _packageResolver.examples,
          packageId = _packageResolver.packageId,
          exampleId = _packageResolver.exampleId;

      if (examples && exampleId) {
        return _react.default.createElement(ExampleLoader, {
          example: fs.getById(fs.getFiles(examples.children), exampleId)
        });
      }

      return _react.default.createElement(ErrorMessage, null, fs.titleize(packageId), " does not have examples");
    }
  }]);
  return ExamplesIFrame;
}(_react.Component); // Using console.debug instead of console.log to reduce noise.
// Chrome's default logging level excludes debug


exports.default = ExamplesIFrame;
var mockClient = {
  sendUIEvent: function sendUIEvent() {
    var _console;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (_console = console).debug.apply(_console, ['UI event'].concat(args));
  },
  sendOperationalEvent: function sendOperationalEvent() {
    var _console2;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_console2 = console).debug.apply(_console2, ['Operational event'].concat(args));
  },
  sendTrackEvent: function sendTrackEvent() {
    var _console3;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return (_console3 = console).debug.apply(_console3, ['Track event'].concat(args));
  },
  sendScreenEvent: function sendScreenEvent() {
    var _console4;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return (_console4 = console).debug.apply(_console4, ['Screen event'].concat(args));
  }
};

function ExampleLoader(props) {
  var ExampleComponent = (0, _WrappedLoader.default)({
    loader: function loader() {
      return props.example.exports();
    },
    loading: _Loading.default,
    render: function render(loaded) {
      var ExampleComp = loaded.default;

      if (!ExampleComp) {
        return _react.default.createElement(ErrorMessage, null, "Example \"", props.example.id, "\" doesn't have default export.");
      }

      var meta = ExampleComp.meta || {};
      return meta.noListener ? _react.default.createElement(ExampleComp, null) : _react.default.createElement(_analyticsListeners.default, {
        client: mockClient
      }, _react.default.createElement(ExampleComp, null));
    }
  });
  return _react.default.createElement(ExampleComponent, null);
}

module.exports = exports.default;