import { ComponentHOC, Wrapper } from '@uidu/field-base';
import React, { Component } from 'react';
import { CheckboxGroupProps } from '../types';
import CheckboxStateless from './CheckboxStateless';

class CheckboxGroup extends Component<CheckboxGroupProps> {
  private elements = {};

  static defaultProps = {
    type: 'stacked',
    options: [],
    value: [],
  };

  handleChange = () => {
    const { options, name } = this.props;
    const checkedOptions = options.filter(
      option => this.elements[option.id].current.checked,
    );
    const value = checkedOptions.map(option => option.id);
    this.props.onSetValue(value);
    this.props.onChange(name, value);
  };

  render() {
    const { options, value } = this.props;

    return (
      <Wrapper {...this.props}>
        {options.map(option => (
          <CheckboxStateless
            ref={(c: any) => {
              if (c) {
                this.elements[option.id] = c.element;
              }
            }}
            key={option.id}
            id={option.id}
            value={option.id}
            label={option.name}
            name={name}
            checked={value.indexOf(option.id) >= 0}
            onChange={this.handleChange}
          />
        ))}
      </Wrapper>
    );
  }
}

export default ComponentHOC(CheckboxGroup);
