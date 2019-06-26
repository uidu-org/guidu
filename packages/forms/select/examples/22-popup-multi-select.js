// @flow
import React, { Component } from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import Button from '@uidu/button';
import { Checkbox } from '@uidu/checkbox';
import DownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import { PopupSelect } from '../src';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const defaults = {
  ...inputDefaultProps,
  options,
  placeholder: 'Choose a City',
  getOptionLabel: ({ label }) => label,
  getOptionValue: ({ value }) => value,
};

type State = {
  values: Array<Object>,
  valuesString: string,
  placeholder: string,
  controlShouldRenderValue: boolean,
};
class MultiPopupSelectExample extends Component<*, State> {
  state = {
    values: [options[0]],
    valuesString: '',
    placeholder: 'Choose value...',
    controlShouldRenderValue: false,
  };
  componentWillMount() {
    this.setState(state => ({
      valuesString: state.values.map(v => v.label).join(', '),
    }));
  }
  onChange = (values: any) => {
    this.setState({
      values,
      valuesString: values.map(v => v.label).join(', '),
    });
  };
  toggleConfig = (event: any) => {
    console.log('toggled');
    this.setState({
      controlShouldRenderValue: event.target.checked,
    });
  };

  render() {
    const {
      placeholder,
      valuesString,
      values,
      controlShouldRenderValue,
    } = this.state;
    return (
      <Form {...formDefaultProps}>
        <Checkbox
          value="show value in search"
          name="toggleValue"
          onChange={this.toggleConfig}
          label="show value in search"
        />
        <p
          style={{
            display: 'inline-block',
            maxWidth: '250px',
          }}
        >
          <PopupSelect
            {...defaults}
            controlShouldRenderValue={controlShouldRenderValue}
            backspaceRemovesValue
            closeMenuOnSelect={false}
            onChange={this.onChange}
            value={values}
            target={({ ref }) => (
              <Button innerRef={ref} iconAfter={<DownIcon />}>
                {valuesString || placeholder}
              </Button>
            )}
            isMulti
          />
        </p>
      </Form>
    );
  }
}

export default MultiPopupSelectExample;
