// import { getAvatar, getCover, getPrimary } from '@uidu/table';
// import memoize from 'memoize-one';
// import React, { PureComponent } from 'react';
// import AutoSizer from 'react-virtualized-auto-sizer';
// import { FixedSizeGrid as Grid } from 'react-window';
// import { GalleryProps } from '../types';
// import GalleryItem from './GalleryItem';

// const ITEM_HEADER_HEIGHT = 42;
// const ITEM_COLUMN_ROW = 64;
// const ITEM_PADDING = 32;

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
//                         column.viewType !== 'uid' &&
//                         column.id !== 'selection' &&
//                         column.viewType !== 'cover' &&
//                         column.viewType !== 'primary' &&
//                         column.viewType !== 'avatar' &&
//                         column.viewType !== 'addField',
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
