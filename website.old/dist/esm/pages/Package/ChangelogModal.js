import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import styled from 'styled-components';
import Loadable from 'react-loadable';
import { Helmet } from 'react-helmet';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import Button from '@atlaskit/button';
import { gridSize, math } from '@atlaskit/theme';
import { FieldTextStateless as Input } from '@atlaskit/field-text';
import Modal, { ModalHeader as OgModalHeader } from '@atlaskit/modal-dialog';
import * as fs from '../../utils/fs';
import Loading from '../../components/Loading';
import Changelog, { NoMatch } from '../../components/ChangeLog';
import { packages } from '../../site';
import { divvyChangelog } from '../../utils/changelog'; // ==============================
// STYLES
// ==============================

var ModalBody = styled.div.withConfig({
  displayName: "ChangelogModal__ModalBody",
  componentId: "sc-1drcst6-0"
})(["\n  padding-bottom: ", "px;\n"], math.multiply(gridSize, 2));
var ModalHeader = styled(OgModalHeader).withConfig({
  displayName: "ChangelogModal__ModalHeader",
  componentId: "sc-1drcst6-1"
})(["\n  margin-left: 20px;\n  margin-right: 20px;\n  padding-left: 0;\n  padding-right: 0;\n"]);
var FieldWrapper = styled.div.withConfig({
  displayName: "ChangelogModal__FieldWrapper",
  componentId: "sc-1drcst6-2"
})(["\n  flex-grow: 1;\n  padding-right: ", "px;\n"], math.multiply(gridSize, 2));
var LogWrapper = styled.div.withConfig({
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
  return React.createElement(ModalHeader, {
    showKeyline: showKeyline
  }, React.createElement(FieldWrapper, null, React.createElement(Input, {
    key: "input",
    isInvalid: isInvalid,
    isLabelHidden: true,
    label: "Semver Range",
    onChange: onChange,
    placeholder: 'Semver Range: e.g. "> 1.0.6 <= 3.0.2"',
    shouldFitContainer: true,
    value: value
  })), React.createElement(Button, {
    appearance: "subtle",
    iconBefore: React.createElement(CloseIcon, {
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
  _inherits(ExamplesModal, _Component);

  function ExamplesModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ExamplesModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ExamplesModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
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
      return React.createElement(Header, {
        isInvalid: isInvalid,
        onChange: _this.handleChange,
        onClose: _this.close,
        showKeyline: true,
        value: range
      });
    };

    return _this;
  }

  _createClass(ExamplesModal, [{
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
      var found = fs.find(packages, function (file, currPath) {
        return currPath === filePath;
      });
      var _this$state2 = this.state,
          isInvalid = _this$state2.isInvalid,
          range = _this$state2.range;
      var Content = Loadable({
        loading: Loading,
        loader: function loader() {
          return found && found.contents();
        },
        render: function render(changelog) {
          return changelog ? React.createElement(Changelog, {
            changelog: divvyChangelog(changelog),
            range: getQualifiedRange(range),
            packageName: pkgId
          }) : React.createElement(NoMatch, null, "Invalid range; please try again.");
        }
      });
      return React.createElement(Modal, {
        autoFocus: true,
        header: this.header,
        height: 600,
        onClose: this.close,
        width: 640
      }, React.createElement(Helmet, null, React.createElement("title", null, "Changelog - ", fs.titleize(pkgId))), React.createElement(ModalBody, null, isInvalid ? React.createElement(NoMatch, null, "Invalid range \u2014 please try again.") : React.createElement(LogWrapper, null, React.createElement(Content, null))));
    }
  }]);

  return ExamplesModal;
}(Component);

export { ExamplesModal as default };