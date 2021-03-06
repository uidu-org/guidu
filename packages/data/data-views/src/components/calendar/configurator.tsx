import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent<any> {
  handleSubmit = async (model) => console.log(model);

  render() {
    const {
      onResize,
      rowHeight,
      columnDefs,
      onDragEnd,
      currentView,
      updateView,
      startDateField,
    } = this.props;
    return (
      <>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">Select date range fields</h6>
          </div>
          <div className="px-3 px-xl-4">
            <Form handleSubmit={this.handleSubmit} footerRenderer={() => null}>
              <Select
                name="foo"
                options={columnDefs
                  .filter((column) => {
                    return ['date'].includes(column.kind);
                  })
                  .map((column) => ({
                    id: column.id,
                    name: column.name,
                    ...(column.icon ? { before: column.icon } : {}),
                  }))}
                value={startDateField}
                layout="elementOnly"
                onChange={(name, value) => {
                  updateView(currentView, {
                    preferences: { startDateField: value },
                  });
                }}
              />
            </Form>
          </div>
        </div>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">Choose default view</h6>
          </div>
        </div>
      </>
    );
  }
}
