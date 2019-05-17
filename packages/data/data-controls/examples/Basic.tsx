import React, { Component } from 'react';
import DataControls from '../';
import { Filterer, Grouper, Sorter, Toggler } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <DataControls>
        <Toggler
          fields={[
            { field: 'foo', headerName: 'test' },
            { field: 'foo', headerName: 'test' },
            { field: 'foo', headerName: 'test' },
            { field: 'foo', headerName: 'test' },
            { field: 'foo', headerName: 'test' },
          ]}
        />
        <Filterer />
        <Grouper />
        <Sorter />
      </DataControls>
    );
  }
}
