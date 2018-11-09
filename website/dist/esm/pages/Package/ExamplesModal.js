import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Link } from '../../components/WrappedLink';
import { Helmet } from 'react-helmet';
import CodeIcon from '@atlaskit/icon/glyph/code';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import ScreenIcon from '@atlaskit/icon/glyph/screen';
import LinkIcon from '@atlaskit/icon/glyph/link';
import Button, { ButtonGroup } from '@atlaskit/button';
import { FlagGroup } from '@atlaskit/flag';
import Tooltip from '@atlaskit/tooltip';
import Modal, { ModalBody as Body, ModalHeader as OgModalHeader, ModalTitle } from '@atlaskit/modal-dialog';
import { colors, elevation, gridSize } from '@atlaskit/theme';
import * as fs from '../../utils/fs';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import { getConfig } from '../../site';
import CodeSandbox from './CodeSandbox';
import CodeSandboxLogo from './CodeSandboxLogo'; // ==============================
// PAGE
// ==============================

var Content = styled.div.withConfig({
  displayName: "ExamplesModal__Content",
  componentId: "pok8fv-0"
})(["\n  flex: 1 1 auto;\n"]);
var CodeContainer = styled.div.withConfig({
  displayName: "ExamplesModal__CodeContainer",
  componentId: "pok8fv-1"
})([""]);
var ErrorMessage = styled.div.withConfig({
  displayName: "ExamplesModal__ErrorMessage",
  componentId: "pok8fv-2"
})(["\n  background-color: ", ";\n  color: white;\n  font-size: 120%;\n  padding: 1em;\n"], colors.R400); // ==============================
// MODAL
// ==============================

var ModalBody = styled(Body).withConfig({
  displayName: "ExamplesModal__ModalBody",
  componentId: "pok8fv-3"
})(["\n  display: flex;\n  flex-direction: column;\n"]);
var ContentBody = styled.div.withConfig({
  displayName: "ExamplesModal__ContentBody",
  componentId: "pok8fv-4"
})(["\n  display: flex;\n  flex: 1;\n  padding-bottom: 17px;\n"]);
var ModalContent = styled.div.withConfig({
  displayName: "ExamplesModal__ModalContent",
  componentId: "pok8fv-5"
})(["\n  flex: 1 1 auto;\n  min-height: 240px;\n  padding: ", "px;\n  ", ";\n"], gridSize() * 2, elevation.e200);
var ModalHeader = styled(OgModalHeader).withConfig({
  displayName: "ExamplesModal__ModalHeader",
  componentId: "pok8fv-6"
})(["\n  margin-left: ", "px;\n  margin-right: ", "px;\n  padding-left: 0;\n  padding-right: 0;\n"], gridSize() * 2.5, gridSize() * 2.5);
var ModalActions = styled.div.withConfig({
  displayName: "ExamplesModal__ModalActions",
  componentId: "pok8fv-7"
})(["\n  display: flex;\n"]); // ==============================
// NAVIGATION
// ==============================

var keylineMask = css(["\n  background-color: ", ";\n  margin-top: -2px;\n  padding-top: 2px;\n"], colors.background);
var Nav = styled.nav.withConfig({
  displayName: "ExamplesModal__Nav",
  componentId: "pok8fv-8"
})(["\n  ", " flex-shrink: 0;\n  margin-right: ", "px;\n  position: relative;\n  width: 240px;\n"], keylineMask, gridSize() * 2);
var NavInner = styled.div.withConfig({
  displayName: "ExamplesModal__NavInner",
  componentId: "pok8fv-9"
})(["\n  max-height: 100%;\n  overflow-y: auto;\n  padding: 2px;\n\n  /* Not ideal to be overriding AkButton styles, but we don't have a link list component */\n  a {\n    margin: 2px 0 0 0;\n    width: 100%;\n  }\n"]);

function ExampleNavigation(_ref) {
  var examples = _ref.examples,
      exampleId = _ref.exampleId,
      onExampleSelected = _ref.onExampleSelected;
  var regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  return React.createElement(Nav, null, React.createElement(NavInner, null, examples ? fs.flatMap(examples, function (file, filePath) {
    return file.id.match(regex) && React.createElement(Button, {
      isSelected: file.id === exampleId,
      key: file.id,
      appearance: "subtle",
      spacing: "compact",
      href: fs.normalize(filePath.replace('examples/', '')),
      onClick: function onClick(event) {
        event.preventDefault();
        onExampleSelected(fs.normalize(filePath.replace('examples/', '')));
      }
    }, fs.titleize(file.id));
  }) : React.createElement("div", null, "No Examples")));
}

