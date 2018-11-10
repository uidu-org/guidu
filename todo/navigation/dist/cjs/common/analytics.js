"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigationExpandedCollapsed = exports.navigationUILoaded = exports.navigationItemClicked = exports.navigationChannel = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _analyticsNext = require("@atlaskit/analytics-next");

var navigationChannel = 'navigation';
exports.navigationChannel = navigationChannel;

var getDisplayName = function getDisplayName(component) {
  return component ? component.displayName || component.name : undefined;
};

var kebabToCamelCase = function kebabToCamelCase(str) {
  return "".concat(str).replace(/-([a-z])/gi, function (g) {
    return g[1].toUpperCase();
  });
};

var navigationItemClicked = function navigationItemClicked(Component, componentName) {
  var useActionSubjectId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return (0, _analyticsNext.withAnalyticsContext)({
    componentName: componentName
  })((0, _analyticsNext.withAnalyticsEvents)({
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
        payload = (0, _objectSpread2.default)({}, basePayload, {
          actionSubjectId: id
        });
      } else {
        var attributes = basePayload.attributes,
            basePayloadSansAttributes = (0, _objectWithoutProperties2.default)(basePayload, ["attributes"]);
        payload = (0, _objectSpread2.default)({}, basePayloadSansAttributes, {
          attributes: (0, _objectSpread2.default)({}, attributes, {
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

exports.navigationItemClicked = navigationItemClicked;

var navigationUILoaded = function navigationUILoaded(createAnalyticsEvent, _ref) {
  var layer = _ref.layer;
  return createAnalyticsEvent({
    action: 'initialised',
    actionSubject: 'navigationUI',
    actionSubjectId: layer,
    eventType: 'operational'
  }).fire(navigationChannel);
};

exports.navigationUILoaded = navigationUILoaded;

var navigationExpandedCollapsed = function navigationExpandedCollapsed(createAnalyticsEvent, _ref2) {
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

exports.navigationExpandedCollapsed = navigationExpandedCollapsed;