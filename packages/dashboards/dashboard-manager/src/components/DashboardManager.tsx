import { renderBlock } from '@uidu/blocks';
import { TimeFrame, TimeFrameGrouper } from '@uidu/dashboard-controls';
import React, { Component, Fragment } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps } from '../types';
import { groupByTimeframe } from '../utils';

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
    };
  }

  onTimeFrameChange = timeFrame =>
    this.setState({
      timeFrame,
    });

  onTimeFrameGroupingChange = timeFrameGrouping =>
    this.setState({
      timeFrameGrouping,
    });

  renderStaticBlocks = ({ blocks = [], ...rest }) => {
    const { rowData } = this.props;
    const { timeFrame, timeFrameGrouping } = this.state;

    const { data, range } = groupByTimeframe(
      timeFrame,
      timeFrameGrouping,
      rowData,
    );

    return blocks.map((block, index) => {
      return (
        <div key={`${index}`}>
          {renderBlock(block, data, {
            ...rest,
            range,
            timeFrame,
            timeFrameGrouping,
          })}
        </div>
      );
    });
  };

  renderBlocks = ({ blocks = [], ...rest }) => {
    const { rowData, gridProps } = this.props;
    const { timeFrame, timeFrameGrouping } = this.state;

    const { data, range } = groupByTimeframe(
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
                timeFrame,
                timeFrameGrouping,
              })}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    );
  };

  renderControls = ({ availableTimeFrames }) => {
    return (
      <Fragment>
        <TimeFrame onChange={this.onTimeFrameChange} />
        <TimeFrameGrouper
          currentGrouper={this.state.timeFrameGrouping}
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
