import { Form } from '@uidu/form';
import InlineDialog from '@uidu/inline-dialog';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { Filter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { List } from 'react-powerplug';
import { Trigger } from '../../styled';
import AddToList from '../../utils/AddToList';
import { FiltererProps } from './types';

export default class Filterer extends Component<FiltererProps, any> {
  static defaultProps = {
    onChange: async model => console.log(model),
  };

  private form = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    const { onChange, filters, fields } = this.props;
    console.log(fields);
    const content = (
      <Form ref={this.form} footerRenderer={() => null} handleSubmit={onChange}>
        <List initial={filters}>
          {({ list, pull, push }) => (
            <div>
              {list.map((filter: any, index) => (
                <div
                  className="d-flex align-items-center mb-2"
                  key={filter.colId.colId}
                >
                  <span>
                    <FormattedMessage
                      id="guidu.data_controls.filterer.where"
                      defaultMessage="Where"
                    />
                  </span>
                  <Select
                    // menuPortalTarget={document.body}
                    value={filter.colId}
                    name="field"
                    options={this.props.fields.map(field => ({
                      id: field.colId,
                      name: field.headerName,
                    }))}
                  />
                  <Select
                    // menuPortalTarget={document.body}
                    defaultValue="is"
                    name="field"
                    options={[{ name: 'is', id: 'is' }]}
                  />
                  <Select
                    // menuPortalTarget={document.body}
                    name="field"
                    options={this.props.fields.map(field => ({
                      id: field.colId,
                      name: field.headerName,
                    }))}
                  />
                </div>
              ))}
              {!list.length && (
                <p className="text-muted">
                  <FormattedMessage
                    id="guidu.data_controls.filterer.no_filters"
                    defaultMessage="No filters applied"
                  />
                </p>
              )}
              <AddToList
                label={
                  <FormattedMessage
                    id="guidu.data_controls.filterer.no_filters"
                    defaultMessage="Add a filter"
                  />
                }
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
    );

    return (
      <InlineDialog
        onClose={() => {
          this.setState({ dialogOpen: false });
        }}
        content={content}
        isOpen={this.state.dialogOpen}
      >
        <Trigger
          activeBg="#d1f7c4"
          className="btn"
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Filter strokeWidth={2} size={14} className="mr-2" />
          <span style={{ textTransform: 'initial' }}>
            <FormattedMessage
              id="guidu.data_controls.filterer.label"
              defaultMessage="Filter"
            />
          </span>
        </Trigger>
      </InlineDialog>
    );
  }
}
