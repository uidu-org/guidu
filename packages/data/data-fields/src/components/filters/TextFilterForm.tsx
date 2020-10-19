import FieldText from '@uidu/field-text';
import Select from '@uidu/select';
import React from 'react';
import { injectIntl } from 'react-intl';
import { filtersByType } from './utils';

function StringFilterForm({ onChange, filter = {} as any, index = 0, intl }) {
  const filters = filtersByType(intl, 'text');
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
            onChange={(name, value) => {
              if (value !== '') {
                onChange(name, value);
              }
            }}
          />
        </div>
        <div className="col-8">
          <FieldText
            layout="elementOnly"
            name={`filters[${index}][value]`}
            // value={filter.filter}
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
