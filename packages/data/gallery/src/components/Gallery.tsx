import { getAvatar, getCover, getPrimary } from '@uidu/data-fields';
import React, { useCallback, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { GalleryProps } from '../types';
import GalleryItem from './GalleryItem';

const ITEM_HEADER_HEIGHT = 42;
const ITEM_COLUMN_ROW = 64;
const ITEM_PADDING = 32;

const chunkData = (array, chunkSize) => {
  return array.reduce((acc, _each, index, src) => {
    if (!(index % chunkSize)) {
      return [...acc, src.slice(index, index + chunkSize)];
    }
    return acc;
  }, []);
};

export default function Gallery({
  columnCount,
  tableInstance,
  gutterSize = 8,
}: GalleryProps) {
  const parentRef = useRef();

  const { prepareRow, columns } = tableInstance;

  const getGutterSize = ({ avatar, cover }) => {
    if (cover) {
      return cover.width ? (cover.width * 3) / 2 : 207;
    }

    if (avatar) {
      return 207;
    }

    return 0;
  };

  const primary = getPrimary(columns);
  const cover = getCover(columns);
  const avatar = getAvatar(columns);

  const estimateSize = useCallback(() => {
    return (
      getGutterSize({ avatar, cover }) +
      ITEM_HEADER_HEIGHT +
      ITEM_COLUMN_ROW *
        tableInstance.visibleColumns.filter(
          (column) =>
            column.kind !== 'uid' &&
            column.kind !== 'selection' &&
            column.kind !== 'cover' &&
            column.kind !== 'primary' &&
            column.kind !== 'avatar' &&
            column.kind !== 'addField',
        ).length +
      // ITEM_PADDING +
      gutterSize
    );
  }, [gutterSize, tableInstance.visibleColumns, avatar, cover]);

  const items = useMemo(() => chunkData(tableInstance.rows, columnCount), [
    tableInstance.rows,
    columnCount,
  ]);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize,
    overscan: 5,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = items[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                className="w-100"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  margin: `${gutterSize}px 0`,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {row.map((item) => {
                  prepareRow(item);
                  return (
                    <GalleryItem
                      rowIndex={virtualRow.index}
                      item={item}
                      data={{ tableInstance }}
                      style={{}}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// const createItemData = memoize(
//   (
//     items,
//     columnDefs,
//     gutterSize,
//     columnCount,
//     onItemClick,
//     primary,
//     cover,
//     avatar,
//     sorters,
//     groupers,
//     tableInstance,
//   ) => ({
//     items,
//     columnDefs,
//     gutterSize,
//     columnCount,
//     onItemClick,
//     primary,
//     cover,
//     avatar,
//     sorters,
//     groupers,
//     tableInstance,
//   }),
// );

// export default class Gallery extends PureComponent<GalleryProps> {
//   static defaultProps = {
//     columnCount: 4,
//     gutterSize: 8,
//     onItemClick: ({ data }) => {},
//     sorters: [],
//     groupers: [],
//     filterModel: {},
//   };

//   chunkData = (array, chunkSize) => {
//     return array.reduce((acc, _each, index, src) => {
//       if (!(index % chunkSize)) {
//         return [...acc, src.slice(index, index + chunkSize)];
//       }
//       return acc;
//     }, []);
//   };

//   getGutterSize = ({ avatar, cover }) => {
//     if (cover) {
//       return cover.width ? (cover.width * 3) / 2 : 207;
//     }

//     if (avatar) {
//       return 207;
//     }

//     return 0;
//   };

//   render() {
//     const {
//       rowData,
//       columnCount,
//       gutterSize,
//       onItemClick,
//       sorters,
//       groupers,
//       tableInstance,
//     } = this.props;

//     const {
//       getTableBodyProps,
//       headerGroups,
//       rows,
//       prepareRow,
//       state,
//       footerGroups,
//       totalColumnsWidth,
//       state: { filterBy },
//       columns,
//       visibleColumns,
//     } = tableInstance;

//     const items = this.chunkData(rowData, columnCount);

//     const primary = getPrimary(columns);
//     const cover = getCover(columns);
//     const avatar = getAvatar(columns);

//     const itemData = createItemData(
//       items,
//       visibleColumns,
//       gutterSize,
//       columnCount,
//       onItemClick,
//       primary,
//       cover,
//       avatar,
//       sorters,
//       groupers,
//       tableInstance,
//     );

//     return (
//       <div
//         style={{
//           paddingLeft: gutterSize / 2,
//           paddingRight: gutterSize / 2,
//           height: '100%',
//         }}
//       >
//         <AutoSizer>
//           {({ height, width }) => {
//             const columnWidth = width / columnCount;
//             return (
//               <Grid
//                 useIsScrolling
//                 columnCount={columnCount}
//                 columnWidth={columnWidth}
//                 height={height}
//                 itemData={itemData}
//                 rowCount={items.length}
//                 rowHeight={
//                   this.getGutterSize({ avatar, cover }) +
//                   ITEM_HEADER_HEIGHT +
//                   ITEM_COLUMN_ROW *
//                     visibleColumns.filter(
//                       (column) =>
//                         column.kind !== 'uid' &&
//                         column.kind !== 'selection' &&
//                         column.kind !== 'cover' &&
//                         column.kind !== 'primary' &&
//                         column.kind !== 'avatar' &&
//                         column.kind !== 'addField',
//                     ).length +
//                   ITEM_PADDING +
//                   gutterSize
//                 }
//                 width={width}
//               >
//                 {GalleryItem}
//               </Grid>
//             );
//           }}
//         </AutoSizer>
//       </div>
//     );
//   }
// }
