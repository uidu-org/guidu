import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { Server } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger as StyledTrigger } from '../../styled';
import GrouperForm from './form';
import { GrouperProps } from './types';

export default function Grouper({ tableInstance }: GrouperProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getState } = tableInstance;
  const { grouping } = getState();
  const groupersCount = grouping?.length || 0;

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <StyledTrigger
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        activeBg="#ede2fe"
        active={!!groupersCount}
        onClick={() => setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)}
        iconBefore={<Server strokeWidth={2} size={14} />}
      >
        <span tw="hidden xl:block">
          <FormattedMessage
            defaultMessage={`{groupersCount, plural,
                  =0 {Group by}
                  one {Grouped by 1 field}
                  other {Grouped by {groupersCount, number} fields}
                }`}
            values={{ groupersCount }}
            id="uidu.data-controls.grouper.groupers_count"
          />
        </span>
      </StyledTrigger>
    ),
    [groupersCount],
  );

  const Content = useCallback(
    () => (
      <div tw="w-screen sm:width[500px]">
        <GrouperForm
          tableInstance={tableInstance}
          closePopup={() => setIsDialogOpen(false)}
        />
      </div>
    ),
    [tableInstance],
  );

  return (
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={Trigger}
      content={Content}
    />
  );
}
