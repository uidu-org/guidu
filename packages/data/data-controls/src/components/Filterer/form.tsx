import { XMarkIcon } from '@heroicons/react/24/solid';
import { ColumnFilter } from '@tanstack/react-table';
import Button from '@uidu/button';
import { getFieldFromColumnDef } from '@uidu/data-fields';
import Form, { useForm } from '@uidu/form';
import { MenuGroup, Section } from '@uidu/menu';
import Select from '@uidu/select';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ColumnsList from '../../utils/ColumnsList';
import PickField from '../../utils/PickField';
import { FiltererFormProps } from './types';

export default function FiltererForm<T>({
  closePopup,
  tableInstance,
}: FiltererFormProps<T>) {
  const {
    getAllFlatColumns,
    getState,
    setColumnFilters,
    getColumn,
    // setFilter,
    // setAllFilters,
  } = tableInstance;
  const intl = useIntl();

  const columns = getAllFlatColumns();
  const { columnFilters } = getState();
  const form = useForm({ mode: 'all' });

  const handleSubmit = async (model: { filters: ColumnFilter[] }) => {
    setColumnFilters(model.filters);
  };

  const filterableColumns = columns.filter((column) => column.getCanFilter());

  if (columnFilters.length === 0) {
    return (
      <MenuGroup>
        <Section
          title={intl.formatMessage({
            defaultMessage: 'Pick a field to filter by',
            id: 'uidu.data-controls.filterer.no_filters',
          })}
        >
          <ColumnsList
            onClick={(column) => {
              setColumnFilters([
                ...columnFilters,
                { id: column.id, value: 'a' },
              ]);
            }}
            columns={filterableColumns}
          />
        </Section>
      </MenuGroup>
    );
  }

  return (
    <div tw="py-4">
      <Form form={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
        <div tw="space-y-4">
          <div tw="grid grid-template-columns[max-content 1fr 2fr min-content] gap-4 px-4">
            {columnFilters.map((filter, index) => {
              const column = getColumn(filter.id);
              const { columnDef } = column;
              const field = getFieldFromColumnDef(columnDef);
              const { Filter: FilterForm } = field;
              return (
                <Fragment key={filter.id}>
                  <div tw="flex items-center">
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
                    options={filterableColumns.map((c) => ({
                      id: c.id,
                      name: c.columnDef?.meta?.name,
                      ...(c.columnDef?.meta?.icon
                        ? {
                            before: c.columnDef?.meta?.icon,
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
                            form.handleSubmit(console.log, console.error);
                          }, 300)
                        }
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const newColumnFilters = columnFilters.filter(
                        (f, i) => i !== index,
                      );
                      setColumnFilters(newColumnFilters);
                      if (newColumnFilters.length === 0) {
                        closePopup();
                      }
                    }}
                    iconBefore={<XMarkIcon tw="h-4 w-4" />}
                  />
                </Fragment>
              );
            })}
          </div>
          <PickField
            label={intl.formatMessage({
              defaultMessage: 'Add another filter',
              id: 'uidu.data-controls.filterer.add_another',
            })}
            onClick={(columnDef) => {
              setColumnFilters([
                ...columnFilters,
                { id: columnDef.id, value: 'a' },
              ]);
            }}
            columns={filterableColumns}
          />
        </div>
      </Form>
    </div>
  );
}
