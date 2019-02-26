// @flow
import React, { Component } from 'react';
import FieldRange from '@uidu/field-range';
import SectionMessage from '../src';

class Example extends Component<*, *> {
  state = { width: 800 };

  updateWidth = (width: number) => {
    this.setState({ width });
  };

  render() {
    const { width } = this.state;

    return (
      <div>
        <p>SectionMessage expands to fill the space available to it.</p>
        <FieldRange
          min={100}
          max={800}
          onChange={this.updateWidth}
          step={1}
          value={this.state.width}
        />
        <div style={{ maxWidth: `${width}px` }}>
          <SectionMessage
            title="The Modern Prometheus"
            actions={[
              {
                key: 'mary',
                href: 'https://en.wikipedia.org/wiki/Mary_Shelley',
                text: 'Mary',
              },
              {
                key: 'villa',
                href: 'https://en.wikipedia.org/wiki/Villa_Diodati',
                text: 'Villa Diodatti',
              },
            ]}
          >
            <p>
              You will rejoice to hear that no disaster has accompanied the
              commencement of an enterprise which you have regarded with such
              evil forebodings. I arrived here yesterday, and my first task is
              to assure my dear sister of my welfare and increasing confidence
              in the success of my undertaking.
            </p>
          </SectionMessage>
        </div>
      </div>
    );
  }
}

export default Example;
