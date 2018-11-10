import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
export default function FormDestroy(_ref) {
  var className = _ref.className,
      onDestroy = _ref.onDestroy,
      object = _ref.object,
      otherProps = _objectWithoutProperties(_ref, ["className", "onDestroy", "object"]);

  var destroy = function destroy(e) {
    e.preventDefault();

    if (confirm(window.I18n.t('utils.alerts.destroy'))) {
      onDestroy(object);
    }
  };

  return React.createElement("a", {
    href: "#",
    className: className,
    onClick: destroy
  }, I18n.t('utils.actions.destroy'));
}