import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import React, { Component } from 'react';
import { CheckCircle, Layout } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Trigger } from '../../styled';

export default class CalendarView extends Component<any> {
  static defaultProps = {
    views: [
      {
        id: 'day',
        name: (
          <FormattedMessage
            id="guidu.data_controls.calendarView.day"
            defaultMessage="Day"
          />
        ),
      },
      {
        id: 'week',
        name: (
          <FormattedMessage
            id="guidu.data_controls.calendarView.week"
            defaultMessage="Week"
          />
        ),
      },
      {
        id: 'month',
        name: (
          <FormattedMessage
            id="guidu.data_controls.calendarView.month"
            defaultMessage="Month"
          />
        ),
      },
      {
        id: 'year',
        name: (
          <FormattedMessage
            id="guidu.data_controls.calendarView.year"
            defaultMessage="Year"
          />
        ),
      },
    ],
  };

  render() {
    const { view, views, onView } = this.props;

    return (
      <DropdownMenu
        shouldFitContent
        trigger={
          <Trigger activeBg="#d1f7c4" className="btn">
            <Layout strokeWidth={2} size={14} className="mr-2" />
            <span style={{ textTransform: 'capitalize' }}>{view}</span>
          </Trigger>
        }
      >
        <DropdownItemGroup>
          {views.map(calendarView => (
            <DropdownItem
              onClick={e => {
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
}
