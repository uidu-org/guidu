import Drawer from '@uidu/drawer';
import React, { useState } from 'react';
import { Server } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import DrawerLayout from '../../utils/DrawerLayout';
import GrouperForm from './form';
import { GrouperProps } from './types';

export default function Grouper({
  onChange,
  groupers = [],
  tableInstance,
  ...rest
}: GrouperProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    state: { groupBy },
  } = tableInstance;
  const groupersCount = groupBy.length;

  return (
    <>
      <Trigger
        activeBg="#ede2fe"
        className="btn mr-2"
        active={!!groupersCount}
        onClick={() => setIsDialogOpen(true)}
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
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
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
          <GrouperForm tableInstance={tableInstance} />
        </DrawerLayout>
      </Drawer>
    </>
  );
}
