import React from 'react';

export default function FormDestroy({ className, onDestroy, object, ...otherProps }) {

  const destroy = (e) => {
    e.preventDefault();
    if (confirm(window.I18n.t('utils.alerts.destroy'))) {
      onDestroy(object);
    }
  };

  return (
    <a href="#" className={className} onClick={destroy}>
      {I18n.t('utils.actions.destroy')}
    </a>
  );
}
