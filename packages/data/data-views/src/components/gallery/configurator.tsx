import { Table } from '@tanstack/react-table';
import { Toggler } from '@uidu/data-controls';
import FieldCounter from '@uidu/field-counter';
import Form, { useForm } from '@uidu/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import CardTypes from '../utils/CardTypes';

export default function Configurator<T>({
  tableInstance,
  currentView,
  setColumnCount,
  columnCount,
}: {
  currentView;
  tableInstance: Table<T>;
}) {
  const handleSubmit = async (model) => console.log(model);

  const form = useForm({ mode: 'all' });

  return (
    <>
      <div className="mb-3 list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Card preferences</h6>
        </div>
        <div className="px-3 px-xl-4">
          <Form
            form={form}
            handleSubmit={handleSubmit}
            footerRenderer={() => null}
          >
            <div tw="grid grid-cols-2 gap-6">
              <FieldCounter
                name="columnCount"
                label={
                  <FormattedMessage
                    defaultMessage="Column count"
                    id="uidu.data-views.gallery.configurator.column_count"
                  />
                }
                value={columnCount}
                onChange={(_name, value) => setColumnCount(value)}
                min={1}
                max={5}
              />
              <CardTypes tableInstance={tableInstance} />
            </div>
          </Form>
        </div>
      </div>
      <div className="list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Visible fields</h6>
        </div>
      </div>
      <Toggler onDragEnd={console.log} tableInstance={tableInstance} />
    </>
  );
}
