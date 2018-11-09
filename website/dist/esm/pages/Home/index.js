import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
// // 
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { gridSize, math, colors } from '@atlaskit/theme';
import Cards from './Cards';
import { TABLET_BREAKPOINT_MIN } from './config';
import '../../assets/css/charlie-display-font.less';
var fonts = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
var Title = styled.h1.withConfig({
  displayName: "Home__Title",
  componentId: "sc-1ql3lw6-0"
})(["\n  color: ", ";\n  font-family: 'Charlie_Display_Semibold', ", "; /* stylelint-disable-line */\n  font-size: 52px;\n  margin: 80px 0 0 !important;\n  letter-spacing: 0;\n"], colors.N0, fonts);
var Intro = styled.div.withConfig({
  displayName: "Home__Intro",
  componentId: "sc-1ql3lw6-1"
})(["\n  color: ", ";\n  display: inline-block;\n  font-size: 24px;\n  font-family: 'Charlie_Display_Regular', ", "; /* stylelint-disable-line */\n  font-weight: 300;\n  margin-bottom: 80px;\n  margin-top: 24px;\n  max-width: 640px;\n  letter-spacing: 0;\n\n  a {\n    color: ", ";\n\n    &:hover {\n      color: ", ";\n    }\n  }\n"], colors.N0, fonts, colors.B75, colors.N0);
var HomePageWrapper = styled.div.withConfig({
  displayName: "Home__HomePageWrapper",
  componentId: "sc-1ql3lw6-2"
})(["\n  margin: 0 auto;\n  text-align: center;\n  color: ", ";\n  margin-top: ", "px;\n\n  @media (min-width: ", "px) {\n    margin-top: ", "px;\n  }\n\n  @media (min-width: 800px) {\n    margin-right: 64px;\n  }\n"], colors.N0, math.add(gridSize, 3), TABLET_BREAKPOINT_MIN, math.add(gridSize, 10));

var Style = function Style() {
  return React.createElement("style", null, "\n  body {\n    background-color: ".concat(colors.B500, ";\n  }\n"));
};

var HomePage =
/*#__PURE__*/
function (_Component) {
  _inherits(HomePage, _Component);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _possibleConstructorReturn(this, _getPrototypeOf(HomePage).apply(this, arguments));
  }

  _createClass(HomePage, [{
    key: "render",
    value: function render() {
      return React.createElement(HomePageWrapper, null, React.createElement(Helmet, null, React.createElement("title", null)), React.createElement(Style, null), React.createElement(Title, null, "Atlaskit"), React.createElement(Intro, null, "Atlassian's official UI library, built according to the Atlassian\xA0Design\xA0Guidelines."), React.createElement(Cards, null));
    }
  }]);

  return HomePage;
}(Component);

export { HomePage as default };