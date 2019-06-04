import { getCover } from '@uidu/table';
import memoize from 'memoize-one';
import React, { PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import { GalleryProps } from '../types';
import Item from './Item';

const ITEM_HEADER_HEIGHT = 24;
const ITEM_COLUMN_ROW = 63;
const ITEM_PADDING = 48;

const createItemData = memoize(
  (items, columnDefs, gutterSize, columnCount, onItemClick) => ({
    items,
    columnDefs,
    gutterSize,
    columnCount,
    onItemClick,
  }),
);

export default class Gallery extends PureComponent<GalleryProps> {
  static defaultProps = {
    columnCount: 4,
    gutterSize: 8,
    onItemClick: console.log,
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
    const {
      rowData,
      columnDefs,
      columnCount,
      gutterSize,
      onItemClick,
    } = this.props;
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);
    const items = this.chunkData(rowData, columnCount);
    const itemData = createItemData(
      items,
      visibleColumnDefs,
      gutterSize,
      columnCount,
      onItemClick,
    );

    const cover = getCover(visibleColumnDefs);

    return (
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Grid
              useIsScrolling
              columnCount={columnCount}
              columnWidth={
                width / columnCount +
                gutterSize -
                (gutterSize / columnCount) * (columnCount + 1)
              }
              height={height}
              itemData={itemData}
              rowCount={items.length}
              rowHeight={
                ITEM_HEADER_HEIGHT +
                ITEM_COLUMN_ROW *
                  visibleColumnDefs.filter(
                    column =>
                      column.type !== 'cover' && column.type !== 'primary',
                  ).length +
                ITEM_PADDING +
                gutterSize +
                (cover ? (cover.width ? (cover.width * 3) / 2 : 207) : 0) +
                2 // borders
              }
              width={width}
              // innerElementType={innerElementType}
            >
              {Item}
            </Grid>
          );
        }}
      </AutoSizer>
    );
  }
}
