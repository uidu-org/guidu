import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, gridSize, math } from '@atlaskit/theme';

var MetaItem = function MetaItem(props) {
  return React.createElement(DI, {
    className: "py-1"
  }, React.createElement(DT, null, props.label), React.createElement(DD, null, props.href ? React.createElement("a", {
    href: props.href,
    target: "_new"
  }, props.summary) : props.summary));
};

var MetaData =
/*#__PURE__*/
function (_Component) {
  _inherits(MetaData, _Component);

  function MetaData() {
    _classCallCheck(this, MetaData);

    return _possibleConstructorReturn(this, _getPrototypeOf(MetaData).apply(this, arguments));
  }

  _createClass(MetaData, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          packageSrc = _this$props.packageSrc,
          packageName = _this$props.packageName;
      return React.createElement(Meta, null, React.createElement(MetaItem, {
        label: "Install",
        summary: React.createElement("code", null, "yarn add ", packageName)
      }), React.createElement(MetaItem, {
        href: "https://www.npmjs.com/package/".concat(packageName),
        label: "npm",
        summary: packageName
      }), React.createElement(MetaItem, {
        href: packageSrc,
        label: "Source",
        summary: "Github"
      }), React.createElement(MetaItem, {
        href: "https://unpkg.com/".concat(packageName, "/dist/"),
        label: "Bundle",
        summary: "unpkg.com"
      }));
    }
  }]);

  return MetaData;
}(Component);

export { MetaData as default };
var Meta = styled.section.withConfig({
  displayName: "MetaData__Meta",
  componentId: "sc-5md7ea-0"
})(["\n  display: flex;\n  flex-wrap: wrap;\n  padding-bottom: ", "px;\n  padding-top: ", "px;\n\n  @media (min-width: 780px) {\n    padding-top: ", "px;\n  }\n"], math.multiply(gridSize, 3), math.multiply(gridSize, 1.5), math.multiply(gridSize, 3));
var DI = styled.div.withConfig({
  displayName: "MetaData__DI",
  componentId: "sc-5md7ea-1"
})(["\n  box-sizing: border-box;\n  display: flex;\n  flex-basis: 100%;\n  flex-direction: column;\n  padding: 0.4em 0;\n\n  @media (min-width: 780px) {\n    flex-direction: row;\n  }\n"]);
var DT = styled.div.withConfig({
  displayName: "MetaData__DT",
  componentId: "sc-5md7ea-2"
})(["\n  color: ", ";\n  flex-basis: 25%;\n"], colors.subtleText);
var DD = styled.div.withConfig({
  displayName: "MetaData__DD",
  componentId: "sc-5md7ea-3"
})(["\n  flex: 1 0 auto;\n"]);