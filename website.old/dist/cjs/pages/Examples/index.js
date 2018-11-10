"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SANDBOX_DEPLOY_ENDPOINT = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf4 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _reactHelmet = require("react-helmet");

var _arrowLeft = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-left"));

var _link = _interopRequireDefault(require("@atlaskit/icon/glyph/link"));

var _button = _interopRequireDefault(require("@atlaskit/button"));

var _code = _interopRequireDefault(require("@atlaskit/icon/glyph/code"));

var _error = _interopRequireDefault(require("@atlaskit/icon/glyph/error"));

var _flag = _interopRequireWildcard(require("@atlaskit/flag"));

var _singleSelect = _interopRequireDefault(require("@atlaskit/single-select"));

var _tooltip = _interopRequireDefault(require("@atlaskit/tooltip"));

var _theme = require("@atlaskit/theme");

var _ExampleDisplay = _interopRequireDefault(require("../../components/Examples/ExampleDisplay"));

var fs = _interopRequireWildcard(require("../../utils/fs"));

var _site = require("../../site");

var _packageResolver2 = _interopRequireWildcard(require("../../utils/packageResolver"));

var _url = require("../../utils/url");

var _CodeSandbox = _interopRequireDefault(require("../Package/CodeSandbox"));

var _CodeSandboxLogo = _interopRequireDefault(require("../Package/CodeSandboxLogo"));

var _styled = require("./styled");

var SANDBOX_DEPLOY_ENDPOINT = 'https://atlaskit-deploy-sandbox.glitch.me/deploy';
exports.SANDBOX_DEPLOY_ENDPOINT = SANDBOX_DEPLOY_ENDPOINT;

function PackageSelector(props) {
  var selectedPackageItem;
  var packagesSelectItems = props.groups.map(function (group) {
    return {
      heading: fs.titleize(group.id),
      items: fs.getDirectories(group.children).map(function (pkg) {
        var item = {
          content: fs.titleize(pkg.id),
          value: "".concat(group.id, "/").concat(pkg.id)
        };

        if (props.groupId === group.id && props.packageId === pkg.id) {
          selectedPackageItem = item;
        }

        return item;
      })
    };
  });
  return _react.default.createElement(_styled.Control, null, _react.default.createElement(_singleSelect.default, {
    appearance: "subtle",
    items: packagesSelectItems,
    hasAutocomplete: true,
    placeholder: "Select Package",
    onSelected: props.onSelected,
    defaultSelected: selectedPackageItem
  }));
}

function ExampleSelector(props) {
  var selectedExampleItem;
  var examplesSelectItems = [{
    heading: 'Examples',
    items: props.examples ? fs.flatMap(props.examples, function (file, filePath) {
      var item = {
        content: fs.titleize(file.id),
        value: fs.normalize(filePath.replace('examples/', ''))
      };

      if (file.id === props.exampleId) {
        selectedExampleItem = item;
      }

      return item;
    }) : []
  }];
  return _react.default.createElement(_styled.Control, null, _react.default.createElement(_singleSelect.default, {
    appearance: "subtle",
    items: examplesSelectItems,
    hasAutocomplete: true,
    placeholder: "Select Example",
    onSelected: props.onSelected,
    defaultSelected: selectedExampleItem
  }));
}

