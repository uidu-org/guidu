import { ShellBody } from '@uidu/shell';
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Stepper, { Step } from '../src';

export default class Basic extends Component<any> {
  container = React.createRef();

  render() {
    return (
      <Router>
        <Route
          path="/"
          render={routeProps => (
            <ShellBody scrollable ref={this.container}>
              <div className="container">
                <Stepper
                  defaultStep="info"
                  scrollElement={this.container}
                  scope="teams"
                  {...routeProps}
                >
                  {({ getStepProps, jumpToStep }) => [
                    <Step
                      {...getStepProps()}
                      name="info"
                      description="Choose evet details"
                      label="Dettagli dell'evento"
                      number={1}
                    >
                      <p>
                        Foo{' '}
                        <button onClick={() => jumpToStep('bar')}>
                          Go to next step
                        </button>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                        <p>dsndosidn odin soidnosa ndosi ndn </p>
                      </p>
                    </Step>,
                    <Step
                      {...getStepProps()}
                      name="bar"
                      label="Dettagli dell'evento"
                      number={2}
                    >
                      <p>Foo 2</p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                      <p>dsndosidn odin soidnosa ndosi ndn </p>
                    </Step>,
                    <Step
                      {...getStepProps()}
                      name="test"
                      label="Dettagli dell'evento"
                      number={3}
                    >
                      <p>Foo 2</p>
                    </Step>,
                  ]}
                </Stepper>
              </div>
            </ShellBody>
          )}
        />
      </Router>
    );
  }
}
