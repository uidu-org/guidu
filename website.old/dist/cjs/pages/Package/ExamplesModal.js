"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _WrappedLink = require("../../components/WrappedLink");

var _reactHelmet = require("react-helmet");

var _code = _interopRequireDefault(require("@atlaskit/icon/glyph/code"));

var _cross = _interopRequireDefault(require("@atlaskit/icon/glyph/cross"));

var _screen = _interopRequireDefault(require("@atlaskit/icon/glyph/screen"));

var _link = _interopRequireDefault(require("@atlaskit/icon/glyph/link"));

var _button = _interopRequireWildcard(require("@atlaskit/button"));

var _flag = require("@atlaskit/flag");

var _tooltip = _interopRequireDefault(require("@atlaskit/tooltip"));

var _modalDialog = _interopRequireWildcard(require("@atlaskit/modal-dialog"));

var _theme = require("@atlaskit/theme");

var fs = _interopRequireWildcard(require("../../utils/fs"));

var _packageResolver3 = _interopRequireWildcard(require("../../utils/packageResolver"));

var _ExampleDisplay = _interopRequireDefault(require("../../components/Examples/ExampleDisplay"));

var _site = require("../../site");

var _CodeSandbox = _interopRequireDefault(require("./CodeSandbox"));

var _CodeSandboxLogo = _interopRequireDefault(require("./CodeSandboxLogo"));

// ==============================
// PAGE
// ==============================
var Content = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__Content",
  componentId: "pok8fv-0"
})(["\n  flex: 1 1 auto;\n"]);

var CodeContainer = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__CodeContainer",
  componentId: "pok8fv-1"
})([""]);

var ErrorMessage = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__ErrorMessage",
  componentId: "pok8fv-2"
})(["\n  background-color: ", ";\n  color: white;\n  font-size: 120%;\n  padding: 1em;\n"], _theme.colors.R400); // ==============================
// MODAL
// ==============================


var ModalBody = (0, _styledComponents.default)(_modalDialog.ModalBody).withConfig({
  displayName: "ExamplesModal__ModalBody",
  componentId: "pok8fv-3"
})(["\n  display: flex;\n  flex-direction: column;\n"]);

var ContentBody = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__ContentBody",
  componentId: "pok8fv-4"
})(["\n  display: flex;\n  flex: 1;\n  padding-bottom: 17px;\n"]);

var ModalContent = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__ModalContent",
  componentId: "pok8fv-5"
})(["\n  flex: 1 1 auto;\n  min-height: 240px;\n  padding: ", "px;\n  ", ";\n"], (0, _theme.gridSize)() * 2, _theme.elevation.e200);

var ModalHeader = (0, _styledComponents.default)(_modalDialog.ModalHeader).withConfig({
  displayName: "ExamplesModal__ModalHeader",
  componentId: "pok8fv-6"
})(["\n  margin-left: ", "px;\n  margin-right: ", "px;\n  padding-left: 0;\n  padding-right: 0;\n"], (0, _theme.gridSize)() * 2.5, (0, _theme.gridSize)() * 2.5);

var ModalActions = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__ModalActions",
  componentId: "pok8fv-7"
})(["\n  display: flex;\n"]); // ==============================
// NAVIGATION
// ==============================


var keylineMask = (0, _styledComponents.css)(["\n  background-color: ", ";\n  margin-top: -2px;\n  padding-top: 2px;\n"], _theme.colors.background);

var Nav = _styledComponents.default.nav.withConfig({
  displayName: "ExamplesModal__Nav",
  componentId: "pok8fv-8"
})(["\n  ", " flex-shrink: 0;\n  margin-right: ", "px;\n  position: relative;\n  width: 240px;\n"], keylineMask, (0, _theme.gridSize)() * 2);

var NavInner = _styledComponents.default.div.withConfig({
  displayName: "ExamplesModal__NavInner",
  componentId: "pok8fv-9"
})(["\n  max-height: 100%;\n  overflow-y: auto;\n  padding: 2px;\n\n  /* Not ideal to be overriding AkButton styles, but we don't have a link list component */\n  a {\n    margin: 2px 0 0 0;\n    width: 100%;\n  }\n"]);

