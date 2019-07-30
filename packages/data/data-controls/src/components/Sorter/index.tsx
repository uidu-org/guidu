import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { Sliders, X } from 'react-feather';
import { List } from 'react-powerplug';
import { Trigger } from '../../styled';
import { DropdownMenu, PickField } from '../../utils';

// this component should return an array of sorters https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

type SorterProps = {};

export default class Sorter extends Component<any> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();
  private selectContainer = React.createRef();

  handleSubmit = async model => {
    const { onChange } = this.props;
    const response = await (this.form.current as any).form.getModel();
    onChange(response.sorters || []);
  };

  render() {
    const { sorters, fields } = this.props;
    const sortersCount = sorters.length;

    console.log(fields);

    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#fee2d5" className="btn" active={!!sortersCount}>
            <Sliders strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>
              {sortersCount ? `Sorted by ${sortersCount} fields` : 'Sort'}
            </span>
          </Trigger>
        }
      >
        <div className="p-3">
          <Form
            ref={this.form}
            footerRenderer={() => null}
            handleSubmit={this.handleSubmit}
          >
            <List initial={sorters}>
              {({ list, pull, push }) => (
                <div>
                  {list.map((sorter: any, index: number) => (
                    <div
                      className="d-flex align-items-center mb-2"
                      key={sorter.colId.colId}
                    >
                      <button
                        type="button"
                        className="btn btn-sm p-0 mr-2 d-flex align-items-center"
                        onClick={() => {
                          pull((value: any) => {
                            console.log(value);
                            return value.colId.colId === sorter.colId.colId;
                          });
                          (this.form.current as any).form.submit();
                        }}
                      >
                        <X size={13} />
                      </button>
                      <span className="small mr-4">
                        {index === 0 ? 'Sort by' : 'then by'}
                      </span>
                      <div style={{ minWidth: 180 }} className="mr-2">
                        <Select
                          value={sorter.colId}
                          layout="elementOnly"
                          isSearchable
                          isClearable={false}
                          name={`sorters[${index}][colId]`}
                          options={this.props.fields}
                          menuPosition="fixed"
                          getOptionLabel={option => option.headerName}
                          getOptionValue={option => option.colId}
                          onChange={() =>
                            (this.form.current as any).form.submit()
                          }
                          styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                          }}
                        />
                      </div>
                      <Select
                        layout="elementOnly"
                        isClearable={false}
                        name={`sorters[${index}][sort]`}
                        value={sorter.sort}
                        options={[
                          { id: 'asc', name: 'asc' },
                          { id: 'desc', name: 'desc' },
                        ]}
                        // https://github.com/OpusCapita/react-select/blob/2049ed35851b7f547a604995606384f307ca1675/src/client/components/MenuPortal__fix.react.js
                        menuPosition="fixed"
                        onChange={() => {
                          console.log('changed');
                          (this.form.current as any).form.submit();
                        }}
                        styles={{
                          menuPortal: base => ({ ...base, zIndex: 9999 }),
                        }}
                      />
                    </div>
                  ))}
                  {!list.length && (
                    <p className="text-muted">No sorts applied</p>
                  )}
                  <PickField
                    label="Pick a field to sort by"
                    onClick={field => {
                      push({
                        sort: { id: 'asc', name: 'asc' },
                        index: list.length,
                        colId: field,
                      });
                      (this.form.current as any).form.submit();
                    }}
                    list={sorters}
                    fields={fields.filter(f => !!f.sortable)}
                  />
                </div>
              )}
            </List>
          </Form>
        </div>
      </DropdownMenu>
    );
  }
}
