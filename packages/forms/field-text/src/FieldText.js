// @flow

import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import { ComponentHOC, Wrapper } from '@uidu/field-base';
import InputControl from './FieldTextStateless';

import type { FieldTextProps } from './types';

class FieldText extends Component<FieldTextProps> {
  static defaultProps = {
    component: InputControl,
    // ...ComponentCommon.defaultProps,
    type: 'text',
    value: '',
    floatLabel: null,
    updateOn: 'blur change',
    debounce: {
      blur: 0,
      change: 0,
    },
    onBlur: () => {},
    onChange: () => {},
  };

  getDebounceInterval = eventName => {
    if (this.props.debounce[eventName]) {
      return this.props.debounce[eventName];
    }
    return 0;
  };

  changeDebounced = debounce(
    this.props.onSetValue,
    this.getDebounceInterval('change'),
  );

  blurDebounced = debounce(
    this.props.onSetValue,
    this.getDebounceInterval('blur'),
  );

  shouldUpdateOn = eventName => {
    const updateOnEventNames = this.props.updateOn.split(' ');
    return updateOnEventNames.includes(eventName);
  };

  handleChange = event => {
    const { onChange, name } = this.props;
    const { value } = event.currentTarget;
    if (this.shouldUpdateOn('change')) {
      this.changeDebounced(value);
    }
    onChange(name, value);
  };

  handleBlur = event => {
    const { onBlur, name } = this.props;
    const { value } = event.currentTarget;
    if (this.shouldUpdateOn('blur')) {
      this.changeDebounced.cancel();
      this.blurDebounced(value);
    }
    onBlur(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const { component: StatelessInput } = this.props;

    return (
      <Wrapper {...this.props}>
        <StatelessInput
          {...this.props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          ref={this.initElementRef}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldText);
