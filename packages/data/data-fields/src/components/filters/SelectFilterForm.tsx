import { ColumnDef, ColumnFilter } from '@tanstack/react-table';
import Select from '@uidu/select';
import React from 'react';
import { useFiltersByType } from './utils';

export default function SelectFilterForm<T>({
  onChange,
  filter,
  index = 0,
  columnDef,
}: {
  onChange: (filter: ColumnFilter) => void;
  filter: ColumnFilter;
  index: number;
  columnDef: ColumnDef<T>;
}) {
  const options = columnDef.meta?.options || [];
  const filters = useFiltersByType('singleSelect');

  return (
    <div tw="flex space-x-3">
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
          value={filter?.id || filters[0].id}
          name={`filters[${index}][type]`}
          options={filters}
        />
      </div>
      <div tw="w-8/12">
        <Select
          layout="elementOnly"
          isClearable={false}
          isSearchable={false}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          components={{
            DropdownIndicator: () => null,
          }}
          name={`filters[${index}][value]`}
          options={options}
          value={filter.value || options[0]?.id}
          onChange={(name, value, { option }) => {
            if (value !== '') {
              onChange(name, value);
            }
          }}
          // multiple
        />
      </div>
    </div>
  );
}
