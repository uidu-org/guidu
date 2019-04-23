import React, { Component } from 'react';
import Stepper, { Step } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <Stepper defaultStep="info" scrollElement={this.container}>
        {({ getStepProps, jumpToStep }) => [
          <Step
            {...getStepProps()}
            name="info"
            label="Dettagli dell'evento"
            scope="teams"
            number={1}
          >
            <p>
              Foo{' '}
              <button onClick={() => jumpToStep('bar')}>Go to next step</button>
            </p>
          </Step>,
          <Step
            {...getStepProps()}
            name="bar"
            label="Dettagli dell'evento"
            scope="teams"
            number={2}
          >
            <p>Foo 2</p>
          </Step>,
        ]}
      </Stepper>
    );
  }
}
