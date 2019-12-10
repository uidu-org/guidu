import { Toggler } from '@uidu/data-controls';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { Calendar, CheckSquare, Layout } from 'react-feather';

export default class Configurator extends PureComponent<any> {
  handleSubmit = async model => console.log(model);

  render() {
    const {
      onResize,
      rowHeight,
      columnDefs,
      onDragEnd,
      gridColumnApi,
    } = this.props;
    return (
      <>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <Calendar size={16} className="mr-2" />
              Select date range fields
            </h6>
          </div>
          <div className="px-3 px-xl-4">
            <Form handleSubmit={this.handleSubmit} footerRenderer={() => null}>
              <Select
                name="foo"
                options={columnDefs
                  .filter(column => {
                    return ['date'].includes(column.viewType);
                  })
                  .map(column => ({
                    id: column.colId,
                    name: column.headerName,
                    ...(column.headerComponentParams
                      ? { before: column.headerComponentParams.menuIcon }
                      : {}),
                  }))}
                layout="elementOnly"
              />
            </Form>
          </div>
        </div>
        <div className="list-group mb-3">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <Layout size={16} className="mr-2" />
              Choose default view
            </h6>
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
