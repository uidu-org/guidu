import React, { Component } from 'react';
import { ComponentHOC, Wrapper } from '@uidu/field-base';
import FieldMentionsStateless from './FieldMentionsStateless';

import { FieldMentionsProps } from '../types';
import console = require('console');

class FieldMentions extends Component<FieldMentionsProps> {
  static defaultProps = {
    displayTransform: (id, display, type) => display,
    onBlur: () => {},
    onChange: () => {},
    onKeyDown: () => {},
  };

  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    const { onSetValue, onChange, name } = this.props;
    if (newValue === '') {
      onSetValue('');
      onChange(name, '');
    } else {
      onSetValue({
        value: newValue,
        plainTextValue: newPlainTextValue,
        mentions,
      });
      onChange(name, {
        value: newValue,
        plainTextValue: newPlainTextValue,
        mentions,
      });
    }
  };

  initElementRef = element => {
    this.element = element;
  };

  render() {
    return (
      <Wrapper {...this.props}>
        <FieldMentionsStateless
          {...this.props}
          onChange={this.handleChange}
          ref={this.initElementRef}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldMentions);
