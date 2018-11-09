import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import Loadable from 'react-loadable';
import React, { Component } from 'react';

function checkMarkAndSendAnalytics() {
  if (!performance.mark) {
    return null;
  } // We mark before doing anything because speed matters here


  performance.mark('loaded');

  var _performance$getEntri = performance.getEntriesByType('mark').filter(function (match) {
    return match.name.includes('navigate-') || match.name === 'loaded';
  }),
      _performance$getEntri2 = _slicedToArray(_performance$getEntri, 2),
      navigate = _performance$getEntri2[0],
      loaded = _performance$getEntri2[1];

  if (navigate && loaded) {
    performance.measure('analytics-measure', navigate.name, 'loaded');
    var entries = performance.getEntriesByName('analytics-measure', 'measure');
  }

  performance.clearMarks();
  performance.clearMeasures();
  return null;
}

var Wrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(Wrapper, _Component);

  function Wrapper() {
    _classCallCheck(this, Wrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).apply(this, arguments));
  }

  _createClass(Wrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {// checkMarkAndSendAnalytics();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return Wrapper;
}(Component);

var WrappedLoadable = function WrappedLoadable(_ref) {
  var _render = _ref.render,
      rest = _objectWithoutProperties(_ref, ["render"]);

  return Loadable(_objectSpread({}, rest, {
    render: function render(args) {
      return React.createElement(Wrapper, null, _render(args));
    }
  }));
};

export default WrappedLoadable;