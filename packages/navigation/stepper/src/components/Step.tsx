import React, { Component } from 'react';
import classNames from 'classnames';
import { Edit, Check } from 'react-feather';

import { StepProps } from '../types';
import StyledStep, {
  StyledStepNumber,
  StyledStepHeader,
  StyledStepBody,
} from '../styled/Step';

export default class Step extends Component<StepProps> {
  static defaultProps = {
    scope: null,
    description: null,
    className: null,
    style: null,
    isCompleted: false,
    isDisabled: false,
    isEditable: true,
  };

  private step: React.RefObject<any> = React.createRef();

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
      // state
      isActive,
      isCompleted,
      isDisabled,
      // Actions
      toggleStep,
    } = this.props;

    return (
      <StyledStep
        className={classNames(className, {
          active: isActive(name),
          disabled: isDisabled,
        })}
        ref={this.step}
        id={`step-${name}`}
      >
        <StyledStepHeader
          role="button"
          tabIndex={0}
          onClick={() => toggleStep(name, this.step)}
          className="media p-3"
        >
          <StyledStepNumber
            className={classNames('mr-3', {
              [`bg-${scope || 'primary'}`]: isActive(name) || isCompleted,
            })}
          >
            {this.renderIcon()}
          </StyledStepNumber>
          <div className="step-title media-body align-self-center">
            <h6 className={`m-0 text-${scope || 'primary'}`}>{label}</h6>
            {description && <p className="mb-0 text-muted">{description}</p>}
          </div>
        </StyledStepHeader>
        <StyledStepBody className="step-body">
          {isActive(name) && children}
        </StyledStepBody>
      </StyledStep>
    );
  }
}
