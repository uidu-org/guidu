import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { List } from 'react-powerplug';
import PickField from '../../utils/PickField';
import { FiltererProps } from './types';

export default class FiltererForm extends PureComponent<FiltererProps> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();

  handleSubmit = async model => {
    const { onChange } = this.props;
    onChange(model.filters || []);
  };

  render() {
    const { filters, columnDefs } = this.props;
    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <List initial={filters}>
          {({ list, pull, push }) => (
            <div className="list-group">
              {list.map((filter: any, index) => (
                <div
                  className="list-group-item px-3 px-xl-4"
                  key={filter.colId.colId}
                >
                  <div className="form-group mb-2">
                    <label htmlFor="" className="d-flex align-items-center">
                      <FormattedMessage
                        id="guidu.data_controls.filterer.where"
                        defaultMessage="Where"
                      />
                    </label>
                    <Select
                      layout="elementOnly"
                      value={filter.colId.colId}
                      name="field"
                      options={columnDefs.map(columnDef => ({
                        id: columnDef.colId,
                        name: columnDef.headerName,
                        ...(columnDef.headerComponentParams
                          ? {
                              before: columnDef.headerComponentParams.menuIcon,
                            }
                          : {}),
                      }))}
                    />
                  </div>
                  <div className="form-row">
                    <div className="col-3">
                      <Select
                        isClearable={false}
                        layout="elementOnly"
                        defaultValue="is"
                        name="field"
                        options={[{ name: 'is', id: 'is' }]}
                      />
                    </div>
                    <div className="col-9">
                      <Select
                        layout="elementOnly"
                        name="field"
                        options={columnDefs.map(columnDef => ({
                          id: columnDef.colId,
                          name: columnDef.headerName,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <PickField
                label={
                  list.length ? (
                    <FormattedMessage
                      id="guidu.data_controls.filterer.no_filters"
                      defaultMessage="Add another filter"
                    />
                  ) : (
                    <FormattedMessage
                      id="guidu.data_controls.filterer.no_filters"
                      defaultMessage="No filters applied. Pick a field"
                    />
                  )
                }
                onClick={columnDef => {
                  push({
                    sort: { id: 'asc', name: 'asc' },
                    index: list.length,
                    colId: columnDef,
                  });
                  setTimeout(() => {
                    (this.form.current as any).submit();
                  }, 30);
                }}
                isDefaultOpen={list.length === 0}
                list={filters}
                columnDefs={columnDefs}
              />
            </div>
          )}
        </List>
      </Form>
    );
  }
}
