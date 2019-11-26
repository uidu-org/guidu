import { byName } from '@uidu/data-views';
import Drawer from '@uidu/drawer';
import React, { Component } from 'react';
import { Settings } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import { ConfiguratorProps } from './types';

export default class Configurator extends Component<ConfiguratorProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    const { columnDefs, currentView } = this.props;
    console.log(currentView);

    const dataView = byName[currentView.kind];
    console.log(dataView);

    const { configurator: ConfiguratorForm } = dataView;

    return (
      <>
        <Trigger
          activeBg="#d0f0fd"
          className="btn"
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Settings strokeWidth={2} size={14} />
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
                id="guidu.data_controls.configurator.label"
                defaultMessage="Configure {name}"
                values={{ name: dataView.name }}
              />
            }
          >
            <ConfiguratorForm
              fallback={<div>Loading...</div>}
              {...this.props}
            />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
