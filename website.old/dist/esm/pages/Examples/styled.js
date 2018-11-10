import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '../../components/WrappedLink';
import { Transition } from 'react-transition-group';
import { colors } from '@atlaskit/theme';
var NAVBAR_HEIGHT = '48px'; // Layout
// ==============================

export var Container = styled.div.withConfig({
  displayName: "styled__Container",
  componentId: "upquiw-0"
})(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  flex-direction: column;\n  display: flex;\n"]);
export var Content = styled.div.withConfig({
  displayName: "styled__Content",
  componentId: "upquiw-1"
})(["\n  position: relative;\n  display: flex;\n  flex: 0 1 100%;\n  flex-direction: column;\n"]); // Example Component / Code
// ==============================

var codePaneWidth = 640;
var transitionDuration = 200;
var transitionDistance = {
  entering: '100%',
  entered: 0,
  exiting: '100%'
};
export var ExampleComponentWrapper = styled.div.withConfig({
  displayName: "styled__ExampleComponentWrapper",
  componentId: "upquiw-2"
})(["\n  padding-right: ", ";\n  height: 100%;\n  transition: padding ", "ms;\n"], function (p) {
  return p.codeIsVisible ? "".concat(codePaneWidth, "px") : 0;
}, transitionDuration);
export var ComponentContainer = styled.div.withConfig({
  displayName: "styled__ComponentContainer",
  componentId: "upquiw-3"
})(["\n  background: white;\n  box-sizing: border-box;\n  height: 100%;\n  padding: 20px;\n  width: 100%;\n"]);
export var CodeBox = styled.div.withConfig({
  displayName: "styled__CodeBox",
  componentId: "upquiw-4"
})(["\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  height: calc(100% - ", ");\n  justify-content: flex-end;\n  overflow-x: auto;\n  position: fixed;\n  right: 0;\n  top: ", ";\n  transform: translate3d(", ", 0, 0);\n  transition: opacity ", "ms, transform ", "ms;\n  width: 640px;\n  z-index: 3;\n\n  > pre {\n    border-radius: 0;\n    box-sizing: border-box;\n    margin: 0;\n    min-height: 100%;\n  }\n"], NAVBAR_HEIGHT, NAVBAR_HEIGHT, function (p) {
  return transitionDistance[p.status];
}, transitionDuration, transitionDuration);
export var CodeContainer = function CodeContainer(_ref) {
  var children = _ref.children,
      show = _ref.show;
  return React.createElement(Transition, {
    in: show,
    mountOnEnter: true,
    unmountOnExit: true,
    appear: true,
    timeout: transitionDuration
  }, function (status) {
    if (status === 'exited') return null;
    return React.createElement(CodeBox, {
      status: status
    }, children);
  });
}; // Nav
// ==============================

export var Nav = styled.nav.withConfig({
  displayName: "styled__Nav",
  componentId: "upquiw-5"
})(["\n  align-items: center;\n  box-shadow: 0 1px 0 ", ";\n  display: flex;\n  flex-direction: row;\n  height: ", ";\n  justify-content: space-between;\n  top: 0;\n  width: 100%;\n  z-index: 2;\n"], colors.N30A, NAVBAR_HEIGHT);
export var NavSection = styled.div.withConfig({
  displayName: "styled__NavSection",
  componentId: "upquiw-6"
})(["\n  align-items: center;\n  display: flex;\n"]);
var navButtonStyles = css(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 50%;\n  border: 1px solid;\n  border-color: ", ";\n  box-sizing: border-box;\n  color: ", ";\n  display: flex;\n  font-size: inherit;\n  height: 32px;\n  justify-content: center;\n  padding: 0;\n  transition: all 150ms;\n  width: 32px;\n\n  &:not([disabled]):hover,\n  &:not([disabled]):focus {\n    border-color: ", ";\n    color: ", ";\n    cursor: pointer;\n    outline: 0;\n    text-decoration: none;\n  }\n"], function (p) {
  return p.isSelected ? colors.primary : 'transparent';
}, function (p) {
  return p.isSelected ? colors.primary : colors.N80;
}, function (p) {
  return p.isSelected ? colors.N0 : colors.N80;
}, function (p) {
  return p.isSelected ? colors.primary : colors.B200;
}, function (p) {
  return p.isSelected ? colors.N0 : colors.B200;
});
export var NavButton = styled.button.withConfig({
  displayName: "styled__NavButton",
  componentId: "upquiw-7"
})(["\n  ", ";\n"], navButtonStyles);
export var NavLink = styled(Link).withConfig({
  displayName: "styled__NavLink",
  componentId: "upquiw-8"
})(["\n  ", ";\n"], navButtonStyles); // Misc.
// ==============================

export var Control = styled.div.withConfig({
  displayName: "styled__Control",
  componentId: "upquiw-9"
})(["\n  display: inline-block;\n\n  & + & {\n    margin-left: 2px;\n  }\n"]);
export var ErrorMessage = styled.div.withConfig({
  displayName: "styled__ErrorMessage",
  componentId: "upquiw-10"
})(["\n  background-color: ", ";\n  border-radius: 4px;\n  color: white;\n  font-size: 120%;\n  padding: 1em;\n"], colors.R400);