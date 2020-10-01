import { Form } from '@uidu/form';
import Select from '@uidu/select';
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

  groupBy = (groupers) => {
    const { tableInstance } = this.props;
    const { setGroupBy } = tableInstance;
    setGroupBy(groupers);
  };

  handleSubmit = async (model) => {
    this.groupBy(model.groupers || []);
  };

  render() {
    const { tableInstance } = this.props;
    const {
      setGroupBy,
      columns,
      state: { groupBy },
    } = tableInstance;

    const groupableColumnDefs = columns.filter(
      (c) => !c.hide && c.enableRowGroup,
    );

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {groupBy.map((grouper: any, index: number) => {
            // const columnDef = getColumnDef(groupableColumnDefs, grouper);
            // const field = getFieldFromColumnDef(columnDef);
            // const { grouperForm: FieldGrouperForm } = field;

            return (
              <div className="list-group-item px-3 px-xl-4" key={grouper}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        this.groupBy(groupBy.filter((g) => g !== grouper));
                      }}
                    >
                      <X size={13} />
                    </button>
                  </label>
                </div>
                <Select
                  layout="elementOnly"
                  isClearable={false}
                  name={`groupers[${index}]`}
                  value={grouper}
                  options={groupableColumnDefs.map((columnDef) => ({
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
              </div>
            );
          })}
          <PickField
            label={
              groupBy.length ? (
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
            onClick={(columnDef) => {
              this.groupBy([...groupBy, columnDef.colId]);
            }}
            isDefaultOpen={groupBy.length === 0}
            columnDefs={groupableColumnDefs.filter(
              (f) => groupBy.indexOf(f) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
