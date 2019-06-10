import { layoutOptions, renderBlock } from '@uidu/blocks';
import { TimeFrame } from '@uidu/dashboard-controls';
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

    const layout = blocks.map((block, index) => ({
      i: `${index}`,
      x: block.x,
      y: 0,
      w: 4,
      h: 3,
      ...layoutOptions[block.kind],
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
        cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
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
