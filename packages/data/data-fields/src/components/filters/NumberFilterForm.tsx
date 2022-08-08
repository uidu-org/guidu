import { ColumnFilter } from '@tanstack/react-table';
import FieldNumber from '@uidu/field-number';
import Select from '@uidu/select';
import React from 'react';
import { useFiltersByType } from './utils';

export default function NumberFilterForm({
  onChange,
  filter,
  index = 0,
}: {
  onChange: (filter: ColumnFilter) => void;
  filter: ColumnFilter;
  index: number;
}) {
  const filters = useFiltersByType('number');

  return (
    <div tw="flex space-x-3 flex-grow">
      <div tw="w-4/12">
        <Select
          isClearable={false}
          isSearchable={false}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          components={{
            DropdownIndicator: () => null,
          }}
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
          tw="py-2"
          name={`filters[${index}][value]`}
          value={filter.value}
          onChange={(name, value) => {
            if (value !== '') {
              onChange(name, value);
            }
          }}
          autoFocus
        />
      </div>
    </div>
  );
}
