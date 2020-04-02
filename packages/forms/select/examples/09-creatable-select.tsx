import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { CreatableSelect } from '../src';

const defaultOptions = [
  { name: 'Adelaide', id: 'adelaide' },
  { name: 'Brisbane', id: 'brisbane' },
  { name: 'Canberra', id: 'canberra' },
  { name: 'Darwin', id: 'darwin' },
  { name: 'Hobart', id: 'hobart' },
  { name: 'Melbourne', id: 'melbourne' },
  { name: 'Perth', id: 'perth' },
  { name: 'Sydney', id: 'sydney' },
];

const createOption = (name) => ({
  name,
  id: name.toLowerCase().replace(/\W/g, ''),
});

type State = {
  isLoading: boolean;
  options: Array<{ name: string; id: string }>;
  value?: {};
};

export default class CreatableAdvanced extends Component<*, State> {
  state: State = {
    isLoading: false,
    options: defaultOptions,
    value: undefined,
  };

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    // this.setState({ value: newValue });
  };
  handleCreate = (inputValue: any) => {
    // We do not assume how users would like to add newly created options to the existing options list.
    // Instead we pass users through the new value in the onCreate prop
    this.setState({ isLoading: true });
    console.group('Option created');
    console.log('Wait a moment...');
    const { options } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    this.setState({
      isLoading: false,
      options: [...options, newOption],
      value: newOption.id,
    });
  };
  render() {
    const { isLoading, options, value } = this.state;
    return (
      <Form {...formDefaultProps}>
        <CreatableSelect
          {...inputDefaultProps}
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          options={options}
          formatCreateLabel={(inputText?: string) => {
            console.log(inputText);
            if (inputText) {
              return `Crea new ${inputText.trim()}`;
            }
            return '';
          }}
          isValidNewOption={() => true}
          value={value}
        />
      </Form>
    );
  }
}
