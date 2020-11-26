import Drawer from '@uidu/drawer';
import React, { useState } from 'react';
import { Sliders } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import SorterForm from './form';
import { SorterProps } from './types';

export default function Sorter({ tableInstance, updateView }: SorterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    state: { sortBy },
  } = tableInstance;

  const sortersCount = sortBy.length;

  return (
    <>
      <Trigger
        activeBg="#fee2d5"
        className="btn mr-2"
        active={!!sortersCount}
        onClick={() => setIsDialogOpen(true)}
      >
        <Sliders strokeWidth={2} size={14} className="mr-xl-2" />
        <span
          style={{ textTransform: 'initial' }}
          className="d-none d-xl-block"
        >
          <FormattedMessage
            defaultMessage={`{sortersCount, plural,
                  =0 {Sort}
                  one {Sorted by 1 field}
                  other {Sorted by {sortersCount, number} fields}
                }`}
            values={{ sortersCount }}
          />
        </span>
      </Trigger>
      <Drawer
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        origin="right"
        size="medium"
      >
        <DrawerLayout name={<FormattedMessage defaultMessage="Sort" />}>
          <SorterForm
            tableInstance={tableInstance}
            sorters={sortBy}
            updateView={updateView}
          />
        </DrawerLayout>
      </Drawer>
    </>
  );
}
