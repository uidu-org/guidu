import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';

var InteractionStateManager =
/*#__PURE__*/
function (_Component) {
  _inherits(InteractionStateManager, _Component);

  function InteractionStateManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InteractionStateManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InteractionStateManager)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isActive: false,
      isHover: false,
      isFocused: false
    };

    _this.onMouseDown = function (e) {
      e.preventDefault();

      _this.setState({
        isActive: true
      });
    };

    _this.onMouseUp = function (e) {
      e.preventDefault();

      _this.setState({
        isActive: false,
        isHover: true
      });
    };

    _this.onMouseEnter = function () {
      if (!_this.state.isHover) {
        _this.setState({
          isHover: true
        });
      }
    };

    _this.onMouseLeave = function () {
      _this.setState({
        isActive: false,
        isHover: false
      });
    };

    _this.onFocus = function () {
      return _this.setState({
        isFocused: true
      });
    };

    _this.onBlur = function () {
      return _this.setState({
        isFocused: false
      });
    };

    return _this;
  }

  _createClass(InteractionStateManager, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        onMouseDown: this.onMouseDown,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onMouseUp: this.onMouseUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        role: "presentation",
        css: {
          width: '100%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }, this.props.children(this.state));
    }
  }]);

  return InteractionStateManager;
}(Component);

export { InteractionStateManager as default };