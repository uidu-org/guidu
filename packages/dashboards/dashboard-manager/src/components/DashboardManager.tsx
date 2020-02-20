import {
  GroupersKeys,
  TimeFrame,
  TimeFrameComparator,
  TimeFrameGrouper,
  TimeFrameKeys,
} from '@uidu/dashboard-controls';
import { renderBlock } from '@uidu/dashlets';
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps, DashboardManagerState } from '../types';
import {
  convertTimeframeToRange,
  groupByTimeframe,
  groupersByTimeframe,
} from '../utils';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class DashboardManager extends Component<
  DashboardManagerProps,
  DashboardManagerState
> {
  static defaultProps = {
    defaultTimeFrame: '1Y',
    defaultTimeFrameGrouping: 'month',
    availableTimeFrames: [
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
    availableGroupers: [
      { key: 'day', name: 'Giornaliero' },
      { key: 'week', name: 'Settimanale' },
      { key: 'month', name: 'Mensile' },
      { key: 'year', name: 'Annuale' },
    ],
  };

  constructor(props: DashboardManagerProps) {
    super(props);
    const { defaultTimeFrame, defaultTimeFrameGrouping } = props;
    this.state = {
      timeFrame: defaultTimeFrame as TimeFrameKeys,
      timeFrameGrouping: defaultTimeFrameGrouping as GroupersKeys,
      timeRange: convertTimeframeToRange(defaultTimeFrame as TimeFrameKeys),
    };
  }

  onTimeFrameChange = timeFrame => {
    const { availableGroupers } = this.props;
    const groupers = groupersByTimeframe(availableGroupers, timeFrame);
    return this.setState(prevState => ({
      timeFrame,
      timeRange: convertTimeframeToRange(timeFrame),
      timeFrameGrouping:
        groupers.map(g => g.key).indexOf(prevState.timeFrameGrouping) > 0
          ? prevState.timeFrameGrouping
          : groupers[groupers.length - 1].key,
    }));
  };

  onTimeFrameGroupingChange = timeFrameGrouping =>
    this.setState({
      timeFrameGrouping,
    });

  renderBlocks = ({ blocks = [], ...rest }) => {
    const { rowData, gridProps } = this.props;
    const { timeFrame, timeFrameGrouping, timeRange } = this.state;

    console.log(gridProps);

    const { data, range, comparatorData, comparatorRange } = groupByTimeframe(
      timeFrame,
      timeFrameGrouping,
      rowData,
    );

    const layout = blocks.map(({ x, y, w, h, minW, minH }, index) => ({
      i: `${index}`,
      x,
      y,
      w,
      h,
      minH,
      minW,
    }));

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
        cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 } as any}
        margin={[24, 24]}
        // isResizable={false}
        {...gridProps}
      >
        {blocks.map((block, index) => {
          return (
            <div key={`${index}`}>
              {renderBlock(block, data, {
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

  renderControls = ({}) => {
    const { availableTimeFrames, availableGroupers } = this.props;
    const { timeFrame, timeRange, timeFrameGrouping } = this.state;
    return (
      <>
        <TimeFrame
          timeframes={availableTimeFrames}
          activeTimeFrame={timeFrame}
          onChange={this.onTimeFrameChange}
          handleDateChange={this.onTimeFrameChange}
          from={timeRange.range.from}
          to={timeRange.range.to}
        />
        {timeFrame !== '5Y' && (
          <TimeFrameComparator
            onChange={this.onTimeFrameChange}
            handleDateChange={this.onTimeFrameChange}
            from={timeRange.previousRange.from}
            to={timeRange.previousRange.to}
          />
        )}
        <TimeFrameGrouper
          groupers={groupersByTimeframe(availableGroupers, timeFrame)}
          activeGrouper={timeFrameGrouping}
          onChange={this.onTimeFrameGroupingChange}
        />
      </>
    );
  };

  render() {
    const { children } = this.props;

    return (children as any)({
      renderControls: this.renderControls,
      renderBlocks: this.renderBlocks,
    });
  }
}
