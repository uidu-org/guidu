import Form from '@uidu/form';
import Select from '@uidu/select';
import { getColumnDef, getFieldFromColumnDef } from '@uidu/table';
import React, { PureComponent } from 'react';
import { X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import PickField from '../../utils/PickField';
import { FiltererProps } from './types';

export default class FiltererForm extends PureComponent<FiltererProps> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();

  handleSubmit = async (model) => {
    const { filterModel, filters, tableInstance } = this.props;
    tableInstance.setAllFilters(model.filters);
  };

  render() {
    const { filtersCount, tableInstance, filters } = this.props;
    const filterableColumnDefs = tableInstance.columns.filter((c) => !c.hide);

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {filters.map((filter: any, index) => {
            const columnDef = getColumnDef(filterableColumnDefs, filter);
            const field = getFieldFromColumnDef(columnDef);
            const { filterForm: FilterForm } = field;
            return (
              <div className="list-group-item px-3 px-xl-4" key={filter.id}>
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
                        onClick={(e) => {
                          e.preventDefault();
                          tableInstance.setFilter(filter.id, undefined);
                        }}
                      >
                        <X size={13} />
                      </button>
                    </label>
                  </div>
                  <Select
                    layout="elementOnly"
                    value={filter.id}
                    name={`filters[${index}][id]`}
                    options={filterableColumnDefs.map((columnDef) => ({
                      id: columnDef.colId,
                      name: columnDef.headerName,
                      ...(columnDef.headerComponentParams
                        ? {
                            before: columnDef.headerComponentParams.menuIcon,
                          }
                        : {}),
                    }))}
                    onChange={(name, value) => {
                      console.log(name, value);
                      // this.updateFilterModel(value, filter.colId);
                    }}
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
                      }, 300)
                    }
                  />
                )}
              </div>
            );
          })}
          <PickField
            label={
              filtersCount > 0 ? (
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
            onClick={(columnDef) => {
              tableInstance.setFilter(columnDef.id, 'a');
            }}
            isDefaultOpen={filtersCount === 0}
            columnDefs={filterableColumnDefs}
          />
        </div>
      </Form>
    );
  }
}
