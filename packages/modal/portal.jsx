import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalDialog from './dialog';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    if (this.props.isOpen) {
      this.show();
    }
  }

  componentWillUnmount() {
    window.$(this.modalDialog.modal).modal('hide');
    // Remove the element from the DOM when we unmount
    document.body.removeChild(this.el);
  }

  show() {
    window.$(this.modalDialog.modal).modal('show');
  }

  hide() {
    window.$(this.modalDialog.modal).modal('hide');
  }

  toggle() {
    window.$(this.modalDialog.modal).modal('toggle');
  }

  render() {
    const { children, onSave, ...otherProps } = this.props;
    return createPortal(
      <ModalDialog
        ref={c => {
          this.modalDialog = c;
        }}
        {...otherProps}
      >
        {Children.map(children, child =>
          cloneElement(child, {
            onSave,
          }),
        )}
      </ModalDialog>,
      this.el,
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onSave: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  onSave: () => {},
};
