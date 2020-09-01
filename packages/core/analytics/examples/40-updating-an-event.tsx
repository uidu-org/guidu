import Button from '@uidu/button';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import React, { Component, FormEvent, MouseEvent } from 'react';
import { AnalyticsListener, UIAnalyticsEvent } from '../src';

class ExampleForm extends Component<{}, { value: string }> {
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
      .update((payload) => ({
        ...payload,
        value: this.state.value,
      }))
      .fire();
  };

  render() {
    return (
      <Form>
        <FieldText
          label="Name"
          name="name"
          onChange={this.handleInputChange}
          value={this.state.value}
        />
        <p>
          <Button appearance="primary" onClick={this.handleSubmitButtonClick}>
            Submit
          </Button>
        </p>
      </Form>
    );
  }
}

const App = () => (
  <AnalyticsListener
    onEvent={({ payload }) => console.log('Event payload:', payload)}
  >
    <ExampleForm />
  </AnalyticsListener>
);

export default App;
