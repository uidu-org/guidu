// @flow
import React, { PureComponent } from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';

import TextField from '../src';

type State = {|
  eventResult: string,
|};

export default class BasicExample extends PureComponent<void, State> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  onChange = (name, value) => {
    this.setState({
      eventResult: `onChange called with value: ${value}`,
    });
  };

  onBlur = () => {
    this.setState({
      eventResult: 'onBlur called from FieldBase above',
    });
  };

  onFocus = () => {
    this.setState({
      eventResult: 'onFocus called from FieldBase above',
    });
  };

  render() {
    return (
      <Form {...formDefaultProps}>
        <TextField
          {...inputDefaultProps}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          label="With change, blur & focus handlers"
        />
        <div
          className="mb-5"
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
          }}
        >
          {this.state.eventResult}
        </div>

        {/* <TextField
          {...inputDefaultProps}
          label="hidden label"
          layout="elementOnly"
        /> */}
        <TextField {...inputDefaultProps} label="With autofocus" autoFocus />
        <TextField
          {...inputDefaultProps}
          value="candy"
          label="With default value"
        />
        <TextField {...inputDefaultProps} disabled label="disabled" />
        <TextField {...inputDefaultProps} required label="Required field" />
        <TextField {...inputDefaultProps} isInvalid label="Invalid" />
        <TextField
          {...inputDefaultProps}
          label="With help"
          help={<span className="text-primary">This is a node help</span>}
        />
        <TextField
          {...inputDefaultProps}
          isSpellCheckEnabled={false}
          label="Spell Check disabled"
        />
        <TextField
          {...inputDefaultProps}
          maxLength={5}
          label="Max length of 5"
        />
        <TextField
          {...inputDefaultProps}
          type="number"
          label="Number typed input"
        />
        <TextField
          {...inputDefaultProps}
          type="number"
          label="Number typed input"
          floatLabel="Test floating label"
        />
      </Form>
    );
  }
}
