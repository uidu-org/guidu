import memoize from 'memoize-one';
import React, { forwardRef, PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';

const GUTTER_SIZE = 8;
const ITEM_HEADER_HEIGHT = 16;
const ITEM_COLUMN_ROW = 63;
const ITEM_PADDING = 48;

class Cell extends PureComponent<any> {
  valueRenderer = (
    value,
    { cellRendererFramework: Renderer, valueFormatter },
  ) => {
    if (!value) {
      return '-';
    }

    if (Renderer) {
      return (
        <Renderer value={valueFormatter ? valueFormatter(value) : value} />
      );
    }
    return valueFormatter ? valueFormatter(value) : value;
  };

  render() {
    const { columnIndex, rowIndex, style, isScrolling, data } = this.props;
    const { items, columnDefs } = data;
    const item = items[rowIndex] && items[rowIndex][columnIndex];
    if (!item) {
      return null;
    }

    return (
      <div
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          width: style.width - GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
        }}
        className="card"
        key={item.id}
      >
        <div className="card-body">
          <div className="card-title">Test</div>
          <dl className="mb-0">
            {columnDefs.map(column => [
              <dt
                className="small text-muted mt-3 text-truncate"
                key={`${item.id}-${column.field}-name`}
              >
                {column.headerComponentParams &&
                column.headerComponentParams.menuIcon ? (
                  <span className="mr-2">
                    {column.headerComponentParams.menuIcon}
                  </span>
                ) : null}
                {column.headerName}
              </dt>,
              <dd
                className="mb-0 text-truncate"
                key={`${item.id}-${column.field}-value`}
              >
                {this.valueRenderer(item.data[column.field], column)}
              </dd>,
            ])}
          </dl>
        </div>
      </div>
    );
  }
}

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      paddingTop: GUTTER_SIZE,
      paddingLeft: GUTTER_SIZE,
    }}
    {...rest}
  />
));

const createItemData = memoize((items, columnDefs) => ({ items, columnDefs }));

export default class Gallery extends PureComponent<any> {
  static defaultProps = {
    columnCount: 4,
  };

  chunkData = (array, chunkSize) => {
    return array.reduce((acc, each, index, src) => {
      if (!(index % chunkSize)) {
        return [...acc, src.slice(index, index + chunkSize)];
      }
      return acc;
    }, []);
  };

  render() {
    const { rowData, columnDefs, columnCount } = this.props;
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);
    const items = this.chunkData(rowData, 4);
    const itemData = createItemData(items, visibleColumnDefs);
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
                GUTTER_SIZE * 2 +
                2 // borders
              }
              innerElementType={innerElementType}
              width={width}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    );
  }
}