var ExampleNavigation =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ExampleNavigation, _Component);

  function ExampleNavigation() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ExampleNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(ExampleNavigation)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(ExampleNavigation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onExampleSelected = _this$props.onExampleSelected,
          examples = _this$props.examples,
          onPackageSelected = _this$props.onPackageSelected,
          groups = _this$props.groups,
          exampleId = _this$props.exampleId,
          groupId = _this$props.groupId,
          loaderUrl = _this$props.loaderUrl,
          packageId = _this$props.packageId,
          config = _this$props.config,
          codeIsVisible = _this$props.codeIsVisible,
          onCodeToggle = _this$props.onCodeToggle;
      var error = this.state.error;
      var example = examples && examples.children.find(function (e) {
        return e.id === exampleId;
      });
      return _react.default.createElement(_styled.Nav, null, _react.default.createElement(_styled.NavSection, {
        style: {
          marginLeft: 8
        }
      }, _react.default.createElement(_tooltip.default, {
        content: "Back to docs",
        position: "right"
      }, _react.default.createElement(_styled.NavLink, {
        to: (0, _url.packageUrl)(groupId, packageId)
      }, _react.default.createElement(_arrowLeft.default, {
        label: "Back to docs"
      })))), _react.default.createElement(_styled.NavSection, null, _react.default.createElement(PackageSelector, {
        groupId: groupId,
        packageId: packageId,
        groups: groups,
        onSelected: onPackageSelected
      }), _react.default.createElement(ExampleSelector, {
        examples: examples,
        exampleId: exampleId,
        onSelected: onExampleSelected
      })), _react.default.createElement(_styled.NavSection, {
        style: {
          marginRight: 8
        }
      }, _react.default.createElement(_tooltip.default, {
        content: error ? error.name : 'Deploy to CodeSandbox',
        position: "left"
      }, _react.default.createElement(_CodeSandbox.default, {
        example: example,
        groupId: groupId,
        packageId: packageId,
        pkgJSON: config,
        afterDeployError: function afterDeployError(error) {
          return _this2.setState({
            error: error
          });
        },
        loadingButton: function loadingButton() {
          return _react.default.createElement(_styled.NavButton, {
            style: {
              marginRight: 8
            },
            type: "Submit",
            disabled: true
          }, _react.default.createElement(_CodeSandboxLogo.default, null));
        },
        deployButton: function deployButton(_ref) {
          var isDisabled = _ref.isDisabled;
          return _react.default.createElement(_styled.NavButton, {
            style: {
              marginRight: 8
            },
            type: "Submit",
            disabled: isDisabled
          }, _react.default.createElement(_CodeSandboxLogo.default, null));
        },
        useNavButton: true
      })), _react.default.createElement(_tooltip.default, {
        content: "".concat(codeIsVisible ? 'Hide' : 'Show', " source"),
        position: "left"
      }, _react.default.createElement(_styled.NavButton, {
        isSelected: codeIsVisible,
        onClick: onCodeToggle
      }, _react.default.createElement(_code.default, {
        label: "Show source"
      }))), _react.default.createElement(_tooltip.default, {
        content: "Isolated View",
        position: "bottom"
      }, _react.default.createElement(_button.default, {
        appearance: "subtle",
        iconBefore: _react.default.createElement(_link.default, {
          label: "Link Icon"
        }),
        href: loaderUrl,
        target: "_blank"
      }))));
    }
  }]);
  return ExampleNavigation;
}(_react.Component);

