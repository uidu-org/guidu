import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';

// this component should return an array of groupers https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

export default class Grouper extends Component<any> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();

  handleSubmit = async model => {
    const { onChange } = this.props;
    onChange(model.groupers || []);
  };

  render() {
    const { groupers, columnDefs, addGrouper, removeGrouper } = this.props;

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
          {groupers.map((grouper: any, index: number) => (
            <div
              className="list-group-item px-3 px-xl-4"
              key={grouper.colId.colId}
            >
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
                      removeGrouper(grouper);
                      // setTimeout(() => {
                      //   (this.form.current as any).submit();
                      // }, 300);
                    }}
                  >
                    <X size={13} />
                  </button>
                </label>
              </div>
              <Select
                layout="elementOnly"
                isClearable={false}
                name={`grouper[${index}][colId]`}
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
              <p>Choose agg func for all columns that can be aggregated</p>
              {columnDefs
                .filter(columnDef => !columnDef.hide && !!columnDef.aggFunc)
                .map(columnDef => (
                  <p>{columnDef.headerName}</p>
                ))}
            </div>
          ))}
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
              addGrouper({
                sort: 'asc',
                colId: columnDef.colId,
                index: groupers.length,
              });
              setTimeout(() => {
                (this.form.current as any).submit();
              }, 300);
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
