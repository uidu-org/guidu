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

var _reactLoadable = _interopRequireDefault(require("react-loadable"));

var _reactHelmet = require("react-helmet");

var _cross = _interopRequireDefault(require("@atlaskit/icon/glyph/cross"));

var _button = _interopRequireDefault(require("@atlaskit/button"));

var _theme = require("@atlaskit/theme");

var _fieldText = require("@atlaskit/field-text");

var _modalDialog = _interopRequireWildcard(require("@atlaskit/modal-dialog"));

var fs = _interopRequireWildcard(require("../../utils/fs"));

var _Loading = _interopRequireDefault(require("../../components/Loading"));

var _ChangeLog = _interopRequireWildcard(require("../../components/ChangeLog"));

var _site = require("../../site");

var _changelog = require("../../utils/changelog");

// ==============================
// STYLES
// ==============================
var ModalBody = _styledComponents.default.div.withConfig({
  displayName: "ChangelogModal__ModalBody",
  componentId: "sc-1drcst6-0"
})(["\n  padding-bottom: ", "px;\n"], _theme.math.multiply(_theme.gridSize, 2));

var ModalHeader = (0, _styledComponents.default)(_modalDialog.ModalHeader).withConfig({
  displayName: "ChangelogModal__ModalHeader",
  componentId: "sc-1drcst6-1"
})(["\n  margin-left: 20px;\n  margin-right: 20px;\n  padding-left: 0;\n  padding-right: 0;\n"]);

var FieldWrapper = _styledComponents.default.div.withConfig({
  displayName: "ChangelogModal__FieldWrapper",
  componentId: "sc-1drcst6-2"
})(["\n  flex-grow: 1;\n  padding-right: ", "px;\n"], _theme.math.multiply(_theme.gridSize, 2));

var LogWrapper = _styledComponents.default.div.withConfig({
  displayName: "ChangelogModal__LogWrapper",
  componentId: "sc-1drcst6-3"
})(["\n  margin-top: 2em;\n"]); // ==============================
// END STYLES
// ==============================


var Header = function Header(_ref) {
  var isInvalid = _ref.isInvalid,
      onChange = _ref.onChange,
      onClose = _ref.onClose,
      showKeyline = _ref.showKeyline,
      value = _ref.value;
  return _react.default.createElement(ModalHeader, {
    showKeyline: showKeyline
  }, _react.default.createElement(FieldWrapper, null, _react.default.createElement(_fieldText.FieldTextStateless, {
    key: "input",
    isInvalid: isInvalid,
    isLabelHidden: true,
    label: "Semver Range",
    onChange: onChange,
    placeholder: 'Semver Range: e.g. "> 1.0.6 <= 3.0.2"',
    shouldFitContainer: true,
    value: value
  })), _react.default.createElement(_button.default, {
    appearance: "subtle",
    iconBefore: _react.default.createElement(_cross.default, {
      label: "Close Modal"
    }),
    onClick: onClose
  }));
}; // ==============================
// END STYLES
// ==============================
// Ensure the string ends with a number:
// avoids unsatisfied semver range, which causes a flickering "no match" message
// as the user is typing


function getQualifiedRange(str) {
  if (/[0-9]$/.test(str)) return str;
  return '';
}

var ExamplesModal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ExamplesModal, _Component);

  function ExamplesModal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ExamplesModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ExamplesModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isInvalid: false,
      range: ''
    };

    _this.handleChange = function (event) {
      var _this$props$match$par = _this.props.match.params,
          groupId = _this$props$match$par.groupId,
          pkgId = _this$props$match$par.pkgId;
      var target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      var range = target.value;
      var isInvalid = /[a-z]/gi.test(range);
      var path = "/packages/".concat(groupId, "/").concat(pkgId, "/changelog/").concat(encodeURI(range));

      _this.props.history.replace(path);

      _this.setState({
        isInvalid: isInvalid,
        range: range
      });
    };

    _this.close = function (event) {
      if (event) event.stopPropagation();
      var _this$props$match$par2 = _this.props.match.params,
          groupId = _this$props$match$par2.groupId,
          pkgId = _this$props$match$par2.pkgId;
      var url = "/packages/".concat(groupId, "/").concat(pkgId);

      _this.props.history.push(url);
    };

    _this.header = function () {
      var _this$state = _this.state,
          isInvalid = _this$state.isInvalid,
          range = _this$state.range;
      return _react.default.createElement(Header, {
        isInvalid: isInvalid,
        onChange: _this.handleChange,
        onClose: _this.close,
        showKeyline: true,
        value: range
      });
    };

    return _this;
  }

  (0, _createClass2.default)(ExamplesModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var semver = this.props.match.params.semver;
      if (semver) this.setState({
        range: decodeURI(String(this.props.match.params.semver))
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$match$par3 = this.props.match.params,
          groupId = _this$props$match$par3.groupId,
          pkgId = _this$props$match$par3.pkgId;
      var filePath = "packages/".concat(groupId, "/").concat(pkgId, "/CHANGELOG.md");
      var found = fs.find(_site.packages, function (file, currPath) {
        return currPath === filePath;
      });
      var _this$state2 = this.state,
          isInvalid = _this$state2.isInvalid,
          range = _this$state2.range;
      var Content = (0, _reactLoadable.default)({
        loading: _Loading.default,
        loader: function loader() {
          return found && found.contents();
        },
        render: function render(changelog) {
          return changelog ? _react.default.createElement(_ChangeLog.default, {
            changelog: (0, _changelog.divvyChangelog)(changelog),
            range: getQualifiedRange(range),
            packageName: pkgId
          }) : _react.default.createElement(_ChangeLog.NoMatch, null, "Invalid range; please try again.");
        }
      });
      return _react.default.createElement(_modalDialog.default, {
        autoFocus: true,
        header: this.header,
        height: 600,
        onClose: this.close,
        width: 640
      }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, "Changelog - ", fs.titleize(pkgId))), _react.default.createElement(ModalBody, null, isInvalid ? _react.default.createElement(_ChangeLog.NoMatch, null, "Invalid range \u2014 please try again.") : _react.default.createElement(LogWrapper, null, _react.default.createElement(Content, null))));
    }
  }]);
  return ExamplesModal;
}(_react.Component);

exports.default = ExamplesModal;
module.exports = exports.default;