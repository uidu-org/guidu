import React, { Component } from 'react';
import { availableColumns } from '../../table/examples-utils';
import { Filterer, Finder, Grouper, Resizer, Sorter, Toggler } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div>
        <Toggler fields={availableColumns} onToggle={console.log} />
        <Filterer fields={availableColumns} filterers={[]} />
        <Grouper fields={availableColumns} groupers={[]} />
        <Sorter fields={availableColumns} sorters={[]} />
        <Finder fields={availableColumns} />
        <Resizer />
      </div>
    );
  }
}
