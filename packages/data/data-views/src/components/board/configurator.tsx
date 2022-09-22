import { Table } from '@tanstack/react-table';
import { Toggler } from '@uidu/data-controls';
import Form, { useForm } from '@uidu/form';
import Select from '@uidu/select';
import React from 'react';

export default function Configurator<T>({
  onDragEnd,
  tableInstance,
  currentView,
  updateView,
}: {
  onDragEnd;
  tableInstance: Table<T>;
  currentView;
  updateView;
}) {
  const { getAllColumns } = tableInstance;
  const columns = getAllColumns();

  const primaryField = currentView.preferences?.primaryField || 'status';

  const form = useForm({ mode: 'all' });

  return (
    <>
      <div className="mb-3 list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Choose columns</h6>
        </div>
        <div className="px-3 px-xl-4">
          <Form form={form} handleSubmit={() => {}} footerRenderer={() => null}>
            <Select
              name="primaryField"
              value={primaryField}
              options={columns
                .filter((column) => {
                  return [
                    'singleSelect',
                    'country',
                    'contact',
                    'member',
                  ].includes(column.kind);
                })
                .map((column) => ({
                  id: column.id,
                  name: column.name,
                  ...(column.icon ? { before: column.icon } : {}),
                }))}
              onChange={(name, value) =>
                updateView('preferences', {
                  ...currentView.preferences,
                  [name]: value,
                })
              }
              layout="elementOnly"
            />
          </Form>
        </div>
      </div>
      <div className="list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Visible fields</h6>
        </div>
      </div>
      <Toggler onDragEnd={onDragEnd} tableInstance={tableInstance} />
    </>
  );
}
