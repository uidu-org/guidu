import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldDownshift, { DownshiftCheckbox, FieldDownshiftProps } from '../src';

const items = [
  { name: 'Stuck', id: 'rgb(226, 68, 92)' },
  { name: 'Working on it', id: 'rgb(253, 171, 61)' },
  { name: 'Done', id: 'rgb(0, 200, 117)' },
  { name: 'Waiting for review', id: 'rgb(87, 155, 252)' },
  { name: '', id: 'rgb(196, 196, 196)' },
];

export default function Basic() {
  return (
    <FieldExampleScaffold<FieldDownshiftProps<any>>
      component={FieldDownshift}
      defaultValue={[items[2].id]}
      layout="elementOnly"
      menu={(props) => <div {...props} />}
      option={DownshiftCheckbox}
      options={items}
      multiple
    />
  );
}
