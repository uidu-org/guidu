import memoize from 'memoize-one';
import React, { createContext, forwardRef, PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as VariableList } from 'react-window';
import Header from './Header';
import Item from './Item';

const StickyListContext = createContext(null);
StickyListContext.displayName = 'StickyListContext';

const ItemWrapper = ({ data, index, style }) => {
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} data={data} />;
};

const innerElementType = forwardRef(({ children, ...rest }, ref: any) => (
  <StickyListContext.Consumer>
    {({ stickyIndices, columnDefs, gutterSize, headerHeight }) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map(index => (
          <Header
            index={index}
            key={index}
            style={{ height: headerHeight }}
            data={{ columnDefs, gutterSize }}
          />
        ))}

        {children}
      </div>
    )}
  </StickyListContext.Consumer>
));

const StickyList = ({
  children,
  stickyIndices,
  headerHeight,
  itemData: { columnDefs, items, gutterSize },
  ...rest
}) => (
  <StickyListContext.Provider
    value={{
      ItemRenderer: children,
      stickyIndices,
      columnDefs,
      items,
      gutterSize,
      headerHeight,
    }}
  >
    <VariableList
      itemData={{
        ItemRenderer: children,
        stickyIndices,
        items,
        columnDefs,
        gutterSize,
        headerHeight,
      }}
      {...rest}
    >
      {ItemWrapper}
    </VariableList>
  </StickyListContext.Provider>
);

const createItemData = memoize((items, columnDefs, gutterSize) => ({
  items,
  columnDefs,
  gutterSize,
}));

export default class List extends PureComponent<any> {
  static defaultProps = {
    gutterSize: 8,
    headerHeight: 48,
    itemSize: 96,
  };

  render() {
    const {
      rowData,
      columnDefs,
      gutterSize,
      rowHeight,
      headerHeight,
    } = this.props;
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);
    const itemData = createItemData(rowData, visibleColumnDefs, gutterSize);
    return (
      <AutoSizer>
        {({ height, width }) => {
          return (
            <StickyList
              useIsScrolling
              height={height}
              itemCount={rowData.length}
              itemSize={index => (index === 0 ? headerHeight : rowHeight)}
              headerHeight={headerHeight}
              stickyIndices={[0]}
              itemData={itemData}
              innerElementType={innerElementType}
              width={width}
            >
              {Item}
            </StickyList>
          );
        }}
      </AutoSizer>
    );
  }
}
