import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef } from 'react';
import { X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';
import { GrouperFormProps } from './types';

export default function GrouperForm({ tableInstance }: GrouperFormProps) {
  const form = useRef(null);
  const {
    setGroupBy,
    columns,
    state: { groupBy },
  } = tableInstance;

  const handleSubmit = async (model) => {
    setGroupBy(model.groupers || []);
  };

  const groupableColumnDefs = columns.filter(
    (c) => c.isVisible && c.canGroupBy,
  );

  return (
    <Form ref={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
      <div className="list-group">
        {groupBy.map((grouper: any, index: number) => {
          // const columnDef = getColumnDef(groupableColumnDefs, grouper);
          // const field = getFieldFromColumnDef(columnDef);
          // const { grouperForm: FieldGrouperForm } = field;

          return (
            <div className="list-group-item px-3 px-xl-4" key={grouper}>
              <div className="form-group mb-0">
                <label htmlFor="" className="d-flex align-items-center">
                  <FormattedMessage
                    id="guidu.data_controls.grouper.grouped_by"
                    defaultMessage={`{index, plural,
                      =0 {Group by}
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
                      setGroupBy(groupBy.filter((g) => g !== grouper));
                    }}
                  >
                    <X size={13} />
                  </button>
                </label>
              </div>
              <Select
                layout="elementOnly"
                isClearable={false}
                name={`groupers[${index}]`}
                value={grouper}
                options={groupableColumnDefs.map((columnDef) => ({
                  id: columnDef.id,
                  name: columnDef.name,
                  ...(columnDef.icon
                    ? {
                        before: columnDef.icon,
                      }
                    : {}),
                }))}
                onChange={(name, value, { option }) => {
                  setTimeout(() => {
                    (form.current as any).submit();
                  }, 30);
                }}
              />
              {/* <p>Choose agg func for all columns that can be aggregated</p>
                {columnDefs
                  .filter(columnDef => !columnDef.hide && !!columnDef.aggFunc)
                  .map(columnDef => (
                    <p >{columnDef.name}</p>
                  ))} */}
              {/* {FieldGrouperForm && (
                  <FieldGrouperForm
                    index={index}
                    grouper={grouper}
                    field={field}
                    columnDef={columnDef}
                    onChange={() =>
                      setTimeout(() => {
                        (this.form.current as any).submit();
                      }, 300)
                    }
                  />
                )} */}
            </div>
          );
        })}
        <PickField
          label={
            groupBy.length ? (
              <FormattedMessage
                id="guidu.data_controls.grouper.pick"
                defaultMessage="Pick a field to group by"
              />
            ) : (
              <FormattedMessage
                id="guidu.data_controls.grouper.no_groupers"
                defaultMessage="No selected fields to group by. Pick one"
              />
            )
          }
          onClick={(columnDef) => {
            setGroupBy([...groupBy, columnDef.id]);
          }}
          isDefaultOpen={groupBy.length === 0}
          columnDefs={groupableColumnDefs.filter((f) => groupBy.indexOf(f) < 0)}
        />
      </div>
    </Form>
  );
}
