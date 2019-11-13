import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';

// this component should return an array of groupers https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

export default class Sorter extends Component<any> {
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
              <div className="form-row">
                <div className="col-8">
                  <Select
                    layout="elementOnly"
                    isClearable={false}
                    name={`grouper[${index}][colId]`}
                    value={grouper.colId}
                    options={columnDefs.map(columnDef => ({
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
                </div>
                {/* <div className="col-4">
                  <Select
                    layout="elementOnly"
                    isClearable={false}
                    name={`sorters[${index}][sort]`}
                    value={grouper.sort}
                    options={[
                      {
                        id: 'asc',
                        name: 'asc',
                        before: <ArrowUp size={16} />,
                      },
                      {
                        id: 'desc',
                        name: 'desc',
                        before: <ArrowDown size={16} />,
                      },
                    ]}
                    onChange={(name, value, { option }) => {
                      setTimeout(() => {
                        (this.form.current as any).submit();
                      }, 30);
                    }}
                  />
                </div> */}
              </div>
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
            list={groupers}
            isDefaultOpen={groupers.length === 0}
            columnDefs={columnDefs.filter(
              f =>
                !!f.sortable && groupers.map(s => s.colId).indexOf(f.colId) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
