// @flow
import React, { Component } from 'react';
import FieldText from '@uidu/field-text';
import Button from '@uidu/button';
import { AnalyticsListener } from '../src';

class Form extends Component<*, { value: string }> {
  state = {
    value: 'Joe Bloggs',
  };

  handleInputChange = e => this.setState({ value: e.currentTarget.value });

  handleSubmitButtonClick = (e, analyticsEvent) => {
    analyticsEvent
      .update(payload => ({
        ...payload,
        value: this.state.value,
      }))
      .fire();
  };

  render() {
    return (
      <div>
        <FieldText
          label="Name"
          onChange={this.handleInputChange}
          value={this.state.value}
        />
        <p>
          <Button appearance="primary" onClick={this.handleSubmitButtonClick}>
            Submit
          </Button>
        </p>
      </div>
    );
  }
}

const App = () => (
  <AnalyticsListener
    onEvent={({ payload }) => console.log('Event payload:', payload)}
  >
    <Form />
  </AnalyticsListener>
);

export default App;
