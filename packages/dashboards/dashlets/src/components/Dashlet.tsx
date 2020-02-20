import {
  convertTimeframeToRange,
  groupByTimeframe,
  Groupers,
  groupersByTimeframe,
  GroupersKeys,
  TimeFrame,
  TimeFrameGrouper,
  TimeFrameKeys,
} from '@uidu/dashlet-controls';
import React, { useState } from 'react';
import DashletFooter from './DashletFooter';
import DashletHeader from './DashletHeader';

// const onTimeFrameChange = timeFrame => {
//   const { availableGroupers } = props;
//   const groupers = groupersByTimeframe(availableGroupers, timeFrame);
//   return this.setState(prevState => ({
//     timeFrame,
//     timeRange: convertTimeframeToRange(timeFrame),
//     timeFrameGrouping:
//       groupers.map(g => g.key).indexOf(prevState.timeFrameGrouping) > 0
//         ? prevState.timeFrameGrouping
//         : groupers[groupers.length - 1].key,
//   }));
// };

// defaultTimeFrame: '1Y',
//     defaultTimeFrameGrouping: 'month',
//     availableTimeFrames: [
//       {
//         key: '1W',
//         name: '1 settimana',
//       },
//       { key: '4W', name: '4 settimane' },
//       { key: '1Y', name: '1 anno' },
//       { key: 'MTD', name: 'Mese corrente' },
//       { key: 'QTD', name: 'Trimestre corrente' },
//       { key: 'YTD', name: 'Anno corrente' },
//       { key: '5Y', name: 'Tutto' },
//     ],
const availableGroupers: Array<Groupers> = [
  { key: 'day', name: 'Giornaliero' },
  { key: 'week', name: 'Settimanale' },
  { key: 'month', name: 'Mensile' },
  { key: 'year', name: 'Annuale' },
];

export default function Dashlet({
  block,
  component: DashletContent,
  rowData,
  showFooter = true,
  ...rest
}: any) {
  const [timeFrame, setTimeFrame] = useState<TimeFrameKeys>('5Y');
  const [timeFrameGrouping, setTimeFrameGrouping] = useState<GroupersKeys>(
    'month',
  );
  console.log(timeFrame);
  const { data, range, comparatorData, comparatorRange } = groupByTimeframe(
    timeFrame,
    timeFrameGrouping,
    rowData,
  );

  const timeRange = convertTimeframeToRange(timeFrame);

  console.log(data);

  return (
    <div className="card h-100">
      <DashletHeader name={block.label} description={block.description}>
        <TimeFrame
          activeTimeFrame={timeFrame}
          onChange={setTimeFrame}
          handleDateChange={setTimeFrame}
          from={timeRange.range.from}
          to={timeRange.range.to}
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
      </DashletHeader>
      <DashletContent
        {...rest}
        {...block}
        rowData={data}
        timeframe={timeFrame}
      />
      {showFooter && (
        <DashletFooter>
          <TimeFrame
            activeTimeFrame={timeFrame}
            onChange={setTimeFrame}
            handleDateChange={setTimeFrame}
            from={timeRange.range.from}
            to={timeRange.range.to}
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
          {/* {timeFrame !== '5Y' && (
            <TimeFrameComparator
              onChange={this.onTimeFrameChange}
              handleDateChange={this.onTimeFrameChange}
              from={timeRange.previousRange.from}
              to={timeRange.previousRange.to}
            />
          )} */}
          <TimeFrameGrouper
            groupers={groupersByTimeframe(availableGroupers, timeFrame)}
            activeGrouper={timeFrameGrouping}
            onChange={setTimeFrameGrouping}
          />
        </DashletFooter>
      )}
    </div>
  );
}
