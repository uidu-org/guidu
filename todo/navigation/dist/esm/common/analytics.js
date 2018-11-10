import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { withAnalyticsEvents, withAnalyticsContext } from '@atlaskit/analytics-next';
export var navigationChannel = 'navigation';

var getDisplayName = function getDisplayName(component) {
  return component ? component.displayName || component.name : undefined;
};

var kebabToCamelCase = function kebabToCamelCase(str) {
  return "".concat(str).replace(/-([a-z])/gi, function (g) {
    return g[1].toUpperCase();
  });
};

export var navigationItemClicked = function navigationItemClicked(Component, componentName) {
  var useActionSubjectId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return withAnalyticsContext({
    componentName: componentName
  })(withAnalyticsEvents({
    onClick: function onClick(createAnalyticsEvent, props) {
      var id = kebabToCamelCase(props.id);
      var basePayload = {
        action: 'clicked',
        actionSubject: 'navigationItem',
        attributes: {
          componentName: componentName,
          iconSource: getDisplayName(props.icon) || getDisplayName(props.before),
          navigationItemIndex: props.index
        }
      };
      var payload;

      if (useActionSubjectId) {
        payload = _objectSpread({}, basePayload, {
          actionSubjectId: id
        });
      } else {
        var attributes = basePayload.attributes,
            basePayloadSansAttributes = _objectWithoutProperties(basePayload, ["attributes"]);

        payload = _objectSpread({}, basePayloadSansAttributes, {
          attributes: _objectSpread({}, attributes, {
            itemId: id
          })
        });
      }

      var event = createAnalyticsEvent(payload);
      event.fire(navigationChannel);
      return null;
    }
  })(Component));
};
export var navigationUILoaded = function navigationUILoaded(createAnalyticsEvent, _ref) {
  var layer = _ref.layer;
  return createAnalyticsEvent({
    action: 'initialised',
    actionSubject: 'navigationUI',
    actionSubjectId: layer,
    eventType: 'operational'
  }).fire(navigationChannel);
};
export var navigationExpandedCollapsed = function navigationExpandedCollapsed(createAnalyticsEvent, _ref2) {
  var isCollapsed = _ref2.isCollapsed,
      trigger = _ref2.trigger;
  return createAnalyticsEvent({
    action: isCollapsed ? 'collapsed' : 'expanded',
    actionSubject: 'productNavigation',
    attributes: {
      trigger: trigger
    }
  }).fire(navigationChannel);
};