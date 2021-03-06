import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  cursor: pointer;
  font-size: 0.95rem;
`;

export default function Item({
  row: item,
  gutterSize = 32,
  onItemClick,
  style = {},
}) {
  const primary = item.cells.find((cell) => cell.column.isPrimary);
  const cover = item.cells.find((cell) => cell.column.kind === 'cover');
  const uid = item.cells.find((cell) => cell.column.kind === 'uid');

  return (
    <StyledItem
      key={item.id}
      onClick={(e) => {
        e.preventDefault();
        onItemClick(item);
      }}
      style={{
        ...style,
        minWidth: `calc(100% - ${gutterSize * 2}px)`,
        left: style.left + gutterSize,
        // top: style.top + gutterSize,
        top: 0,
        transform: `translate3d(0px,${style.top}px, 0px)`,
        willChange: 'transform',
        height: style.height,
      }}
      className="d-flex flex-row align-items-center w-auto"
    >
      {uid && (
        <div className="text-truncate data-list-cell px-3 px-xl-4 h-100 border-right">
          {uid.render('Cell')}
        </div>
      )}
      {/* {cover && (
        <div
          style={{
            width: cover.width || '138px',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundImage: `url(${valueRenderer(item, cover)})`,
            height: '100%',
            flexShrink: 0,
          }}
        />
      )} */}
      <div className="d-flex flex-column">
        {primary && (
          <div
            className={`mb-2 data-list-primary-cell${
              cover ? ' px-3 px-xl-4' : ''
            }`}
            style={{
              position: 'sticky',
              left: '-1.5rem',
              width: 'fit-content',
              maxWidth: `calc('100vw - 100px')`,
              fontWeight: 500,
            }}
          >
            {primary.render('Cell', { ...primary.column.cellProps })}
          </div>
        )}
        <div className="d-flex align-items-center">
          {item.cells
            .filter(
              (cell) =>
                cell.column.kind !== 'uid' &&
                !cell.column.isPrivate &&
                !cell.column.isPrimary,
            )
            .map((cell) => {
              return (
                <div
                  key={`${item.id}-${cell.column.id}-value`}
                  className="text-truncate data-list-cell px-3 px-xl-4"
                  style={{
                    width: cell.column.width || '150px',
                    minWidth: cell.column.minWidth || 'auto',
                    maxWidth: cell.column.maxWidth || 'auto',
                  }}
                >
                  {cell.render('Cell', { ...cell.column.cellProps })}
                </div>
              );
            })}
        </div>
      </div>
    </StyledItem>
  );
}

// export default class Item extends PureComponent<any> {
//   render() {
//     const { index, style, data, tableInstance } = this.props;
//     const {
//       items,
//       columnDefs,
//       gutterSize,
//       onItemClick,
//       primary,
//       cover,
//       avatar,
//     } = data;
//     console.log(tableInstance);
//     const item = items[index];

//     if (!item) {
//       return null;
//     }

//     return (
//       <StyledItem
//         key={item.id}
//         onClick={(e) => {
//           e.preventDefault();
//           onItemClick({ data: item });
//         }}
//         style={{
//           ...style,
//           minWidth: `calc(100% - ${gutterSize * 2}px)`,
//           left: style.left + gutterSize,
//           // top: style.top + gutterSize,
//           top: 0,
//           transform: `translate3d(0px,${style.top}px, 0px)`,
//           willChange: 'transform',
//           transition: '300ms transform',
//           height: style.height,
//         }}
//         className="d-flex border-bottom flex-row align-items-center w-auto"
//       >
//         {cover && (
//           <div
//             style={{
//               width: cover.width || '138px',
//               backgroundSize: 'cover',
//               backgroundPosition: '50% 50%',
//               backgroundImage: `url(${valueRenderer(item, cover)})`,
//               height: '100%',
//               flexShrink: 0,
//             }}
//           />
//         )}
//         <div className="d-flex flex-column">
//           {primary && (
//             <div
//               className={`mb-2 data-list-primary-cell${
//                 cover ? ' px-3 px-xl-4' : ''
//               }`}
//               style={{
//                 position: 'sticky',
//                 left: '1rem',
//                 width: 'fit-content',
//                 maxWidth: `calc('100vw - 100px')`,
//               }}
//             >
//               {valueRenderer(item, primary)}
//             </div>
//           )}
//           <div className="d-flex">
//             {row.cells
//               .filter(
//                 (cell) =>
//                   cell.column.type !== 'cover' &&
//                   cell.column.type !== 'primary',
//               )
//               .map((cell) => {
//                 return (
//                   <div
//                     key={`${item.id}-${cell.column.id}-value`}
//                     className="text-truncate data-list-cell px-3 px-xl-4"
//                     style={{
//                       width: cell.column.width || '150px',
//                       minWidth: cell.column.minWidth || 'auto',
//                       maxWidth: cell.column.maxWidth || 'auto',
//                     }}
//                   >
//                     {cell.render('Cell')}
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       </StyledItem>
//     );
//   }
// }
