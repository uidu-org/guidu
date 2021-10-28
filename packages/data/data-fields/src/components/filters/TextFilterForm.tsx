import FieldText from '@uidu/field-text';
import Select from '@uidu/select';
import React from 'react';
import { injectIntl } from 'react-intl';
import { filtersByType } from './utils';

function StringFilterForm({ onChange, filter = {} as any, index = 0, intl }) {
  const filters = filtersByType(intl, 'text');
  return (
    <>
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
    </>
  );
}

export default injectIntl(StringFilterForm);
