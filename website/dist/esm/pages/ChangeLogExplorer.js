import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from '../components/WrappedLink';
import BackIcon from '@atlaskit/icon/glyph/arrow-left';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import Loadable from '../components/WrappedLoader';
import Changelog, { NoMatch } from '../components/ChangeLog';
import Page from '../components/Page';
import * as fs from '../utils/fs';
import Loading from '../components/Loading';
import { divvyChangelog } from '../utils/changelog';
var packages = [];
/* eslint-disable react/no-unused-prop-types */

var ChangelogExplorer =
/*#__PURE__*/
function (_Component) {
  _inherits(ChangelogExplorer, _Component);

  function ChangelogExplorer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ChangelogExplorer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChangelogExplorer)).call.apply(_getPrototypeOf2, [this].concat(args)));
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

  _createClass(ChangelogExplorer, [{
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
      var Content = Loadable({
        loading: Loading,
        loader: function loader() {
          return found && found.contents();
        },
        render: function render(changelog) {
          return changelog ? React.createElement(Changelog, {
            changelog: divvyChangelog(changelog),
            range: range,
            packageName: pkgId
          }) : React.createElement(NoMatch, null, "Invalid range; please try again.");
        }
      });
      return React.createElement(Page, null, React.createElement(Back, {
        to: "/packages/".concat(groupId, "/").concat(pkgId)
      }), React.createElement("h1", null, "Changelog: ", pkgId), React.createElement(TextField, {
        autoFocus: true,
        isInvalid: isInvalid,
        label: "Semver Range",
        onChange: this.handleChange,
        placeholder: 'e.g. "> 1.0.6 <= 3.0.2"',
        shouldFitContainer: true,
        value: range
      }), isInvalid ? React.createElement(NoMatch, null, "Invalid range; please try again.") : React.createElement(LogWrapper, null, React.createElement(Content, null)));
    }
  }]);

  return ChangelogExplorer;
}(Component);

export { ChangelogExplorer as default };

var Back = function Back(_ref) {
  var children = _ref.children,
      to = _ref.to;
  return React.createElement(Button, {
    appearance: "link",
    component: Link,
    iconBefore: React.createElement(BackIcon, {
      label: "Back Icon",
      size: "small"
    }),
    spacing: "none",
    to: to
  }, React.createElement("span", {
    style: {
      paddingLeft: '0.5em'
    }
  }, children || 'Back to Docs'));
};

var LogWrapper = styled.div.withConfig({
  displayName: "ChangeLogExplorer__LogWrapper",
  componentId: "sc-7k42n7-0"
})(["\n  margin-top: 2em;\n"]);