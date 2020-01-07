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
    filterModel: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    const { filterModel } = this.props;
    const filtersCount = Object.keys(filterModel).length;

    return (
      <>
        <Trigger
          activeBg="#d1f7c4"
          className="btn mr-2"
          active={!!filtersCount}
          onClick={() => this.setState({ dialogOpen: true })}
        >
          <Filter strokeWidth={2} size={14} className="mr-xl-2" />
          <span
            style={{ textTransform: 'initial' }}
            className="d-none d-xl-block"
          >
            <FormattedMessage
              id="guidu.data_controls.sorter.label"
              defaultMessage={`{filtersCount, plural,
                  =0 {Filter}
                  one {Filtered by 1 field}
                  other {Filtered by {filtersCount, number} fields}
                }`}
              values={{ filtersCount }}
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
            <FiltererForm
              {...this.props}
              filtersCount={filtersCount}
              filterModel={filterModel}
            />
          </DrawerLayout>
        </Drawer>
      </>
    );
  }
}
