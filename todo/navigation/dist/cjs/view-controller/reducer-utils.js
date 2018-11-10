"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

/**
 * View traversal function
 */
// Recursively map over all the items in a view, and if an item satisfies a
// given selector, apply a modifier to it.
var walkView = function walkView(selector) {
  return function (modifier) {
    return function (view) {
      var walk = walkView(selector)(modifier);
      var newView = [];
      view.forEach(function (viewItem) {
        var item = (0, _objectSpread2.default)({}, viewItem);

        if (item.items && item.items.length) {
          item = (0, _objectSpread2.default)({}, item, {
            items: walk(item.items)
          });
        }

        if (selector(item)) {
          item = modifier(item);
        }

        if (Array.isArray(item)) {
          newView = (0, _toConsumableArray2.default)(newView).concat((0, _toConsumableArray2.default)(item));
        } else if (item && (0, _typeof2.default)(item) === 'object') {
          newView = (0, _toConsumableArray2.default)(newView).concat([item]);
        }
      });
      return newView;
    };
  };
};
/**
 * Pre-configured selectors
 */
// Modify the item in a view with the given id.


var findId = function findId(itemId) {
  return walkView(function (_ref) {
    var id = _ref.id;
    return itemId === id;
  });
}; // Modify items in a view with an id that matches the given regular expression.


var matchId = function matchId(regexp) {
  return walkView(function (_ref2) {
    var id = _ref2.id;
    return regexp.test(id);
  });
}; // Modify the item in a view with the given legacyId.


var findLegacyId = function findLegacyId(itemId) {
  return walkView(function (_ref3) {
    var legacyId = _ref3.legacyId;
    return itemId === legacyId;
  });
}; // Modify items in a view with a legacyId that matches the given regular
// expression.


var matchLegacyId = function matchLegacyId(regexp) {
  return walkView(function (_ref4) {
    var legacyId = _ref4.legacyId;
    return !!legacyId && regexp.test(legacyId);
  });
};
/**
 * Common modifiers
 */
// Removes the selected item from the view.


var removeItem = function removeItem() {
  return null;
}; // Inserts an array of items before the selected item.


var insertBefore = function insertBefore(inserted) {
  return function (item) {
    return (0, _toConsumableArray2.default)(inserted).concat([item]);
  };
}; // Inserts an array of items after the selected item.


var insertAfter = function insertAfter(inserted) {
  return function (item) {
    return [item].concat((0, _toConsumableArray2.default)(inserted));
  };
}; // Adds items to the end of the selected item's `items` array.


var appendChildren = function appendChildren(appended) {
  return function (item) {
    return (0, _objectSpread2.default)({}, item, {
      items: (0, _toConsumableArray2.default)(item.items || []).concat((0, _toConsumableArray2.default)(appended))
    });
  };
}; // Adds items to the start of the selected item's `items` array.


var prependChildren = function prependChildren(prepended) {
  return function (item) {
    return (0, _objectSpread2.default)({}, item, {
      items: (0, _toConsumableArray2.default)(prepended).concat((0, _toConsumableArray2.default)(item.items || []))
    });
  };
};
/**
 * Transformers
 */
// Flatten navigation items


var flattenItems = function flattenItems(items) {
  var itemProps = [];
  walkView(function () {
    return true;
  })(function (item) {
    itemProps.push(item);
    return item;
  })(items);
  return itemProps;
};

var _default = {
  appendChildren: appendChildren,
  findId: findId,
  findLegacyId: findLegacyId,
  flattenItems: flattenItems,
  insertAfter: insertAfter,
  insertBefore: insertBefore,
  matchId: matchId,
  matchLegacyId: matchLegacyId,
  prependChildren: prependChildren,
  removeItem: removeItem,
  walkView: walkView
};
exports.default = _default;
module.exports = exports.default;