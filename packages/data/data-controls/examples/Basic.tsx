import React, { Component } from 'react';
import DataControls from '../';
import { availableColumns } from '../../table/examples-utils';
import { Filterer, Grouper, Sorter, Toggler } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <DataControls>
        <Toggler fields={availableColumns} />
        <Filterer fields={availableColumns} filterers={[]} />
        <Grouper fields={availableColumns} groupers={[]} />
        <Sorter fields={availableColumns} sorters={[]} />
      </DataControls>
    );
  }
}
