"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _chromatism = _interopRequireDefault(require("chromatism"));

var _styles = _interopRequireDefault(require("../components/presentational/GlobalItem/styles"));

var _styles2 = _interopRequireDefault(require("../components/presentational/GlobalNav/styles"));

var _styles3 = _interopRequireDefault(require("../components/presentational/LayoutManager/ContentNavigation/styles"));

var _styles4 = _interopRequireDefault(require("../components/presentational/Item/styles"));

var _styles5 = _interopRequireDefault(require("../components/presentational/GroupHeading/styles"));

var _styles6 = _interopRequireDefault(require("../components/presentational/Separator/styles"));

var _styles7 = _interopRequireDefault(require("../components/presentational/ScrollableSectionInner/styles"));

var _styles8 = _interopRequireDefault(require("../components/presentational/Section/styles"));

var _styles9 = _interopRequireDefault(require("../components/presentational/SkeletonItem/styles"));

// TODO: @atlassian/navigation package is the only other package that uses chromatism (currently).
// We should update to chromatism@3.0.0 once @atlassian/navigation package is deprecated.
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
    acc[k] = _chromatism.default.convert((0, _objectSpread2.default)({}, parts, {
      s: parts.s + modifier[k].s,
      l: parts.l + modifier[k].l
    })).hex;
    return acc;
  }, {});
};

var getContextColors = function getContextColors(_ref6) {
  var background = _ref6.background,
      text = _ref6.text;

  var bgParts = _chromatism.default.convert(background).hsl;

  var vs = bgParts.l < 30 && bgParts.s < 50 ? -1 : 1;

  var textSubtle = _chromatism.default.brightness(1 + vs * 6, _chromatism.default.fade(4, background, text).hex[2]).hex;

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
    background: (0, _objectSpread2.default)({
      default: background
    }, getStatesBackground(bgParts, colorMod)),
    text: {
      default: text,
      subtle: textSubtle
    }
  };
};

var _default = function _default(_ref7) {
  var product = _ref7.product;
  var modeColors = {
    product: getContextColors(product)
  };
  return {
    globalItem: (0, _styles.default)(modeColors),
    globalNav: (0, _styles2.default)(modeColors),
    contentNav: (0, _styles3.default)(modeColors),
    heading: (0, _styles5.default)(modeColors),
    item: (0, _styles4.default)(modeColors),
    scrollHint: (0, _styles7.default)(modeColors),
    section: (0, _styles8.default)(modeColors),
    separator: (0, _styles6.default)(modeColors),
    skeletonItem: (0, _styles9.default)(modeColors)
  };
};

exports.default = _default;
module.exports = exports.default;