import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';

export default class FormSubmit extends Component {
  getActionBasedOnMethod = () => {
    const { label, method } = this.props;
    return label || (method === 'POST' ? 'Save' : 'Update');
  };

  initElementRef = control => {
    this.element = control ? control.node : null;
  };

  render() {
    const {
      className,
      // state from Form
      canSubmit,
      loading,
      ...buttonProps
    } = this.props;

    return (
      <LaddaButton
        {...buttonProps}
        ref={this.initElementRef}
        type="submit"
        loading={loading}
        className={classNames('btn', className)}
        disabled={!canSubmit}
        data-size={XL}
        data-style={SLIDE_UP}
        data-spinner-size={30}
        data-spinner-color="#ddd"
        data-spinner-lines={12}
      >
        {this.getActionBasedOnMethod()}
      </LaddaButton>
    );
  }
}

FormSubmit.defaultProps = {
  className: 'btn-primary',
  label: null,
  method: 'POST',
  canSubmit: false,
  loading: false,
};

FormSubmit.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  method: PropTypes.string,
  canSubmit: PropTypes.bool,
  loading: PropTypes.bool,
};
