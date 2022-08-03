import { XIcon } from '@heroicons/react/solid';
import Button from '@uidu/button';
import { useDataManagerContext } from '@uidu/data-manager';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { Fragment, useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUp } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { OptionProps, SingleValueProps } from 'react-select';
import { PickField } from '../../utils';
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

export default function SorterForm(props: SorterFormProps) {
  const intl = useIntl();
  const form = useRef(null);
  const {
    tableInstance: {
      columns,
      state: { sortBy },
      setSortBy,
    },
  } = useDataManagerContext();

  const handleSubmit = async (model) => {
    setSortBy(model.sorters || []);
  };

  const sortableColumnDefs = columns.filter((c) => c.isVisible && c.canSortBy);

  return (
    <Form ref={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
      <div tw="space-y-4">
        {sortBy.length > 0 && (
          <div tw="grid grid-template-columns[max-content 1fr min-content] gap-4 px-4">
            {sortBy.map((sorter: any, index: number) => {
              return (
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
                  <div tw="grid grid-template-columns[1fr max-content] gap-x-4">
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
                        name={`sorters[${index}][id]`}
                        value={sorter.id}
                        options={sortableColumnDefs.map((columnDef) => ({
                          id: columnDef.id,
                          name: columnDef.name,
                          ...(columnDef.icon
                            ? {
                                before: columnDef.icon,
                              }
                            : {}),
                        }))}
                        onChange={() => {
                          setTimeout(() => {
                            (form.current as any).submit();
                          }, 30);
                        }}
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
                        name={`sorters[${index}][desc]`}
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
                        onChange={(name, value, { option }) => {
                          setTimeout(() => {
                            (form.current as any).submit();
                          }, 30);
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSortBy(sortBy.filter((s) => s.id !== sorter.id));
                    }}
                    iconBefore={<XIcon tw="h-4 w-4" />}
                  />
                </Fragment>
              );
            })}
          </div>
        )}
        <PickField
          label={
            sortBy.length ? (
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
            setSortBy([
              ...sortBy,
              {
                id: columnDef.id,
                desc: false,
              },
            ]);
          }}
          isDefaultOpen={sortBy.length === 0}
          columnDefs={sortableColumnDefs.filter(
            (f) => sortBy.map((s) => s.id).indexOf(f.id) < 0,
          )}
        />
      </div>
    </Form>
  );
}
