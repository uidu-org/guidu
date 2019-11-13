import React, { Component } from 'react';
import Table from '../';
import { availableColumns, fetchContacts } from '../examples-utils';
import '../themes/uidu.scss';

export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [...availableColumns],
    };
  }

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ rowData }));
  }

  render() {
    return (
      <Table
        theme="uidu"
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}
      />
    );
  }
}
