import Drawer from '@uidu/drawer';
import React, { Component } from 'react';
import { Sliders } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import SorterForm from './form';
import { SorterProps } from './types';

// this component should return an array of sorters https://www.ag-grid.com/javascript-grid-sorting/#sorting-api
// example:
// [{ colId: 'country', sort: 'asc' }, { colId: 'sport', sort: 'desc' }];

export default class Sorter extends Component<SorterProps, any> {
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

  render() {
    const { sorters } = this.props;
    const sortersCount = sorters.length;

    return (
      <>
        <Trigger
          activeBg="#fee2d5"
          className="btn mr-2"
          active={!!sortersCount}
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Sliders strokeWidth={2} size={14} className="mr-xl-2" />
          <span
            style={{ textTransform: 'initial' }}
            className="d-none d-xl-block"
          >
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
                id="guidu.data_controls.sorter.label"
                defaultMessage="Sort"
              />
            }
          >
            <SorterForm {...this.props} />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
