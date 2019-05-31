import memoize from 'memoize-one';
import React, { createContext, forwardRef, PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as VariableList } from 'react-window';
import Header from './Header';
import Item from './Item';

const GUTTER_SIZE = 8;

const StickyListContext = createContext();
StickyListContext.displayName = 'StickyListContext';

const ItemWrapper = ({ data, index, style }) => {
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} data={data} />;
};

const innerElementType = forwardRef(({ children, ...rest }, ref) => (
  <StickyListContext.Consumer>
    {({ stickyIndices, columnDefs }) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map(index => (
          <Header
            index={index}
            key={index}
            style={{ height: 48 }}
            data={{ columnDefs }}
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
  itemData: { columnDefs, items },
  ...rest
}) => (
  <StickyListContext.Provider
    value={{ ItemRenderer: children, stickyIndices, columnDefs, items }}
  >
    <VariableList
      itemData={{
        ItemRenderer: children,
        stickyIndices,
        items,
        columnDefs,
      }}
      {...rest}
    >
      {ItemWrapper}
    </VariableList>
  </StickyListContext.Provider>
);

const createItemData = memoize((items, columnDefs) => ({ items, columnDefs }));

export default class List extends PureComponent<any> {
  render() {
    const { rowData, columnDefs } = this.props;
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);
    const itemData = createItemData(rowData, visibleColumnDefs);
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
