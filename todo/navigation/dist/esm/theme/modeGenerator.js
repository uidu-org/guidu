import _objectSpread from "@babel/runtime/helpers/objectSpread";
// TODO: @atlassian/navigation package is the only other package that uses chromatism (currently).
// We should update to chromatism@3.0.0 once @atlassian/navigation package is deprecated.
import chromatism from 'chromatism';
import globalItemStyles from '../components/presentational/GlobalItem/styles';
import globalNavStyles from '../components/presentational/GlobalNav/styles';
import contentNavStyles from '../components/presentational/LayoutManager/ContentNavigation/styles';
import itemStyles from '../components/presentational/Item/styles';
import headingStyles from '../components/presentational/GroupHeading/styles';
import separatorStyles from '../components/presentational/Separator/styles';
import scrollHintStyles from '../components/presentational/ScrollableSectionInner/styles';
import sectionStyles from '../components/presentational/Section/styles';
import skeletonItemStyles from '../components/presentational/SkeletonItem/styles';
var colorMatrix = [{
  // Dark
  when: function when(_ref) {
    var l = _ref.l;
    return l <= 20;
  },
  hint: {
    s: 0,
    l: 16
  },
  interact: {
    s: -4,
    l: 8
  },
  static: {
    s: -8,
    l: 12
  }
}, {
  // bright and saturated
  when: function when(_ref2) {
    var s = _ref2.s,
        l = _ref2.l;
    return s > 65 && l > 30;
  },
  hint: {
    s: -16,
    l: 12
  },
  interact: {
    s: -16,
    l: 8
  },
  static: {
    s: 0,
    l: -8
  }
}, {
  // bright and dull
  when: function when(_ref3) {
    var s = _ref3.s,
        l = _ref3.l;
    return s <= 20 && l > 90;
  },
  hint: {
    s: 0,
    l: -2
  },
  interact: {
    s: 0,
    l: -4
  },
  static: {
    s: 0,
    l: -6
  }
}, {
  // pastel
  when: function when(_ref4) {
    var s = _ref4.s,
        l = _ref4.l;
    return s > 20 && s < 50 && l > 50;
  },
  hint: {
    s: 24,
    l: 2
  },
  interact: {
    s: 8,
    l: -4
  },
  static: {
    s: 8,
    l: -12
  }
}, {
  // dull
  when: function when(_ref5) {
    var s = _ref5.s,
        l = _ref5.l;
    return s <= 20 && l <= 90;
  },
  hint: {
    s: 0,
    l: 4
  },
  interact: {
    s: 0,
    l: -4
  },
  static: {
    s: 0,
    l: -8
  }
}];

var getStatesBackground = function getStatesBackground(parts, modifier) {
  return ['hint', 'interact', 'static'].reduce(function (acc, k) {
    acc[k] = chromatism.convert(_objectSpread({}, parts, {
      s: parts.s + modifier[k].s,
      l: parts.l + modifier[k].l
    })).hex;
    return acc;
  }, {});
};

var getContextColors = function getContextColors(_ref6) {
  var background = _ref6.background,
      text = _ref6.text;
  var bgParts = chromatism.convert(background).hsl;
  var vs = bgParts.l < 30 && bgParts.s < 50 ? -1 : 1;
  var textSubtle = chromatism.brightness(1 + vs * 6, chromatism.fade(4, background, text).hex[2]).hex;
  var colorMod = colorMatrix.find(function (cm) {
    return cm.when(bgParts);
  }) || {
    hint: {
      s: 0,
      l: 8
    },
    interact: {
      s: 0,
      l: 4
    },
    static: {
      s: 8,
      l: -6
    }
  };
  return {
    background: _objectSpread({
      default: background
    }, getStatesBackground(bgParts, colorMod)),
    text: {
      default: text,
      subtle: textSubtle
    }
  };
};

export default (function (_ref7) {
  var product = _ref7.product;
  var modeColors = {
    product: getContextColors(product)
  };
  return {
    globalItem: globalItemStyles(modeColors),
    globalNav: globalNavStyles(modeColors),
    contentNav: contentNavStyles(modeColors),
    heading: headingStyles(modeColors),
    item: itemStyles(modeColors),
    scrollHint: scrollHintStyles(modeColors),
    section: sectionStyles(modeColors),
    separator: separatorStyles(modeColors),
    skeletonItem: skeletonItemStyles(modeColors)
  };
});