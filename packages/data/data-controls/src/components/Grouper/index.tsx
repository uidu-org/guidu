import Drawer from '@uidu/drawer';
import React, { Component } from 'react';
import { Server } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import GrouperForm from './form';

// this component should return an array of groupers https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

export default class Grouper extends Component<any, any> {
  static defaultProps = {
    onChange: console.log,
    sorters: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  private form = React.createRef();
  private selectContainer = React.createRef();

  handleSubmit = async model => {
    const { onChange } = this.props;
    const response = await (this.form.current as any).form.getModel();
    onChange(response.groupers || []);
  };

  render() {
    const { groupers, columnDefs } = this.props;
    const groupersCount = groupers.length;
    return (
      <>
        <Trigger
          activeBg="#ede2fe"
          className="btn mr-2"
          active={groupersCount}
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Server strokeWidth={2} size={14} className="mr-xl-2" />
          <span
            style={{ textTransform: 'initial' }}
            className="d-none d-xl-block"
          >
            <FormattedMessage
              id="guidu.data_controls.sorter.label"
              defaultMessage={`{groupersCount, plural,
                  =0 {Group}
                  one {Grouped by 1 field}
                  other {Grouped by # fields}
                }`}
              values={{ groupersCount }}
            />
          </span>
        </Trigger>
        <Drawer
          isOpen={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          origin="right"
          size="medium"
        >
          <DrawerLayout
            name={
              <FormattedMessage
                id="guidu.data_controls.grouper.label"
                defaultMessage="Group by"
              />
            }
          >
            <GrouperForm {...this.props} />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
