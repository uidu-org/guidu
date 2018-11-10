"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseSwitcher = exports.createStyles = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _reactNodeResolver = _interopRequireDefault(require("react-node-resolver"));

var _objects = _interopRequireDefault(require("shallow-equal/objects"));

var _select = require("@atlaskit/select");

var _theme = require("@atlaskit/theme");

var _add = _interopRequireDefault(require("@atlaskit/icon/glyph/add"));

var _Option = _interopRequireDefault(require("./Option"));

var _uiController = require("../../../ui-controller");

var _constants = require("../../../common/constants");

var gridSize = (0, _theme.gridSize)();
var defaultStyles = {
  option: function option(provided, _ref) {
    var isActive = _ref.isActive,
        isFocused = _ref.isFocused;
    return (0, _objectSpread2.default)({}, provided, {
      alignItems: 'center',
      border: 'none',
      backgroundColor: isFocused ? _theme.colors.N30 : 'transparent',
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'default',
      display: 'flex',
      flexShrink: 0,
      fontSize: 'inherit',
      height: gridSize * 6,
      outline: 'none',
      paddingRight: gridSize,
      paddingLeft: gridSize,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%'
    }, isActive && {
      backgroundColor: _theme.colors.B50
    });
  }
}; // ==============================
// Custom Functions
// ==============================

var createStyles = function createStyles() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _select.mergeStyles)(defaultStyles, styles);
};

exports.createStyles = createStyles;

function filterOption(_ref2, input) {
  var data = _ref2.data;
  return data.text.toLowerCase().includes(input.toLowerCase());
}

function isOptionSelected(option, selected) {
  if (!selected || !selected.length) return false;
  return option.id === selected[0].id;
}

function getOptionValue(option) {
  return option.id;
} // ==============================
// Custom Components
// ==============================


var Control = function Control(_ref3) {
  var _ref3$innerProps = _ref3.innerProps,
      innerRef = _ref3$innerProps.innerRef,
      innerProps = (0, _objectWithoutProperties2.default)(_ref3$innerProps, ["innerRef"]),
      props = (0, _objectWithoutProperties2.default)(_ref3, ["innerProps"]);
  return _react.default.createElement("div", {
    ref: innerRef,
    css: {
      boxShadow: "0 2px 0 ".concat(_theme.colors.N40A),
      padding: gridSize,
      position: 'relative'
    }
  }, _react.default.createElement(_select.components.Control, (0, _extends2.default)({}, props, {
    innerProps: innerProps
  })));
};

var Footer = function Footer(_ref4) {
  var text = _ref4.text,
      onClick = _ref4.onClick;
  return _react.default.createElement("button", {
    css: {
      background: 0,
      border: 0,
      boxShadow: "0 -2px 0 ".concat(_theme.colors.N40A),
      boxSizing: 'border-box',
      color: _theme.colors.N200,
      cursor: 'pointer',
      alignItems: 'center',
      display: 'flex',
      fontSize: 'inherit',
      padding: "".concat(gridSize * 1.5, "px ").concat(gridSize, "px"),
      position: 'relative',
      textAlign: 'left',
      width: '100%',
      ':hover, :focus': {
        color: _theme.colors.B300,
        outline: 0,
        textDecoration: 'underline'
      }
    },
    onClick: onClick
  }, _react.default.createElement(_add.default, {
    label: "Add icon",
    size: "small"
  }), _react.default.createElement("span", {
    css: {
      marginLeft: gridSize
    }
  }, text));
};

var defaultComponents = {
  Control: Control,
  Option: _Option.default
};

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}; // ==============================
// Class
// ==============================


var Switcher =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Switcher, _PureComponent);

  function Switcher() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Switcher);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Switcher)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isOpen: false,
      mergedComponents: defaultComponents
    };
    _this.selectRef = _react.default.createRef();
    _this.targetRef = void 0;
    _this.targetWidth = 0;

    _this.getTargetRef = function (ref) {
      _this.targetRef = ref;
    };

    _this.setTargetWidth = function () {
      // best efforts if target ref fails
      var defaultWidth = _constants.CONTENT_NAV_WIDTH - gridSize * 2;
      _this.targetWidth = _this.targetRef ? _this.targetRef.clientWidth : defaultWidth;
    };

    _this.handleOpen = function () {
      _this.setState({
        isOpen: true
      });
    };

    _this.handleClose = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.getFooter = function () {
      var _this$props = _this.props,
          closeMenuOnCreate = _this$props.closeMenuOnCreate,
          create = _this$props.create,
          footer = _this$props.footer;
      if (footer) return footer;
      if (!create) return null;
      var onClick = create.onClick;

      if (closeMenuOnCreate) {
        onClick = function onClick(e) {
          if (_this.selectRef.current) {
            _this.selectRef.current.close();
          }

          create.onClick(e);
        };
      }

      return _react.default.createElement(Footer, {
        text: create.text,
        onClick: onClick
      });
    };

    return _this;
  }

  (0, _createClass2.default)(Switcher, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTargetWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref5) {
      var navWidth = _ref5.navWidth;

      // reset the target width if the user has resized the navigation pane
      if (navWidth !== this.props.navWidth) {
        this.setTargetWidth();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          create = _this$props2.create,
          options = _this$props2.options,
          target = _this$props2.target,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["create", "options", "target"]);
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          mergedComponents = _this$state.mergedComponents;
      return _react.default.createElement(_select.PopupSelect, (0, _extends2.default)({
        ref: this.selectRef,
        filterOption: filterOption,
        isOptionSelected: isOptionSelected,
        footer: this.getFooter(),
        getOptionValue: getOptionValue,
        onOpen: this.handleOpen,
        onClose: this.handleClose,
        options: options,
        maxMenuWidth: this.targetWidth,
        minMenuWidth: this.targetWidth,
        target: _react.default.createElement(_reactNodeResolver.default, {
          innerRef: this.getTargetRef
        }, (0, _react.cloneElement)(target, {
          isSelected: isOpen
        }))
      }, props, {
        styles: createStyles(this.props.styles),
        components: mergedComponents
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = {}; // Merge consumer and default components

      var mergedComponents = (0, _objectSpread2.default)({}, defaultComponents, props.components);

      if (!(0, _objects.default)(mergedComponents, state.mergedComponents)) {
        newState.mergedComponents = mergedComponents;
      }

      if (!isEmpty(newState)) return newState;
      return null;
    }
  }]);
  return Switcher;
}(_react.PureComponent);

exports.BaseSwitcher = Switcher;
Switcher.defaultProps = {
  closeMenuOnCreate: true,
  components: {}
};

var _default = function _default(props) {
  return _react.default.createElement(_uiController.UIControllerSubscriber, null, function (_ref6) {
    var state = _ref6.state;
    return _react.default.createElement(Switcher, (0, _extends2.default)({
      navWidth: state.productNavWidth
    }, props));
  });
};

exports.default = _default;