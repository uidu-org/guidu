import { useDataManagerContext } from '@uidu/data-manager';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { Filter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import FiltererForm from './form';
import { FiltererProps } from './types';

export default function Filterer({}: FiltererProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    tableInstance: {
      state: { filters },
    },
  } = useDataManagerContext();
  const filtersCount = filters.length;

  return (
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <Trigger
          {...triggerProps}
          activeBg="#d1f7c4"
          active={!!filtersCount}
          onClick={() =>
            setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)
          }
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
        </Trigger>
      )}
      content={() => (
        <div tw="w-screen sm:width[500px] py-4 text-sm">
          <FiltererForm filtersCount={filtersCount} />
        </div>
      )}
    ></Popup>
  );
}
