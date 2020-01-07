import Drawer from '@uidu/drawer';
import React, { Component } from 'react';
import { Server } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import GrouperForm from './form';
import { GrouperProps } from './types';

export default class Grouper extends Component<
  GrouperProps,
  {
    dialogOpen: boolean;
  }
> {
  static defaultProps = {
    onChange: async model => console.log(model),
    groupers: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    const { groupers } = this.props;
    const groupersCount = groupers.length;

    return (
      <>
        <Trigger
          activeBg="#ede2fe"
          className="btn mr-2"
          active={!!groupersCount}
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
                  =0 {Group by}
                  one {Grouped by 1 field}
                  other {Grouped by {groupersCount, number} fields}
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
            <GrouperForm {...this.props} groupers={groupers} />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
