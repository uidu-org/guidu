"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.components = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("@atlaskit/theme");

var _analytics = require("../common/analytics");

var _RenderBlocker = _interopRequireDefault(require("../components/common/RenderBlocker"));

var _ContainerHeader = _interopRequireDefault(require("../components/presentational/ContainerHeader"));

var _Group = _interopRequireDefault(require("../components/presentational/Group"));

var _GroupHeading = _interopRequireDefault(require("../components/presentational/GroupHeading"));

var _HeaderSection = _interopRequireDefault(require("../components/presentational/HeaderSection"));

var _MenuSection = _interopRequireDefault(require("../components/presentational/MenuSection"));

var _Section = _interopRequireDefault(require("../components/presentational/Section"));

var _SectionHeading = _interopRequireDefault(require("../components/presentational/SectionHeading"));

var _Separator = _interopRequireDefault(require("../components/presentational/Separator"));

var _Switcher = _interopRequireDefault(require("../components/presentational/Switcher"));

var _Wordmark = _interopRequireDefault(require("../components/presentational/Wordmark"));

var _BackItem = _interopRequireDefault(require("../components/connected/BackItem"));

var _ConnectedItem = _interopRequireDefault(require("../components/connected/ConnectedItem"));

var _GoToItem = _interopRequireDefault(require("../components/connected/GoToItem"));

var _SortableContext = _interopRequireDefault(require("../components/connected/SortableContext"));

var _SortableGroup = _interopRequireDefault(require("../components/connected/SortableGroup"));

var _SortableItem = _interopRequireDefault(require("../components/connected/SortableItem"));

var gridSize = (0, _theme.gridSize)();
/**
 * ITEMS
 */
// Title

var GroupHeading = function GroupHeading(_ref) {
  var text = _ref.text,
      props = (0, _objectWithoutProperties2.default)(_ref, ["text"]);
  return _react.default.createElement(_GroupHeading.default, props, text);
}; // SectionHeading


var SectionHeading = function SectionHeading(_ref2) {
  var text = _ref2.text,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["text"]);
  return _react.default.createElement(_SectionHeading.default, props, text);
}; // ContainerHeader


var ContainerHeader = function ContainerHeader(props) {
  return (// -2px here to account for the extra space at the top of a MenuSection for
    // the scroll hint.
    _react.default.createElement("div", {
      css: {
        paddingBottom: gridSize * 2.5 - 2
      }
    }, _react.default.createElement(_ContainerHeader.default, props))
  );
};

var Debug = function Debug(props) {
  return _react.default.createElement("pre", {
    css: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      fontSize: '10px',
      overflowX: 'auto',
      padding: "".concat(gridSize / 2, "px")
    }
  }, JSON.stringify(props, null, 2));
};
/**
 * GROUPS
 */
// Group


var Group = function Group(_ref3) {
  var customComponents = _ref3.customComponents,
      hasSeparator = _ref3.hasSeparator,
      heading = _ref3.heading,
      items = _ref3.items,
      id = _ref3.id;
  return items.length ? _react.default.createElement(_Group.default, {
    heading: heading,
    hasSeparator: hasSeparator,
    id: id
  }, _react.default.createElement(ItemsRenderer, {
    items: items,
    customComponents: customComponents
  })) : null;
};

var SortableGroup = function SortableGroup(_ref4) {
  var customComponents = _ref4.customComponents,
      hasSeparator = _ref4.hasSeparator,
      heading = _ref4.heading,
      items = _ref4.items,
      id = _ref4.id;
  return items && items.length ? _react.default.createElement(_SortableGroup.default, {
    heading: heading,
    hasSeparator: hasSeparator,
    id: id
  }, _react.default.createElement(_RenderBlocker.default, {
    items: items,
    customComponents: customComponents
  }, _react.default.createElement(ItemsRenderer, {
    items: items,
    customComponents: customComponents
  }))) : null;
}; // Section


var Section = function Section(_ref5) {
  var _ref5$alwaysShowScrol = _ref5.alwaysShowScrollHint,
      alwaysShowScrollHint = _ref5$alwaysShowScrol === void 0 ? false : _ref5$alwaysShowScrol,
      customComponents = _ref5.customComponents,
      id = _ref5.id,
      items = _ref5.items,
      nestedGroupKey = _ref5.nestedGroupKey,
      parentId = _ref5.parentId,
      shouldGrow = _ref5.shouldGrow;
  return items.length ? _react.default.createElement(_Section.default, {
    alwaysShowScrollHint: alwaysShowScrollHint,
    id: id,
    key: nestedGroupKey,
    parentId: parentId,
    shouldGrow: shouldGrow
  }, function (_ref6) {
    var className = _ref6.className;
    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement(ItemsRenderer, {
      items: items,
      customComponents: customComponents
    }));
  }) : null;
};

var HeaderSection = function HeaderSection(_ref7) {
  var customComponents = _ref7.customComponents,
      id = _ref7.id,
      items = _ref7.items,
      nestedGroupKey = _ref7.nestedGroupKey;
  return items.length ? _react.default.createElement(_HeaderSection.default, {
    id: id,
    key: nestedGroupKey
  }, function (_ref8) {
    var className = _ref8.className;
    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement(ItemsRenderer, {
      items: items,
      customComponents: customComponents
    }));
  }) : null;
};

