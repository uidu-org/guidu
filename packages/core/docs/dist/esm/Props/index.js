import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PrettyProps from 'pretty-proptypes';
import Button from '@atlaskit/button';
import components from './components';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';

components.Button = function (_ref) {
  var isCollapsed = _ref.isCollapsed,
      rest = _objectWithoutProperties(_ref, ["isCollapsed"]);

  return React.createElement(Button, _extends({
    iconBefore: isCollapsed ? React.createElement(ChevronDownIcon, {
      label: "expandIcon"
    }) : React.createElement(ChevronUpIcon, {
      label: "collapseIcon"
    })
  }, rest));
};

var Props = function Props(props) {
  return React.createElement(PrettyProps, _extends({
    components: components
  }, props));
};

export default Props;