function ExampleNavigation(_ref) {
  var examples = _ref.examples,
      exampleId = _ref.exampleId,
      onExampleSelected = _ref.onExampleSelected;
  var regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files

  return _react.default.createElement(Nav, null, _react.default.createElement(NavInner, null, examples ? fs.flatMap(examples, function (file, filePath) {
    return file.id.match(regex) && _react.default.createElement(_button.default, {
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
  }) : _react.default.createElement("div", null, "No Examples")));
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
  return _react.default.createElement(ModalHeader, {
    showKeyline: showKeyline
  }, _react.default.createElement(_modalDialog.ModalTitle, null, fs.titleize(packageId), " Examples"), _react.default.createElement(ModalActions, null, _react.default.createElement(_button.ButtonGroup, null, _react.default.createElement(_CodeSandbox.default, {
    example: example,
    examples: examples,
    groupId: groupId,
    packageId: packageId,
    pkgJSON: pkgJSON,
    loadingButton: function loadingButton() {
      return _react.default.createElement(_button.default, {
        type: "submit",
        isDisabled: true,
        iconBefore: _react.default.createElement(_CodeSandboxLogo.default, null)
      }, "Loading...");
    },
    deployButton: function deployButton(_ref3) {
      var isDisabled = _ref3.isDisabled,
          error = _ref3.error;
      return _react.default.createElement(_button.default, {
        type: "submit",
        isDisabled: isDisabled,
        iconBefore: _react.default.createElement(_CodeSandboxLogo.default, null)
      }, error ? error.name : 'Sandbox');
    }
  }), _react.default.createElement(_button.default, {
    iconBefore: _react.default.createElement(_code.default, {
      label: "Toggle code snippet"
    }),
    onClick: onCodeToggle,
    isSelected: displayCode,
    title: displayCode ? 'Hide Source' : 'Show Source'
  }, "Source"), _react.default.createElement(_tooltip.default, {
    content: "Fullscreen",
    position: "bottom"
  }, _react.default.createElement(_button.default, {
    appearance: "subtle",
    component: _WrappedLink.Link,
    iconBefore: _react.default.createElement(_screen.default, {
      label: "Screen Icon"
    }),
    to: toExampleUrl(groupId, packageId, exampleId)
  })), _react.default.createElement(_tooltip.default, {
    content: "Isolated View",
    position: "bottom"
  }, _react.default.createElement(_button.default, {
    appearance: "subtle",
    component: 'a',
    iconBefore: _react.default.createElement(_link.default, {
      label: "Link Icon"
    }),
    href: loaderUrl,
    target: '_blank'
  })), _react.default.createElement(_tooltip.default, {
    content: "Close",
    position: "bottom"
  }, _react.default.createElement(_button.default, {
    appearance: "subtle",
    iconBefore: _react.default.createElement(_cross.default, {
      label: "Close Modal"
    }),
    onClick: close
  })))));
};

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
      displayCode: false,
      flags: {},
      loadingSandbox: false
    };

    _this.onPackageSelected = function (selected) {
      var _selected$item$value$ = selected.item.value.split('/'),
          _selected$item$value$2 = (0, _slicedToArray2.default)(_selected$item$value$, 2),
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

      var _packageResolver = (0, _packageResolver3.default)(params.groupId, params.pkgId, params.exampleId),
          packageId = _packageResolver.packageId,
          groupId = _packageResolver.groupId;

      var url = "/packages/".concat(groupId, "/").concat(packageId);

      _this.context.router.history.push(url);
    };

    return _this;
  }

  (0, _createClass2.default)(ExamplesModal, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        theme: 'dark'
      };
    }
  }, {
    key: "updateSelected",
    value: function updateSelected(groupId, packageId, exampleId) {
      var resolved = (0, _packageResolver3.default)(groupId, packageId, exampleId);
      var url = toUrl(resolved.groupId, resolved.packageId, resolved.exampleId);
      this.context.router.history.push(url);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _packageResolver2 = (0, _packageResolver3.default)(this.props.match.params.groupId, this.props.match.params.pkgId, this.props.match.params.exampleId),
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
      var pkgJSON = (0, _site.getConfig)(groupId, packageId).config;
      var loaderUrl = (0, _packageResolver3.getLoaderUrl)(groupId, packageId, this.props.match.params.exampleId);

      if (hasChanged) {
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: toUrl(groupId, packageId, exampleId)
        });
      }

      return _react.default.createElement(_modalDialog.default, {
        autoFocus: false,
        body: ModalBody,
        header: function header(_ref4) {
          var showKeyline = _ref4.showKeyline;
          return _react.default.createElement(ModalHeaderComp, {
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
      }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, "Example - ", fs.titleize(exampleId), " - ", fs.titleize(packageId), " -", ' ')), _react.default.createElement(ContentBody, null, _react.default.createElement(ExampleNavigation, {
        groupId: groupId,
        packageId: packageId,
        exampleId: exampleId,
        groups: groups,
        examples: examples,
        onPackageSelected: this.onPackageSelected,
        onExampleSelected: this.onExampleSelected,
        loadingSandbox: this.state.loadingSandbox
      }), _react.default.createElement(ModalContent, null, examples && exampleId && loaderUrl ? _react.default.createElement(_ExampleDisplay.default, {
        displayCode: displayCode,
        example: fs.getById(fs.getFiles(examples.children), exampleId),
        name: pkgJSON.name,
        src: loaderUrl
      }, function (ExampleCode, ExampleComponent, displayCode) {
        if (displayCode) {
          return _react.default.createElement(Content, null, _react.default.createElement(CodeContainer, null, _react.default.createElement(ExampleCode, null)));
        }

        return _react.default.createElement(ExampleComponent, null);
      }) : _react.default.createElement(Content, null, _react.default.createElement(ErrorMessage, null, fs.titleize(packageId), " does not have any examples")), _react.default.createElement(_flag.FlagGroup, null, Object.keys(this.state.flags).map(function (key) {
        return _this2.state.flags[key];
      })))));
    }
  }]);
  return ExamplesModal;
}(_react.Component);

exports.default = ExamplesModal;
ExamplesModal.childContextTypes = {
  theme: _propTypes.default.string
};
ExamplesModal.contextTypes = {
  router: _propTypes.default.object.isRequired
};
module.exports = exports.default;