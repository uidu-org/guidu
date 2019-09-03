import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { Component } from 'react';
import { FieldMentionsProps } from '../types';
import FieldMentionsStateless from './FieldMentionsStateless';

class FieldMentions extends Component<FieldMentionsProps> {
  static defaultProps = {
    elementRef: React.createRef<any>(),
  };

  handleChange = (event, value, plainTextValue, mentions) => {
    const { onSetValue, onChange, name } = this.props;
    if (value === '') {
      onSetValue('');
      onChange(name, '');
    } else {
      onSetValue({
        value,
        plainTextValue,
        mentions,
      });
      onChange(name, {
        value,
        plainTextValue,
        mentions,
      });
    }
  };

  render() {
    const { onChange, ...otherProps } = this.props;
    return (
      <Wrapper {...this.props}>
        <FieldMentionsStateless
          {...otherProps}
          onChange={this.handleChange}
          elementRef={this.props.elementRef}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldMentions);
