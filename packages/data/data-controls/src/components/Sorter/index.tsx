import { useDataManagerContext } from '@uidu/data-manager';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { Sliders } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';
import SorterForm from './form';
import { SorterProps } from './types';

export default function Sorter(props: SorterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    tableInstance: {
      state: { sortBy },
    },
  } = useDataManagerContext();
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
          active={!!sortersCount}
          onClick={() =>
            setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen)
          }
          iconBefore={<Sliders strokeWidth={2} size={14} />}
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
        </Trigger>
      )}
      content={() => {
        return (
          <div tw="w-screen sm:width[300px] py-4 text-sm">
            <SorterForm />
          </div>
        );
      }}
    />
  );
}
