import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef } from 'react';
import { ArrowDown, ArrowUp, X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';
import { SorterFormProps } from './types';

export default function SorterForm({ tableInstance }: SorterFormProps) {
  const { setSortBy } = tableInstance;
  const form = useRef(null);

  const handleSubmit = async (model) => {
    setSortBy(model.sorters || []);
  };

  const {
    columns,
    state: { sortBy },
  } = tableInstance;

  const sortableColumnDefs = columns.filter((f) => !f.hide);

  return (
    <Form ref={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
      <div className="list-group">
        {sortBy.map((sorter: any, index: number) => {
          return (
            <div className="list-group-item px-3 px-xl-4" key={sorter.id}>
              <div className="form-group mb-0">
                <label htmlFor="" className="d-flex align-items-center">
                  <FormattedMessage
                    id="guidu.data_controls.sorter.sorted_by"
                    defaultMessage={`{index, plural,
                        =0 {Sort by}
                        other {Then by}
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
                      setSortBy(sortBy.filter((s) => s.id !== sorter.id));
                    }}
                  >
                    <X size={13} />
                  </button>
                </label>
                <div className="form-row">
                  <div className="col-8">
                    <Select
                      layout="elementOnly"
                      isClearable={false}
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
                  <div className="col-4">
                    <Select
                      layout="elementOnly"
                      isClearable={false}
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
              </div>
            </div>
          );
        })}
        <PickField
          label={
            sortBy.length ? (
              <FormattedMessage
                id="guidu.data_controls.sorter.pick"
                defaultMessage="Pick another field to sort by"
              />
            ) : (
              <FormattedMessage
                id="guidu.data_controls.sorter.no_sorters"
                defaultMessage="No selected fields to sort by. Pick one"
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
