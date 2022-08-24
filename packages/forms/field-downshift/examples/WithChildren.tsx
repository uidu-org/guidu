import FieldCounter from '@uidu/field-counter';
import FieldDate from '@uidu/field-date';
import FieldTime from '@uidu/field-time';
import { RadioStateless } from '@uidu/radio';
import classNames from 'classnames';
import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import FieldDownshift, { FieldDownshiftProps } from '../src';

const DurationItem = ({
  item,
  highlightedIndex,
  index,
  onMouseDown,
  isSelected,
  getItemProps,
}) => {
  const { onClick, ...rest } = getItemProps({ item, index });
  const isHighlighted = highlightedIndex === index;

  return (
    <div
      key={index}
      className={classNames('card mb-3', {
        'border-donations': isHighlighted,
      })}
      {...(!isSelected && {
        onMouseDown,
        onClick: (e) => {
          e.preventDefault();
          onClick(e);
        },
      })}
      {...rest}
    >
      <div
        className={classNames('card-header', {
          'border-bottom-0 rounded': !isSelected,
        })}
      >
        <RadioStateless label={item.name} defaultChecked={isSelected} />
      </div>
      {isSelected && (
        <div className="p-3 card-body p-md-4">{item.children}</div>
      )}
    </div>
  );
};

export default function WithChildren() {
  return (
    <FieldExampleScaffold<FieldDownshiftProps<any>>
      component={FieldDownshift}
      name="duration"
      label="Campaign's duration"
      options={[
        {
          id: 'fixed',
          name: 'Fixed number of days (1-60)',
          children: (
            <FieldCounter
              rowClassName="mb-3"
              name="durationInDays"
              min={1}
              max={60}
              value={30}
              label="Insert the number of days"
            />
          ),
        },
        {
          id: 'choose',
          name: 'End at a specific date and time',
          children: (
            <>
              <FieldDate name="endDate" label="End date" />
              <FieldTime name="endTime" rowClassName="mb-3" label="End time" />
            </>
          ),
        },
      ]}
      option={DurationItem}
    />
  );
}
