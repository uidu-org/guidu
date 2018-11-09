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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WrappedLink = require("../components/WrappedLink");

var _arrowLeft = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-left"));

var _fieldText = _interopRequireDefault(require("@atlaskit/field-text"));

var _button = _interopRequireDefault(require("@atlaskit/button"));

var _WrappedLoader = _interopRequireDefault(require("../components/WrappedLoader"));

var _ChangeLog = _interopRequireWildcard(require("../components/ChangeLog"));

var _Page = _interopRequireDefault(require("../components/Page"));

var fs = _interopRequireWildcard(require("../utils/fs"));

var _Loading = _interopRequireDefault(require("../components/Loading"));

var _changelog = require("../utils/changelog");

var packages = [];
/* eslint-disable react/no-unused-prop-types */

var ChangelogExplorer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ChangelogExplorer, _Component);

  function ChangelogExplorer() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ChangelogExplorer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ChangelogExplorer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.props = void 0;
    _this.state = {
      isInvalid: false,
      range: ''
    };

    _this.handleChange = function (e) {
      var _this$props$match$par = _this.props.match.params,
          groupId = _this$props$match$par.groupId,
          pkgId = _this$props$match$par.pkgId;
      var range = e.target.value;

      _this.props.history.replace("/changelog/".concat(groupId, "/").concat(pkgId, "/").concat(encodeURI(range)));

      var isInvalid = /[a-z]/gi.test(range);

      _this.setState({
        isInvalid: isInvalid,
        range: range
      });
    };

    return _this;
  }

  (0, _createClass2.default)(ChangelogExplorer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var semver = this.props.match.params.semver;
      if (semver) this.setState({
        range: decodeURI(String(this.props.match.params.semver))
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$match$par2 = this.props.match.params,
          groupId = _this$props$match$par2.groupId,
          pkgId = _this$props$match$par2.pkgId;
      var filePath = "packages/".concat(groupId, "/").concat(pkgId, "/CHANGELOG.md");
      var found = fs.find(packages, function (file, currPath) {
        return currPath === filePath;
      });
      var _this$state = this.state,
          isInvalid = _this$state.isInvalid,
          range = _this$state.range;
      var Content = (0, _WrappedLoader.default)({
        loading: _Loading.default,
        loader: function loader() {
          return found && found.contents();
        },
        render: function render(changelog) {
          return changelog ? _react.default.createElement(_ChangeLog.default, {
            changelog: (0, _changelog.divvyChangelog)(changelog),
            range: range,
            packageName: pkgId
          }) : _react.default.createElement(_ChangeLog.NoMatch, null, "Invalid range; please try again.");
        }
      });
      return _react.default.createElement(_Page.default, null, _react.default.createElement(Back, {
        to: "/packages/".concat(groupId, "/").concat(pkgId)
      }), _react.default.createElement("h1", null, "Changelog: ", pkgId), _react.default.createElement(_fieldText.default, {
        autoFocus: true,
        isInvalid: isInvalid,
        label: "Semver Range",
        onChange: this.handleChange,
        placeholder: 'e.g. "> 1.0.6 <= 3.0.2"',
        shouldFitContainer: true,
        value: range
      }), isInvalid ? _react.default.createElement(_ChangeLog.NoMatch, null, "Invalid range; please try again.") : _react.default.createElement(LogWrapper, null, _react.default.createElement(Content, null)));
    }
  }]);
  return ChangelogExplorer;
}(_react.Component);

exports.default = ChangelogExplorer;

var Back = function Back(_ref) {
  var children = _ref.children,
      to = _ref.to;
  return _react.default.createElement(_button.default, {
    appearance: "link",
    component: _WrappedLink.Link,
    iconBefore: _react.default.createElement(_arrowLeft.default, {
      label: "Back Icon",
      size: "small"
    }),
    spacing: "none",
    to: to
  }, _react.default.createElement("span", {
    style: {
      paddingLeft: '0.5em'
    }
  }, children || 'Back to Docs'));
};

var LogWrapper = _styledComponents.default.div.withConfig({
  displayName: "ChangeLogExplorer__LogWrapper",
  componentId: "sc-7k42n7-0"
})(["\n  margin-top: 2em;\n"]);

module.exports = exports.default;