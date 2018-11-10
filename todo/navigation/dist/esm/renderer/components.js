import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { PureComponent } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { navigationItemClicked } from '../common/analytics';
import RenderBlocker from '../components/common/RenderBlocker';
import ContainerHeaderComponent from '../components/presentational/ContainerHeader';
import GroupComponent from '../components/presentational/Group';
import GroupHeadingComponent from '../components/presentational/GroupHeading';
import HeaderSectionComponent from '../components/presentational/HeaderSection';
import MenuSectionComponent from '../components/presentational/MenuSection';
import SectionComponent from '../components/presentational/Section';
import SectionHeadingComponent from '../components/presentational/SectionHeading';
import Separator from '../components/presentational/Separator';
import Switcher from '../components/presentational/Switcher';
import Wordmark from '../components/presentational/Wordmark';
import BackItem from '../components/connected/BackItem';
import ConnectedItem from '../components/connected/ConnectedItem';
import GoToItem from '../components/connected/GoToItem';
import SortableContextComponent from '../components/connected/SortableContext';
import SortableGroupComponent from '../components/connected/SortableGroup';
import SortableItem from '../components/connected/SortableItem';
var gridSize = gridSizeFn();
/**
 * ITEMS
 */
// Title

var GroupHeading = function GroupHeading(_ref) {
  var text = _ref.text,
      props = _objectWithoutProperties(_ref, ["text"]);

  return React.createElement(GroupHeadingComponent, props, text);
}; // SectionHeading


var SectionHeading = function SectionHeading(_ref2) {
  var text = _ref2.text,
      props = _objectWithoutProperties(_ref2, ["text"]);

  return React.createElement(SectionHeadingComponent, props, text);
}; // ContainerHeader


var ContainerHeader = function ContainerHeader(props) {
  return (// -2px here to account for the extra space at the top of a MenuSection for
    // the scroll hint.
    React.createElement("div", {
      css: {
        paddingBottom: gridSize * 2.5 - 2
      }
    }, React.createElement(ContainerHeaderComponent, props))
  );
};

var Debug = function Debug(props) {
  return React.createElement("pre", {
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
  return items.length ? React.createElement(GroupComponent, {
    heading: heading,
    hasSeparator: hasSeparator,
    id: id
  }, React.createElement(ItemsRenderer, {
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
  return items && items.length ? React.createElement(SortableGroupComponent, {
    heading: heading,
    hasSeparator: hasSeparator,
    id: id
  }, React.createElement(RenderBlocker, {
    items: items,
    customComponents: customComponents
  }, React.createElement(ItemsRenderer, {
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
  return items.length ? React.createElement(SectionComponent, {
    alwaysShowScrollHint: alwaysShowScrollHint,
    id: id,
    key: nestedGroupKey,
    parentId: parentId,
    shouldGrow: shouldGrow
  }, function (_ref6) {
    var className = _ref6.className;
    return React.createElement("div", {
      className: className
    }, React.createElement(ItemsRenderer, {
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
  return items.length ? React.createElement(HeaderSectionComponent, {
    id: id,
    key: nestedGroupKey
  }, function (_ref8) {
    var className = _ref8.className;
    return React.createElement("div", {
      className: className
    }, React.createElement(ItemsRenderer, {
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
  return React.createElement(MenuSectionComponent, {
    alwaysShowScrollHint: alwaysShowScrollHint,
    id: id,
    key: nestedGroupKey,
    parentId: parentId
  }, function (_ref10) {
    var className = _ref10.className;
    return React.createElement("div", {
      className: className
    }, React.createElement(ItemsRenderer, {
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
  return items && items.length ? React.createElement(SortableContextComponent, {
    id: id,
    onDragStart: onDragStart,
    onDragUpdate: onDragUpdate,
    onDragEnd: onDragEnd
  }, React.createElement(ItemsRenderer, {
    items: items,
    customComponents: customComponents
  })) : null;
};

var itemComponents = {
  BackItem: BackItem,
  ContainerHeader: ContainerHeader,
  Debug: Debug,
  GoToItem: GoToItem,
  GroupHeading: GroupHeading,
  Item: ConnectedItem,
  SortableItem: SortableItem,
  SectionHeading: SectionHeading,
  Separator: Separator,
  Switcher: Switcher,
  Wordmark: Wordmark
};
var groupComponents = {
  Group: Group,
  HeaderSection: HeaderSection,
  MenuSection: MenuSection,
  Section: Section,
  SortableContext: SortableContext,
  SortableGroup: SortableGroup
}; // Exported for testing purposes only.

export var components = _objectSpread({}, itemComponents, groupComponents);
/**
 * RENDERER
 */

var ItemsRenderer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ItemsRenderer, _PureComponent);

  function ItemsRenderer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ItemsRenderer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ItemsRenderer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.customComponentsWithAnalytics = new Map();

    _this.getCustomComponent = function (type) {
      // cache custom components wrapped with analytics
      // to prevent re-mounting of component on re-render
      var _this$props$customCom = _this.props.customComponents,
          customComponents = _this$props$customCom === void 0 ? {} : _this$props$customCom;

      var component = _this.customComponentsWithAnalytics.get(type);

      if (!component) {
        component = typeof type === 'string' ? navigationItemClicked(customComponents[type], type) : navigationItemClicked(type, type.displayName || 'inlineCustomComponent');

        _this.customComponentsWithAnalytics.set(type, component);
      }

      return component;
    };

    return _this;
  }

  _createClass(ItemsRenderer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$customCom2 = _this$props.customComponents,
          customComponents = _this$props$customCom2 === void 0 ? {} : _this$props$customCom2,
          items = _this$props.items;
      return items.map(function (_ref12, index) {
        var type = _ref12.type,
            props = _objectWithoutProperties(_ref12, ["type"]);

        var key = typeof props.nestedGroupKey === 'string' ? props.nestedGroupKey : props.id; // If they've provided a component as the type

        if (typeof type === 'function') {
          var CustomComponent = _this2.getCustomComponent(type);

          return React.createElement(CustomComponent, _extends({
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
            return React.createElement(G, _extends({
              key: key
            }, props, {
              customComponents: customComponents
            }));
          } // If they've provided a type which matches one of our in-built item
          // components.


          if (itemComponents[type]) {
            var I = itemComponents[type];
            return React.createElement(I, _extends({
              key: key
            }, props, {
              index: index
            }));
          } // If they've provided a type which matches one of their defined custom
          // components.


          if (customComponents[type]) {
            var _CustomComponent = _this2.getCustomComponent(type);

            return React.createElement(_CustomComponent, _extends({
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

        return React.createElement(Debug, _extends({
          key: key,
          type: type
        }, props));
      });
    }
  }]);

  return ItemsRenderer;
}(PureComponent);

export default ItemsRenderer;