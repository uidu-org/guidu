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
    const { onChange } = this.props;
    onChange(model.sorters || []);
  };

  render() {
    const { sorters, columnDefs, addSorter, removeSorter } = this.props;

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {sorters.map((sorter: any, index: number) => {
            return (
              <div
                className="list-group-item px-3 px-xl-4"
                key={sorter.colId.colId}
              >
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
                        removeSorter(sorter);
                        // setTimeout(() => {
                        //   (this.form.current as any).submit();
                        // }, 300);
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
                        options={columnDefs.map(columnDef => ({
                          id: columnDef.colId,
                          name: columnDef.headerName,
                          ...(columnDef.headerComponentParams
                            ? {
                                before:
                                  columnDef.headerComponentParams.menuIcon,
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
                    <div className="col-4">
                      <Select
                        layout="elementOnly"
                        isClearable={false}
                        name={`sorters[${index}][sort]`}
                        value={sorter.sort}
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
                        // components={{
                        //   DropdownIndicator: () => null,
                        // }}
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
              // push({
              //   sort: { id: 'asc', name: 'asc' },
              //   index: list.length,
              //   colId: columnDef,
              // });
              addSorter({
                sort: 'asc',
                colId: columnDef.colId,
                index: sorters.length,
              });
              setTimeout(() => {
                (this.form.current as any).submit();
              }, 30);
            }}
            list={sorters}
            isDefaultOpen={sorters.length === 0}
            columnDefs={columnDefs.filter(
              f =>
                !!f.sortable && sorters.map(s => s.colId).indexOf(f.colId) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
