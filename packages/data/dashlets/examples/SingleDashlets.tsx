import React, { Component } from 'react';
import { Counter, List, Pie } from '../src';

export default class Basic extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: {
        donations: [],
      },
      loaded: false,
    };
  }

  render() {
    return (
      <>
        <div className="p-3">
          <h6>List</h6>
          <List data={[{ key: 'foo', value: 'test' }]} loaded label="List" />
        </div>
        <div className="p-3">
          <h6>Pie</h6>
          <Pie />
        </div>
        <div className="p-3">
          <h6>Counter</h6>
          <Counter label="This is mandatory" loaded data={134} />
        </div>
      </>
    );
  }
}
