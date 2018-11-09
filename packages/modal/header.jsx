import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { X } from 'react-feather';

export default function ModalHeader({
  children,
  title,
  className,
  onDismiss,
  closeButton,
}) {
  return (
    <div
      className={classNames(
        'modal-header d-flex align-items-center',
        className,
      )}
    >
      {children || <h4 className="modal-title">{title}</h4>}
      {closeButton && (
        <a
          tabIndex={0}
          role="button"
          className="d-flex align-self-center"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onDismiss}
        >
          <X />
        </a>
      )}
    </div>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  closeButton: PropTypes.bool,
};

ModalHeader.defaultProps = {
  children: undefined,
  title: 'Modal Title',
  className: undefined,
  onDismiss: () => {},
  closeButton: true,
};
