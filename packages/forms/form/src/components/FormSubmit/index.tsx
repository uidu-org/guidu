import classNames from 'classnames';
import React, { Component } from 'react';

export default class FormSubmit extends Component<any> {
  static defaultProps = {
    className: 'btn-secondary',
    label: null,
    canSubmit: false,
    loading: false,
  };

  render() {
    const {
      className,
      // state from Form
      canSubmit,
      loading,
      label,
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
        {!loading && label}
      </button>
    );
  }
}

// FormSubmit.propTypes = {
//   className: PropTypes.string,
//   label: PropTypes.node,
//   method: PropTypes.string,
//   canSubmit: PropTypes.bool,
//   loading: PropTypes.bool,
// };
