import { byName } from '@uidu/data-fields';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PickField from '../../utils/PickField';
import { FiltererProps } from './types';

const getColumnDef = (columnDefs, filter) =>
  columnDefs.filter(c => c.colId === filter.colId)[0];

const getType = type => {
  if (Array.isArray(type)) {
    return type[type.length - 1];
  }
  return type;
};

const getField = columnDef => byName[getType(columnDef.type)];

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
    const { filters, columnDefs, addFilter } = this.props;

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {filters.map((filter: any, index) => {
            const columnDef = getColumnDef(columnDefs, filter);
            const field = getField(columnDef);
            const { filterForm: FilterForm } = field;
            return (
              <div className="list-group-item px-3 px-xl-4" key={filter.colId}>
                <div className="form-group mb-2">
                  <label htmlFor="" className="d-flex align-items-center">
                    <FormattedMessage
                      id="guidu.data_controls.filterer.where"
                      defaultMessage="Where"
                    />
                  </label>
                  <Select
                    layout="elementOnly"
                    value={filter.colId}
                    name={`filters[${index}][colId]`}
                    options={columnDefs.map(columnDef => ({
                      id: columnDef.colId,
                      name: columnDef.headerName,
                      ...(columnDef.headerComponentParams
                        ? {
                            before: columnDef.headerComponentParams.menuIcon,
                          }
                        : {}),
                    }))}
                    isDisabled
                  />
                </div>
                {FilterForm && (
                  <FilterForm
                    index={index}
                    filter={filter}
                    field={field}
                    columnDef={columnDef}
                    onChange={() =>
                      setTimeout(() => {
                        (this.form.current as any).submit();
                      }, 30)
                    }
                  />
                )}
              </div>
            );
          })}
          <PickField
            label={
              filters.length ? (
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
              // push({
              //   sort: { id: 'asc', name: 'asc' },
              //   index: list.length,
              //   colId: columnDef,
              // });
              addFilter({
                colId: columnDef.colId,
              });
              setTimeout(() => {
                (this.form.current as any).submit();
              }, 300);
            }}
            isDefaultOpen={filters.length === 0}
            list={filters}
            columnDefs={columnDefs.filter(
              f => filters.map(s => s.colId).indexOf(f.colId) < 0,
            )}
          />
        </div>
      </Form>
    );
  }
}
