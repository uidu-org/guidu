import React, { Component } from 'react';
import List from '../';
import { availableColumns, fetchContacts } from '../../table/examples-utils';

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
      <List
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData || []}
      />
    );
  }
}
