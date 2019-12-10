import { Toggler } from '@uidu/data-controls';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { CheckSquare, Columns } from 'react-feather';

export default class Configurator extends PureComponent<any> {
  handleSubmit = async model => {
    const { currentView, updateView } = this.props;
    updateView({
      ...currentView,
      ...model,
    });
  };

  render() {
    const {
      updateView,
      columnDefs,
      onDragEnd,
      gridColumnApi,
      currentView,
    } = this.props;
    return (
      <>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <Columns size={16} className="mr-2" />
              Choose columns
            </h6>
          </div>
          <div className="px-3 px-xl-4">
            <Form handleSubmit={this.handleSubmit} footerRenderer={() => null}>
              <Select
                name="primaryField"
                value={currentView.primaryField}
                options={columnDefs
                  .filter(column => {
                    return [
                      'singleSelect',
                      'country',
                      'contact',
                      'member',
                      'linkRecord',
                    ].includes(column.viewType);
                  })
                  .map(column => ({
                    id: column.colId,
                    name: column.headerName,
                    ...(column.headerComponentParams
                      ? { before: column.headerComponentParams.menuIcon }
                      : {}),
                  }))}
                onChange={(name, value) =>
                  updateView({
                    ...currentView,
                    [name]: value,
                  })
                }
                layout="elementOnly"
              />
            </Form>
          </div>
        </div>
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <CheckSquare size={16} className="mr-2" />
              Visible fields
            </h6>
          </div>
        </div>
        <Toggler
          {...this.props}
          columnDefs={columnDefs}
          onDragEnd={onDragEnd}
          gridColumnApi={gridColumnApi}
        />
      </>
    );
  }
}
