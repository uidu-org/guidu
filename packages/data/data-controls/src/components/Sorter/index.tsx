import { SwitchVerticalIcon } from '@heroicons/react/solid';
import { useDataManagerContext } from '@uidu/data-manager';
import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Trigger as StyledTrigger } from '../../styled';
import SorterForm from './form';
import { SorterProps } from './types';

export default function Sorter(props: SorterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    tableInstance: { getState },
  } = useDataManagerContext();

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
        iconBefore={<SwitchVerticalIcon tw="h-4 w-4" />}
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
      <div tw="w-screen sm:width[500px]">
        <SorterForm closePopup={() => setIsDialogOpen(false)} />
      </div>
    ),
    [],
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
