import { ButtonItem, MenuGroup } from '@uidu/menu';
import Popup from '@uidu/popup';
import Tooltip from '@uidu/tooltip';
import React, { useState } from 'react';
import { CheckCircle, Layout } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';

export default function CalendarView({
  view,
  onView,
  views = [
    {
      id: 'day',
      name: (
        <FormattedMessage
          defaultMessage="Day"
          id="uidu.data-controls.calendar.day"
        />
      ),
    },
    {
      id: 'week',
      name: (
        <FormattedMessage
          defaultMessage="Week"
          id="uidu.data-controls.calendar.week"
        />
      ),
    },
    {
      id: 'month',
      name: (
        <FormattedMessage
          defaultMessage="Month"
          id="uidu.data-controls.calendar.month"
        />
      ),
    },
    {
      id: 'year',
      name: (
        <FormattedMessage
          defaultMessage="Year"
          id="uidu.data-controls.calendar.year"
        />
      ),
    },
  ],
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={() => (
        <MenuGroup>
          {views.map((calendarView) => (
            <ButtonItem
              key={calendarView.id}
              onClick={(e) => {
                e.preventDefault();
                onView(calendarView);
              }}
              {...(calendarView === view
                ? {
                    elemBefore: (
                      <CheckCircle size={14} className="text-success" />
                    ),
                  }
                : null)}
            >
              <span tw="capitalize">{calendarView}</span>
            </ButtonItem>
          ))}
        </MenuGroup>
      )}
      trigger={(triggerProps) => (
        <Tooltip
          content={
            <FormattedMessage
              defaultMessage="Choose calendar view"
              id="uidu.data-controls.calendar.choose_view"
            />
          }
          position="bottom"
        >
          <Trigger
            activeBg="#d1f7c4"
            iconBefore={<Layout strokeWidth={2} size={14} />}
            {...triggerProps}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span tw="[text-transform:capitalize]">{view}</span>
          </Trigger>
        </Tooltip>
      )}
    />
  );
}
