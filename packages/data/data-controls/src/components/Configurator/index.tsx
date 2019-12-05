import { byName } from '@uidu/data-views';
import Drawer from '@uidu/drawer';
import Tooltip from '@uidu/tooltip';
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
    const dataView = byName[currentView.kind];

    const { configurator: ConfiguratorForm } = dataView;

    return (
      <>
        <Tooltip content={'Configure this view'} position="bottom">
          <Trigger
            activeBg="#d0f0fd"
            className="btn"
            onClick={() => this.setState({ dialogOpen: true })}
          >
            <Settings strokeWidth={2} size={14} />
          </Trigger>
        </Tooltip>
        <Drawer
          isOpen={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          origin="right"
          size="wide"
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
