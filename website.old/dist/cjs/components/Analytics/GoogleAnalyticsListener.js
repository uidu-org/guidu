"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.observePerformanceMetrics = exports.sendInitialApdex = exports.sendApdex = exports.initializeGA = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _reactRouterDom = require("react-router-dom");

var _ttiPolyfill = _interopRequireDefault(require("tti-polyfill"));

var _AtlassianAnalytics = _interopRequireDefault(require("./AtlassianAnalytics"));

var _package = _interopRequireDefault(require("../../../package.json"));

var _constants = require("../../constants");

var mounted = 0;

var getPageLoadNumber = function getPageLoadNumber() {
  if (!window || !window.performance || !window.performance.getEntriesByType) {
    return null;
  }

  var navigationEntries = window.performance.getEntriesByType('navigation');
  if (navigationEntries.length !== 1) return null;
  return Math.round(navigationEntries[0].domComplete);
};

var initializeGA = function initializeGA() {
  return _reactGa.default.initialize(_constants.GOOGLE_ANALYTICS_ID);
}; // export const sendPerformanceMetrics = ({
//   location,
//   metricName,
//   timing,
//   value,
//   isInitial,
// }) => {
//   ReactGA.event({
//     category: 'Performance',
//     action: metricName,
//     value,
//     nonInteraction: true,
//     label: `seconds:${(timing / 1000).toFixed(1)}`,
//   });
//   const request = getAtlassianAnalyticsClient({
//     version: '-',
//   });
//   const attributes = {
//     [metricName]: value,
//     loadTimeInMs: timing,
//     path: location,
//     isInitial: isInitial || false,
//   };
//   request.addEvent(`atlaskit.website.performance`, attributes);
//   request.send();
// };


exports.initializeGA = initializeGA;

var sendApdex = function sendApdex(location, timing) {
  var isInitial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var apdex = 0;
  if (timing < 1000) apdex = 100;else if (timing < 4000) apdex = 50;
  sendPerformanceMetrics({
    location: location,
    timing: timing,
    metricName: 'apdex',
    value: apdex,
    isInitial: isInitial
  });
};

exports.sendApdex = sendApdex;

var sendInitialApdex = function sendInitialApdex(location) {
  var timing = getPageLoadNumber();
  if (!timing) return null;
  sendApdex(location, timing, true);
};

exports.sendInitialApdex = sendInitialApdex;

var observePerformanceMetrics = function observePerformanceMetrics(location) {
  if (typeof PerformanceObserver === 'undefined') {
    return;
  } // 'first-paint' and 'first-contentful-paint'


  var observer = new PerformanceObserver(function (list) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = list.getEntries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entry = _step.value;
        var metricName = entry.name;
        var timing = Math.round(entry.startTime + entry.duration);
        sendPerformanceMetrics({
          location: location,
          timing: timing,
          metricName: metricName,
          value: timing,
          isInitial: true
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }); // TODO: remove this once fixed in Firefox (most likely FF63)
  // https://ecosystem.atlassian.net/browse/AK-5381

  try {
    observer.observe({
      entryTypes: ['paint']
    });
  } catch (error) {} // time to interactive, more details: https://goo.gl/OSmrPk


  _ttiPolyfill.default.getFirstConsistentlyInteractive({
    useMutationObserver: false
  }).then(function (tti) {
    var timing = Math.round(tti);
    sendPerformanceMetrics({
      location: location,
      timing: timing,
      metricName: 'tti',
      value: timing,
      isInitial: true
    });
  });
};

exports.observePerformanceMetrics = observePerformanceMetrics;

var GoogleAnalyticsListener =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GoogleAnalyticsListener, _Component);

  function GoogleAnalyticsListener(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GoogleAnalyticsListener);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GoogleAnalyticsListener).call(this, props));

    _reactGa.default.initialize(_constants.GOOGLE_ANALYTICS_ID);

    return _this;
  }

  (0, _createClass2.default)(GoogleAnalyticsListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('load', function () {
        sendInitialApdex(_this2.props.location.pathname);
      }, {
        once: true
      });
      observePerformanceMetrics(this.props.location.pathname);
      mounted++;

      if (mounted > 1) {
        console.warn('There is more than one GoogleAnalyticsListener on the page, this could cause errors');
      }

      initializeGA();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.gaId !== this.props.gaId) {
        console.warn("You can't change the gaId one it has been initialised.");
      }

      if (nextProps.location !== this.props.location) {
        _reactGa.default.pageview(nextProps.location.pathname);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      mounted--;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return GoogleAnalyticsListener;
}(_react.Component);

var _default = (0, _reactRouterDom.withRouter)(GoogleAnalyticsListener);

exports.default = _default;