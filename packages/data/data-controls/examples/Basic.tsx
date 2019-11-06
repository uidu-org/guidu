import React, { Component } from 'react';
import { availableColumns } from '../../table/examples-utils';
import { Filterer, Finder, Grouper, Resizer, Sorter, Toggler } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div>
        <Toggler columnDefs={availableColumns} onToggle={console.log} />
        <Filterer columnDefs={availableColumns} filterers={[]} />
        <Grouper columnDefs={availableColumns} groupers={[]} />
        <Sorter columnDefs={availableColumns} sorters={[]} />
        <Finder columnDefs={availableColumns} />
        <Resizer />
      </div>
    );
  }
}
