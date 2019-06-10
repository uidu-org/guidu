import React, { Component } from 'react';
import { fetchDonations } from '../../dashboard-manager/examples-utils';
import { Blocks } from '../src';

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
      <div className="d-flex align-items-center p-3">
        <Blocks
          blocks={[
            { kind: 'Geo', namespace: 'donations', rollup: ['count', 'id'] },
            { kind: 'List', namespace: 'donations', rollup: ['count', 'id'] },
          ]}
          rowData={this.state.rowData}
          loaded={this.state.loaded}
        />
      </div>
    );
  }
}
