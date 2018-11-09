import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { Link as BaseLink } from 'react-router-dom';
import React from 'react';

var Link = function Link(_ref) {
  var _onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ["onClick"]);

  return React.createElement(BaseLink, _extends({
    onClick: function onClick(e) {
      if (performance.mark) {
        performance.clearMarks();
        performance.mark("navigate-".concat(rest.to));
      }

      if (_onClick) _onClick(e);
    }
  }, rest));
}; // exporting like this so it's just replace react-router-dom w/ thisFilePath


export { Link };