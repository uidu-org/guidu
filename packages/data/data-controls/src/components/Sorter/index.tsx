import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Trigger as StyledTrigger } from '../../styled';
import SorterForm from './form';
import { SorterProps } from './types';

export default function Sorter<T>({ tableInstance }: SorterProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getState } = tableInstance;

  const { sorting } = getState();

  const sortersCount = sorting?.length || 0;

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <StyledTrigger
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        activeBg="#fee2d5"
        active={!!sortersCount}
        onClick={() => setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)}
        iconBefore={<ArrowsUpDownIcon tw="h-4 w-4" />}
      >
        <span tw="hidden xl:block">
          <FormattedMessage
            defaultMessage={`{sortersCount, plural,
                  =0 {Sort}
                  one {Sorted by 1 field}
                  other {Sorted by {sortersCount, number} fields}
                }`}
            values={{ sortersCount }}
            id="uidu.data-controls.sorter.sorters_count"
          />
        </span>
      </StyledTrigger>
    ),
    [sortersCount],
  );

  const Content = useCallback(
    () => (
      <div tw="w-screen sm:[width:500px]">
        <SorterForm
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
