// https://github.com/CassetteRocks/react-infinite-scroller/blob/master/src/InfiniteScroll.js^1.0.9
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  InfiniteLoader,
  List,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
} from 'react-virtualized';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.onRowsRendered = this.onRowsRendered.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      hasMore: props.hasMore,
      page: props.page,
      isLoaded: props.isLoaded,
      isPaging: props.isPaging,
    };
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      // minHeight: 50,
    });
  }

  isRowLoaded({ index }) {
    const { items } = this.props;
    return !!items[index];
  }

  loadMoreRows({ startIndex, stopIndex }) {
    console.log(startIndex);
    console.log(stopIndex);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoaded) {
      // this.setState({
      //   isPaging: false,
      // }, () => {
      this.cache = new CellMeasurerCache({
        fixedWidth: true,
        // minHeight: 50,
      });
      // this.list.scrollToRow(11);

      // });
      // console.log(nextProps.scrollToIndex)
      // if (nextProps.scrollToIndex) {
      //   const that = this;
      //   setTimeout(() => {
      //     that.list.scrollToRow(nextProps.scrollToIndex);
      //   }, 10);
      // } else {
      const that = this;
      setTimeout(() => {
        that.list.scrollToPosition(
          that.state.scrollTopBeforePagination + that.list.props.height,
        );
      }, 10);
      // }
    }
  }

  onScroll({ clientHeight, scrollHeight, scrollTop }) {
    const {
      loadMore,
      scrollTreshold,
      isReverse,
      isLoaded,
      hasMore,
    } = this.props;

    const { isPaging } = this.state;

    let scrolled = false;

    if (isReverse) {
      scrolled = scrollTop <= scrollTreshold;
    } else {
      // scrolled = (offsetHeight + scrollTop >= scrollHeight - scrollTreshold);
    }

    if (scrolled && isLoaded && !isPaging && hasMore) {
      this.setState(
        {
          isPaging: true,
          scrollTopBeforePagination: scrollHeight + scrollTop,
        },
        () => {
          loadMore();
        },
      );
    }
  }

  rowRenderer({ index, key, parent, style }) {
    const item = this.props.items[index];

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => (
          <div style={style} key={key} measure={measure}>
            {this.props.renderItem(item)}
          </div>
        )}
      </CellMeasurer>
    );
  }

  onRowsRendered({
    overscanStartIndex,
    overscanStopIndex,
    startIndex,
    stopIndex,
  }) {
    this.setState({
      isPaging: false,
    });
  }

  render() {
    const { items, isReverse, isLoaded, scrollToIndex, loadMore } = this.props;

    return (
      <InfiniteLoader
        loadMoreRows={loadMore}
        isRowLoaded={this.isRowLoaded}
        rowCount={items.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={c => {
                  this.list = c;
                }}
                deferredMeasurementCache={this.cache}
                height={height}
                overscanRowCount={0}
                rowCount={items.length}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={onRowsRendered}
                // ref={registerChild}
                width={width}
                onScroll={this.onScroll}
                scrollToIndex={scrollToIndex}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

InfiniteScroll.defaultProps = {
  element: 'div',
  hasMore: false,
  initialLoad: true,
  page: 0,
  scrollTreshold: 100,
  useWindow: true,
  isReverse: false,
  isLoaded: false,
  isPaging: false,
  useCapture: false,
  loader: null,
};

InfiniteScroll.propTypes = {
  element: PropTypes.string,
  hasMore: PropTypes.bool,
  initialLoad: PropTypes.bool,
  isReverse: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  page: PropTypes.number,
  scrollTreshold: PropTypes.number,
  isLoaded: PropTypes.bool,
  useWindow: PropTypes.bool,
  isPaging: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  loader: PropTypes.object,
};
