"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _analyticsListeners = _interopRequireDefault(require("@atlaskit/analytics-listeners"));

var _FeatureFlag = _interopRequireDefault(require("../FeatureFlag"));

var _GoogleAnalyticsListener = _interopRequireDefault(require("./GoogleAnalyticsListener"));

// AK-4967 - replace with real implementation from analytics-web-client
var mockAnalyticsClient = {
  sendUIEvent: function sendUIEvent(e) {
    return console.log('sendUIEvent', e);
  },
  sendOperationalEvent: function sendOperationalEvent(e) {
    return console.log('sendOperationalEvent', e);
  },
  sendTrackEvent: function sendTrackEvent(e) {
    return console.log('sendTrackEvent', e);
  },
  sendScreenEvent: function sendScreenEvent(e) {
    return console.log('sendScreenEvent', e);
  }
};

var AnalyticsListeners = function AnalyticsListeners(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_GoogleAnalyticsListener.default, null, _react.default.createElement(_FeatureFlag.default, {
    name: "send-analytics-to-pipeline"
  }, function (yes) {
    return yes ? _react.default.createElement(_analyticsListeners.default, {
      client: mockAnalyticsClient
    }, children) : children;
  }));
};

var _default = AnalyticsListeners;
exports.default = _default;
module.exports = exports.default;