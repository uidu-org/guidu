import { Form } from '@uidu/form';
import Select from '@uidu/select';
import { getColumnDef, getFieldFromColumnDef } from '@uidu/table';
import React, { Component } from 'react';
import { X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';
import { GrouperProps } from './types';

// this component should return an array of groupers https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

export default class Grouper extends Component<GrouperProps> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();

  groupBy = groupers => {
    const { gridApi, gridColumnApi, columnDefs } = this.props;
    gridApi.showLoadingOverlay();

    setTimeout(() => {
      gridColumnApi.setRowGroupColumns(groupers.map(g => g.colId));
      gridApi.refreshCells({ force: true });
      gridApi.hideOverlay();
    }, 300);
  };

  handleSubmit = async model => {
    this.groupBy(model.groupers || []);
  };

  render() {
    const { groupers, columnDefs } = this.props;

    const groupableColumnDefs = columnDefs.filter(
      c => !c.hide && c.enableRowGroup,
    );

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {groupers.map((grouper: any, index: number) => {
            const columnDef = getColumnDef(groupableColumnDefs, grouper);
            const field = getFieldFromColumnDef(columnDef);
            const { grouperForm: FieldGrouperForm } = field;

            return (
              <div className="list-group-item px-3 px-xl-4" key={grouper.colId}>
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
                      onClick={e => {
                        e.preventDefault();
                        this.groupBy(
                          groupers.filter(g => g.colId !== grouper.colId),
                        );
                      }}
                    >
                      <X size={13} />
                    </button>
                  </label>
                </div>
                <Select
                  layout="elementOnly"
                  isClearable={false}
                  name={`groupers[${index}][colId]`}
                  value={grouper.colId}
                  options={groupableColumnDefs.map(columnDef => ({
                    id: columnDef.colId,
                    name: columnDef.headerName,
                    ...(columnDef.headerComponentParams
                      ? {
                          before: columnDef.headerComponentParams.menuIcon,
                        }
                      : {}),
                  }))}
                  onChange={(name, value, { option }) => {
                    setTimeout(() => {
                      (this.form.current as any).submit();
                    }, 30);
                  }}
                />
                {/* <p>Choose agg func for all columns that can be aggregated</p>
                {columnDefs
                  .filter(columnDef => !columnDef.hide && !!columnDef.aggFunc)
                  .map(columnDef => (
                    <p >{columnDef.headerName}</p>
                  ))} */}
                {FieldGrouperForm && (
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
                )}
              </div>
            );
          })}
          <PickField
            label={
              groupers.length ? (
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
            onClick={columnDef => {
              this.groupBy([...groupers, { colId: columnDef.colId }]);
            }}
            isDefaultOpen={groupers.length === 0}
            columnDefs={groupableColumnDefs.filter(
              f => groupers.map(s => s.colId).indexOf(f.colId) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
