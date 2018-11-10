import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _extends from "@babel/runtime/helpers/extends";
import React, { PureComponent } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { css as parseJss } from 'emotion';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { transitionDurationMs } from '../../../common/constants';
import getAnimationStyles from './getAnimationStyles';
export var StaticTransitionGroup = function StaticTransitionGroup(props) {
  return React.createElement("div", _extends({
    className: parseJss({
      position: 'relative'
    })
  }, props));
};
export var ScrollableTransitionGroup = function ScrollableTransitionGroup(props) {
  return React.createElement("div", _extends({
    className: parseJss({
      position: 'relative',
      flex: '1 1 100%',
      overflowY: 'hidden'
    })
  }, props));
};
export var ScrollableWrapper = function ScrollableWrapper(props) {
  return React.createElement("div", props);
};
export var ScrollableInner = function ScrollableInner(props) {
  return React.createElement("div", props);
};
export var StaticWrapper = function StaticWrapper(props) {
  return React.createElement("div", props);
};

var Section =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Section, _PureComponent);

  function Section() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Section);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Section)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      traversalDirection: null
    };
    _this.isMounted = false;
    return _this;
  }

  _createClass(Section, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.parentId && nextProps.parentId === this.props.id) {
        this.setState({
          traversalDirection: 'down'
        });
      }

      if (this.props.parentId && this.props.parentId === nextProps.id) {
        this.setState({
          traversalDirection: 'up'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          alwaysShowScrollHint = _this$props.alwaysShowScrollHint,
          id = _this$props.id,
          children = _this$props.children,
          shouldGrow = _this$props.shouldGrow,
          styleReducer = _this$props.styles,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var styles = styleReducer(mode.section({
        alwaysShowScrollHint: alwaysShowScrollHint
      })[context]);
      return React.createElement(TransitionGroup, {
        component: shouldGrow ? ScrollableTransitionGroup : StaticTransitionGroup,
        appear: true
      }, React.createElement(Transition, {
        key: id,
        timeout: this.isMounted ? transitionDurationMs : 0
      }, function (state) {
        var traversalDirection = _this2.state.traversalDirection;
        var animationStyles = getAnimationStyles({
          state: state,
          traversalDirection: traversalDirection
        }); // We provide both the styles object and the computed className.
        // This allows consumers to patch the styles if they want to, or
        // simply apply the className if they're not using a JSS parser like
        // emotion.

        var className = parseJss(styles.children);
        var resolvedChildren = children({
          className: className,
          css: styles.children
        });
        return React.createElement(NavigationAnalyticsContext, {
          data: {
            attributes: {
              viewSection: id
            },
            componentName: 'Section'
          }
        }, shouldGrow ? React.createElement(ScrollableWrapper, {
          className: parseJss(_objectSpread({}, styles.wrapper, animationStyles))
        }, React.createElement(ScrollableInner, {
          className: parseJss(styles.inner)
        }, resolvedChildren)) : React.createElement(StaticWrapper, {
          className: parseJss(animationStyles)
        }, resolvedChildren));
      }));
    }
  }]);

  return Section;
}(PureComponent);

export { Section as default };