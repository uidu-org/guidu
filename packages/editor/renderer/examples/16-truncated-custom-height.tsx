import FieldRange from '@uidu/field-range';
import * as React from 'react';
import { Component } from 'react';
import RendererDemo from './helper/RendererDemo';


interface State {
  maxHeight: number;
}

export default class Example extends Component<{}, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      maxHeight: 200,
    };
  }

  private onMaxHeightChange = (value: number) => {
    this.setState({
      maxHeight: value,
    });
  };

  render() {
    return (
      <div>
        <p>Max Height</p>
        <FieldRange
          value={this.state.maxHeight}
          min={0}
          max={300}
          onChange={this.onMaxHeightChange}
        />

        <RendererDemo
          truncationEnabled={true}
          maxHeight={this.state.maxHeight}
          serializer="react"
        />
      </div>
    );
  }
}
