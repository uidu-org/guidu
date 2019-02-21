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
        <Button variant="primary">primary</Button>
        <Button className="ml-2" variant="secondary">
          secondary
        </Button>
        <Button className="ml-2" variant="success">
          success
        </Button>
        <Button className="ml-2" variant="info">
          info
        </Button>
        <Button className="ml-2" variant="warning">
          warning
        </Button>
        <Button className="ml-2" variant="danger">
          danger
        </Button>
        <Button className="ml-2" variant="light">
          light
        </Button>
        <Button className="ml-2" variant="link">
          link
        </Button>
      </div>
    );
  }
};

export default BasicUsageExample;
