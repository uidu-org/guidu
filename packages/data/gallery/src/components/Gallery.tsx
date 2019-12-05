import { getAvatar, getCover, getPrimary } from '@uidu/table';
import memoize from 'memoize-one';
import React, { PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import { GalleryProps } from '../types';
import Item from './Item';

const ITEM_HEADER_HEIGHT = 58;
const ITEM_COLUMN_ROW = 56;
const ITEM_PADDING = 32;

const createItemData = memoize(
  (
    items,
    columnDefs,
    gutterSize,
    columnCount,
    onItemClick,
    primary,
    cover,
    avatar,
  ) => ({
    items,
    columnDefs,
    gutterSize,
    columnCount,
    onItemClick,
    primary,
    cover,
    avatar,
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

  getGutterSize = ({ avatar, cover }) => {
    if (cover) {
      return cover.width ? (cover.width * 3) / 2 : 207;
    }

    if (avatar) {
      return 207;
    }

    return 0;
  };

  render() {
    const {
      rowData,
      columnDefs,
      columnCount,
      gutterSize,
      onItemClick,
    } = this.props;

    const visibleColumnDefs = columnDefs.filter(
      c => !c.hide && !c.pinned && !c.rowGroup,
    );
    const items = this.chunkData(
      rowData.filter(d => !!d.data),
      columnCount,
    );

    const primary = getPrimary(columnDefs);
    const cover = getCover(visibleColumnDefs);
    const avatar = getAvatar(visibleColumnDefs);

    const itemData = createItemData(
      items,
      visibleColumnDefs,
      gutterSize,
      columnCount,
      onItemClick,
      primary,
      cover,
      avatar,
    );

    return (
      <AutoSizer>
        {({ height, width }) => {
          const columnWidth = width / columnCount;
          return (
            <Grid
              useIsScrolling
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              itemData={itemData}
              rowCount={items.length}
              rowHeight={
                ITEM_HEADER_HEIGHT +
                ITEM_COLUMN_ROW *
                  visibleColumnDefs.filter(
                    column =>
                      column.type !== 'cover' &&
                      column.type !== 'primary' &&
                      column.type !== 'avatar',
                  ).length +
                ITEM_PADDING +
                gutterSize
              }
              width={width}
            >
              {Item}
            </Grid>
          );
        }}
      </AutoSizer>
    );
  }
}
