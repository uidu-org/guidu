import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, gridSize } from '@atlaskit/theme';
var dividerLineHeight = 2;
var dividerTotalHeight = gridSize() * 5;
var baseStyles = {
  borderRadius: '1px',
  flexShrink: 0,
  height: "".concat(dividerLineHeight, "px"),
  margin: "".concat((dividerTotalHeight - dividerLineHeight) / 2, "px 0")
};
export default (function (_ref) {
  var product = _ref.product;
  return function () {
    return {
      container: _objectSpread({}, baseStyles, {
        backgroundColor: colors.N30A
      }),
      product: _objectSpread({}, baseStyles, {
        backgroundColor: product.background.static
      })
    };
  };
});