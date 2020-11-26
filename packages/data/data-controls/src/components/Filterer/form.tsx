import { getColumnDef, getFieldFromColumnDef } from '@uidu/data-fields';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef } from 'react';
import { X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import PickField from '../../utils/PickField';
import { FiltererFormProps } from './types';

export default function FiltererForm({
  filtersCount,
  tableInstance,
  filters,
}: FiltererFormProps) {
  const form = useRef(null);

  const handleSubmit = async (model) => {
    tableInstance.setAllFilters(model.filters);
  };

  const filterableColumnDefs = tableInstance.columns.filter((c) => !c.hide);

  return (
    <Form ref={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
      <div className="list-group">
        {filters.map((filter: any, index) => {
          const columnDef = getColumnDef(filterableColumnDefs, filter);
          const field = getFieldFromColumnDef(columnDef);
          const { Filter: FilterForm } = field;
          return (
            <div className="list-group-item px-3 px-xl-4" key={filter.id}>
              <div className="form-group mb-2">
                <div className="form-group mb-0">
                  <label htmlFor="" className="d-flex align-items-center">
                    <FormattedMessage
                      defaultMessage={`{index, plural,
                      =0 {Where}
                      other {Then where}
                    }`}
                      values={{
                        index,
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm p-0 ml-auto d-flex align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        tableInstance.setFilter(filter.id, undefined);
                      }}
                    >
                      <X size={13} />
                    </button>
                  </label>
                </div>
                <Select
                  layout="elementOnly"
                  value={filter.id}
                  name={`filters[${index}][id]`}
                  options={filterableColumnDefs.map((columnDef) => ({
                    id: columnDef.id,
                    name: columnDef.name,
                    ...(columnDef.icon
                      ? {
                          before: columnDef.icon,
                        }
                      : {}),
                  }))}
                  onChange={(name, value) => {
                    console.log(name, value);
                    // this.updateFilterModel(value, filter.id);
                  }}
                />
              </div>
              {FilterForm && (
                <FilterForm
                  index={index}
                  filter={filter}
                  field={field}
                  columnDef={columnDef}
                  onChange={() =>
                    setTimeout(() => {
                      (form.current as any).submit();
                    }, 300)
                  }
                />
              )}
            </div>
          );
        })}
        <PickField
          label={
            filtersCount > 0 ? (
              <FormattedMessage defaultMessage="Add another filter" />
            ) : (
              <FormattedMessage defaultMessage="No filters applied. Pick a field" />
            )
          }
          onClick={(columnDef) => {
            tableInstance.setFilter(columnDef.id, 'a');
          }}
          isDefaultOpen={filtersCount === 0}
          columnDefs={filterableColumnDefs}
        />
      </div>
    </Form>
  );
}
