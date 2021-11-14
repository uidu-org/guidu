import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { Server } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import GrouperForm from './form';
import { GrouperProps } from './types';

export default function Grouper({
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
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <Trigger
          {...triggerProps}
          activeBg="#ede2fe"
          className="mr-2 btn"
          active={!!groupersCount}
          onClick={() => setIsDialogOpen(true)}
        >
          <Server strokeWidth={2} size={14} className="mr-xl-2" />
          <span
            style={{ textTransform: 'initial' }}
            className="d-none d-xl-block"
          >
            <FormattedMessage
              defaultMessage={`{groupersCount, plural,
                  =0 {Group by}
                  one {Grouped by 1 field}
                  other {Grouped by {groupersCount, number} fields}
                }`}
              values={{ groupersCount }}
            />
          </span>
        </Trigger>
      )}
      content={() => {
        return (
          <div tw="w-screen sm:width[500px] py-4 text-sm">
            <GrouperForm tableInstance={tableInstance} />
          </div>
        );
      }}
    />
  );
}
