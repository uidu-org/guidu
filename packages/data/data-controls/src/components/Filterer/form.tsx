import { XIcon } from '@heroicons/react/solid';
import Button from '@uidu/button';
import { getColumnDef, getFieldFromColumnDef } from '@uidu/data-fields';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef } from 'react';
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
      <div tw="space-y-3">
        {filters.map((filter: any, index) => {
          const columnDef = getColumnDef(filterableColumnDefs, filter);
          const field = getFieldFromColumnDef(columnDef);
          const { Filter: FilterForm } = field;
          return (
            <div tw="px-3 flex items-center space-x-3" key={filter.id}>
              <div className="mb-0 form-group">
                <label htmlFor="" tw="flex items-center m-0">
                  <FormattedMessage
                    defaultMessage={`{index, plural,
                      =0 {Where}
                      other {Then where}
                    }`}
                    values={{
                      index,
                    }}
                  />
                </label>
              </div>
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
              {FilterForm && (
                <div tw="flex-1">
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
                </div>
              )}
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  tableInstance.setFilter(filter.id, undefined);
                }}
                iconBefore={<XIcon tw="h-4 w-4" />}
              />
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
