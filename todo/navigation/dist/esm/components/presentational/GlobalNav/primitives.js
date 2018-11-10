import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();
var listBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%'
};
export var PrimaryItemsList = function PrimaryItemsList(props) {
  return React.createElement("div", _extends({
    css: _objectSpread({}, listBaseStyles, {
      paddingBottom: gridSize * 2
    })
  }, props));
};
export var FirstPrimaryItemWrapper = function FirstPrimaryItemWrapper(props) {
  return React.createElement("div", _extends({
    css: {
      paddingBottom: gridSize
    }
  }, props));
};
export var SecondaryItemsList = function SecondaryItemsList(props) {
  return React.createElement("div", _extends({
    css: _objectSpread({}, listBaseStyles, {
      paddingTop: gridSize
    })
  }, props));
};