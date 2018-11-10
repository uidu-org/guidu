import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { cloneElement, PureComponent } from 'react';
import NodeResolver from 'react-node-resolver';
import shallowEqualObjects from 'shallow-equal/objects';
import { components, PopupSelect, mergeStyles } from '@atlaskit/select';
import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';
import AddIcon from '@atlaskit/icon/glyph/add';
import Option from './Option';
import { UIControllerSubscriber } from '../../../ui-controller';
import { CONTENT_NAV_WIDTH } from '../../../common/constants';
var gridSize = gridSizeFn();
var defaultStyles = {
  option: function option(provided, _ref) {
    var isActive = _ref.isActive,
        isFocused = _ref.isFocused;
    return _objectSpread({}, provided, {
      alignItems: 'center',
      border: 'none',
      backgroundColor: isFocused ? colors.N30 : 'transparent',
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
      backgroundColor: colors.B50
    });
  }
}; // ==============================
// Custom Functions
// ==============================

var createStyles = function createStyles() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return mergeStyles(defaultStyles, styles);
};

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
      innerProps = _objectWithoutProperties(_ref3$innerProps, ["innerRef"]),
      props = _objectWithoutProperties(_ref3, ["innerProps"]);

  return React.createElement("div", {
    ref: innerRef,
    css: {
      boxShadow: "0 2px 0 ".concat(colors.N40A),
      padding: gridSize,
      position: 'relative'
    }
  }, React.createElement(components.Control, _extends({}, props, {
    innerProps: innerProps
  })));
};

var Footer = function Footer(_ref4) {
  var text = _ref4.text,
      onClick = _ref4.onClick;
  return React.createElement("button", {
    css: {
      background: 0,
      border: 0,
      boxShadow: "0 -2px 0 ".concat(colors.N40A),
      boxSizing: 'border-box',
      color: colors.N200,
      cursor: 'pointer',
      alignItems: 'center',
      display: 'flex',
      fontSize: 'inherit',
      padding: "".concat(gridSize * 1.5, "px ").concat(gridSize, "px"),
      position: 'relative',
      textAlign: 'left',
      width: '100%',
      ':hover, :focus': {
        color: colors.B300,
        outline: 0,
        textDecoration: 'underline'
      }
    },
    onClick: onClick
  }, React.createElement(AddIcon, {
    label: "Add icon",
    size: "small"
  }), React.createElement("span", {
    css: {
      marginLeft: gridSize
    }
  }, text));
};

var defaultComponents = {
  Control: Control,
  Option: Option
};

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}; // ==============================
// Class
// ==============================


var Switcher =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Switcher, _PureComponent);

  function Switcher() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Switcher);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Switcher)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isOpen: false,
      mergedComponents: defaultComponents
    };
    _this.selectRef = React.createRef();
    _this.targetRef = void 0;
    _this.targetWidth = 0;

    _this.getTargetRef = function (ref) {
      _this.targetRef = ref;
    };

    _this.setTargetWidth = function () {
      // best efforts if target ref fails
      var defaultWidth = CONTENT_NAV_WIDTH - gridSize * 2;
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

      return React.createElement(Footer, {
        text: create.text,
        onClick: onClick
      });
    };

    return _this;
  }

  _createClass(Switcher, [{
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
          props = _objectWithoutProperties(_this$props2, ["create", "options", "target"]);

      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          mergedComponents = _this$state.mergedComponents;
      return React.createElement(PopupSelect, _extends({
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
        target: React.createElement(NodeResolver, {
          innerRef: this.getTargetRef
        }, cloneElement(target, {
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

      var mergedComponents = _objectSpread({}, defaultComponents, props.components);

      if (!shallowEqualObjects(mergedComponents, state.mergedComponents)) {
        newState.mergedComponents = mergedComponents;
      }

      if (!isEmpty(newState)) return newState;
      return null;
    }
  }]);

  return Switcher;
}(PureComponent);

Switcher.defaultProps = {
  closeMenuOnCreate: true,
  components: {}
};
export { createStyles };
export { Switcher as BaseSwitcher };
export default (function (props) {
  return React.createElement(UIControllerSubscriber, null, function (_ref6) {
    var state = _ref6.state;
    return React.createElement(Switcher, _extends({
      navWidth: state.productNavWidth
    }, props));
  });
});