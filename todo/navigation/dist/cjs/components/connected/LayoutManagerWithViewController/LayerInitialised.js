"use strict";

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

var _react = require("react");

var _analyticsNext = require("@atlaskit/analytics-next");

var _analytics = require("../../../common/analytics");

var LayerInitialised =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LayerInitialised, _Component);

  function LayerInitialised() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LayerInitialised);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LayerInitialised)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.fireInitialisedEvent = function () {
      var _this$props = _this.props,
          createAnalyticsEvent = _this$props.createAnalyticsEvent,
          activeView = _this$props.activeView,
          onInitialised = _this$props.onInitialised;

      if (activeView) {
        (0, _analytics.navigationUILoaded)(createAnalyticsEvent, {
          layer: activeView.type
        });

        if (onInitialised) {
          onInitialised();
        }
      }
    };

    return _this;
  }

  (0, _createClass2.default)(LayerInitialised, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.initialised) {
        this.fireInitialisedEvent();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.initialised) {
        this.fireInitialisedEvent();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return LayerInitialised;
}(_react.Component);

var _default = (0, _analyticsNext.withAnalyticsEvents)()(LayerInitialised);

exports.default = _default;
module.exports = exports.default;