import { XMarkIcon } from '@heroicons/react/24/solid';
import Button from '@uidu/button';
import Form, { useForm } from '@uidu/form';
import { MenuGroup, Section } from '@uidu/menu';
import Select from '@uidu/select';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PickField } from '../../utils';
import ColumnsList from '../../utils/ColumnsList';
import { GrouperFormProps } from './types';

export default function GrouperForm<T>({
  closePopup,
  tableInstance,
}: GrouperFormProps<T>) {
  const form = useForm({ mode: 'all' });
  const intl = useIntl();
  const { setGrouping, getState, getAllFlatColumns } = tableInstance;

  const { grouping } = getState();
  const columns = getAllFlatColumns();

  const handleSubmit = async (model: { groupers: string[] }) =>
    setGrouping(model.groupers || []);

  const groupableColumns = columns.filter((column) => column.getCanGroup());

  if (grouping.length === 0) {
    return (
      <MenuGroup>
        <Section
          title={intl.formatMessage({
            defaultMessage: 'Pick a field to group by',
          })}
        >
          <ColumnsList
            columns={groupableColumns}
            onClick={(column) => setGrouping([...grouping, column.id])}
          />
        </Section>
      </MenuGroup>
    );
  }

  return (
    <div tw="py-4">
      <Form form={form} footerRenderer={() => null} handleSubmit={handleSubmit}>
        <div tw="space-y-4">
          <div tw="grid [grid-template-columns:max-content 1fr min-content] gap-4 px-4">
            {grouping.map((grouper, index: number) => (
              <Fragment key={grouper}>
                <div tw="flex items-center">
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
                  options={groupableColumns.map((column) => ({
                    id: column.id,
                    name: column.columnDef.meta?.name,
                    ...(column.columnDef.meta?.icon
                      ? {
                          before: column.columnDef.meta?.icon,
                        }
                      : {}),
                  }))}
                  onChange={(name, value, { option }) => {
                    setTimeout(() => {
                      form.handleSubmit(console.log, console.error);
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
                    const newGrouping = grouping.filter((g) => g !== grouper);
                    setGrouping(newGrouping);
                    if (newGrouping.length === 0) {
                      closePopup();
                    }
                  }}
                  iconBefore={<XMarkIcon tw="h-4 w-4" />}
                />
              </Fragment>
            ))}
          </div>
          <PickField
            label={
              grouping.length ? (
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
              setGrouping([...grouping, columnDef.id]);
            }}
            columns={groupableColumns.filter((f) => grouping.indexOf(f.id) < 0)}
          />
        </div>
      </Form>
    </div>
  );
}
