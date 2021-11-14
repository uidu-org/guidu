import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { Sliders } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import SorterForm from './form';
import { SorterProps } from './types';

export default function Sorter({ tableInstance }: SorterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    state: { sortBy },
  } = tableInstance;

  const sortersCount = sortBy.length;

  return (
    <Popup
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <Trigger
          {...triggerProps}
          activeBg="#fee2d5"
          className="mr-2 btn"
          active={!!sortersCount}
          onClick={() => setIsDialogOpen(true)}
        >
          <Sliders strokeWidth={2} size={14} tw="xl:mr-2" />
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
      )}
      content={() => {
        return (
          <div tw="w-screen sm:width[300px] py-4 text-sm">
            <SorterForm tableInstance={tableInstance} sorters={sortBy} />
          </div>
        );
      }}
    />
  );
}
