import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { Filter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
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
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <Trigger
          {...triggerProps}
          activeBg="#d1f7c4"
          className="mr-2 btn"
          active={!!filtersCount}
          onClick={() => setIsDialogOpen(true)}
        >
          <Filter strokeWidth={2} size={14} tw="xl:mr-2" />
          <span style={{ textTransform: 'initial' }} tw="hidden xl:block">
            <FormattedMessage
              defaultMessage={`{filtersCount, plural,
                  =0 {Filter}
                  one {Filtered by 1 field}
                  other {Filtered by {filtersCount, number} fields}
                }`}
              values={{ filtersCount }}
            />
          </span>
        </Trigger>
      )}
      content={() => (
        <div tw="w-screen sm:width[500px] py-4 text-sm">
          <FiltererForm
            tableInstance={tableInstance}
            filters={filters}
            filtersCount={filtersCount}
          />
        </div>
      )}
    ></Popup>
  );
}
