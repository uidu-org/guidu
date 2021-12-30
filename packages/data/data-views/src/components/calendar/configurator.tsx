import { useDataManagerContext } from '@uidu/data-manager';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React from 'react';

export default function Configurator({}) {
  const { columns, currentView, updateView } = useDataManagerContext();

  const startDateField = currentView.preferences?.startDateField || 'createdAt';

  const handleSubmit = async (model) => console.log(model);

  return (
    <>
      <div className="mb-3 list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Select date range fields</h6>
        </div>
        <div className="px-3 px-xl-4">
          <Form handleSubmit={handleSubmit} footerRenderer={() => null}>
            <Select
              name="foo"
              options={columns
                .filter((column) => {
                  return ['date'].includes(column.kind);
                })
                .map((column) => ({
                  id: column.id,
                  name: column.name,
                  ...(column.icon ? { before: column.icon } : {}),
                }))}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              components={{
                DropdownIndicator: () => null,
              }}
              value={startDateField}
              layout="elementOnly"
              onChange={(name, value) => {
                updateView('preferences', {
                  ...currentView.preferences,
                  startDateField: value,
                });
              }}
            />
          </Form>
        </div>
      </div>
      <div className="mb-3 list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Choose default view</h6>
        </div>
      </div>
    </>
  );
}
