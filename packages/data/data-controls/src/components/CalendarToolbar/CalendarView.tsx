import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Tooltip from '@uidu/tooltip';
import React from 'react';
import { CheckCircle, Layout } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';

export default function CalendarView({
  view,
  onView,
  views = [
    {
      id: 'day',
      name: <FormattedMessage defaultMessage="Day" />,
    },
    {
      id: 'week',
      name: <FormattedMessage defaultMessage="Week" />,
    },
    {
      id: 'month',
      name: <FormattedMessage defaultMessage="Month" />,
    },
    {
      id: 'year',
      name: <FormattedMessage defaultMessage="Year" />,
    },
  ],
}) {
  return (
    <DropdownMenu
      trigger={
        <Tooltip
          content={<FormattedMessage defaultMessage="Choose calendar view" />}
          position="bottom"
        >
          <Trigger activeBg="#d1f7c4" className="btn">
            <Layout strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'capitalize' }}>{view}</span>
          </Trigger>
        </Tooltip>
      }
    >
      <DropdownItemGroup>
        {views.map((calendarView) => (
          <DropdownItem
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
            <span className="text-capitalize">{calendarView}</span>
          </DropdownItem>
        ))}
      </DropdownItemGroup>
    </DropdownMenu>
  );
}
