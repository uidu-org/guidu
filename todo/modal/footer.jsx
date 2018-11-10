import React from 'react';
import classNames from 'classnames';

const ModalFooter = (children, className) => (
  <div className={classNames('modal-footer', className)}>{children}</div>
);
