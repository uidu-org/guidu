import {
  GroupersKeys,
  TimeFrame,
  TimeFrameComparator,
  TimeFrameGrouper,
  TimeFrameKeys,
} from '@uidu/dashboard-controls';
import { renderDashlet } from '@uidu/dashlets';
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps } from '../types';
import {
  convertTimeframeToRange,
  groupByTimeframe,
  groupersByTimeframe,
} from '../utils';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardManager({
  children,
  rowData,
  gridProps,
  defaultTimeFrame = '1Y',
  defaultTimeFrameGrouping = 'month',
  availableTimeFrames = [
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
  ],
  availableGroupers = [
    { key: 'day', name: 'Giornaliero' },
    { key: 'week', name: 'Settimanale' },
    { key: 'month', name: 'Mensile' },
    { key: 'year', name: 'Annuale' },
  ],
}: DashboardManagerProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrameKeys>(
    defaultTimeFrame as TimeFrameKeys,
  );
  const [timeFrameGrouping, setTimeFrameGrouping] = useState<GroupersKeys>(
    defaultTimeFrameGrouping as GroupersKeys,
  );
  const [timeRange, setTimeRange] = useState(
    convertTimeframeToRange(defaultTimeFrame as TimeFrameKeys),
  );

  const onTimeFrameChange = (newTimeFrame) => {
    const groupers = groupersByTimeframe(availableGroupers, newTimeFrame);
    setTimeFrame(newTimeFrame);
    setTimeRange(convertTimeframeToRange(newTimeFrame));
    setTimeFrameGrouping(
      groupers.map((g) => g.key).indexOf(timeFrameGrouping) > 0
        ? timeFrameGrouping
        : groupers[groupers.length - 1].key,
    );
  };

  const renderDashlets = ({ dashlets = [], ...rest }) => {
    const { data, range, comparatorData, comparatorRange } = groupByTimeframe(
      timeFrame,
      timeFrameGrouping,
      rowData,
    );

    const layout = dashlets.map(({ x, y, w, h, minW, minH }, index) => ({
      i: `${index}`,
      x,
      y,
      w,
      h,
      minH,
      minW,
    }));

    // try with memoizing children
    // since version > 0.18.0 animation works differently
    // https://github.com/STRML/react-grid-layout/blob/master/README.md#Performance

    return (
      <ResponsiveGridLayout
        autoSize
        measureBeforeMount
        // verticalCompact
        rowHeight={24}
        useCSSTransforms
        layouts={{
          lg: layout,
          md: layout,
          sm: layout,
        }}
        breakpoints={{
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480,
          xxs: 0,
        }}
        cols={
          {
            lg: 12,
            md: 12,
            sm: 12,
            xs: 1,
            xxs: 1,
          } as any
        }
        margin={[24, 24]}
        // isResizable={false}
        {...gridProps}
      >
        {dashlets.map((dashlet, index) => {
          return (
            <div key={`${index}`}>
              {renderDashlet(dashlet, data, {
                ...rest,
                range,
                comparatorRange: timeFrame != '5Y' ? comparatorRange : {},
                comparatorData: timeFrame != '5Y' ? comparatorData : {},
                timeFrame,
                timeFrameGrouping,
                timeRange,
              })}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    );
  };

  const renderControls = ({}) => {
    return (
      <>
        <TimeFrame
          timeframes={availableTimeFrames}
          activeTimeFrame={timeFrame}
          onChange={onTimeFrameChange}
          handleDateChange={onTimeFrameChange}
          from={timeRange.range.from}
          to={timeRange.range.to}
        />
        {timeFrame !== '5Y' && (
          <TimeFrameComparator
            onChange={onTimeFrameChange}
            handleDateChange={onTimeFrameChange}
            from={timeRange.previousRange.from}
            to={timeRange.previousRange.to}
          />
        )}
        <TimeFrameGrouper
          groupers={groupersByTimeframe(availableGroupers, timeFrame)}
          activeGrouper={timeFrameGrouping}
          onChange={setTimeFrameGrouping}
        />
      </>
    );
  };
  return (children as any)({
    renderControls,
    renderBlocks: renderDashlets,
    renderDashlets,
  });
}
