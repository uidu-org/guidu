import { renderBlock } from '@uidu/blocks';
import {
  TimeFrame,
  TimeFrameComparator,
  TimeFrameGrouper,
} from '@uidu/dashboard-controls';
import React, { Component, Fragment } from 'react';
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

export default class DashboardManager extends Component<
  DashboardManagerProps,
  any
> {
  static defaultProps = {
    defaultTimeFrame: '1Y',
    defaultTimeFrameGrouping: 'month',
  };

  constructor(props) {
    super(props);
    const { defaultTimeFrame, defaultTimeFrameGrouping } = props;
    this.state = {
      timeFrame: defaultTimeFrame,
      timeFrameGrouping: defaultTimeFrameGrouping,
      timeRange: convertTimeframeToRange(defaultTimeFrame),
    };
  }

  onTimeFrameChange = timeFrame => {
    const groupers = groupersByTimeframe(timeFrame);
    return this.setState(prevState => ({
      timeFrame,
      timeRange: convertTimeframeToRange(timeFrame),
      timeFrameGrouping:
        groupers.map(g => g.key).indexOf(prevState.timeFrameGrouping.key) > 0
          ? prevState.timeFrameGrouping
          : groupers[groupers.length - 1].key,
    }));
  };

  onTimeFrameGroupingChange = timeFrameGrouping =>
    this.setState({
      timeFrameGrouping,
    });

  renderStaticBlocks = ({ blocks = [], ...rest }) => {
    const { rowData } = this.props;
    const { timeFrame, timeFrameGrouping, timeRange } = this.state;

    const { data, range, comparatorData, comparatorRange } = groupByTimeframe(
      timeFrame,
      timeFrameGrouping,
      rowData,
    );

    return blocks.map((block, index) =>
      renderBlock(block, data, {
        ...rest,
        range,
        comparatorRange: timeFrame != '5Y' ? comparatorRange : {},
        comparatorData: timeFrame != '5Y' ? comparatorData : {},
        timeFrame,
        timeFrameGrouping,
        timeRange,
      }),
    );
  };

  renderBlocks = ({ blocks = [], ...rest }) => {
    const { rowData, gridProps } = this.props;
    const { timeFrame, timeFrameGrouping, timeRange } = this.state;

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
        verticalCompact
        rowHeight={98.5}
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
        cols={{ lg: 4, md: 4, sm: 4, xs: 1, xxs: 1 } as any}
        margin={[24, 24]}
        isResizable={false}
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

  renderControls = ({ availableTimeFrames }) => {
    const { timeFrame, timeRange, timeFrameGrouping } = this.state;
    return (
      <Fragment>
        <TimeFrame
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
          groupers={groupersByTimeframe(timeFrame)}
          activeGrouper={timeFrameGrouping}
          onChange={this.onTimeFrameGroupingChange}
        />
      </Fragment>
    );
  };

  render() {
    const { children } = this.props;

    return (children as any)({
      renderControls: this.renderControls,
      renderBlocks: this.renderBlocks,
      renderStaticBlocks: this.renderStaticBlocks,
    });
  }
}
