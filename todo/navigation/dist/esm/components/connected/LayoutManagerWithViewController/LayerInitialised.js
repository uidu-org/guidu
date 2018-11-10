import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import { Component } from 'react';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { navigationUILoaded } from '../../../common/analytics';

var LayerInitialised =
/*#__PURE__*/
function (_Component) {
  _inherits(LayerInitialised, _Component);

  function LayerInitialised() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LayerInitialised);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LayerInitialised)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.fireInitialisedEvent = function () {
      var _this$props = _this.props,
          createAnalyticsEvent = _this$props.createAnalyticsEvent,
          activeView = _this$props.activeView,
          onInitialised = _this$props.onInitialised;

      if (activeView) {
        navigationUILoaded(createAnalyticsEvent, {
          layer: activeView.type
        });

        if (onInitialised) {
          onInitialised();
        }
      }
    };

    return _this;
  }

  _createClass(LayerInitialised, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.initialised) {
        this.fireInitialisedEvent();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.initialised) {
        this.fireInitialisedEvent();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return LayerInitialised;
}(Component);

export default withAnalyticsEvents()(LayerInitialised);