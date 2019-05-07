import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { Component } from 'react';
import { FieldMentionsProps } from '../types';
import FieldMentionsStateless from './FieldMentionsStateless';

class FieldMentions extends Component<FieldMentionsProps> {
  static defaultProps = {
    displayTransform: (id, display, type) => display,
    onBlur: () => {},
    onChange: () => {},
    onKeyDown: () => {},
  };

  private element: React.RefObject<any> = React.createRef();

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
          ref={this.element}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldMentions);
