import { XIcon } from '@heroicons/react/solid';
import Button from '@uidu/button';
import { useDataManagerContext } from '@uidu/data-manager';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';
import { SorterFormProps } from './types';

export default function SorterForm(props: SorterFormProps) {
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
        {sortBy.map((sorter: any, index: number) => {
          return (
            <div tw="px-3 space-x-3 mb-0 flex items-center" key={sorter.id}>
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
              <div tw="flex w-full items-center">
                <div tw="w-8/12">
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
                <div tw="w-4/12">
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
                    name={`sorters[${index}][desc]`}
                    value={sorter.desc}
                    options={[
                      {
                        id: true,
                        name: 'desc',
                        before: <ArrowDown size={16} />,
                      },
                      {
                        id: false,
                        name: 'asc',
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
            </div>
          );
        })}
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
