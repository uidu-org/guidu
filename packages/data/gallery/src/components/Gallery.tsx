import memoize from 'memoize-one';
import React, { forwardRef, PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import { GalleryProps } from '../types';
import Item from './Item';

const GUTTER_SIZE = 8;
const ITEM_HEADER_HEIGHT = 16;
const ITEM_COLUMN_ROW = 63;
const ITEM_PADDING = 48;

const innerElementType = forwardRef(
  ({ style, gutterSize, ...rest }, ref: any) => (
    <div
      ref={ref}
      style={{
        ...style,
        paddingTop: gutterSize,
        paddingLeft: gutterSize,
      }}
      {...rest}
    />
  ),
);

const createItemData = memoize(
  (items, columnDefs, gutterSize, columnCount) => ({
    items,
    columnDefs,
    gutterSize,
    columnCount,
  }),
);

export default class Gallery extends PureComponent<GalleryProps> {
  static defaultProps = {
    columnCount: 4,
    gutterSize: 8,
  };

  chunkData = (array, chunkSize) => {
    return array.reduce((acc, _each, index, src) => {
      if (!(index % chunkSize)) {
        return [...acc, src.slice(index, index + chunkSize)];
      }
      return acc;
    }, []);
  };

  render() {
    const { rowData, columnDefs, columnCount, gutterSize } = this.props;
    console.log(this.props);
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);
    const items = this.chunkData(rowData, columnCount);
    const itemData = createItemData(
      items,
      visibleColumnDefs,
      gutterSize,
      columnCount,
    );

    return (
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Grid
              useIsScrolling
              columnCount={columnCount}
              columnWidth={width / columnCount}
              height={height}
              itemData={itemData}
              rowCount={items.length}
              rowHeight={
                ITEM_HEADER_HEIGHT +
                ITEM_COLUMN_ROW * visibleColumnDefs.length +
                ITEM_PADDING +
                gutterSize * 2 +
                2 // borders
              }
              width={width}
              innerElementType={innerElementType}
            >
              {Item}
            </Grid>
          );
        }}
      </AutoSizer>
    );
  }
}
