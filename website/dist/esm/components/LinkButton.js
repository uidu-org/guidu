import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { Link } from './WrappedLink';
import Button from '@atlaskit/button';
export default function LinkButton(_ref) {
  var to = _ref.to,
      children = _ref.children;
  return React.createElement(Button, {
    component: function component(props) {
      return React.createElement(Link, _extends({
        to: to
      }, props), children);
    }
  });
}