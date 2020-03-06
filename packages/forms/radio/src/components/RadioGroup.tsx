import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { PureComponent } from 'react';
import RadioStateless from './RadioStateless';

class RadioGroup extends PureComponent<any> {
  private element = React.createRef();

  static defaultProps = {
    isInline: false,
    onBlur: () => {},
    onChange: () => {},
  };

  handleChange = event => {
    const {
      target: { value },
    } = event;
    const { onChange, onSetValue, name } = this.props;
    onSetValue(value);
    onChange(name, value);
  };

  initElementRef = control => {
    this.element = control ? control.current.element : null;
  };

  render() {
    const { options, name, value, isInline } = this.props;

    return (
      <Wrapper {...this.props}>
        {options.map(option => (
          <RadioStateless
            isInline={isInline}
            key={`${name}-${option.id}`}
            id={`${name}-${option.id}`}
            value={option.id}
            label={option.name}
            name={name}
            onChange={this.handleChange}
            {...(option.id === value && { defaultChecked: true })}
          />
        ))}
      </Wrapper>
    );
  }
}

export default ComponentHOC(RadioGroup);
