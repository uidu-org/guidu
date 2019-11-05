import Drawer from '@uidu/drawer';
import React, { Component } from 'react';
import { Filter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import FiltererForm from './form';
import { FiltererProps } from './types';

export default class Filterer extends Component<
  FiltererProps,
  {
    dialogOpen: boolean;
  }
> {
  static defaultProps = {
    onChange: async model => console.log(model),
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    return (
      <>
        <Trigger
          activeBg="#d1f7c4"
          className="btn mr-2"
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
                id="guidu.data_controls.filterer.label"
                defaultMessage="Filter"
              />
            }
          >
            <FiltererForm {...this.props} />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
