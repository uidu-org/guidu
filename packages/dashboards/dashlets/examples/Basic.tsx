import React, { Component } from 'react';
import { fetchDonations } from '../../dashboard-manager/examples-utils';
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

  componentDidMount() {
    fetchDonations().then(response =>
      this.setState({
        rowData: {
          donations: response,
        },
        loaded: true,
      }),
    );
  }

  render() {
    return (
      <div className="p-3">
        <Dashlets
          blocks={[
            {
              kind: 'Geo',
              label: 'Donors by country',
              namespace: 'donations',
              rollup: ['count', 'id'],
            },
            {
              kind: 'List',
              namespace: 'donations',
              rollup: ['count', 'id'],
              label: 'List',
            },
          ]}
          rowData={this.state.rowData}
          loaded={this.state.loaded}
        />
      </div>
    );
  }
}
