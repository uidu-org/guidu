// @flow
import React, { PureComponent } from 'react';
import { Button } from '../src/index';

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
      <div>
        <Button color="primary">
          <span>primary</span>
        </Button>{' '}
        <Button color="secondary">
          <span>secondary</span>
        </Button>{' '}
        <Button color="success">
          <span>success</span>
        </Button>{' '}
        <Button color="info">
          <span>info</span>
        </Button>{' '}
        <Button color="warning">
          <span>warning</span>
        </Button>{' '}
        <Button color="danger">
          <span>danger</span>
        </Button>{' '}
        <Button color="link">
          <span>link</span>
        </Button>
      </div>
    );
  }
};

export default BasicUsageExample;
