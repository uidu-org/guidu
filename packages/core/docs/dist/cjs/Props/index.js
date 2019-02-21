function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PrettyProps from 'pretty-proptypes';
import Button from '@atlaskit/button';
import components from './components';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';

components.Button = (_ref) => {
  let isCollapsed = _ref.isCollapsed,
      rest = _objectWithoutProperties(_ref, ["isCollapsed"]);

  return React.createElement(Button, _extends({
    iconBefore: isCollapsed ? React.createElement(ChevronDownIcon, {
      label: "expandIcon"
    }) : React.createElement(ChevronUpIcon, {
      label: "collapseIcon"
    })
  }, rest));
};

const Props = props => {
  return React.createElement(PrettyProps, _extends({
    components: components
  }, props));
};

export default Props;