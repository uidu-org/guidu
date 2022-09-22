import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { Filter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger as StyledTrigger } from '../../styled';
import FiltererForm from './form';
import { FiltererProps } from './types';

export default function Filterer<T>({ tableInstance }: FiltererProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getState } = tableInstance;
  const { columnFilters } = getState();
  const filtersCount = columnFilters?.length || 0;

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <StyledTrigger
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        activeBg="#d1f7c4"
        active={!!filtersCount}
        onClick={() => setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)}
        iconBefore={<Filter strokeWidth={2} size={14} />}
      >
        <span tw="hidden xl:block">
          <FormattedMessage
            defaultMessage={`{filtersCount, plural,
                  =0 {Filter}
                  one {Filtered by 1 field}
                  other {Filtered by {filtersCount, number} fields}
                }`}
            values={{ filtersCount }}
            id="uidu.data-controls.filterer.filters_count"
          />
        </span>
      </StyledTrigger>
    ),
    [filtersCount],
  );

  const Content = useCallback(
    () => (
      <div tw="w-screen sm:width[500px]">
        <FiltererForm
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
