import { Form } from '@uidu/form';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { Filter } from 'react-feather';
import { List } from 'react-powerplug';
import { Trigger } from '../styled';
import AddToList from '../utils/AddToList';
import DropdownMenu from '../utils/DropdownMenu';

export default class Filterer extends Component<any> {
  static defaultProps = {
    onChange: console.log,
  };

  private form = React.createRef();

  render() {
    const { onChange, filters, fields } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Trigger activeBg="#d1f7c4" className="btn">
            <Filter strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'initial' }}>Filtra</span>
          </Trigger>
        }
      >
        <div className="p-3">
          <Form
            ref={this.form}
            footerRenderer={() => null}
            handleSubmit={onChange}
          >
            <List initial={filters}>
              {({ list, pull, push }) => (
                <div>
                  {list.map((filter: any, index) => (
                    <div
                      className="d-flex align-items-center mb-2"
                      key={filter.colId.colId}
                    >
                      <span>Where</span>
                      <Select
                        // menuPortalTarget={document.body}
                        name="field"
                        options={this.props.fields}
                        getOptionLabel={option => option.headerName}
                        getOptionValue={option => option.colId}
                      />
                      <Select
                        // menuPortalTarget={document.body}
                        defaultValue={{
                          label: 'is',
                          value: 'is',
                        }}
                        name="field"
                        options={[{ label: 'is', value: 'is' }]}
                      />
                      <Select
                        // menuPortalTarget={document.body}
                        name="field"
                        options={this.props.fields}
                        getOptionLabel={option => option.headerName}
                        getOptionValue={option => option.colId}
                      />
                    </div>
                  ))}
                  {!list.length && (
                    <p className="text-muted">No filters applied</p>
                  )}
                  <AddToList
                    label="Add filter"
                    onClick={field => {
                      push({
                        sort: { id: 'asc', name: 'asc' },
                        index: list.length,
                        colId: field,
                      });
                      (this.form.current as any).form.submit();
                    }}
                    list={filters}
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
