import { XIcon } from '@heroicons/react/solid';
import Button from '@uidu/button';
import { useDataManagerContext } from '@uidu/data-manager';
import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';
import { GrouperFormProps } from './types';

export default function GrouperForm({}: GrouperFormProps) {
  const form = useRef(null);
  const {
    tableInstance: {
      setGroupBy,
      columns,
      state: { groupBy },
    },
  } = useDataManagerContext();

  const handleSubmit = async (model) => {
    setGroupBy(model.groupers || []);
  };

  const groupableColumnDefs = columns.filter(
    (c) => c.isVisible && c.canGroupBy,
  );

  return (
    <Form ref={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
      <div tw="space-y-3">
        {groupBy.map((grouper: any, index: number) => {
          // const columnDef = getColumnDef(groupableColumnDefs, grouper);
          // const field = getFieldFromColumnDef(columnDef);
          // const { grouperForm: FieldGrouperForm } = field;

          return (
            <div tw="px-3 flex items-center space-x-3" key={grouper}>
              <div className="mb-0 form-group">
                <label htmlFor="" className="d-flex align-items-center">
                  <FormattedMessage
                    defaultMessage={`{index, plural,
                      =0 {Group by}
                      other {Then by}
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
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setGroupBy(groupBy.filter((g) => g !== grouper));
                }}
                iconBefore={<XIcon tw="h-4 w-4" />}
              />
            </div>
          );
        })}
        <PickField
          label={
            groupBy.length ? (
              <FormattedMessage
                defaultMessage="Pick a field to group by"
                id="uidu.data-controls.grouper.add_another"
              />
            ) : (
              <FormattedMessage
                defaultMessage="No selected fields to group by. Pick one"
                id="uidu.data-controls.grouper.no_groups"
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
