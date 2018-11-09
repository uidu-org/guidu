"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoadData;
exports.NoDocs = exports.Sep = exports.ButtonGroup = exports.Intro = exports.Title = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _WrappedLink = require("../../components/WrappedLink");

var _WrappedLoader = _interopRequireDefault(require("../../components/WrappedLoader"));

var _reactHelmet = require("react-helmet");

var _theme = require("@atlaskit/theme");

var _button = _interopRequireDefault(require("@atlaskit/button"));

var _screen = _interopRequireDefault(require("@atlaskit/icon/glyph/screen"));

var _logo = require("@atlaskit/logo");

var _Loading = _interopRequireDefault(require("../../components/Loading"));

var _Page = _interopRequireDefault(require("../../components/Page"));

var _FourOhFour = _interopRequireDefault(require("../FourOhFour"));

var _MetaData = _interopRequireDefault(require("./MetaData"));

var _LatestChangelog = _interopRequireDefault(require("./LatestChangelog"));

var _errors = require("../../utils/errors");

var _fsOperations = _interopRequireDefault(require("./utils/fsOperations"));

var Title = _styledComponents.default.div.withConfig({
  displayName: "Package__Title",
  componentId: "ilzdp2-0"
})(["\n  display: flex;\n\n  h1 {\n    flex-grow: 1;\n  }\n"]);

exports.Title = Title;

var Intro = _styledComponents.default.p.withConfig({
  displayName: "Package__Intro",
  componentId: "ilzdp2-1"
})(["\n  color: ", ";\n  font-size: ", "px;\n  font-weight: 300;\n  line-height: 1.4em;\n"], _theme.colors.heading, _theme.math.multiply(_theme.gridSize, 2));

exports.Intro = Intro;

var ButtonGroup = _styledComponents.default.div.withConfig({
  displayName: "Package__ButtonGroup",
  componentId: "ilzdp2-2"
})(["\n  display: inline-flex;\n  margin: 0 -2px;\n\n  > * {\n    flex: 1 0 auto;\n    margin: 0 2px !important;\n  }\n"]);

exports.ButtonGroup = ButtonGroup;

var Sep = _styledComponents.default.hr.withConfig({
  displayName: "Package__Sep",
  componentId: "ilzdp2-3"
})(["\n  border: none;\n  border-top: 2px solid #ebecf0;\n  margin-bottom: ", "px;\n  margin-top: ", "px;\n\n  @media (min-width: 780px) {\n    margin-bottom: ", "px;\n    margin-top: ", "px;\n  }\n"], _theme.math.multiply(_theme.gridSize, 1.5), _theme.math.multiply(_theme.gridSize, 1.5), _theme.math.multiply(_theme.gridSize, 3), _theme.math.multiply(_theme.gridSize, 3));

exports.Sep = Sep;

var NoDocs = function NoDocs(props) {
  return _react.default.createElement("div", null, "Component \"", props.name, "\" doesn't have any documentation.");
};

exports.NoDocs = NoDocs;
var initialState = {
  changelog: [],
  doc: null,
  examples: null,
  missing: false,
  pkg: null
};

function getExamplesPaths(groupId, pkgId, examples) {
  if (!examples || !examples.length) return {};
  var regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  var filtered = examples.map(function (a) {
    return a.id;
  }).filter(function (id) {
    return id.match(regex);
  });
  var res = filtered[0];
  if (!res) return {};
  return {// examplePath: `/examples/${groupId}/${pkgId}/${fs.normalize(res)}`,
    // exampleModalPath: `/packages/${groupId}/${pkgId}/example/${fs.normalize(
    //   res,
    // )}`,
  };
}

function LoadData(_ref) {
  var match = _ref.match;
  var _match$params = match.params,
      groupId = _match$params.groupId,
      pkgId = _match$params.pkgId;
  var Content = (0, _WrappedLoader.default)({
    loading: function loading() {
      return _react.default.createElement(_Page.default, null, _react.default.createElement(_Loading.default, null));
    },
    loader: function loader() {
      return (0, _fsOperations.default)('components', pkgId).catch(function (error) {
        return console.log(error) || {
          error: error
        };
      });
    },
    render: function render(props) {
      console.log(props);
      return props.missing || props.error ? _react.default.createElement(_FourOhFour.default, null) : _react.default.createElement(Package, (0, _extends2.default)({}, props, {
        pkgId: pkgId,
        groupId: groupId,
        urlIsExactMatch: match.isExact
      }));
    }
  });
  return _react.default.createElement(Content, null);
}

var Package =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Package, _Component);

  function Package() {
    (0, _classCallCheck2.default)(this, Package);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Package).apply(this, arguments));
  }

  (0, _createClass2.default)(Package, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          urlIsExactMatch = _this$props.urlIsExactMatch,
          groupId = _this$props.groupId,
          pkgId = _this$props.pkgId,
          pkg = _this$props.pkg,
          pkgInfo = _this$props.pkgInfo,
          doc = _this$props.doc,
          changelog = _this$props.changelog,
          examples = _this$props.examples;

      var _getExamplesPaths = getExamplesPaths(groupId, pkgId, examples),
          examplePath = _getExamplesPaths.examplePath,
          exampleModalPath = _getExamplesPaths.exampleModalPath;

      var title = pkgInfo.title;
      return _react.default.createElement(_Page.default, null, urlIsExactMatch && _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title, " package")), _react.default.createElement(Title, null, _react.default.createElement("h1", null, title), examplePath && _react.default.createElement(ButtonGroup, null, _react.default.createElement(_button.default, {
        component: _WrappedLink.Link,
        iconBefore: _react.default.createElement(_screen.default, {
          label: "Examples Icon"
        }),
        to: examplePath
      }), _react.default.createElement(_button.default, {
        component: _WrappedLink.Link,
        to: exampleModalPath
      }, "Examples"), pkg['atlaskit:designLink'] && _react.default.createElement(_button.default, {
        iconBefore: _react.default.createElement(_logo.AtlassianIcon, {
          size: "small"
        }),
        href: pkg['atlaskit:designLink']
      }, "Design docs"))), _react.default.createElement(Intro, null, pkg.description), _react.default.createElement(_MetaData.default, {
        packageName: pkg.name,
        packageSrc: "https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/".concat(groupId, "/").concat(pkgId)
      }), _react.default.createElement(_LatestChangelog.default, {
        changelog: changelog,
        pkgId: pkgId,
        groupId: groupId
      }), _react.default.createElement(Sep, null), doc || _react.default.createElement(NoDocs, {
        name: pkgId
      }));
    }
  }]);
  return Package;
}(_react.Component);