import moment from 'moment';
import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import { More, TimeFrame, TimeFrameComparator, TimeFrameGrouper } from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <div className="d-flex align-items-center p-3">
        <TimeFrame
          activeTimeFrame="1Y"
          onChange={console.log}
          handleDateChange={console.log}
          from={moment()}
          to={moment()}
          timeframes={[
            {
              key: '1W',
              name: '1 settimana',
            },
            { key: '4W', name: '4 settimane' },
            { key: '1Y', name: '1 anno' },
            { key: 'MTD', name: 'Mese corrente' },
            { key: 'QTD', name: 'Trimestre corrente' },
            { key: 'YTD', name: 'Anno corrente' },
            { key: '5Y', name: 'Tutto' },
          ]}
        />
        <TimeFrameComparator from={moment()} to={moment()} />
        <TimeFrameGrouper
          activeGrouper="month"
          groupers={[
            { key: 'day', name: 'Giornaliero' },
            { key: 'week', name: 'Settimanale' },
            { key: 'month', name: 'Mensile' },
            { key: 'year', name: 'Annuale' },
          ]}
          onChange={console.log}
        />
        <More />
      </div>
    );
  }
}
