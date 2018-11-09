// @flow
import React, { PureComponent } from 'react';
import { Form } from '@uidu/form';
import { Checkbox } from '../src/index';

const BasicUsageExample = class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onChangeResult: 'Check & Uncheck to trigger onChange',
    };
  }

  onChange = (name, value) => {
    this.setState({
      onChangeResult: `onChange called with value: ${value} isChecked: ${name}`,
    });
  };

  render() {
    return (
      <Form>
        <Checkbox
          label="Basic checkbox"
          onChange={this.onChange}
          name="checkbox-basic"
          layout="elementOnly"
          id="test"
        />

        <Checkbox
          defaultChecked
          label="Checked by default"
          onChange={this.onChange}
          name="checkbox-checked"
          layout="elementOnly"
          value={true}
        />
        <Checkbox
          label="Disabled"
          onChange={this.onChange}
          name="checkbox-disabled"
          layout="elementOnly"
          disabled
        />
        <Checkbox
          label="Invalid"
          onChange={this.onChange}
          name="checkbox-invalid"
          layout="elementOnly"
          isInvalid
        />
        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          {this.state.onChangeResult}
        </div>
      </Form>
    );
  }
};

export default BasicUsageExample;
