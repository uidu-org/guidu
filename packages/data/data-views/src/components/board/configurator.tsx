import { Toggler } from '@uidu/data-controls';
import Form from '@uidu/form';
import Select from '@uidu/select';
import { extractColumnType } from '@uidu/table';
import React, { PureComponent } from 'react';
import { CheckSquare, Columns } from 'react-feather';

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
              <Columns size={16} className="mr-2" />
              Choose columns
            </h6>
          </div>
          <div className="px-3 px-xl-4">
            <Form handleSubmit={this.handleSubmit} footerRenderer={() => null}>
              <Select
                name="primaryField"
                options={columnDefs
                  .filter(column => {
                    return [
                      'singleSelect',
                      'country',
                      'member',
                      'linkRecord',
                    ].includes(extractColumnType(column.type));
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
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <CheckSquare size={16} className="mr-2" />
              Visible fields
            </h6>
          </div>
        </div>
        <Toggler
          columnDefs={columnDefs}
          onDragEnd={onDragEnd}
          gridColumnApi={gridColumnApi}
          {...this.props}
        />
      </>
    );
  }
}
