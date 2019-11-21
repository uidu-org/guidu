import FieldText from '@uidu/field-text';
import Select from '@uidu/select';
import React from 'react';
import { filterKinds } from '../../filters';

export default function StringFilterForm({
  onChange,
  filter = {} as any,
  index = 0,
}) {
  console.log(filter);
  return (
    <>
      <div className="form-row">
        <div className="col-4">
          <Select
            isClearable={false}
            layout="elementOnly"
            value={filter.type || 'contains'}
            name={`filters[${index}][type]`}
            options={filterKinds([
              'equals',
              'notEqual',
              'contains',
              'notContains',
              'startsWith',
              'endsWith',
              'empty',
            ])}
          />
        </div>
        <div className="col-8">
          <FieldText
            layout="elementOnly"
            name={`filters[${index}][filter]`}
            value={filter.filter}
            onChange={(name, value) => {
              if (value !== '') {
                onChange(name, value);
              }
            }}
            autoFocus
          />
        </div>
      </div>
    </>
  );
}
