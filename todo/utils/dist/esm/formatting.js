"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autolinker = void 0;

var _autolinker = _interopRequireDefault(require("autolinker"));

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var autolinker = new _autolinker.default({
  urls: true,
  email: true,
  hashtag: 'twitter',
  truncate: {
    length: 32,
    location: 'middle'
  },
  replaceFn: function replaceFn(match) {
    switch (match.getType()) {
      case 'url':
        {
          var urlParams = {};
          var url = match.getUrl();

          if (url.indexOf('?') >= 0) {
            urlParams = _queryString.default.parse(url.split('?')[1]);

            var _url$split = url.split('?');

            var _url$split2 = _slicedToArray(_url$split, 1);

            url = _url$split2[0];
          }

          urlParams.utm_source = 'uidu';
          urlParams.utm_medium = 'social';
          return "<a href=\"".concat(url, "?").concat(_queryString.default.stringify(urlParams), "\">").concat(match.getUrl(), "</a>");
        }

      case 'hashtag':
        return "<a href=\"/search?q=".concat(match.getHashtag(), "\">#").concat(match.getHashtag(), "</a>");

      default:
        return match;
    }
  }
});
exports.autolinker = autolinker;