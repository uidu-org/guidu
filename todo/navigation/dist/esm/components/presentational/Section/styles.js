import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();
var scrollHintHeight = 2;
var scrollHintSpacing = gridSize * 2;
var isGecko = typeof window !== 'undefined' && window.navigator.userAgent.indexOf('Gecko') >= 0;
var isWebkit = typeof window !== 'undefined' && window.navigator.userAgent.indexOf('AppleWebKit') >= 0;
var scrollBarSize = isGecko || isWebkit ? 0 : 30;

var getBaseStyles = function getBaseStyles(_ref) {
  var alwaysShowScrollHint = _ref.alwaysShowScrollHint;
  return {
    wrapper: {
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      '&::before': {
        borderRadius: 1,
        content: "''",
        display: 'block',
        flex: 0,
        height: "".concat(scrollHintHeight, "px"),
        left: "".concat(scrollHintSpacing, "px"),
        position: 'absolute',
        right: "".concat(scrollHintSpacing + scrollBarSize, "px"),
        top: 0,
        zIndex: 1
      }
    },
    inner: {
      flexBasis: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      overflowY: 'auto',
      paddingTop: 2,
      position: 'relative',
      '&::before': {
        borderRadius: 1,
        content: "''",
        display: alwaysShowScrollHint ? 'none' : 'block',
        flexShrink: 0,
        height: "".concat(scrollHintHeight, "px"),
        left: "".concat(scrollHintSpacing, "px"),
        position: 'absolute',
        right: "".concat(scrollHintSpacing, "px"),
        top: 0,
        zIndex: 2
      }
    },
    // These styles are passed to the children function for the consumer to
    // apply
    children: {
      boxSizing: 'border-box',
      paddingLeft: "".concat(gridSize * 2, "px"),
      paddingRight: "".concat(gridSize * 2, "px")
    }
  };
};

export default (function (_ref2) {
  var product = _ref2.product;
  return function (props) {
    var baseStyles = getBaseStyles(props);
    return {
      container: _objectSpread({}, baseStyles, {
        wrapper: _objectSpread({}, baseStyles.wrapper, {
          '&::before': _objectSpread({}, baseStyles.wrapper['&::before'], {
            backgroundColor: colors.N30A
          })
        }),
        inner: _objectSpread({}, baseStyles.inner, {
          '&::before': _objectSpread({}, baseStyles.inner['&::before'], {
            backgroundColor: colors.N20
          })
        })
      }),
      product: _objectSpread({}, baseStyles, {
        wrapper: _objectSpread({}, baseStyles.wrapper, {
          '&::before': _objectSpread({}, baseStyles.wrapper['&::before'], {
            backgroundColor: product.background.static
          })
        }),
        inner: _objectSpread({}, baseStyles.inner, {
          '&::before': _objectSpread({}, baseStyles.inner['&::before'], {
            backgroundColor: product.background.default
          })
        })
      })
    };
  };
});