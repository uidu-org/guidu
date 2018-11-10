import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, gridSize } from '@atlaskit/theme';
var baseStyles = {
  itemBase: {
    alignItems: 'center',
    border: 0,
    borderRadius: '50%',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 'inherit',
    justifyContent: 'center',
    lineHeight: 1,
    outline: 'none',
    padding: 0,
    position: 'relative',
    // allow badge positioning
    '&:focus': {
      boxShadow: "0 0 0 2px ".concat(colors.B100)
    }
  },
  badgeWrapper: {
    pointerEvents: 'none',
    position: 'absolute',
    userSelect: 'none'
  },
  itemWrapper: {
    display: 'flex'
  }
};
var sizeStyles = {
  large: {
    itemBase: {
      height: "".concat(gridSize() * 5, "px"),
      width: "".concat(gridSize() * 5, "px")
    },
    badgeWrapper: {
      left: "".concat(gridSize() * 2, "px"),
      top: 0
    },
    itemWrapper: {}
  },
  small: {
    itemBase: {
      height: "".concat(gridSize() * 4, "px"),
      width: "".concat(gridSize() * 4, "px")
    },
    badgeWrapper: {
      left: "".concat(gridSize() * 2.5, "px"),
      top: "-".concat(gridSize() / 2, "px")
    },
    itemWrapper: {
      marginTop: "".concat(gridSize(), "px")
    }
  }
};
export default (function (_ref) {
  var product = _ref.product;
  return function (_ref2) {
    var isActive = _ref2.isActive,
        isHover = _ref2.isHover,
        isSelected = _ref2.isSelected,
        _ref2$size = _ref2.size,
        size = _ref2$size === void 0 ? 'large' : _ref2$size;
    return {
      itemBase: _objectSpread({}, baseStyles.itemBase, sizeStyles[size].itemBase, {
        backgroundColor: function () {
          if (isSelected) return product.background.static;
          if (isActive) return product.background.interact;
          if (isHover) return product.background.hint;
          return product.background.default;
        }(),
        color: product.text.default
      }),
      badgeWrapper: _objectSpread({}, baseStyles.badgeWrapper, sizeStyles[size].badgeWrapper),
      itemWrapper: _objectSpread({}, sizeStyles[size].itemWrapper)
    };
  };
});