import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { Server, X } from 'react-feather';
import { List } from 'react-powerplug';
import { Trigger } from '../../styled';
import { DropdownMenu, PickField } from '../../utils';

// this component should return an array of groupers https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

export default class Sorter extends Component<any> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();
  private selectContainer = React.createRef();

  handleSubmit = async model => {
    const { onChange } = this.props;
    const response = await (this.form.current as any).form.getModel();
    console.log('groupers from form', response.groupers);
    onChange(response.groupers || []);
  };

  render() {
    const { groupers, fields } = this.props;
    console.log('groupers from props', groupers);
    const groupersCount = groupers.length;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#ede2fe" className="btn" active={!!groupersCount}>
            <Server strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>
              {groupersCount
                ? `Raggrupati da ${groupersCount} campi`
                : 'Raggruppa'}
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
            <List initial={groupers}>
              {({ list, pull, push }) => (
                <div>
                  {list.map((grouper: any, index: number) => (
                    <div
                      className="d-flex align-items-center mb-2"
                      key={grouper.colId.colId}
                    >
                      <button
                        type="button"
                        className="btn btn-sm p-0 mr-2 d-flex align-items-center"
                        onClick={() => {
                          pull((value: any) => {
                            console.log(value);
                            return value.colId.colId === grouper.colId.colId;
                          });
                          (this.form.current as any).form.submit();
                        }}
                      >
                        <X size={13} />
                      </button>
                      <span className="small mr-4">
                        {index === 0 ? 'Group by' : 'then by'}
                      </span>
                      <div style={{ minWidth: 180 }} className="mr-2">
                        <Select
                          value={grouper.colId}
                          layout="elementOnly"
                          isSearchable
                          isClearable={false}
                          name={`groupers[${index}][colId]`}
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
                        name={`groupers[${index}][sort]`}
                        value={grouper.sort}
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
                    <p className="text-muted">No groupings applied</p>
                  )}
                  <PickField
                    label="Pick a field to group by"
                    onClick={field => {
                      push({
                        sort: { id: 'asc', name: 'asc' },
                        index: list.length,
                        colId: field,
                      });
                      (this.form.current as any).form.submit();
                    }}
                    list={groupers}
                    fields={fields}
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
