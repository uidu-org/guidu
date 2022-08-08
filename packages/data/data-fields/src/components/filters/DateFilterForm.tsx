import { ColumnFilter } from '@tanstack/react-table';
import FieldDate from '@uidu/field-date';
import Select from '@uidu/select';
import React from 'react';
import { useFiltersByType } from './utils';

export default function DateFilterForm({
  onChange,
  filter,
  index = 0,
}: {
  onChange: (filter: ColumnFilter) => void;
  filter: ColumnFilter;
  index: number;
}) {
  const filters = useFiltersByType('date');

  return (
    <div tw="flex space-x-4">
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
        />
      </div>
      <div tw="w-8/12">
        <FieldDate
          layout="elementOnly"
          name={`filters[${index}][value]`}
          value={filter.value}
          tw="py-2"
          // onChange={(name, value) => {
          //   console.log(value);
          //   if (value !== '') {
          //     onChange(name, value);
          //   }
          // }}
          autoFocus
        />
      </div>
    </div>
  );
}
