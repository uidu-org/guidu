"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StaticWrapper = exports.ScrollableInner = exports.ScrollableWrapper = exports.ScrollableTransitionGroup = exports.StaticTransitionGroup = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _TransitionGroup = _interopRequireDefault(require("react-transition-group/TransitionGroup"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _emotion = require("emotion");

var _analyticsNamespacedContext = require("@atlaskit/analytics-namespaced-context");

var _constants = require("../../../common/constants");

var _getAnimationStyles = _interopRequireDefault(require("./getAnimationStyles"));

var StaticTransitionGroup = function StaticTransitionGroup(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _emotion.css)({
      position: 'relative'
    })
  }, props));
};

exports.StaticTransitionGroup = StaticTransitionGroup;

var ScrollableTransitionGroup = function ScrollableTransitionGroup(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    className: (0, _emotion.css)({
      position: 'relative',
      flex: '1 1 100%',
      overflowY: 'hidden'
    })
  }, props));
};

exports.ScrollableTransitionGroup = ScrollableTransitionGroup;

var ScrollableWrapper = function ScrollableWrapper(props) {
  return _react.default.createElement("div", props);
};

exports.ScrollableWrapper = ScrollableWrapper;

var ScrollableInner = function ScrollableInner(props) {
  return _react.default.createElement("div", props);
};

exports.ScrollableInner = ScrollableInner;

var StaticWrapper = function StaticWrapper(props) {
  return _react.default.createElement("div", props);
};

exports.StaticWrapper = StaticWrapper;

var Section =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Section, _PureComponent);

  function Section() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Section);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Section)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      traversalDirection: null
    };
    _this.isMounted = false;
    return _this;
  }

  (0, _createClass2.default)(Section, [{
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
      return _react.default.createElement(_TransitionGroup.default, {
        component: shouldGrow ? ScrollableTransitionGroup : StaticTransitionGroup,
        appear: true
      }, _react.default.createElement(_Transition.default, {
        key: id,
        timeout: this.isMounted ? _constants.transitionDurationMs : 0
      }, function (state) {
        var traversalDirection = _this2.state.traversalDirection;
        var animationStyles = (0, _getAnimationStyles.default)({
          state: state,
          traversalDirection: traversalDirection
        }); // We provide both the styles object and the computed className.
        // This allows consumers to patch the styles if they want to, or
        // simply apply the className if they're not using a JSS parser like
        // emotion.

        var className = (0, _emotion.css)(styles.children);
        var resolvedChildren = children({
          className: className,
          css: styles.children
        });
        return _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
          data: {
            attributes: {
              viewSection: id
            },
            componentName: 'Section'
          }
        }, shouldGrow ? _react.default.createElement(ScrollableWrapper, {
          className: (0, _emotion.css)((0, _objectSpread2.default)({}, styles.wrapper, animationStyles))
        }, _react.default.createElement(ScrollableInner, {
          className: (0, _emotion.css)(styles.inner)
        }, resolvedChildren)) : _react.default.createElement(StaticWrapper, {
          className: (0, _emotion.css)(animationStyles)
        }, resolvedChildren));
      }));
    }
  }]);
  return Section;
}(_react.PureComponent);

exports.default = Section;