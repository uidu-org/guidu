import Select from '@uidu/select';
import React from 'react';
import { useIntl } from 'react-intl';
import { filtersByType } from './utils';

export default function SelectFilterForm({
  onChange,
  filter = {} as any,
  index = 0,
  columnDef: {
    cellProps: { options },
  },
}) {
  const intl = useIntl();
  const filters = filtersByType(intl, 'singleSelect');
  return (
    <>
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
            value={filter.type || filters[0].id}
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
    </>
  );
}
