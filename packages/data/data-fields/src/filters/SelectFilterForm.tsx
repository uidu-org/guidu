import Select from '@uidu/select';
import React from 'react';
import { injectIntl } from 'react-intl';
import { filtersByType } from './utils';

function CurrencyFilterForm({
  onChange,
  filter = {} as any,
  index = 0,
  intl,
  columnDef: {
    cellRendererParams: { options },
  },
  ...rest
}) {
  console.log(rest);
  const filters = filtersByType(intl, 'number');
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
            name={`filters[${index}][filter]`}
            options={options}
            value={filter.filter || options[0].id}
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

export default injectIntl(CurrencyFilterForm);
