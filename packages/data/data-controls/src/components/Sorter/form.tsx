import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { ArrowDown, ArrowUp, X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { List } from 'react-powerplug';
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
    const { sorters, columnDefs } = this.props;

    console.log(columnDefs);

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <List initial={sorters}>
          {({ list, pull, push }) => (
            <div className="list-group">
              {list.map((sorter: any, index: number) => {
                console.log(sorter);
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
                          onClick={() => {
                            pull((value: any) => {
                              console.log(value.colId.colId);
                              console.log(sorter);
                              return value.colId.colId === sorter.colId.colId;
                            });
                            setTimeout(() => {
                              (this.form.current as any).submit();
                            }, 300);
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
                            name={`sorters[${index}][colId][colId]`}
                            value={sorter.colId.colId}
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
                            name={`sorters[${index}][sort][id]`}
                            value={sorter.sort.id}
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
                          <FieldText
                            type="hidden"
                            value={sorter.colId.headerName}
                            layout="elementOnly"
                            name={`sorters[${index}][colId][headerName]`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <PickField
                label={
                  list.length ? (
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
                  console.log(columnDef);
                  push({
                    sort: { id: 'asc', name: 'asc' },
                    index: list.length,
                    colId: columnDef,
                  });
                  setTimeout(() => {
                    (this.form.current as any).submit();
                  }, 30);
                }}
                list={sorters}
                isDefaultOpen={list.length === 0}
                columnDefs={columnDefs.filter(
                  f =>
                    !!f.sortable &&
                    sorters.map(s => s.colId.colId).indexOf(f.colId) < 0,
                )}
              />
            </div>
          )}
        </List>
      </Form>
    );
  }
}
