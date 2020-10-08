import Drawer from '@uidu/drawer';
import React, { useState } from 'react';
import { Filter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import FiltererForm from './form';
import { FiltererProps } from './types';

export default function Filterer({
  onChange = async (model) => console.log(model),
  tableInstance,
}: FiltererProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    state: { filters },
  } = tableInstance;
  const filtersCount = filters.length;

  return (
    <>
      <Trigger
        activeBg="#d1f7c4"
        className="btn mr-2"
        active={!!filtersCount}
        onClick={() => setIsDialogOpen(true)}
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
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
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
            tableInstance={tableInstance}
            filters={filters}
            filtersCount={filtersCount}
          />
        </DrawerLayout>
      </Drawer>
    </>
  );
}