var Examples =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Examples, _React$Component);

  function Examples() {
    var _getPrototypeOf3;

    var _this3;

    (0, _classCallCheck2.default)(this, Examples);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(Examples)).call.apply(_getPrototypeOf3, [this].concat(args)));
    _this3.state = {
      displayCode: false,
      flags: {},
      loadingSandbox: false
    };

    _this3.onPackageSelected = function (selected) {
      var _selected$item$value$ = selected.item.value.split('/'),
          _selected$item$value$2 = (0, _slicedToArray2.default)(_selected$item$value$, 2),
          groupId = _selected$item$value$2[0],
          packageId = _selected$item$value$2[1];

      _this3.updateSelected(groupId, packageId);
    };

    _this3.onExampleSelected = function (selected) {
      _this3.updateSelected(_this3.props.match.params.groupId, _this3.props.match.params.pkgId, selected.item.value);
    };

    _this3.onCodeToggle = function () {
      return _this3.setState(function (state) {
        return {
          displayCode: !state.displayCode
        };
      });
    };

    _this3.addFlag = function (flagProps) {
      var id = Date.now().toString();

      var icon = function () {
        if (flagProps.appearance === 'error') {
          return _react.default.createElement(_error.default, {
            label: "Error",
            secondaryColor: _theme.colors.R400
          });
        }

        return '';
      }();

      _this3.setState({
        flags: (0, _objectSpread4.default)((0, _defineProperty2.default)({}, id, _react.default.createElement(_flag.default, (0, _extends2.default)({
          icon: icon,
          id: id,
          key: id,
          actions: [{
            content: 'OK',
            onClick: function onClick() {
              return _this3.removeFlag(id);
            }
          }]
        }, flagProps))), _this3.state.flags)
      });
    };

    _this3.removeFlag = function (removedKey) {
      var flags = Object.keys(_this3.state.flags).filter(function (key) {
        return key !== removedKey.toString();
      }).reduce(function (newFlags, key) {
        return (0, _objectSpread4.default)({}, newFlags, (0, _defineProperty2.default)({}, key, _this3.state.flags[key]));
      }, {});

      _this3.setState({
        flags: flags
      });
    };

    _this3.deploySandbox =
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var props, component, example, response, url, message;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              props = (0, _packageResolver2.default)(_this3.props.match.params.groupId, _this3.props.match.params.pkgId, _this3.props.match.params.exampleId);

              if (props.example) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              component = props.packageId;
              example = props.example.id.split('.').slice(0, -1).join('.');

              _this3.setState({
                loadingSandbox: true
              });

              _context.next = 8;
              return fetch("".concat(SANDBOX_DEPLOY_ENDPOINT, "/").concat(component, "/").concat(example));

            case 8:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 16;
                break;
              }

              _context.next = 12;
              return response.text();

            case 12:
              url = _context.sent;
              window.open(url);
              _context.next = 20;
              break;

            case 16:
              _context.next = 18;
              return response.text();

            case 18:
              message = _context.sent;

              _this3.addFlag({
                appearance: 'error',
                description: message,
                title: 'Error deploying to Codesandbox'
              });

            case 20:
              _this3.setState({
                loadingSandbox: false
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return _this3;
  }

  (0, _createClass2.default)(Examples, [{
    key: "updateSelected",
    value: function updateSelected(groupId, packageId, exampleId) {
      var resolved = (0, _packageResolver2.default)(groupId, packageId, exampleId);
      var url = this.toUrl(resolved.groupId, resolved.packageId, resolved.exampleId);
      this.context.router.history.push(url);
    }
  }, {
    key: "toUrl",
    value: function toUrl(groupId, packageId, exampleId) {
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
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _packageResolver = (0, _packageResolver2.default)(this.props.match.params.groupId, this.props.match.params.pkgId, this.props.match.params.exampleId),
          hasChanged = _packageResolver.hasChanged,
          groups = _packageResolver.groups,
          examples = _packageResolver.examples,
          packageId = _packageResolver.packageId,
          groupId = _packageResolver.groupId,
          exampleId = _packageResolver.exampleId;

      var loaderUrl = (0, _packageResolver2.getLoaderUrl)(groupId, packageId, this.props.match.params.exampleId);

      if (hasChanged) {
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: this.toUrl(groupId, packageId, exampleId)
        });
      }

      var config = (0, _site.getConfig)(groupId, packageId).config;
      return _react.default.createElement(_styled.Container, null, _react.default.createElement(ExampleNavigation, {
        groupId: groupId,
        packageId: packageId,
        exampleId: exampleId,
        groups: groups,
        examples: examples,
        loaderUrl: loaderUrl,
        codeIsVisible: this.state.displayCode,
        onPackageSelected: this.onPackageSelected,
        onExampleSelected: this.onExampleSelected,
        onCodeToggle: this.onCodeToggle,
        deploySandbox: this.deploySandbox,
        loadingSandbox: this.state.loadingSandbox,
        config: config
      }), _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, "Example - ", fs.titleize(exampleId), " - ", fs.titleize(packageId), " -", ' ')), examples && exampleId ? _react.default.createElement(_ExampleDisplay.default, {
        displayCode: this.state.displayCode,
        example: fs.getById(fs.getFiles(examples.children), exampleId),
        name: config.name,
        src: loaderUrl
      }, function (ExampleCode, ExampleComponent, displayCode) {
        return _react.default.createElement(_styled.Content, null, _react.default.createElement(_styled.ExampleComponentWrapper, {
          codeIsVisible: displayCode
        }, _react.default.createElement(ExampleComponent, null)), _react.default.createElement(_styled.CodeContainer, {
          show: displayCode
        }, _react.default.createElement(ExampleCode, null)));
      }) : _react.default.createElement(_styled.Content, null, _react.default.createElement(_styled.ErrorMessage, null, fs.titleize(packageId), " does not have any examples")), _react.default.createElement(_flag.FlagGroup, null, Object.keys(this.state.flags).map(function (key) {
        return _this4.state.flags[key];
      })));
    }
  }]);
  return Examples;
}(_react.default.Component);

exports.default = Examples;
Examples.contextTypes = {
  router: _propTypes.default.object.isRequired
};