var MenuSection = function MenuSection(_ref9) {
  var alwaysShowScrollHint = _ref9.alwaysShowScrollHint,
      customComponents = _ref9.customComponents,
      id = _ref9.id,
      items = _ref9.items,
      nestedGroupKey = _ref9.nestedGroupKey,
      parentId = _ref9.parentId;
  return _react.default.createElement(_MenuSection.default, {
    alwaysShowScrollHint: alwaysShowScrollHint,
    id: id,
    key: nestedGroupKey,
    parentId: parentId
  }, function (_ref10) {
    var className = _ref10.className;
    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement(ItemsRenderer, {
      items: items,
      customComponents: customComponents
    }));
  });
};

var SortableContext = function SortableContext(_ref11) {
  var customComponents = _ref11.customComponents,
      id = _ref11.id,
      items = _ref11.items,
      onDragStart = _ref11.onDragStart,
      onDragUpdate = _ref11.onDragUpdate,
      onDragEnd = _ref11.onDragEnd;
  return items && items.length ? _react.default.createElement(_SortableContext.default, {
    id: id,
    onDragStart: onDragStart,
    onDragUpdate: onDragUpdate,
    onDragEnd: onDragEnd
  }, _react.default.createElement(ItemsRenderer, {
    items: items,
    customComponents: customComponents
  })) : null;
};

var itemComponents = {
  BackItem: _BackItem.default,
  ContainerHeader: ContainerHeader,
  Debug: Debug,
  GoToItem: _GoToItem.default,
  GroupHeading: GroupHeading,
  Item: _ConnectedItem.default,
  SortableItem: _SortableItem.default,
  SectionHeading: SectionHeading,
  Separator: _Separator.default,
  Switcher: _Switcher.default,
  Wordmark: _Wordmark.default
};
var groupComponents = {
  Group: Group,
  HeaderSection: HeaderSection,
  MenuSection: MenuSection,
  Section: Section,
  SortableContext: SortableContext,
  SortableGroup: SortableGroup
}; // Exported for testing purposes only.

var components = (0, _objectSpread2.default)({}, itemComponents, groupComponents);
/**
 * RENDERER
 */

exports.components = components;

var ItemsRenderer =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ItemsRenderer, _PureComponent);

  function ItemsRenderer() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ItemsRenderer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ItemsRenderer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.customComponentsWithAnalytics = new Map();

    _this.getCustomComponent = function (type) {
      // cache custom components wrapped with analytics
      // to prevent re-mounting of component on re-render
      var _this$props$customCom = _this.props.customComponents,
          customComponents = _this$props$customCom === void 0 ? {} : _this$props$customCom;

      var component = _this.customComponentsWithAnalytics.get(type);

      if (!component) {
        component = typeof type === 'string' ? (0, _analytics.navigationItemClicked)(customComponents[type], type) : (0, _analytics.navigationItemClicked)(type, type.displayName || 'inlineCustomComponent');

        _this.customComponentsWithAnalytics.set(type, component);
      }

      return component;
    };

    return _this;
  }

  (0, _createClass2.default)(ItemsRenderer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$customCom2 = _this$props.customComponents,
          customComponents = _this$props$customCom2 === void 0 ? {} : _this$props$customCom2,
          items = _this$props.items;
      return items.map(function (_ref12, index) {
        var type = _ref12.type,
            props = (0, _objectWithoutProperties2.default)(_ref12, ["type"]);
        var key = typeof props.nestedGroupKey === 'string' ? props.nestedGroupKey : props.id; // If they've provided a component as the type

        if (typeof type === 'function') {
          var CustomComponent = _this2.getCustomComponent(type);

          return _react.default.createElement(CustomComponent, (0, _extends2.default)({
            key: key
          }, props, {
            index: index // We pass our in-built components through to custom components so
            // they can wrap/render them if they want to.
            ,
            components: components,
            customComponents: customComponents
          }));
        }

        if (typeof type === 'string') {
          // If they've provided a type which matches one of our in-built group
          // components
          if (groupComponents[type]) {
            var G = groupComponents[type];
            return _react.default.createElement(G, (0, _extends2.default)({
              key: key
            }, props, {
              customComponents: customComponents
            }));
          } // If they've provided a type which matches one of our in-built item
          // components.


          if (itemComponents[type]) {
            var I = itemComponents[type];
            return _react.default.createElement(I, (0, _extends2.default)({
              key: key
            }, props, {
              index: index
            }));
          } // If they've provided a type which matches one of their defined custom
          // components.


          if (customComponents[type]) {
            var _CustomComponent = _this2.getCustomComponent(type);

            return _react.default.createElement(_CustomComponent, (0, _extends2.default)({
              key: key
            }, props, {
              index: index // We pass our in-built components through to custom components so
              // they can wrap/render them if they want to.
              ,
              components: components,
              customComponents: customComponents
            }));
          }
        }

        return _react.default.createElement(Debug, (0, _extends2.default)({
          key: key,
          type: type
        }, props));
      });
    }
  }]);
  return ItemsRenderer;
}(_react.PureComponent);

var _default = ItemsRenderer;
exports.default = _default;