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

  handleSubmit = async (model) => {
    this.sortBy(model.sorters || []);
  };

  sortBy = (sorters) => {
    const { tableInstance } = this.props;
    const { setSortBy } = tableInstance;
    setSortBy([...sorters]);
  };

  render() {
    const { tableInstance, sorters } = this.props;
    const {
      columns,
      state: { sortBy },
    } = tableInstance;

    const sortableColumnDefs = columns.filter((f) => !f.hide);

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {sortBy.map((sorter: any, index: number) => {
            return (
              <div className="list-group-item px-3 px-xl-4" key={sorter.id}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        this.sortBy(sortBy.filter((s) => s.id !== sorter.id));
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
                        name={`sorters[${index}][id]`}
                        value={sorter.id}
                        options={sortableColumnDefs.map((columnDef) => ({
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
                        name={`sorters[${index}][desc]`}
                        value={sorter.desc}
                        options={[
                          {
                            id: true,
                            name: 'desc',
                            before: <ArrowDown size={16} />,
                          },
                          {
                            id: false,
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
              sortBy.length ? (
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
            onClick={(columnDef) => {
              this.sortBy([
                ...sortBy,
                {
                  id: columnDef.id,
                  desc: false,
                },
              ]);
            }}
            isDefaultOpen={sortBy.length === 0}
            columnDefs={sortableColumnDefs.filter(
              (f) => sortBy.map((s) => s.id).indexOf(f.id) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
