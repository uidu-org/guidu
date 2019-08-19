import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { Component } from 'react';
import InputControl from './FieldTextStateless';

class FieldText extends Component<any> {
  private element: React.RefObject<any> = React.createRef();

  static defaultProps = {
    component: InputControl,
    type: 'text',
    value: '',
    floatLabel: null,
  };

  handleChange = event => {
    const { onChange, onSetValue, name } = this.props;
    const { value } = event.currentTarget;
    onChange(name, value);
    onSetValue(value);
  };

  render() {
    const { component: StatelessInput } = this.props;
    console.log(this.props);

    console.log(StatelessInput);

    return (
      <Wrapper {...this.props}>
        <StatelessInput
          {...this.props}
          onChange={this.handleChange}
          ref={this.element}
        />
      </Wrapper>
    );
  }
}

export default ComponentHOC(FieldText);
