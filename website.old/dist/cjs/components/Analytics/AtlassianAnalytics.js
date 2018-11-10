"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var AtlassianAnalyticsClient =
/*#__PURE__*/
function () {
  function AtlassianAnalyticsClient(options) {
    (0, _classCallCheck2.default)(this, AtlassianAnalyticsClient);
    this.payload = [];
    this.version = options.version;
  }

  (0, _createClass2.default)(AtlassianAnalyticsClient, [{
    key: "addEvent",
    value: function addEvent(eventName) {
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if ( // Make sure our JSON object is flat
      Object.values(properties).some(function (key) {
        return (0, _typeof2.default)(properties[key]) === 'object';
      })) {
        console.warn('Analytic properties are expected to be a flat JSON object');
      }

      this.payload.push({
        name: eventName,
        properties: properties
      });
      return this.payload;
    }
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _this = this;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", fetch('https://analytics.atlassian.com/analytics/events', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    events: this.payload.map(function (event) {
                      return {
                        name: event.name,
                        properties: event.properties,
                        server: 'development',
                        //Set by webpack
                        product: 'atlaskit',
                        subproduct: 'website',
                        version: _this.version,
                        user: '-',
                        serverTime: Date.now()
                      };
                    })
                  })
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function send() {
        return _send.apply(this, arguments);
      };
    }()
  }]);
  return AtlassianAnalyticsClient;
}();

exports.default = AtlassianAnalyticsClient;
module.exports = exports.default;