import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Edit, Check } from 'react-feather';

import './step.scss';

export default class Step extends Component {
  renderIcon = () => {
    const { number, isCompleted, isEditable } = this.props;

    if (isCompleted) {
      return isEditable ? (
        <Edit size={14} strokeWidth={3} />
      ) : (
        <Check size={14} strokeWidth={3} />
      );
    }
    return number;
  };

  render() {
    const {
      children,
      // props
      name,
      label,
      description,
      scope,
      className,
      style,
      // state
      isActive,
      isCompleted,
      isDisabled,
      // Actions
      toggleStep,
    } = this.props;

    return (
      <div
        className={classNames('step', className, {
          active: isActive(name),
          disabled: isDisabled,
        })}
        ref={c => {
          this.step = c;
        }}
        id={`step-${name}`}
      >
        <a
          role="button"
          tabIndex={0}
          onClick={() => toggleStep(name, this.step)}
          className="step-button media p-3"
        >
          <div
            className={classNames(
              'd-flex align-self-center justify-content-center mr-3 step-number align-items-center',
              {
                [`bg-${scope || 'primary'}`]: isActive(name) || isCompleted,
              },
            )}
          >
            {this.renderIcon()}
          </div>
          <div className="step-title media-body align-self-center">
            <h6 className={`m-0 text-${scope || 'primary'}`}>{label}</h6>
            {description && <p className="mb-0 text-muted">{description}</p>}
          </div>
        </a>
        <div className={classNames('step-body', className)} style={style}>
          {isActive(name) && children}
        </div>
      </div>
    );
  }
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string,
  isActive: PropTypes.func.isRequired,
  toggleStep: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(PropTypes.obj),
  scope: PropTypes.string,
  isCompleted: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isEditable: PropTypes.bool,
};

Step.defaultProps = {
  scope: null,
  description: null,
  className: null,
  style: null,
  isCompleted: false,
  isDisabled: false,
  isEditable: true,
};
