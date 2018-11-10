"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoMatch = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _semver = _interopRequireDefault(require("semver"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _theme = require("@atlaskit/theme");

var gutter = _theme.math.multiply(_theme.gridSize, 3);

var H3 = _styledComponents.default.h3.withConfig({
  displayName: "ChangeLog__H3",
  componentId: "m0qr1j-0"
})(["\n  color: ", ";\n  font-size: 18px;\n  font-weight: normal;\n"], _theme.colors.N200);

function getVersion(str) {
  return str.match(/^(\d+\.\d+\.\d+)/);
}

var _Heading = function Heading(_ref) {
  var children = _ref.children,
      packageName = _ref.packageName,
      href = _ref.href;

  var childrenArray = _react.Children.toArray(children);

  var title = childrenArray[0];
  var version = getVersion(title.toString()); // wrap children if they can't be rendered e.g. array

  if (childrenArray.length !== 1) return _react.default.createElement("div", null, children);
  if (typeof title !== 'string') return _react.default.createElement("div", null, children);
  if (!version) return _react.default.createElement("div", null, children);
  var versionNumber = version[1];
  var versionDate = version[2];
  var anchorProps = {
    href: href,
    rel: 'noopener noreferrer',
    style: {
      fontWeight: 500
    },
    target: '_blank'
  };
  return _react.default.createElement(H3, null, _react.default.createElement("a", anchorProps, versionNumber), versionDate ? _react.default.createElement("small", null, " \u2014 ", versionDate) : null);
};

var LogItem = _styledComponents.default.div.withConfig({
  displayName: "ChangeLog__LogItem",
  componentId: "m0qr1j-1"
})(["\n  margin-bottom: 1em;\n\n  ", ";\n"], function (p) {
  return p.major ? (0, _styledComponents.css)(["\n          &:not(:first-child) {\n            border-top: 2px solid ", ";\n            margin-top: ", "px;\n            padding-top: ", "px;\n          }\n        "], _theme.colors.N30, gutter, gutter) : null;
});

var NoMatch = _styledComponents.default.div.withConfig({
  displayName: "ChangeLog__NoMatch",
  componentId: "m0qr1j-2"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", "px;\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-top: ", "px;\n  min-height: 120px;\n"], _theme.colors.N20, _theme.borderRadius, _theme.colors.N200, gutter);

exports.NoMatch = NoMatch;

var ChangeLog =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ChangeLog, _Component);

  function ChangeLog() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ChangeLog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ChangeLog)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.props = void 0;
    return _this;
  }

  (0, _createClass2.default)(ChangeLog, [{
    key: "render",
    // eslint-disable-line react/sort-comp
    value: function render() {
      var _this$props = this.props,
          changelog = _this$props.changelog,
          packageName = _this$props.packageName,
          range = _this$props.range;
      var logs = range ? changelog.filter(function (e) {
        return _semver.default.satisfies(e.version, range);
      }) : changelog;
      var currentMajor = 0;
      return _react.default.createElement("div", null, !logs.length ? _react.default.createElement(NoMatch, null, "No matching versions \u2014 please try again.") : logs.map(function (v, i) {
        var major = v.version.substr(0, 1);
        var majorHasChanged = currentMajor !== major;
        currentMajor = major; // In case of blank / empty changelogs, the default commit points to mk-2

        var href = "https://bitbucket.org/atlassian/".concat(v.repository, "/commits/tag/%40atlaskit%2F").concat(packageName, "%40").concat(v.version);
        return (// Version is not unique enough due to untidy changelogs.

          /* eslint-disable react/no-array-index-key */
          _react.default.createElement(LogItem, {
            key: "".concat(v.version, "-").concat(i),
            major: majorHasChanged
          }, _react.default.createElement(_reactMarkdown.default, {
            escapeHtml: true,
            source: v.md,
            renderers: {
              Heading: function Heading(props) {
                return _react.default.createElement(_Heading, (0, _extends2.default)({
                  packageName: packageName,
                  href: href
                }, props));
              }
            }
          }))
        );
      }));
    }
  }]);
  return ChangeLog;
}(_react.Component);

exports.default = ChangeLog;