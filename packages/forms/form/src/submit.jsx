import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
      <button
        className={classNames('btn', className)}
        type="submit"
        disabled={!canSubmit || loading}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {loading && <span className="ml-2">Loading...</span>}
        {!loading && this.getActionBasedOnMethod()}
      </button>
    );
  }
}

FormSubmit.defaultProps = {
  className: 'btn-secondary',
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
