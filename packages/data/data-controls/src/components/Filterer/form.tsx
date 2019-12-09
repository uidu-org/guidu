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

  handleSubmit = async model => {
    const { gridApi, filterModel } = this.props;
    const newFilterModel = (model.filters || []).reduce((res, item) => {
      return {
        ...res,
        [item.colId]: item,
      };
    }, filterModel);
    gridApi.setFilterModel(newFilterModel);
  };

  render() {
    const { filtersCount, columnDefs, gridApi, filterModel } = this.props;
    const filterableColumnDefs = columnDefs.filter(c => !c.hide && !!c.filter);

    return (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <div className="list-group">
          {Object.keys(filterModel)
            .map(k => ({
              ...filterModel[k],
              colId: k,
            }))
            .map((filter: any, index) => {
              const columnDef = getColumnDef(filterableColumnDefs, filter);
              const field = getFieldFromColumnDef(columnDef);
              const { filterForm: FilterForm } = field;
              return (
                <div
                  className="list-group-item px-3 px-xl-4"
                  key={filter.colId}
                >
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
                            gridApi.setFilterModel(
                              Object.keys(filterModel).reduce((object, key) => {
                                if (key !== filter.colId) {
                                  object[key] = filterModel[key];
                                }
                                return object;
                              }, {}),
                            );
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
            onClick={columnDef => {
              gridApi.setFilterModel({
                ...filterModel,
                [columnDef.colId]: {
                  type: 'greaterThan',
                  filter: 10,
                },
              });
            }}
            isDefaultOpen={filtersCount === 0}
            columnDefs={filterableColumnDefs}
          />
        </div>
      </Form>
    );
  }
}
