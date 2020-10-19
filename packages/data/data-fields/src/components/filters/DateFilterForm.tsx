import FieldDate from '@uidu/field-date';
import Select from '@uidu/select';
import React from 'react';
import { injectIntl } from 'react-intl';
import { filtersByType } from './utils';

function DateFilterForm({
  onChange,
  filter = {} as any,
  index = 0,
  intl,
  ...rest
}) {
  const filters = filtersByType(intl, 'date');
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
          <FieldDate
            layout="elementOnly"
            name={`filters[${index}][value]`}
            value={filter.value}
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
    </>
  );
}

export default injectIntl(DateFilterForm);