function toUrl(groupId, packageId, exampleId) {
  var url;

  if (!groupId) {
    url = "/packages";
  } else if (!packageId) {
    url = "/packages/".concat(groupId);
  } else if (!exampleId) {
    url = "/packages/".concat(groupId, "/").concat(packageId);
  } else {
    url = "/packages/".concat(groupId, "/").concat(packageId, "/example/").concat(fs.normalize(exampleId));
  }

  return url;
}

function toExampleUrl(groupId, packageId, exampleId) {
  var url;

  if (!groupId) {
    url = "/examples";
  } else if (!packageId) {
    url = "/examples/".concat(groupId);
  } else if (!exampleId) {
    url = "/examples/".concat(groupId, "/").concat(packageId);
  } else {
    url = "/examples/".concat(groupId, "/").concat(packageId, "/").concat(fs.normalize(exampleId));
  }

  return url;
}

var ModalHeaderComp = function ModalHeaderComp(_ref2) {
  var showKeyline = _ref2.showKeyline,
      packageId = _ref2.packageId,
      example = _ref2.example,
      examples = _ref2.examples,
      groupId = _ref2.groupId,
      pkgJSON = _ref2.pkgJSON,
      displayCode = _ref2.displayCode,
      exampleId = _ref2.exampleId,
      loaderUrl = _ref2.loaderUrl,
      onCodeToggle = _ref2.onCodeToggle,
      close = _ref2.close;
  return React.createElement(ModalHeader, {
    showKeyline: showKeyline
  }, React.createElement(ModalTitle, null, fs.titleize(packageId), " Examples"), React.createElement(ModalActions, null, React.createElement(ButtonGroup, null, React.createElement(CodeSandbox, {
    example: example,
    examples: examples,
    groupId: groupId,
    packageId: packageId,
    pkgJSON: pkgJSON,
    loadingButton: function loadingButton() {
      return React.createElement(Button, {
        type: "submit",
        isDisabled: true,
        iconBefore: React.createElement(CodeSandboxLogo, null)
      }, "Loading...");
    },
    deployButton: function deployButton(_ref3) {
      var isDisabled = _ref3.isDisabled,
          error = _ref3.error;
      return React.createElement(Button, {
        type: "submit",
        isDisabled: isDisabled,
        iconBefore: React.createElement(CodeSandboxLogo, null)
      }, error ? error.name : 'Sandbox');
    }
  }), React.createElement(Button, {
    iconBefore: React.createElement(CodeIcon, {
      label: "Toggle code snippet"
    }),
    onClick: onCodeToggle,
    isSelected: displayCode,
    title: displayCode ? 'Hide Source' : 'Show Source'
  }, "Source"), React.createElement(Tooltip, {
    content: "Fullscreen",
    position: "bottom"
  }, React.createElement(Button, {
    appearance: "subtle",
    component: Link,
    iconBefore: React.createElement(ScreenIcon, {
      label: "Screen Icon"
    }),
    to: toExampleUrl(groupId, packageId, exampleId)
  })), React.createElement(Tooltip, {
    content: "Isolated View",
    position: "bottom"
  }, React.createElement(Button, {
    appearance: "subtle",
    component: 'a',
    iconBefore: React.createElement(LinkIcon, {
      label: "Link Icon"
    }),
    href: loaderUrl,
    target: '_blank'
  })), React.createElement(Tooltip, {
    content: "Close",
    position: "bottom"
  }, React.createElement(Button, {
    appearance: "subtle",
    iconBefore: React.createElement(CloseIcon, {
      label: "Close Modal"
    }),
    onClick: close
  })))));
};

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
      displayCode: false,
      flags: {},
      loadingSandbox: false
    };

    _this.onPackageSelected = function (selected) {
      var _selected$item$value$ = selected.item.value.split('/'),
          _selected$item$value$2 = _slicedToArray(_selected$item$value$, 2),
          groupId = _selected$item$value$2[0],
          packageId = _selected$item$value$2[1];

      _this.updateSelected(groupId, packageId);
    };

    _this.onExampleSelected = function (selected) {
      _this.updateSelected(_this.props.match.params.groupId, _this.props.match.params.pkgId, selected);
    };

    _this.onCodeToggle = function () {
      return _this.setState(function (state) {
        return {
          displayCode: !state.displayCode
        };
      });
    };

    _this.close = function (event) {
      if (event) event.stopPropagation();
      var params = _this.props.match.params;

      var _packageResolver = packageResolver(params.groupId, params.pkgId, params.exampleId),
          packageId = _packageResolver.packageId,
          groupId = _packageResolver.groupId;

      var url = "/packages/".concat(groupId, "/").concat(packageId);

      _this.context.router.history.push(url);
    };

    return _this;
  }

  _createClass(ExamplesModal, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        theme: 'dark'
      };
    }
  }, {
    key: "updateSelected",
    value: function updateSelected(groupId, packageId, exampleId) {
      var resolved = packageResolver(groupId, packageId, exampleId);
      var url = toUrl(resolved.groupId, resolved.packageId, resolved.exampleId);
      this.context.router.history.push(url);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _packageResolver2 = packageResolver(this.props.match.params.groupId, this.props.match.params.pkgId, this.props.match.params.exampleId),
          hasChanged = _packageResolver2.hasChanged,
          groups = _packageResolver2.groups,
          examples = _packageResolver2.examples,
          packageId = _packageResolver2.packageId,
          groupId = _packageResolver2.groupId,
          exampleId = _packageResolver2.exampleId;

      var example;

      if (exampleId && examples) {
        example = fs.getById(fs.getFiles(examples.children), exampleId);
      }

      var displayCode = this.state.displayCode;
      var pkgJSON = getConfig(groupId, packageId).config;
      var loaderUrl = getLoaderUrl(groupId, packageId, this.props.match.params.exampleId);

      if (hasChanged) {
        return React.createElement(Redirect, {
          to: toUrl(groupId, packageId, exampleId)
        });
      }

      return React.createElement(Modal, {
        autoFocus: false,
        body: ModalBody,
        header: function header(_ref4) {
          var showKeyline = _ref4.showKeyline;
          return React.createElement(ModalHeaderComp, {
            showKeyline: showKeyline,
            packageId: packageId,
            example: example,
            examples: examples,
            exampleId: exampleId,
            groupId: groupId,
            pkgJSON: pkgJSON,
            displayCode: displayCode,
            loaderUrl: loaderUrl,
            onCodeToggle: _this2.onCodeToggle,
            close: _this2.close
          });
        },
        height: "100%",
        onClose: this.close,
        width: 1180
      }, React.createElement(Helmet, null, React.createElement("title", null, "Example - ", fs.titleize(exampleId), " - ", fs.titleize(packageId), " -", ' ')), React.createElement(ContentBody, null, React.createElement(ExampleNavigation, {
        groupId: groupId,
        packageId: packageId,
        exampleId: exampleId,
        groups: groups,
        examples: examples,
        onPackageSelected: this.onPackageSelected,
        onExampleSelected: this.onExampleSelected,
        loadingSandbox: this.state.loadingSandbox
      }), React.createElement(ModalContent, null, examples && exampleId && loaderUrl ? React.createElement(ExampleDisplay, {
        displayCode: displayCode,
        example: fs.getById(fs.getFiles(examples.children), exampleId),
        name: pkgJSON.name,
        src: loaderUrl
      }, function (ExampleCode, ExampleComponent, displayCode) {
        if (displayCode) {
          return React.createElement(Content, null, React.createElement(CodeContainer, null, React.createElement(ExampleCode, null)));
        }

        return React.createElement(ExampleComponent, null);
      }) : React.createElement(Content, null, React.createElement(ErrorMessage, null, fs.titleize(packageId), " does not have any examples")), React.createElement(FlagGroup, null, Object.keys(this.state.flags).map(function (key) {
        return _this2.state.flags[key];
      })))));
    }
  }]);

  return ExamplesModal;
}(Component);

ExamplesModal.childContextTypes = {
  theme: PropTypes.string
};
ExamplesModal.contextTypes = {
  router: PropTypes.object.isRequired
};
export { ExamplesModal as default };