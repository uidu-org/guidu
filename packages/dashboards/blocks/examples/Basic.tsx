import React, { Component } from 'react';
import { fetchDonations } from '../../dashboard-manager/examples-utils';
import { Blocks } from '../src';

export default class Basic extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetchDonations().then(response =>
      this.setState({ rowData: response, loaded: true }),
    );
  }

  render() {
    return (
      <div className="d-flex align-items-center p-3">
        <Blocks
          blocks={[{ kind: 'geo' }, { kind: 'list' }]}
          rowData={this.state.rowData}
          loaded={this.state.loaded}
        />
      </div>
    );
  }
}
