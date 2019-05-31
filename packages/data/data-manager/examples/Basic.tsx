import React, { Component } from 'react';
import DataManager from '../';
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
      <DataManager
        availableViews={['table', 'gallery', 'calendar', 'list']}
        columnDefs={this.state.columnDefs}
        rowData={this.state.rowData}
      />
    );
  }
}
