import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Gallery from '../';
import { buildColumns } from '../../table';
import { availableColumns, fetchContacts } from '../../table/examples-utils';
export default class Basic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
    };
  }

  componentDidMount() {
    fetchContacts().then(rowData => this.setState({ rowData }));
  }

  render() {
    console.log(this.state.rowData);
    return (
      <Router>
        <Gallery
          columnCount={6}
          gutterSize={24}
          columnDefs={buildColumns(availableColumns)}
          rowData={this.state.rowData.map(datum => ({ data: datum }))}
        />
      </Router>
    );
  }
}
