"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _reactLoadable = _interopRequireDefault(require("react-loadable"));

var _react = _interopRequireWildcard(require("react"));

function checkMarkAndSendAnalytics() {
  if (!performance.mark) {
    return null;
  } // We mark before doing anything because speed matters here


  performance.mark('loaded');

  var _performance$getEntri = performance.getEntriesByType('mark').filter(function (match) {
    return match.name.includes('navigate-') || match.name === 'loaded';
  }),
      _performance$getEntri2 = (0, _slicedToArray2.default)(_performance$getEntri, 2),
      navigate = _performance$getEntri2[0],
      loaded = _performance$getEntri2[1];

  if (navigate && loaded) {
    performance.measure('analytics-measure', navigate.name, 'loaded');
    var entries = performance.getEntriesByName('analytics-measure', 'measure');
  }

  performance.clearMarks();
  performance.clearMeasures();
  return null;
}

var Wrapper =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Wrapper, _Component);

  function Wrapper() {
    (0, _classCallCheck2.default)(this, Wrapper);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Wrapper).apply(this, arguments));
  }

  (0, _createClass2.default)(Wrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {// checkMarkAndSendAnalytics();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return Wrapper;
}(_react.Component);

var WrappedLoadable = function WrappedLoadable(_ref) {
  var _render = _ref.render,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["render"]);
  return (0, _reactLoadable.default)((0, _objectSpread2.default)({}, rest, {
    render: function render(args) {
      return _react.default.createElement(Wrapper, null, _render(args));
    }
  }));
};

var _default = WrappedLoadable;
exports.default = _default;
module.exports = exports.default;