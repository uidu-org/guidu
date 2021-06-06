import React, { Component } from 'react';
import { Dashlets } from '../src';

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
      <div className="p-3">
        <Dashlets
          dashlets={[
            {
              kind: 'Counter',
              label: 'Counter',
              value: 12,
            },
          ]}
        />
      </div>
    );
  }
}
