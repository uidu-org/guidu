import classNames from 'classnames';
import React, { Component } from 'react';

export default class FormSubmit extends Component<any> {
  static defaultProps = {
    className: 'btn-secondary',
    label: null,
    canSubmit: false,
    loading: false,
    loadingLabel: undefined,
  };

  render() {
    const {
      className,
      // state from Form
      canSubmit,
      loading,
      loadingLabel,
      label,
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
          />
        )}
        {loading && loadingLabel && (
          <span className="ml-2">{loadingLabel}</span>
        )}
        {!loading && label}
      </button>
    );
  }
}
