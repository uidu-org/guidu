import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Children, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import semver from 'semver';
import styled, { css } from 'styled-components';
import { math, gridSize, colors, borderRadius } from '@atlaskit/theme';
var gutter = math.multiply(gridSize, 3);
var H3 = styled.h3.withConfig({
  displayName: "ChangeLog__H3",
  componentId: "m0qr1j-0"
})(["\n  color: ", ";\n  font-size: 18px;\n  font-weight: normal;\n"], colors.N200);

function getVersion(str) {
  return str.match(/^(\d+\.\d+\.\d+)/);
}

var _Heading = function Heading(_ref) {
  var children = _ref.children,
      packageName = _ref.packageName,
      href = _ref.href;
  var childrenArray = Children.toArray(children);
  var title = childrenArray[0];
  var version = getVersion(title.toString()); // wrap children if they can't be rendered e.g. array

  if (childrenArray.length !== 1) return React.createElement("div", null, children);
  if (typeof title !== 'string') return React.createElement("div", null, children);
  if (!version) return React.createElement("div", null, children);
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
  return React.createElement(H3, null, React.createElement("a", anchorProps, versionNumber), versionDate ? React.createElement("small", null, " \u2014 ", versionDate) : null);
};

var LogItem = styled.div.withConfig({
  displayName: "ChangeLog__LogItem",
  componentId: "m0qr1j-1"
})(["\n  margin-bottom: 1em;\n\n  ", ";\n"], function (p) {
  return p.major ? css(["\n          &:not(:first-child) {\n            border-top: 2px solid ", ";\n            margin-top: ", "px;\n            padding-top: ", "px;\n          }\n        "], colors.N30, gutter, gutter) : null;
});
export var NoMatch = styled.div.withConfig({
  displayName: "ChangeLog__NoMatch",
  componentId: "m0qr1j-2"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", "px;\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-top: ", "px;\n  min-height: 120px;\n"], colors.N20, borderRadius, colors.N200, gutter);

var ChangeLog =
/*#__PURE__*/
function (_Component) {
  _inherits(ChangeLog, _Component);

  function ChangeLog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ChangeLog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChangeLog)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.props = void 0;
    return _this;
  }

  _createClass(ChangeLog, [{
    key: "render",
    // eslint-disable-line react/sort-comp
    value: function render() {
      var _this$props = this.props,
          changelog = _this$props.changelog,
          packageName = _this$props.packageName,
          range = _this$props.range;
      var logs = range ? changelog.filter(function (e) {
        return semver.satisfies(e.version, range);
      }) : changelog;
      var currentMajor = 0;
      return React.createElement("div", null, !logs.length ? React.createElement(NoMatch, null, "No matching versions \u2014 please try again.") : logs.map(function (v, i) {
        var major = v.version.substr(0, 1);
        var majorHasChanged = currentMajor !== major;
        currentMajor = major; // In case of blank / empty changelogs, the default commit points to mk-2

        var href = "https://bitbucket.org/atlassian/".concat(v.repository, "/commits/tag/%40atlaskit%2F").concat(packageName, "%40").concat(v.version);
        return (// Version is not unique enough due to untidy changelogs.

          /* eslint-disable react/no-array-index-key */
          React.createElement(LogItem, {
            key: "".concat(v.version, "-").concat(i),
            major: majorHasChanged
          }, React.createElement(ReactMarkdown, {
            escapeHtml: true,
            source: v.md,
            renderers: {
              Heading: function Heading(props) {
                return React.createElement(_Heading, _extends({
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
}(Component);

export { ChangeLog as default };