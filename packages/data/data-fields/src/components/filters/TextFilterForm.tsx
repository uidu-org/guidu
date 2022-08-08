import { ColumnFilter } from '@tanstack/react-table';
import FieldText from '@uidu/field-text';
import Select from '@uidu/select';
import React from 'react';
import { useFiltersByType } from './utils';

export default function StringFilterForm({
  onChange,
  filter,
  index = 0,
}: {
  onChange: (filter: ColumnFilter) => void;
  filter: ColumnFilter;
  index: number;
}) {
  const filters = useFiltersByType('text');
  return (
    <div tw="flex space-x-4 flex-grow">
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
        <FieldText
          layout="elementOnly"
          name={`filters[${index}][value]`}
          // value={filter.filter}
          tw="py-2"
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
