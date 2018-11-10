import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component, Fragment } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import Section from '../Section';
import SkeletonContainerHeader from '../SkeletonContainerHeader';
import SkeletonItem from '../SkeletonItem';
var gridSize = gridSizeFn();

var SkeletonContainerView =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonContainerView, _Component);

  function SkeletonContainerView() {
    _classCallCheck(this, SkeletonContainerView);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonContainerView).apply(this, arguments));
  }

  _createClass(SkeletonContainerView, [{
    key: "render",
    value: function render() {
      return React.createElement(Fragment, null, React.createElement(Section, null, function (_ref) {
        var css = _ref.css;
        return React.createElement("div", {
          css: _objectSpread({}, css, {
            paddingTop: gridSize * 2.5,
            paddingBottom: gridSize * 2.5
          })
        }, React.createElement(SkeletonContainerHeader, {
          hasBefore: true
        }));
      }), React.createElement(Section, null, function (_ref2) {
        var className = _ref2.className;
        return React.createElement("div", {
          className: className
        }, React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }));
      }));
    }
  }]);

  return SkeletonContainerView;
}(Component);

export { SkeletonContainerView as default };