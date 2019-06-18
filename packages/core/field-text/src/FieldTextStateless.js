// @flow

import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import classNames from 'classnames';
import React, { Component } from 'react';
import Input from './styled/Input';
import { name as packageName, version as packageVersion } from './version.json';
import type { FieldTextProps } from './types';

type Props = FieldTextProps & {
  innerRef?: (node: ?HTMLInputElement) => void,
};

class FieldTextStateless extends Component<Props, void> {
  static defaultProps = {
    component: Input,
    disabled: false,
    isReadOnly: false,
    isSpellCheckEnabled: true,
    isPristine: true,
    innerRef: () => {},
    onChange: () => {},
    required: false,
    type: 'text',
  };

  input: ?HTMLInputElement;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  initElementRef = (input: ?HTMLInputElement) => {
    this.input = input;
    // $FlowFixMe - Cannot call `this.props.innerRef` because undefined [1] is not a function
    this.props.innerRef(input);
  };

  getInputMode = (type: string) => {
    const { inputMode } = this.props;
    if (inputMode) {
      return inputMode;
    }

    switch (type) {
      case 'tel':
        return 'tel';
      case 'email':
        return 'email';
      case 'url':
        return 'url';
      default:
        return null;
    }
  };

  render() {
    const {
      component: StyledComponent,
      isPristine,
      showErrors,
      className,
      autoComplete,
      autoFocus,
      disabled,
      form,
      id,
      maxLength,
      min,
      max,
      name,
      options,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      pattern,
      placeholder,
      isReadOnly,
      required,
      isSpellCheckEnabled,
      type,
      value,
    } = this.props;

    return (
      <StyledComponent
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={classNames('form-control', className, {
          'is-valid': !isPristine && !showErrors,
          'is-invalid': !isPristine && showErrors,
        })}
        disabled={disabled}
        form={form}
        id={id}
        maxLength={maxLength}
        min={min}
        max={max}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={isReadOnly}
        ref={this.initElementRef}
        required={required}
        spellCheck={isSpellCheckEnabled}
        type={type}
        value={value}
        {...(this.getInputMode(type)
          ? { inputMode: this.getInputMode(type) }
          : {})}
        {...options} // for other input patterns}
      />
    );
  }
}

export { FieldTextStateless as FieldTextStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldText',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldText',
        packageName,
        packageVersion,
      },
    }),
  })(FieldTextStateless),
);
