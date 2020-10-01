import FieldNumber from '@uidu/field-number';
import Select from '@uidu/select';
import React from 'react';
import { injectIntl } from 'react-intl';
import { filtersByType } from './utils';

function NumberFilterForm({ onChange, filter = {} as any, index = 0, intl }) {
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
            onChange={(name, value) => {
              if (value !== '') {
                onChange(name, value);
              }
            }}
          />
        </div>
        <div className="col-8">
          <FieldNumber
            layout="elementOnly"
            name={`filters[${index}][value]`}
            value={filter.value}
            onChange={(name, value) => {
              if (value !== '') {
                onChange(name, value);
              }
            }}
            addonBefore={
              <span className="input-group-text" id="basic-addon1">
                €
              </span>
            }
            autoFocus
          />
        </div>
      </div>
    </>
  );
}

export default injectIntl(NumberFilterForm);
