import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import LinkIcon from '@atlaskit/icon/glyph/link';
import Button from '@atlaskit/button';
import CodeIcon from '@atlaskit/icon/glyph/code';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Flag, { FlagGroup } from '@atlaskit/flag';
import SingleSelect from '@atlaskit/single-select';
import Tooltip from '@atlaskit/tooltip';
import { colors } from '@atlaskit/theme';
import ExampleDisplay from '../../components/Examples/ExampleDisplay';
import * as fs from '../../utils/fs';
import { getConfig } from '../../site';
import packageResolver, { getLoaderUrl } from '../../utils/packageResolver';
import { packageUrl } from '../../utils/url';
import CodeSandbox from '../Package/CodeSandbox';
import CodeSandboxLogo from '../Package/CodeSandboxLogo';
import { CodeContainer, Container, Content, Control, ErrorMessage, ExampleComponentWrapper, Nav, NavButton, NavLink, NavSection } from './styled';
export var SANDBOX_DEPLOY_ENDPOINT = 'https://atlaskit-deploy-sandbox.glitch.me/deploy';

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
  return React.createElement(Control, null, React.createElement(SingleSelect, {
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
  return React.createElement(Control, null, React.createElement(SingleSelect, {
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
  _inherits(ExampleNavigation, _Component);

  function ExampleNavigation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ExampleNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ExampleNavigation)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {};
    return _this;
  }

  _createClass(ExampleNavigation, [{
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
      return React.createElement(Nav, null, React.createElement(NavSection, {
        style: {
          marginLeft: 8
        }
      }, React.createElement(Tooltip, {
        content: "Back to docs",
        position: "right"
      }, React.createElement(NavLink, {
        to: packageUrl(groupId, packageId)
      }, React.createElement(ArrowLeftIcon, {
        label: "Back to docs"
      })))), React.createElement(NavSection, null, React.createElement(PackageSelector, {
        groupId: groupId,
        packageId: packageId,
        groups: groups,
        onSelected: onPackageSelected
      }), React.createElement(ExampleSelector, {
        examples: examples,
        exampleId: exampleId,
        onSelected: onExampleSelected
      })), React.createElement(NavSection, {
        style: {
          marginRight: 8
        }
      }, React.createElement(Tooltip, {
        content: error ? error.name : 'Deploy to CodeSandbox',
        position: "left"
      }, React.createElement(CodeSandbox, {
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
          return React.createElement(NavButton, {
            style: {
              marginRight: 8
            },
            type: "Submit",
            disabled: true
          }, React.createElement(CodeSandboxLogo, null));
        },
        deployButton: function deployButton(_ref) {
          var isDisabled = _ref.isDisabled;
          return React.createElement(NavButton, {
            style: {
              marginRight: 8
            },
            type: "Submit",
            disabled: isDisabled
          }, React.createElement(CodeSandboxLogo, null));
        },
        useNavButton: true
      })), React.createElement(Tooltip, {
        content: "".concat(codeIsVisible ? 'Hide' : 'Show', " source"),
        position: "left"
      }, React.createElement(NavButton, {
        isSelected: codeIsVisible,
        onClick: onCodeToggle
      }, React.createElement(CodeIcon, {
        label: "Show source"
      }))), React.createElement(Tooltip, {
        content: "Isolated View",
        position: "bottom"
      }, React.createElement(Button, {
        appearance: "subtle",
        iconBefore: React.createElement(LinkIcon, {
          label: "Link Icon"
        }),
        href: loaderUrl,
        target: "_blank"
      }))));
    }
  }]);

  return ExampleNavigation;
}(Component);

var Examples =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Examples, _React$Component);

  function Examples() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, Examples);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Examples)).call.apply(_getPrototypeOf3, [this].concat(args)));
    _this3.state = {
      displayCode: false,
      flags: {},
      loadingSandbox: false
    };

    _this3.onPackageSelected = function (selected) {
      var _selected$item$value$ = selected.item.value.split('/'),
          _selected$item$value$2 = _slicedToArray(_selected$item$value$, 2),
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
          return React.createElement(ErrorIcon, {
            label: "Error",
            secondaryColor: colors.R400
          });
        }

        return '';
      }();

      _this3.setState({
        flags: _objectSpread(_defineProperty({}, id, React.createElement(Flag, _extends({
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
        return _objectSpread({}, newFlags, _defineProperty({}, key, _this3.state.flags[key]));
      }, {});

      _this3.setState({
        flags: flags
      });
    };

    _this3.deploySandbox =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var props, component, example, response, url, message;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              props = packageResolver(_this3.props.match.params.groupId, _this3.props.match.params.pkgId, _this3.props.match.params.exampleId);

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

  _createClass(Examples, [{
    key: "updateSelected",
    value: function updateSelected(groupId, packageId, exampleId) {
      var resolved = packageResolver(groupId, packageId, exampleId);
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

      var _packageResolver = packageResolver(this.props.match.params.groupId, this.props.match.params.pkgId, this.props.match.params.exampleId),
          hasChanged = _packageResolver.hasChanged,
          groups = _packageResolver.groups,
          examples = _packageResolver.examples,
          packageId = _packageResolver.packageId,
          groupId = _packageResolver.groupId,
          exampleId = _packageResolver.exampleId;

      var loaderUrl = getLoaderUrl(groupId, packageId, this.props.match.params.exampleId);

      if (hasChanged) {
        return React.createElement(Redirect, {
          to: this.toUrl(groupId, packageId, exampleId)
        });
      }

      var config = getConfig(groupId, packageId).config;
      return React.createElement(Container, null, React.createElement(ExampleNavigation, {
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
      }), React.createElement(Helmet, null, React.createElement("title", null, "Example - ", fs.titleize(exampleId), " - ", fs.titleize(packageId), " -", ' ')), examples && exampleId ? React.createElement(ExampleDisplay, {
        displayCode: this.state.displayCode,
        example: fs.getById(fs.getFiles(examples.children), exampleId),
        name: config.name,
        src: loaderUrl
      }, function (ExampleCode, ExampleComponent, displayCode) {
        return React.createElement(Content, null, React.createElement(ExampleComponentWrapper, {
          codeIsVisible: displayCode
        }, React.createElement(ExampleComponent, null)), React.createElement(CodeContainer, {
          show: displayCode
        }, React.createElement(ExampleCode, null)));
      }) : React.createElement(Content, null, React.createElement(ErrorMessage, null, fs.titleize(packageId), " does not have any examples")), React.createElement(FlagGroup, null, Object.keys(this.state.flags).map(function (key) {
        return _this4.state.flags[key];
      })));
    }
  }]);

  return Examples;
}(React.Component);

Examples.contextTypes = {
  router: PropTypes.object.isRequired
};
export { Examples as default };