import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import Transition from 'react-transition-group/Transition';
var DURATION = 300;

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getTransition(keys) {
  return {
    transition: keys.map(function (k) {
      return "".concat(camelToKebab(k), " ").concat(DURATION, "ms cubic-bezier(0.2, 0, 0, 1)");
    }).join(',')
  };
}

function getStyle(_ref) {
  var keys = _ref.keys,
      values = _ref.values;
  var style = {};
  keys.forEach(function (k, i) {
    style[k] = values[i];
  });
  return style;
}

function getChanges(keys) {
  var props = keys.map(function (k) {
    return camelToKebab(k);
  });
  return {
    willChange: props.join(',')
  };
}

export function isTransitioning(state) {
  return ['entering', 'exiting'].includes(state);
}

function NOOP() {}

var ResizeTransition =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ResizeTransition, _PureComponent);

  function ResizeTransition() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResizeTransition);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResizeTransition)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.target = void 0;
    _this.isMounted = false;

    _this.getTarget = function (ref) {
      _this.target = ref;
      var innerRef = _this.props.innerRef;
      if (innerRef) innerRef(ref);
    };

    return _this;
  }

  _createClass(ResizeTransition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          from = _this$props.from,
          onExpandStart = _this$props.onExpandStart,
          onExpandEnd = _this$props.onExpandEnd,
          onCollapseStart = _this$props.onCollapseStart,
          onCollapseEnd = _this$props.onCollapseEnd,
          properties = _this$props.properties,
          to = _this$props.to,
          userIsDragging = _this$props.userIsDragging,
          inProp = _this$props.in;
      return React.createElement(Transition, {
        onEntering: onExpandStart,
        onEntered: onExpandEnd,
        onExiting: onCollapseStart,
        onExited: onCollapseEnd,
        in: inProp,
        timeout: this.isMounted ? DURATION : 0
      }, function (transitionState) {
        // transitions interupt manual resize behaviour
        var cssTransition = !userIsDragging && _this2.isMounted ? getTransition(properties) : {}; // `from` and `to` styles tweened by the transition

        var dynamicProperties = {
          exiting: getStyle({
            keys: properties,
            values: from
          }),
          exited: getStyle({
            keys: properties,
            values: from
          }),
          entering: getStyle({
            keys: properties,
            values: to
          }),
          entered: getStyle({
            keys: properties,
            values: to
          })
        }; // due to the use of 3d transform for GPU acceleration, which
        // changes the stacking context, we only apply the transform during
        // the animation period.

        var gpuAcceleration = isTransitioning(transitionState) ? {
          transform: 'translate3d(0, 0, 0)'
        } : {}; // let the browser know what we're up to

        var willChange = getChanges(properties); // put it all together

        var transitionStyle = _objectSpread({}, willChange, cssTransition, gpuAcceleration, dynamicProperties[transitionState]);

        return _this2.props.children({
          transitionStyle: transitionStyle,
          // consumers must apply `transitionStyle`
          transitionState: transitionState // lets consumers react to the current state

        });
      });
    }
  }]);

  return ResizeTransition;
}(PureComponent);

ResizeTransition.defaultProps = {
  onExpandStart: NOOP,
  onExpandEnd: NOOP,
  onCollapseStart: NOOP,
  onCollapseEnd: NOOP
};
export { ResizeTransition as default };