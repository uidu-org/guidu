import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();
var fontSize = 11;
var baseStyles = {
  headingBase: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    fontSize: "".concat(fontSize, "px"),
    fontWeight: 600,
    lineHeight: gridSize * 2 / fontSize,
    margin: "".concat(gridSize * 4, "px 0 ").concat(gridSize, "px"),
    padding: "0 ".concat(gridSize * 1.5, "px"),
    textTransform: 'uppercase'
  },
  textWrapper: {
    flexGrow: 1,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  afterWrapper: {
    lineHeight: 1,
    marginLeft: "".concat(gridSize / 2, "px")
  }
};
export default (function (_ref) {
  var product = _ref.product;
  return function () {
    return {
      container: _objectSpread({}, baseStyles, {
        headingBase: _objectSpread({}, baseStyles.headingBase, {
          color: colors.N200
        })
      }),
      product: _objectSpread({}, baseStyles, {
        headingBase: _objectSpread({}, baseStyles.headingBase, {
          color: product.text.subtle
        })
      })
    };
  };
});