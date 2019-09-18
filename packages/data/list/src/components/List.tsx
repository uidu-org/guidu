import { getAvatar, getCover, getPrimary } from '@uidu/table';
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
    {({ stickyIndices, columnDefs, gutterSize, headerHeight, onItemClick }) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map(index => (
          <Header
            index={index}
            key={index}
            style={{ height: headerHeight }}
            data={{ columnDefs, gutterSize, onItemClick }}
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
  itemData: {
    columnDefs,
    items,
    gutterSize,
    onItemClick,
    primary,
    cover,
    avatar,
  },
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
      onItemClick,
      primary,
      cover,
      avatar,
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
        onItemClick,
        primary,
        cover,
        avatar,
      }}
      {...rest}
    >
      {ItemWrapper}
    </VariableList>
  </StickyListContext.Provider>
);

const createItemData = memoize(
  (items, columnDefs, gutterSize, onItemClick, primary, cover, avatar) => ({
    items,
    columnDefs,
    gutterSize,
    onItemClick,
    primary,
    cover,
    avatar,
  }),
);

export default class List extends PureComponent<any> {
  static defaultProps = {
    gutterSize: 0,
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
      onItemClick,
    } = this.props;
    const visibleColumnDefs = columnDefs.filter(c => !c.hide && !c.pinned);

    const primary = getPrimary(columnDefs);
    const cover = getCover(visibleColumnDefs);
    const avatar = getAvatar(visibleColumnDefs);

    const itemData = createItemData(
      rowData,
      visibleColumnDefs,
      gutterSize,
      onItemClick,
      primary,
      cover,
      avatar,
    );

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
