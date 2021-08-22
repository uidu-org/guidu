import FieldNumber from '@uidu/field-number';
import Select from '@uidu/select';
import React from 'react';
import { useIntl } from 'react-intl';
import { filtersByType } from './utils';

export default function NumberFilterForm({
  onChange,
  filter = {} as any,
  index = 0,
}) {
  const intl = useIntl();
  const filters = filtersByType(intl, 'number');
  return (
    <>
      <div tw="flex space-x-4">
        <div tw="w-4/12">
          <Select
            isClearable={false}
            layout="elementOnly"
            value={filter.type || filters[0].id}
            name={`filters[${index}][type]`}
            options={filters}
            onChange={(name, value) => {
              if (value !== '') {
                onChange(name, value);
              }
            }}
          />
        </div>
        <div tw="w-8/12">
          <FieldNumber
            layout="elementOnly"
            name={`filters[${index}][value]`}
            value={filter.value}
            onChange={(name, value) => {
              if (value !== '') {
                onChange(name, value);
              }
            }}
            addonBefore={
              <span className="input-group-text" id="basic-addon1">
                €
              </span>
            }
            autoFocus
          />
        </div>
      </div>
    </>
  );
}
