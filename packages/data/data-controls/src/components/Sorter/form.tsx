import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { ArrowDown, ArrowUp, X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { PickField } from '../../utils';
import { SorterProps } from './types';

export default class SorterForm extends PureComponent<SorterProps> {
  static defaultProps = {
    onChange: console.log,
    sorters: [],
  };

  private form = React.createRef();

  handleSubmit = async model => {
    const { gridApi } = this.props;
    gridApi.setSortModel(model.sorters || []);
  };

  render() {
    const { sorters, columnDefs, gridApi } = this.props;

    const sortableColumnDefs = columnDefs.filter(f => !f.hide && !!f.sortable);

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {sorters.map((sorter: any, index: number) => {
            return (
              <div className="list-group-item px-3 px-xl-4" key={sorter.colId}>
                <div className="form-group mb-0">
                  <label htmlFor="" className="d-flex align-items-center">
                    <FormattedMessage
                      id="guidu.data_controls.sorter.sorted_by"
                      defaultMessage={`{index, plural,
                          =0 {Sort by}
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
                        gridApi.setSortModel(
                          sorters.filter(s => s.colId !== sorter.colId),
                        );
                      }}
                    >
                      <X size={13} />
                    </button>
                  </label>
                  <div className="form-row">
                    <div className="col-8">
                      <Select
                        layout="elementOnly"
                        isClearable={false}
                        name={`sorters[${index}][colId]`}
                        value={sorter.colId}
                        options={sortableColumnDefs.map(columnDef => ({
                          id: columnDef.colId,
                          name: columnDef.headerName,
                          ...(columnDef.headerComponentParams
                            ? {
                                before:
                                  columnDef.headerComponentParams.menuIcon,
                              }
                            : {}),
                        }))}
                        onChange={() => {
                          setTimeout(() => {
                            (this.form.current as any).submit();
                          }, 30);
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <Select
                        layout="elementOnly"
                        isClearable={false}
                        name={`sorters[${index}][sort]`}
                        value={sorter.sort}
                        options={[
                          {
                            id: 'desc',
                            name: 'desc',
                            before: <ArrowDown size={16} />,
                          },
                          {
                            id: 'asc',
                            name: 'asc',
                            before: <ArrowUp size={16} />,
                          },
                        ]}
                        onChange={(name, value, { option }) => {
                          setTimeout(() => {
                            (this.form.current as any).submit();
                          }, 30);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <PickField
            label={
              sorters.length ? (
                <FormattedMessage
                  id="guidu.data_controls.sorter.pick"
                  defaultMessage="Pick another field to sort by"
                />
              ) : (
                <FormattedMessage
                  id="guidu.data_controls.sorter.no_sorters"
                  defaultMessage="No selected fields to sort by. Pick one"
                />
              )
            }
            onClick={columnDef => {
              gridApi.setSortModel([
                ...sorters,
                {
                  colId: columnDef.colId,
                  sort: 'desc',
                },
              ]);
              setTimeout(() => {
                (this.form.current as any).submit();
              }, 30);
            }}
            isDefaultOpen={sorters.length === 0}
            columnDefs={sortableColumnDefs.filter(
              f => sorters.map(s => s.colId).indexOf(f.colId) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
