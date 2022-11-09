import { XMarkIcon } from '@heroicons/react/24/solid';
import Button from '@uidu/button';
import Form, { useForm, useWatch } from '@uidu/form';
import { MenuGroup, Section } from '@uidu/menu';
import Select, { OptionProps, SingleValueProps } from '@uidu/select';
import React, { Fragment, useCallback, useEffect } from 'react';
import { ArrowDown, ArrowRight, ArrowUp } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { PickField } from '../../utils';
import ColumnsList from '../../utils/ColumnsList';
import { SorterFormProps } from './types';

function Option({ data, innerProps, getStyles, ...otherProps }: OptionProps) {
  return (
    <div
      {...innerProps}
      style={{
        ...getStyles('option', otherProps),
      }}
    >
      <div tw="flex items-center mr-auto min-w-0 w-auto">
        <div tw="min-w-0 flex-1">
          <div tw="mb-0 truncate flex items-center">{data.name}</div>
        </div>
      </div>
    </div>
  );
}

function SingleValue({
  data,
  innerProps,
  getStyles,
  ...otherProps
}: SingleValueProps) {
  return (
    <div
      {...innerProps}
      tw="flex items-center mr-auto"
      style={{
        ...getStyles('singleValue', otherProps),
        // padding: '1rem',
        minWidth: 0,
        width: 'auto',
      }}
    >
      <div tw="min-w-0 flex-1">
        <div tw="flex items-center">{data.name}</div>
      </div>
    </div>
  );
}

export default function SorterForm<T>({
  closePopup,
  tableInstance,
}: SorterFormProps<T>) {
  const intl = useIntl();

  const { getState, setSorting, getAllFlatColumns } = tableInstance;

  const { sorting } = getState();
  const columns = getAllFlatColumns();

  const handleSubmit = useCallback(
    async (model) => {
      setSorting(model.sorters || []);
    },
    [setSorting],
  );

  const form = useForm({ mode: 'all' });
  const { control, formState, reset } = form;

  useEffect(() => {
    reset({ sorters: sorting });
  }, [reset, sorting, formState.isSubmitSuccessful]);

  const watchedData = useWatch({
    control,
    defaultValue: sorting,
  });

  useEffect(() => {
    async function update() {
      const temp = JSON.stringify(watchedData);
      const copiedValues = JSON.parse(temp);
      if (formState.isDirty) {
        return handleSubmit(copiedValues);
      }
      // eslint-disable-next-line compat/compat
      return Promise.resolve();
    }
    update();
  }, [watchedData, handleSubmit, formState.isDirty]);

  const sortableColumns = columns.filter((column) => column.getCanSort()); //.filter((c) => c.isVisible && c.canSortBy);

  if (sorting.length === 0) {
    return (
      <MenuGroup>
        <Section
          title={intl.formatMessage({
            defaultMessage: 'Pick a field to group by',
          })}
        >
          <ColumnsList
            columns={sortableColumns.filter(
              (f) => sorting.map((s) => s.id).indexOf(f.id) < 0,
            )}
            onClick={(column) =>
              setSorting([
                ...sorting,
                {
                  id: column.id,
                  desc: false,
                },
              ])
            }
          />
        </Section>
      </MenuGroup>
    );
  }

  return (
    <div tw="py-4">
      <Form form={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
        <div tw="space-y-4">
          {sorting?.length > 0 && (
            <div tw="grid [grid-template-columns:max-content 1fr min-content] gap-4 px-4">
              {sorting.map((sorter, index: number) => (
                <Fragment
                  // tw="px-3 space-x-3 mb-0 flex items-center"
                  key={sorter.id}
                >
                  <div tw="flex items-center">
                    <label htmlFor="" tw="whitespace-nowrap">
                      <FormattedMessage
                        defaultMessage={`{index, plural,
                      =0 {Sort by}
                      other {Then by}
                    }`}
                        values={{
                          index,
                        }}
                      />
                    </label>
                  </div>
                  <div tw="grid [grid-template-columns:1fr max-content] gap-x-4">
                    <div>
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
                        name={`sorters.${index}.id`}
                        value={sorter.id}
                        options={sortableColumns.map((column) => ({
                          id: column.id,
                          name: column.columnDef.meta?.name,
                          ...(column.columnDef.meta?.icon
                            ? {
                                before: column.columnDef.meta?.icon,
                              }
                            : {}),
                        }))}
                      />
                    </div>
                    <div>
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
                          Option,
                          SingleValue,
                        }}
                        name={`sorters.${index}.desc`}
                        value={sorter.desc}
                        options={[
                          {
                            id: true,
                            name: intl.formatMessage(
                              {
                                defaultMessage: 'Z {icon} A',
                                id: 'uidu.data-controls.sorter.sort_z_a',
                              },
                              { icon: <ArrowRight tw="mx-1" size={14} /> },
                            ),
                            before: <ArrowDown size={16} />,
                          },
                          {
                            id: false,
                            name: intl.formatMessage(
                              {
                                defaultMessage: 'A {icon} Z',
                                id: 'uidu.data-controls.sorter.sort_a_z',
                              },
                              { icon: <ArrowRight tw="mx-1" size={14} /> },
                            ),
                            before: <ArrowUp size={16} />,
                          },
                        ]}
                        // onChange={(name, value, { option }) => {
                        //   setTimeout(() => {
                        //     return handleSubmit(form.getValues());
                        //   }, 30);
                        // }}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const newSorting = sorting.filter(
                        (s) => s.id !== sorter.id,
                      );
                      setSorting(newSorting);
                      if (newSorting.length === 0) {
                        closePopup();
                      }
                    }}
                    iconBefore={<XMarkIcon tw="h-4 w-4" />}
                  />
                </Fragment>
              ))}
            </div>
          )}
          <PickField
            label={
              sorting.length ? (
                <FormattedMessage
                  defaultMessage="Pick another field to sort by"
                  id="uidu.data-controls.sorter.add_another"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="No selected fields to sort by. Pick one"
                  id="uidu.data-controls.sorter.no_sorters"
                />
              )
            }
            onClick={(columnDef) => {
              setSorting([
                ...sorting,
                {
                  id: columnDef.id,
                  desc: false,
                },
              ]);
            }}
            columns={sortableColumns.filter(
              (f) => sorting.map((s) => s.id).indexOf(f.id) < 0,
            )}
          />
        </div>
      </Form>
    </div>
  );
}
