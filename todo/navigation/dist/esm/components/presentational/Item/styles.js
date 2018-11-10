import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, fontSize, gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();
/**
 * Component tree structure:
 * - itemBase
 *   - beforeWrapper
 *   - contentWrapper
 *     - textWrapper
 *     - subTextWrapper
 *   - afterWrapper
 */
// These are the styles which are consistent regardless of theme or spacing

var baseStyles = {
  itemBase: {
    alignItems: 'center',
    border: 'none',
    borderRadius: '3px',
    boxSizing: 'border-box',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    fontSize: 'inherit',
    height: gridSize * 5,
    outline: 'none',
    textAlign: 'left',
    textDecoration: 'none',
    width: '100%',
    '&:focus': {
      boxShadow: "0 0 0 2px ".concat(colors.B100, " inset")
    }
  },
  beforeWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowX: 'hidden'
  },
  textWrapper: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 16 / fontSize()
  },
  subTextWrapper: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  afterWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0
  }
}; // These are styles which switch on the spacing prop

var layoutStyles = {
  compact: {
    itemBase: {
      paddingRight: gridSize,
      paddingLeft: gridSize
    },
    beforeWrapper: {
      marginRight: gridSize
    },
    subTextWrapper: {
      fontSize: '10px',
      lineHeight: 1.2
    },
    afterWrapper: {
      marginLeft: gridSize
    }
  },
  default: {
    itemBase: {
      paddingLeft: gridSize * 1.5,
      paddingRight: gridSize * 1.5
    },
    beforeWrapper: {
      marginRight: gridSize * 2
    },
    subTextWrapper: {
      fontSize: '12px',
      lineHeight: 14 / 12
    },
    afterWrapper: {
      marginLeft: gridSize * 2
    }
  }
};

var getItemBackgroundColor = function getItemBackgroundColor(background, _ref) {
  var isActive = _ref.isActive,
      isSelected = _ref.isSelected,
      isHover = _ref.isHover,
      isDragging = _ref.isDragging;
  if (isDragging) return background.hint;
  if (isActive) return background.interact;
  if (isSelected) return background.static;
  if (isHover) return background.hint;
  return background.default;
}; // Light theme


export default (function (_ref2) {
  var product = _ref2.product;
  return function (_ref3) {
    var isActive = _ref3.isActive,
        isDragging = _ref3.isDragging,
        isHover = _ref3.isHover,
        isSelected = _ref3.isSelected,
        spacing = _ref3.spacing;
    var containerTextColor = isActive || isSelected ? colors.B400 : colors.N500;
    var containerBackgroundColor = getItemBackgroundColor({
      default: colors.N20,
      hint: colors.N30,
      interact: colors.B50,
      static: colors.N30
    }, {
      isActive: isActive,
      isHover: isHover,
      isSelected: isSelected,
      isDragging: isDragging
    });
    var productBackgroundColor = getItemBackgroundColor(product.background, {
      isActive: isActive,
      isDragging: isDragging,
      isHover: isHover,
      isSelected: isSelected
    });
    return {
      container: {
        itemBase: _objectSpread({}, baseStyles.itemBase, layoutStyles[spacing].itemBase, {
          backgroundColor: containerBackgroundColor,
          fill: containerBackgroundColor
        }),
        beforeWrapper: _objectSpread({}, baseStyles.beforeWrapper, layoutStyles[spacing].beforeWrapper, {
          color: containerTextColor
        }),
        contentWrapper: baseStyles.contentWrapper,
        textWrapper: _objectSpread({}, baseStyles.textWrapper, {
          color: containerTextColor
        }),
        subTextWrapper: _objectSpread({}, baseStyles.subTextWrapper, layoutStyles[spacing].subTextWrapper, {
          color: colors.N200
        }),
        afterWrapper: _objectSpread({}, baseStyles.afterWrapper, layoutStyles[spacing].afterWrapper, {
          color: colors.N500
        })
      },
      product: {
        itemBase: _objectSpread({}, baseStyles.itemBase, layoutStyles[spacing].itemBase, {
          backgroundColor: productBackgroundColor,
          fill: productBackgroundColor
        }),
        beforeWrapper: _objectSpread({}, baseStyles.beforeWrapper, layoutStyles[spacing].beforeWrapper, {
          color: product.text.default
        }),
        contentWrapper: baseStyles.contentWrapper,
        textWrapper: _objectSpread({}, baseStyles.textWrapper, {
          color: product.text.default
        }),
        subTextWrapper: _objectSpread({}, baseStyles.subTextWrapper, layoutStyles[spacing].subTextWrapper, {
          color: product.text.subtle
        }),
        afterWrapper: _objectSpread({}, baseStyles.afterWrapper, layoutStyles[spacing].afterWrapper, {
          color: product.text.default
        })
      }
    };
  };
});