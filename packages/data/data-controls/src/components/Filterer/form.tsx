import { byName } from '@uidu/data-fields';
import Form from '@uidu/form';
import Select from '@uidu/select';
import React, { PureComponent } from 'react';
import { X } from 'react-feather';
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
    console.log(model);
    onChange(model.filters || []);
  };

  render() {
    const { filters, columnDefs, addFilter, removeFilter } = this.props;

    console.log(columnDefs);

    const filterableColumnDefs = columnDefs.filter(c => !c.hide && !!c.filter);
    console.log(filterableColumnDefs);

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {filters.map((filter: any, index) => {
            const columnDef = getColumnDef(filterableColumnDefs, filter);
            const field = getField(columnDef);
            const { filterForm: FilterForm } = field;
            return (
              <div className="list-group-item px-3 px-xl-4" key={filter.colId}>
                <div className="form-group mb-2">
                  <div className="form-group mb-0">
                    <label htmlFor="" className="d-flex align-items-center">
                      <FormattedMessage
                        id="guidu.data_controls.filterer.where"
                        defaultMessage={`{index, plural,
                      =0 {Where}
                      other {Then where}
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
                          removeFilter(filter);
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
                    value={filter.colId}
                    name={`filters[${index}][colId]`}
                    options={filterableColumnDefs.map(columnDef => ({
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
            columnDefs={filterableColumnDefs}
          />
        </div>
      </Form>
    );
  }
}
