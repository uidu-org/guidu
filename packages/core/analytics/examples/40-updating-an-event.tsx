import React, { Component, MouseEvent, FormEvent } from 'react';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';

import { UIAnalyticsEvent, AnalyticsListener } from '../src';

class Form extends Component<{}, { value: string }> {
  state = {
    value: 'Joe Bloggs',
  };

  handleInputChange = (e: FormEvent<HTMLInputElement>) =>
    this.setState({ value: e.currentTarget.value });

  handleSubmitButtonClick = (
    e: MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
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
