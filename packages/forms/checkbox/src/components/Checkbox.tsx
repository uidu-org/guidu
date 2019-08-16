import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { PureComponent } from 'react';
import { CheckboxProps } from '../types';
import InputControl from './CheckboxStateless';

class Checkbox extends PureComponent<CheckboxProps> {
  private element = React.createRef();

  static defaultProps = {
    onChange: () => {},
  };

  handleChange = e => {
    const { onSetValue, onChange, name } = this.props;
    const value = e.currentTarget.checked;
    onSetValue(value);
    onChange(name, value);
  };

  render = () => {
    const {
      onChange,
      isIndeterminate,
      defaultChecked,
      value,
      ...otherProps
    } = this.props;

    return (
      <Wrapper {...this.props}>
        <InputControl
          {...otherProps}
          isIndeterminate={isIndeterminate}
          checked={defaultChecked}
          onChange={this.handleChange}
          ref={this.element}
        />
      </Wrapper>
    );
  };
}

export default ComponentHOC(Checkbox);
