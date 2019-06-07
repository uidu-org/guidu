import { layoutOptions, renderBlock } from '@uidu/blocks';
import { TimeFrame } from '@uidu/dashboard-controls';
import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';
import React, { Component, Fragment } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardManagerProps } from '../types';
import {
  cleanTimeSeriesList,
  convertTimeframeToRange,
  groupByTimeframe,
} from '../utils';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class DashboardManager extends Component<
  DashboardManagerProps,
  any
> {
  private grid = React.createRef();

  constructor(props) {
    super(props);
    const { defaultTimeFrame } = props;
    this.state = {
      timeFrame: defaultTimeFrame,
    };
  }

  onTimeFrameChange = timeFrame =>
    this.setState({
      timeFrame,
    });

  renderBlocks = ({ blocks = [], ...rest }) => {
    const { rowData } = this.props;
    const { timeFrame } = this.state;

    const range = convertTimeframeToRange(timeFrame);
    console.log(range);
    const data = groupByTimeframe(
      range.from,
      range.to,
      'month',
      rowData,
      v => ({
        donationsCount: cleanTimeSeriesList(v).length,
        contactsCount: Object.keys(
          groupBy(cleanTimeSeriesList(v), 'contact.id'),
        ).length,
        donationsAmount: sumBy(cleanTimeSeriesList(v), 'amount'),
      }),
    );

    const layout = blocks.map((block, index) => ({
      i: `${index}`,
      x: block.x,
      y: 0,
      w: 4,
      h: 3,
      ...layoutOptions[block.kind],
    }));
    console.log(layout);

    return (
      <ResponsiveGridLayout
        autoSize
        measureBeforeMount
        verticalCompact
        rowHeight={96}
        layouts={{
          lg: layout,
          md: layout,
        }}
        onLayoutChange={console.log}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
        margin={[24, 24]}
      >
        {blocks.map((block, index) => {
          console.log(block);
          return <div key={`${index}`}>{renderBlock(block, data, rest)}</div>;
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
    });
  }
}
