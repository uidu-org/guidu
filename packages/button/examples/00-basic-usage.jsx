// @flow
import React, { PureComponent } from 'react';
import Button from '../src/index';

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
        <Button color="primary">primary</Button>{' '}
        <Button color="secondary">secondary</Button>{' '}
        <Button color="success">success</Button>{' '}
        <Button color="info">info</Button>{' '}
        <Button color="warning">warning</Button>{' '}
        <Button color="danger">danger</Button>{' '}
        <Button color="link">link</Button>
      </div>
    );
  }
};

export default BasicUsageExample;
