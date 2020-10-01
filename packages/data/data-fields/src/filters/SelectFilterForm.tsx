import Select from '@uidu/select';
import React from 'react';
import { injectIntl } from 'react-intl';
import { filtersByType } from './utils';

function SelectFilterForm({
  onChange,
  filter = {} as any,
  index = 0,
  intl,
  columnDef: {
    cellRendererParams: { options },
  },
  ...rest
}) {
  const filters = filtersByType(intl, 'singleSelect');
  return (
    <>
      <div className="form-row">
        <div className="col-4">
          <Select
            isClearable={false}
            layout="elementOnly"
            value={filter.type || filters[0].id}
            name={`filters[${index}][type]`}
            options={filters}
          />
        </div>
        <div className="col-8">
          <Select
            layout="elementOnly"
            name={`filters[${index}][value]`}
            options={options}
            value={filter.value || options[0].id}
            onChange={(name, value, { option }) => {
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

export default injectIntl(SelectFilterForm);
