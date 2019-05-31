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
    {({ stickyIndices, columnDefs, gutterSize }) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map(index => (
          <Header
            index={index}
            key={index}
            style={{ height: 48 }}
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
    }}
  >
    <VariableList
      itemData={{
        ItemRenderer: children,
        stickyIndices,
        items,
        columnDefs,
        gutterSize,
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
  };

  render() {
    const { rowData, columnDefs, gutterSize } = this.props;
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);
    const itemData = createItemData(rowData, visibleColumnDefs, gutterSize);
    return (
      <AutoSizer>
        {({ height, width }) => {
          return (
            <StickyList
              useIsScrolling
              height={height}
              // itemData={itemData}
              itemCount={rowData.length}
              itemSize={index => (index === 0 ? 48 : 96)}
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
