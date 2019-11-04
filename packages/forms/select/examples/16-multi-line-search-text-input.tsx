import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { CreatableSelect } from '../src';

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

type State = {
  inputValue: string,
  value: Array<any>,
};

export default class MultiLineSearchInput extends Component<*, State> {
  state = {
    inputValue: '',
    value: [],
  };
  handleChange = (value: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <Form {...formDefaultProps}>
        <CreatableSelect
          {...inputDefaultProps}
          components={components}
          inputValue={inputValue}
          isClearable
          multiple
          menuIsOpen={false}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Type something and press enter..."
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
          value={value}
        />
      </Form>
    );
  }
}
