import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import InlineDialog from '@uidu/inline-dialog';
import Select from '@uidu/select';
import React, { Component } from 'react';
import { Sliders, X } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { List } from 'react-powerplug';
import { Trigger } from '../../styled';
import { PickField } from '../../utils';

// this component should return an array of sorters https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

type SorterProps = {};

export default class Sorter extends Component<any, any> {
  static defaultProps = {
    onChange: console.log,
    sorters: [],
  };

  private form = React.createRef();
  private selectContainer = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  handleSubmit = async model => {
    const { onChange } = this.props;
    const response = await (this.form.current as any).getModel();
    console.log(response);
    onChange(response.sorters || []);
  };

  render() {
    const { sorters, fields } = this.props;
    const sortersCount = sorters.length;

    console.log(sorters);
    console.log(fields);

    const content = (
      <Form
        ref={this.form}
        footerRenderer={() => null}
        handleSubmit={this.handleSubmit}
      >
        <List initial={sorters}>
          {({ list, pull, push }) => (
            <div>
              {list.map((sorter: any, index: number) => {
                console.log(sorter);
                return (
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
                        (this.form.current as any).submit();
                      }}
                    >
                      <X size={13} />
                    </button>
                    <span className="small mr-auto" style={{ minWidth: 200 }}>
                      <FormattedMessage
                        id="guidu.data_controls.sorter.sorted_by"
                        defaultMessage={`{index, plural,
                            =0 {Sort by}
                            other {then by}
                          } {label}`}
                        values={{ index, label: sorter.colId.headerName }}
                      />
                    </span>
                    <FieldText
                      type="hidden"
                      value={sorter.colId.colId}
                      layout="elementOnly"
                      name={`sorters[${index}][colId][colId]`}
                    />
                    <FieldText
                      type="hidden"
                      value={sorter.colId.headerName}
                      layout="elementOnly"
                      name={`sorters[${index}][colId][headerName]`}
                    />
                    <Select
                      layout="elementOnly"
                      isClearable={false}
                      name={`sorters[${index}][sort][id]`}
                      value={sorter.sort.id}
                      options={[
                        { id: 'asc', name: 'asc' },
                        { id: 'desc', name: 'desc' },
                      ]}
                      onChange={(name, value, { option }) => {
                        console.log(value);
                        console.log(option);
                        (this.form.current as any).submit();
                      }}
                    />
                  </div>
                );
              })}
              {!list.length && (
                <p className="text-muted">
                  <FormattedMessage
                    id="guidu.data_controls.sorter.no_sorters"
                    defaultMessage="No selected fields to sort by"
                  />
                </p>
              )}
              <PickField
                label={
                  <FormattedMessage
                    id="guidu.data_controls.sorter.pick"
                    defaultMessage="Pick a field to sort by"
                  />
                }
                onClick={field => {
                  console.log(field);
                  push({
                    sort: { id: 'asc', name: 'asc' },
                    index: list.length,
                    colId: field,
                  });
                  setTimeout(() => {
                    (this.form.current as any).submit();
                  }, 30);
                }}
                list={sorters}
                fields={fields.filter(
                  f =>
                    !!f.sortable &&
                    sorters.map(s => s.colId.colId).indexOf(f.colId) < 0,
                )}
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
          activeBg="#fee2d5"
          className="btn"
          active={!!sortersCount}
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Sliders strokeWidth={2} size={14} className="mr-2" />
          <span style={{ textTransform: 'initial' }}>
            <FormattedMessage
              id="guidu.data_controls.sorter.label"
              defaultMessage={`{sortersCount, plural,
                  =0 {Sort}
                  one {Sorted by 1 field}
                  other {Sorted by # fields}
                }`}
              values={{ sortersCount }}
            />
          </span>
        </Trigger>
      </InlineDialog>
    );
  }
}
