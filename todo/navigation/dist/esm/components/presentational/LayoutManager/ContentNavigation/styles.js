import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors } from '@atlaskit/theme';
import { CONTENT_NAV_WIDTH } from '../../../../common/constants';
var baseStyles = {
  boxSizing: 'border-box',
  height: '100%',
  left: 0,
  minWidth: CONTENT_NAV_WIDTH,
  overflowX: 'hidden',
  position: 'absolute',
  top: 0,
  width: '100%',
  // Reset stacking context so scroll hints from the product nav don't sit above
  // container nav
  zIndex: 0
};
export default (function (_ref) {
  var product = _ref.product;
  return function () {
    return {
      container: _objectSpread({}, baseStyles, {
        backgroundColor: colors.N20,
        color: colors.N500
      }),
      product: _objectSpread({}, baseStyles, {
        backgroundColor: product.background.default,
        color: product.text.default
      })
    };
  };
});